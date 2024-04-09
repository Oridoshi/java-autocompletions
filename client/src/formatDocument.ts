import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';

export class FormatDocumentPerso implements vscode.DocumentFormattingEditProvider {
	private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

	provideDocumentFormattingEdits(
		document: vscode.TextDocument,
		options: vscode.FormattingOptions,
		token: vscode.CancellationToken,
	): vscode.ProviderResult<vscode.TextEdit[]> {
		const code = document.getText();
		let lignes = code.split("\n");
		
		let codeEnCourDeFormatage = "";
		for (let i = 0; i < lignes.length; i++) {
			codeEnCourDeFormatage += lignes[i].trim() + "\n";
		}

		const indent = this.context.globalState.get('indent');
		let regex;
		if(indent) {
			// K&R :
			// vscode.window.showInformationMessage("DEBUG : Formatage K&R");
			regex = /(\w| )*(\{|\})(\w| )/g;
			codeEnCourDeFormatage = codeEnCourDeFormatage.replace(regex, (match) => match.trim() + "\n");
			regex = /.\n\{/g;
			codeEnCourDeFormatage = codeEnCourDeFormatage.replace(regex, (match) => {
				let lignes = match.split("\n");
				return lignes[0] + " " + lignes[1];
			});
		} else {
			// ALLMAN :
			// vscode.window.showInformationMessage("DEBUG : Formatage AllMan");
			regex = /(\w| )(\{|\})(\w| )/g;
			codeEnCourDeFormatage = codeEnCourDeFormatage.replace(regex, (match) => '\n' + match.trim() + '\n');
			regex = /(\{|\;|\})(\w| )/g;
			codeEnCourDeFormatage = codeEnCourDeFormatage.replace(regex, (match) => match.trim() + '\n');
			regex = /(\w| )(\{|\})/g;
			codeEnCourDeFormatage = codeEnCourDeFormatage.replace(regex, (match) => '\n' + match.trim());
		}

		// gestion de la JAVADOC
		regex = /(\/\*\*(.)*\n)(\*.*\n)*(\*\/)/g;
		codeEnCourDeFormatage = codeEnCourDeFormatage.replace(regex, (match) => {
			let lignes = match.split("\n");
			let javadoc = "";
			regex = /\*\//;
			for (let i = 0; i < lignes.length; i++) {
				if (lignes[i].trim().startsWith("*")) {
					if(regex.test(lignes[i])) {
						javadoc += " " + lignes[i];
					} else {
						javadoc += " " + lignes[i] + "\n";
					}
				} else {
					javadoc += lignes[i] + "\n";
				}
			}
			return javadoc;
		});

		// Ajoutez une tabulation à chaque ligne
		const codeIndentations = codeEnCourDeFormatage.split("\n");
		codeEnCourDeFormatage = "";
		let indentation = 0;
		for (let i = 0; i < codeIndentations.length; i++) {
			if (codeIndentations[i].includes("}")) {
				indentation--;
			}
			for (let j = 0; j < indentation; j++) {
				codeEnCourDeFormatage += "\t";
			}
			codeEnCourDeFormatage += codeIndentations[i] + "\n";
			if (codeIndentations[i].includes("{")) {
				indentation++;
			}
		}

		// Retournez un tableau de vscode.TextEdit contenant les modifications de format
		return [vscode.TextEdit.replace(
			new vscode.Range(
				document.positionAt(0),
				document.positionAt(code.length)
			),
			codeEnCourDeFormatage
		)];
	}
}