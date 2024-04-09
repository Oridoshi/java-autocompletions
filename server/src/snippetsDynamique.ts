import {
	connection
} from './server';

import {
	CompletionItem,
	CompletionItemKind
} from 'vscode-languageserver';

export function snippetsDynamique() {
	const snippets: CompletionItem[] =  [
		{
			label: 'veriferIndentation',
			kind: CompletionItemKind.Snippet,
			data: 1
		},
		{
			label: 'enum',
			detail: 'Initialise la class actuel en enum',
			kind: CompletionItemKind.Snippet,
			data: 2
		},
		{
			label: 'lirefichier',
			detail: 'Génère une méthode pour lire un fichier',
			kind: CompletionItemKind.Snippet,
			data: 3
		},
		{
			label: 'lirefichierStatic',
			detail: 'Génère une méthode static pour lire un fichier',
			kind: CompletionItemKind.Snippet,
			data: 4
		},
		{
			label: 'iterintern',
			detail: 'Génère une class interne pour créer un iterator',
			kind: CompletionItemKind.Snippet,
			data: 5
		},
		{
			label: 'comparintern',
			detail: 'Génère une class interne pour créer un comparator',
			kind: CompletionItemKind.Snippet,
			data: 6
		},
		{
			label: 'ecrirefichier',
			detail: 'Génère une méthode pour écrire dans un fichier',
			kind: CompletionItemKind.Snippet,
			data: 7
		
		}
	];

	return snippets;
}

export async function snippetsDynamiqueResolution(item: CompletionItem): Promise<CompletionItem> {
	let indent : boolean = await connection.sendRequest('getIndent');

	if (item.data === 1) {
		if(indent) {
			item.detail = 'Indentation : K&R';
			item.insertText = ' ';
		} else {
			item.detail = 'Indentation : AllMan';
			item.insertText = ' ';
		}
	} else if (item.data === 2) {
		if(indent) {
			item.insertText =
			`${await connection.sendRequest('getPackage')}` +
			"/**\n" +
			" * ${TM_FILENAME_BASE} est une classe enum\n" +
			" */\n" +
			"public enum ${TM_FILENAME_BASE}\n" +
			"{\n" +
			"    ${1:// Votre code ici}\n" +
			"}";
		} else {
			item.insertText =
			`${await connection.sendRequest('getPackage')}` +
			"/**\n" +
			" * ${TM_FILENAME_BASE} est une classe enum\n" +
			" */\n" +
			"public enum ${TM_FILENAME_BASE}\n" +
			"{\n" +
			"    ${1:// Votre code ici}\n" +
			"}";
		}
	} else if (item.data === 3) {
		if(indent) {
			item.insertText =
			"/**\n"+
			" * Lit un fichier à partir des ressources du projet et traite chaque ligne en utilisant une méthode de traitement personnalisée.\n"+
			" * \n"+
			" * @param nomFichier Le nom du fichier à lire depuis les ressources du projet.\n"+
			" */\n"+
			"private void lireFichier(String nomFichier) {\n"+
			"    String ligne = null;\n"+
			"\n"+
			"    try {\n"+
			"        InputStream ips = this.getClass().getResourceAsStream(nomFichier);\n"+
			"        InputStreamReader ipsr = new InputStreamReader(ips, \"UTF-8\");\n"+
			"        BufferedReader fichier = new BufferedReader(ipsr);\n"+
			"        // Traitement du fichier\n"+
			"        while ((ligne = fichier.readLine()) != null) {\n"+
			"            /*Mettre une condition si besoin*/\n"+
			"            traiteLigne(ligne);// Modifiez cette méthode pour traiter la ligne lue\n"+
			"        }\n"+
			"        // Fin du traitement du fichier\n"+
			"        fichier.close();\n"+
			"    } catch(Exception exc) {\n"+
			"        System.out.println(\"Erreur de lecture du fichier \" + nomFichier + \" : \" + exc);\n"+
			"    }\n"+
			"}\n"+
			"\n"+
			"/**\n"+
			" * Méthode destinée à traiter chaque ligne lue à partir du fichier.\n"+
			" * \n"+
			" * @param ligne La ligne lue à partir du fichier.\n"+
			" */\n"+
			"private void traiteLigne(String ligne) {\n"+
			"    Scanner scanner = new Scanner(ligne);\n"+
			"    /*Mettre votre code de traitement de ligne*/$0\n"+
			"}";
		} else {
			item.insertText = 
			"/**\n"+
			" * Lit un fichier à partir des ressources du projet et traite chaque ligne en utilisant une méthode de traitement personnalisée.\n"+
			" * \n"+
			" * @param nomFichier Le nom du fichier à lire depuis les ressources du projet.\n"+
			" */\n"+
			"private void lireFichier(String nomFichier)\n"+
			"{\n"+
			"    String ligne = null;\n"+
			"\n"+
			"    try\n"+
			"    {\n"+
			"        InputStream ips = this.getClass().getResourceAsStream(nomFichier);\n"+
			"        InputStreamReader ipsr = new InputStreamReader(ips, \"UTF-8\");\n"+
			"        BufferedReader fichier = new BufferedReader(ipsr);\n"+
			"        // Traitement du fichier\n"+
			"        while ((ligne = fichier.readLine()) != null)\n"+
			"        {\n"+
			"            /*Mettre une condition si besoin*/\n"+
			"            traiteLigne(ligne);// Modifiez cette méthode pour traiter la ligne lue\n"+
			"        }\n"+
			"        // Fin du traitement du fichier\n"+
			"        fichier.close();\n"+
			"    }\n"+
			"    catch(Exception exc)\n"+
			"    {\n"+
			"        System.out.println(\"Erreur de lecture du fichier \" + nomFichier + \" : \" + exc);\n"+
			"    }\n"+
			"}\n"+
			"\n"+
			"/**\n"+
			" * Méthode destinée à traiter chaque ligne lue à partir du fichier.\n"+
			" * \n"+
			" * @param ligne La ligne lue à partir du fichier.\n"+
			" */\n"+
			"private void traiteLigne(String ligne)\n"+
			"{\n"+
			"    Scanner scanner = new Scanner(ligne);\n"+
			"    /*Mettre votre code de traitement de ligne*/$0\n"+
			"}";
		}
	} else if (item.data === 4) {
		if(indent) {
			item.insertText =
			"/**\n"+
			" * Lit un fichier à partir des ressources du système de fichiers local et traite chaque ligne en utilisant une méthode de traitement personnalisée.\n"+
			" * \n"+
			" * @param nomFichier Le nom du fichier à lire depuis les ressources du projet.\n"+
			" * @throws IOException si une erreur d'entrée-sortie se produit lors de la lecture du fichier.\n"+
			" */\n"+
			"private static void lireFichier(String nomFichier) {\n"+
			"    String ligne = null;\n"+
			"\n"+
			"    try {\n"+
			"        FileInputStream fis = new FileInputStream(nomFichier);\n"+
			"        InputStreamReader isr = new InputStreamReader(fis, \"UTF-8\");\n"+
			"        BufferedReader fichier = new BufferedReader(isr);\n"+
			"        // Traitement du fichier\n"+
			"        while ((ligne = fichier.readLine()) != null) {\n"+
			"            /* Mettre une condition si besoin */\n"+
			"            traiteLigne(ligne); // Modifiez cette méthode pour traiter la ligne lue\n"+
			"        }\n"+
			"        // Fin du traitement du fichier\n"+
			"        fichier.close();\n"+
			"    } catch (IOException exc) {\n"+
			"        System.out.println(\"Erreur de lecture du fichier \" + nomFichier + \" : \" + exc.getMessage());\n"+
			"    }\n"+
			"}\n"+
			"\n"+
			"/**\n"+
			" * Méthode destinée à traiter chaque ligne lue à partir du fichier.\n"+
			" * \n"+
			" * @param ligne La ligne lue à partir du fichier.\n"+
			" */\n"+
			"private static void traiteLigne(String ligne) {\n"+
			"    Scanner scanner = new Scanner(ligne);\n"+
			"    /* Mettre votre code de traitement de ligne */\n"+
			"    System.out.println(scanner.nextLine());\n"+
			"}\n";
		} else {
			item.insertText =
			"/**\n"+
			" * Lit un fichier à partir des ressources du système de fichiers local et traite chaque ligne en utilisant une méthode de traitement personnalisée.\n"+
			" * \n"+
			" * @param nomFichier Le nom du fichier à lire depuis les ressources du projet.\n"+
			" */\n"+
			"private static void lireFichier(String nomFichier)\n"+
			"{\n"+
			"    String ligne = null;\n"+
			"\n"+
			"    try\n"+
			"    {\n"+
			"        FileInputStream fis = new FileInputStream(nomFichier);\n"+
			"        InputStreamReader isr = new InputStreamReader(fis, \"UTF-8\");\n"+
			"        BufferedReader fichier = new BufferedReader(isr);\n"+
			"        // Traitement du fichier\n"+
			"        while ((ligne = fichier.readLine()) != null)\n"+
			"        {\n"+
			"            /* Mettre une condition si besoin */\n"+
			"            traiteLigne(ligne); // Modifiez cette méthode pour traiter la ligne lue\n"+
			"        }\n"+
			"        // Fin du traitement du fichier\n"+
			"        fichier.close();\n"+
			"    }\n"+
			"    catch (IOException exc)\n"+
			"    {\n"+
			"        System.out.println(\"Erreur de lecture du fichier \" + nomFichier + \" : \" + exc.getMessage());\n"+
			"    }\n"+
			"}\n"+
			"\n"+
			"/**\n"+
			" * Méthode destinée à traiter chaque ligne lue à partir du fichier.\n"+
			" * \n"+
			" * @param ligne La ligne lue à partir du fichier.\n"+
			" */\n"+
			"private static void traiteLigne(String ligne)\n"+
			"{\n"+
			"    Scanner scanner = new Scanner(ligne);\n"+
			"    /* Mettre votre code de traitement de ligne */\n"+
			"    System.out.println(scanner.nextLine());\n"+
			"}\n";
		} 
	} else if (item.data === 5) {
		if(indent) {
			item.insertText =
			"public class ${2:NomIterator} implements Iterator<${1:TYPE}> {"+
			"    private int index = 0;"+
			"    /*variable si besoin*/"+
			""+
			"    public ${2}() {"+
			"        /*initialisation des variable si besoin*/"+
			"    }"+
			""+
			"    @Override"+
			"    public boolean hasNext() {"+
			"        return index < ${3:NbTotal}; /*Si le nombre est dans la classe parent ont fait NomDeLaClassParent.this.VariableDuNbTotal*/"+
			"    }"+
			""+
			"    @Override"+
			"    public ${1} next() {"+
			"        return ${4:ArrayQuiContientLesValeur}[this.index++];/*Si le tableau est dans la classe parent ont fait NomDeLaClassParent.this.ArrayQuiContientLesValeur*/"+
			"    }"+
			"}";
		} else {
			item.insertText =
			"public class ${2:NomIterator} implements Iterator<${1:TYPE}>"+
			"{"+
			"    private int index = 0;"+
			"    /*variable si besoin*/"+
			""+
			"    public ${2}()"+
			"    {"+
			"        /*initialisation des variable si besoin*/"+
			"    }"+
			""+
			"    @Override"+
			"    public boolean hasNext()"+
			"    {"+
			"        return index < ${3:NbTotal}; /*Si le nombre est dans la classe parent ont fait NomDeLaClassParent.this.VariableDuNbTotal*/"+
			"    }"+
			""+
			"    @Override"+
			"    public ${1} next()"+
			"    {"+
			"        return ${4:ArrayQuiContientLesValeur}[this.index++];/*Si le tableau est dans la classe parent ont fait NomDeLaClassParent.this.ArrayQuiContientLesValeur*/"+
			"    }"+
			"}";
		}
	} else if (item.data === 6) {
		if(indent) {
			item.insertText =
			"public class ${2:NomComparator} implements Comparator<${1:TYPE}> {"+
			"    @Override"+
			"    public int compare(${1:TYPE} o1, ${1:TYPE} o2) {"+
			"        ${3:/*Mettre votre code de comparaison*/}"+
			"        return 0;"+
			"    }"+
			"}";
		} else {
			item.insertText =
			"public class ${2:NomComparator} implements Comparator<${1:TYPE}>"+
			"{"+
			"    @Override"+
			"    public int compare(${1:TYPE} o1, ${1:TYPE} o2)"+
			"    {"+
			"        ${3:/*Mettre votre code de comparaison*/}"+
			"        return 0;"+
			"    }"+
			"}";
		}
	} else if (item.data === 7) {
		if(indent) {
			item.insertText =
			"/**"+
			" * Écrit des données dans un fichier spécifié en utilisant un PrintWriter."+
			" * "+
			" * @param nomFichierDestination Le nom du fichier dans lequel écrire les données."+
			" */"+
			"private void ecrireFichier(String nomFichierDestination) {"+
			"    try {"+
			"        PrintWriter pw = new PrintWriter(new FileOutputStream(nomFichierDestination));"+
			""+
			"        //Mettez votre code d'écriture de fichier dans la méthode `ecritureLigne()`"+
			"        pw.println(ecritureLigne());"+
			"        /* Fin de l'écriture du fichier */"+
			""+
			"        pw.close();"+
			"    } catch (Exception e) {"+
			"        e.printStackTrace();"+
			"    }"+
			"}"+
			""+
			"/**"+
			" * Méthode destinée à générer la chaîne de caractères à écrire dans le fichier."+
			" * Vous devriez implémenter votre code de génération de ligne personnalisée ici."+
			" * "+
			" * @return La chaîne de caractères à écrire dans le fichier."+
			" */"+
			"private String ecritureLigne() {"+
			"    ${1:/* Mettez votre code de génération de ligne ici */"+
			"    String str = \"\";"+
			"    return str;"+
			"}";
		} else {
			item.insertText =
			"/**"+
			" * Écrit des données dans un fichier spécifié en utilisant un PrintWriter."+
			" * "+
			" * @param nomFichierDestination Le nom du fichier dans lequel écrire les données."+
			" */"+
			"private void ecrireFichier(String nomFichierDestination)"+
			"{"+
			"    try"+
			"    {"+
			"        PrintWriter pw = new PrintWriter(new FileOutputStream(nomFichierDestination));"+
			""+
			"        //Mettez votre code d'écriture de fichier dans la méthode `ecritureLigne()`"+
			"        pw.println(ecritureLigne());"+
			"        /* Fin de l'écriture du fichier */"+
			""+
			"        pw.close();"+
			"    }"+
			"    catch (Exception e)"+
			"    {"+
			"        e.printStackTrace();"+
			"    }"+
			"}"+
			""+
			"/**"+
			" * Méthode destinée à générer la chaîne de caractères à écrire dans le fichier."+
			" * Vous devriez implémenter votre code de génération de ligne personnalisée ici."+
			" * "+
			" * @return La chaîne de caractères à écrire dans le fichier."+
			" */"+
			"private String ecritureLigne()"+
			"{"+
			"    ${1:/* Mettez votre code de génération de ligne ici */"+
			"    String str = \"\";"+
			"    return str; "+
			"}";
		}
	}

	return item;
}