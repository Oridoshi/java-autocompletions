# Journal des modifications (CHANGELOG)

Toutes les modifications importantes de l'extension "Java Autocomplétions" seront répertoriées dans ce fichier.

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
  - `doubleboucle`  : Génère une double boucle java