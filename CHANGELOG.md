# Journal des modifications

Toutes les modifications importantes de l'extension "Java Autocomplétions" seront répertoriées dans ce fichier. Pour tout problème rencontré, veuillez soumettre une demande via [GitHub](https://github.com/Oridoshi/java-autocompletions/issues).

## [1.0.9] - 09/04/2024
Beaucoup de changements et de mises à jour ont été effectués :
- Mise en place d'un serveur LSP.
- La commande `> Java-Autocompletions Changer Indentation` a été ajoutée. Elle permet de changer l'indentation de Allman à K&R.
- Tous les snippets sont devenus dynamiques et s'adaptent à l'indentation choisie. De plus, de nouveaux snippets ont été ajoutés :
  - `lirefichierStatic` : Comme son nom l'indique, il s'agit d'une fonction pour lire un fichier qui n'utilise pas les ressources du projet mais celles du système.
  - `verifierIndentation` : Ce snippet permet de visualiser son indentation via sa description. L'utiliser ne mettra qu'un espace. Il est principalement présent pour vérifier son indentation rapidement.
- Mise en place d'un "Format Document" propre à l'extension. En fonction de l'indentation choisie, il formatera votre code en Allman ou en K&R. Il s'agit d'un formatage de document basique. Pour des améliorations supplémentaires, veuillez soumettre une demande via GitHub.

## [1.0.8] - 31/01/2024
- Optimisation et amélioration des snippets.
- Ajout du snippet `enum`

## [1.0.6 - 1.0.7] - 29/11/2023
- Mise a jour de la JavaDoc pour les deux méthode `lireFichier` et de l'importation des importe automatique
- Ajout des snippets:
  - `iterintern`
  - `comparintern`

## [1.0.4 - 1.0.5] - 04/11/2023

- Ajout de la Javadoc pour les différentes méthodes.
- Correction
  - Les imports sont désormais correctement pris en charge uniquement pour les fichiers .java .
  - `lireFichierScanner` a était corriger.

## [1.0.3] - 04/11/2023

- Correction de bug dans les imports.

## [1.0.2] - 04/11/2023

- Mise à jour snippets : 
  - `lirefichier` : Maintenant, divisez en 2 snippets, un qui utilise un BufferedReader et l'autre un Scanner, respectivement appelés par `lirefichierBufferedReader` et `lirefichierScanner`

## [1.0.1] - 26/10/2023

- Mise à jour du snippet :
  - `ecrirefichier` : Prends maintenant en paramètre le fichier de destination.

## [1.0.0] - 26/10/2023

- Ajout des snippets :
  - `lirefichier`   : Génère une méthode pour lire un fichier et traiter les lignes.
  - `ecrirefichier` : Génère une méthode pour écrire dans un fichier.