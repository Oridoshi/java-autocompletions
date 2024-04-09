import * as path from 'path';
import * as fs from 'fs';

import {
	workspace,
	ExtensionContext
} from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

import { 
	FormatDocumentPerso
 } from "./formatDocument";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Fait en sorte que le fonctionne sur les fichiers java
		documentSelector: [{ scheme: 'file', language: 'java' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'Java-AutocompletionServeur',
		'Java-Autocompletion Serveur',
		serverOptions,
		clientOptions
	);

	client.start();
	client.onReady().then(() => {
		// Code à exécuter une fois que le client est prêt

		// Créer une commande qui permet de changer l'indentation
		let disposable = vscode.commands.registerCommand('java-autocompletions.changeIndentation', () => {
			context.globalState.update('indent', !context.globalState.get('indent'));
			vscode.window.showInformationMessage('L\'indentation a été changée pour ' + (context.globalState.get('indent')?'K&R':'AllMan'));
		});

		// permet d'afficher les notifications envoyées par le serveur
		client.onNotification('showInformationMessage', (message: string) => {
			vscode.window.showInformationMessage(message);
		});

		async function obtenirFichierJava(directoryPath: string): Promise<string[]> {
			return new Promise<string[]>((resolve, reject) => {
				fs.readdir(directoryPath, (err, files) => {
					if (err) {
						reject(err);
					} else {
						// Filtrer les fichiers pour ne retourner que ceux avec l'extension .java
						const javaFiles = files.filter(file => path.extname(file) === '.java');
						resolve(javaFiles);
					}
				});
			});
		}

		async function obtenirPackageAutreFichier(filePath: string): Promise<string> {
			return new Promise<string>((resolve, reject) => {
				fs.readFile(filePath, 'utf8', async (err, data) => {
					if (err) {
						reject(err);
					} else {
						// regarde si le fichier contient un package
						const lines = data.split('\n');
						for (let i = 0; i < lines.length; i++) {
							if (lines[i].includes('package')) {
								resolve(lines[i] + "\n\n"); // Retourne l'objet avec la propriété package
								return; // Sort de la fonction une fois que le mot "package" est trouvé
							}
						}

						resolve(await créePackage());
					}
				});
			});
		}

		async function créePackage(): Promise<string> {
			const filePath = vscode.window.activeTextEditor.document.uri.fsPath;

			const folderPathSplit = filePath.replace(/\\/g, '/').split('/');

			const workspaceFolderName = vscode.workspace.workspaceFolders[0].name;

			const nbFichierTot = folderPathSplit.length;
			let nbFichierAvWorkspace = 0;
			let workspaceTrouve = false;
			for (let i = 0; i < folderPathSplit.length && !workspaceTrouve; i++) {
				if(folderPathSplit[i] === workspaceFolderName){
					workspaceTrouve = true;
				}
				nbFichierAvWorkspace++;
			}

			let packageFichier = "";
			if(nbFichierAvWorkspace !== nbFichierTot){
				for (let i = nbFichierAvWorkspace + 1; i < nbFichierTot - 1; i++) {
					if(i === nbFichierAvWorkspace + 1){
						packageFichier = `package ${folderPathSplit[i]}`;
					}
					else{
						packageFichier += `. + ${folderPathSplit[i]}`;
					}
				}

				packageFichier += ";\n";
			}

			return packageFichier;
		}

		/**
		 * Si le fichier dans lequel on travaille n'a pas de package et que c'est le seule fichier dans le dossier
		 * dans le quelle ont travail alors on crée un package  
		 * Si un autre fichier java est au même emplacement que le fichier dans le quelle on travaille,
		 * on vérifie si il y a un package défini, s'il n'en a pas alors on ne met pas de package et s'il
		 * y en a un alors on le prend la package de ce fichier
		 * @returns Le package du fichier
		 */
		client.onRequest('getPackage', async () => {
			const filePath = vscode.window.activeTextEditor.document.uri.fsPath;

			const lstFichier = await obtenirFichierJava(path.dirname(filePath)); // Obtenir le répertoire parent;

			const folderPathSplit = filePath.replace(/\\/g, '/').split('/');

			if(lstFichier.length > 1){
				if (lstFichier[0] !== folderPathSplit[folderPathSplit.length - 1])
				{
					return await obtenirPackageAutreFichier(path.dirname(filePath) + '/' + lstFichier[0]) + "\n";
				}
				else
				{
					return await obtenirPackageAutreFichier(path.dirname(filePath) + '/' + lstFichier[1]) + "\n";
				}
			}

			return await créePackage();
		});



		/**
		 * Si false alors l'indentation est de type AllMan
		 * Si true alors l'indentation est de type K&R
		 */
		client.onRequest('getIndent', () => {
			return context.globalState.get('indent');
		});

		client.sendNotification('indentChanger', context.globalState.get('indent'));

		context.subscriptions.push(disposable);
	});

	//création des argument globale
	const indent = context.globalState.get('indent');

	// Vérifier si les arguments ont déjà été stockés
	if (indent === undefined) {
		// Stocker les arguments dans l'espace de stockage uniquement s'ils ne sont pas déjà stockés
		context.globalState.update('indent', true);
	}


	context.subscriptions.push(
		vscode.languages.registerDocumentFormattingEditProvider('java', new FormatDocumentPerso(context))
	);
}


export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}






import * as vscode from 'vscode';
import { importationImport } from './importation';

vscode.workspace.onDidChangeTextDocument((event) =>
{
	const editor = vscode.window.activeTextEditor;
	if (editor)
	{
		const document = editor.document;
		if (document.languageId === 'java')
		{
			if (event.contentChanges.length > 0 )
			{
				const text = event.contentChanges[0].text;

				importationImport(document, text);
			}

			// // Récupère la position du curseur
			// const position = editor.selection.active;
		}
	}
});
