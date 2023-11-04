import * as vscode from 'vscode';

// Cette fonction ajoute une importation à un document
function ajouterImport(document: vscode.TextDocument, importStatement: string) {
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
                
                // Vérifiez si le texte inséré correspond à un snippet
                if (text.includes('InputStream'))
                {
                    // Insérer les imports nécessaires
                    ajouterImport(document, 'import java.io.InputStream;');
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
                if(text.includes('PrintWriter'))
                {
                    // Insérer les imports nécessaires
                    ajouterImport(document, 'import java.io.PrintWriter;');
                }
                if(text.includes('FileOutputStream'))
                {
                    // Insérer les imports nécessaires
                    ajouterImport(document, 'import java.io.FileOutputStream;');
                }
                if(text.includes('Scanner'))
                {
                    ajouterImport(document, 'import java.util.Scanner;');
                }
            }
        }
    }
});

export function activate(context: vscode.ExtensionContext) {
    // ...
}

export function deactivate() {
    // ...
}