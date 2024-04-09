import * as vscode from 'vscode';

// Fonction qui détermine les imports a ajouter en fonction du snippet inséré
export function importationImport(document: vscode.TextDocument, text: string): void {
	// Vérifiez si le texte inséré correspond à un snippet
	if (text.includes('InputStream'))
	{
		// Insérer les imports nécessaires
		ajouterImport(document, 'import java.io.InputStream;');
	}
	if (text.includes('FileInputStream'))
	{
		// Insérer les imports nécessaires
		ajouterImport(document, 'import java.io.FileInputStream;');
	}
	if (text.includes('InputStreamReader'))
	{
		// Insérer les imports nécessaires
		ajouterImport(document, 'import java.io.InputStreamReader;');
	}
	if (text.includes('BufferedReader'))
	{
		// Insérer les imports nécessaires
		ajouterImport(document, 'import java.io.BufferedReader;');
	}
	if (text.includes('PrintWriter'))
	{
		// Insérer les imports nécessaires
		ajouterImport(document, 'import java.io.PrintWriter;');
	}
	if (text.includes('Scanner'))
	{
		ajouterImport(document, 'import java.util.Scanner;');
	}
	if (text.includes('Iterator'))
	{
		ajouterImport(document, 'import java.util.Iterator;');
	}
	if (text.includes('Comparator'))
	{
		ajouterImport(document, 'import java.util.Comparator;');
	}
	// if (text.includes('enum')) {
	// 	ajouterPackage(document);
	// }
}

//fonction qui ajoute les imports au document
function ajouterImport(document: vscode.TextDocument, importStatement: string): void {
	const text = document.getText();
	const lines = text.split('\n');
	const existingImports = new Set<string>();

	// Parcourez le texte pour collecter les imports existants
	for (const line of lines) {
		if (line.trim().startsWith('import ')) {
			existingImports.add(line.trim());
		}
	}

	// Vérifiez si l'importation est déjà présente
	if (existingImports.has(importStatement)) {
		return; // L'importation est déjà présente, pas besoin de l'ajouter à nouveau
	}

	// Trouvez où ajouter les imports
	const importsIndex = text.indexOf('import ');
	if (importsIndex >= 0) {
		// Il y a déjà des importations, nous ajoutons après le dernier import
		for (let i = lines.length - 1; i >= 0; i--) {
			if (lines[i].trim().startsWith('import ')) {
				const lastImportLine = document.lineAt(i);
				const position = new vscode.Position(lastImportLine.lineNumber + 1, 0);
				const edit = new vscode.WorkspaceEdit();
				edit.insert(document.uri, position, `${importStatement}\n`);
				vscode.workspace.applyEdit(edit);
				return;
			}
		}
	}
	else
	{
		// Il n'y a pas d'importations, nous ajoutons l'importation au début du fichier ou après le package
		if(text.startsWith('package '))
		{
			const position = new vscode.Position(1, 0);
			const edit = new vscode.WorkspaceEdit();
			edit.insert(document.uri, position, `${importStatement}\n`);
			vscode.workspace.applyEdit(edit);
		}
		else
		{
			const position = new vscode.Position(0, 0);
			const edit = new vscode.WorkspaceEdit();
			edit.insert(document.uri, position, `${importStatement}\n`);
			vscode.workspace.applyEdit(edit);
		}
	}
}
