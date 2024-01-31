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
        }
    }
});


function determinePackage(document: vscode.TextDocument): string | undefined {
    // Obtenez le chemin relatif du fichier par rapport au répertoire source du projet
    const sourcePath = vscode.workspace.getConfiguration('java').get('sourcePath');
    const relativePath = vscode.workspace.asRelativePath(document.uri.fsPath, false);
    const match = new RegExp(`^${sourcePath}/([^/]+)`).exec(relativePath);

    // Si le chemin correspond, retournez le groupe de capture correspondant au nom du package
    return match ? match[1] : undefined;
}

export function ajouterPackage(document: vscode.TextDocument)
{
    if(!document.getText().startsWith('package '))
    {
        const packageName = determinePackage(document);
        if (packageName)
        {
            const edit = new vscode.WorkspaceEdit();
            edit.insert(document.uri, new vscode.Position(0, 0), `package ${packageName};\n\n`);
            vscode.workspace.applyEdit(edit);
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    // ...
}

export function deactivate() {
    // ...
}