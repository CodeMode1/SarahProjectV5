## Agenda Sarah 2.0

Application web côté client : Angular2/Typescript/JS
		Côté serveur : NodeJS/RESTful Web API : Express
		Persistance : Mongo DB/Mongoose

Application qui fait la gestion de clients et des évènements de ceux-ci
Updaté à la version finale angular 2.4.2 depuis rc5

Notes:
Package est un synonyme de "dépendances". En anglais, ces paquets sont appelés "package dependencies"

## Commencer

Ces instructions vont permettre d'éxécuter le projet sur une machine locale
Utiliser des fenêtres DOS en mode administrateur pour lancer les commandes

## Pré - requis Installation software

Downloader Mongo DB version 3.4 actuelle (persistance) : https://www.mongodb.com/download-center?jmp=nav#community
	(instructions d'une installation de base) :
	-> Sous C:\ , créer un dossier qui va hoster la BD, dans une fenêtre DOS, taper :
		md \data\db
	-> Mettre sur le bureau un lien vers mongod.exe (serveur) et mongo.exe (client : requête bd)

Installer Node  + NPM (Node package Manager) :  https://nodejs.org/en/ 
	-> nodejs : downloader version sur site nodejs
	-> NPM, taper dans une fenêtre DOS :
		npm install npm@3.10.10 -g (version compatible avec version NodeJs)

Installer Typescript version 2.1.4 : http://www.typescriptlang.org/

Installer les packages :
	-> bootstrap : npm install bootstrap@3 -g
	-> express : npm install express -g
	-> gulp : npm install gulp -g
	-> typings : npm install typings --global

Notes:
* Tenir à jour les packages aux versions plus récentes
Accéder aux packages globaux NPM nécessaires pour le projet : 
	Dans un explorateur de fichiers, taper :
		%appData%

(Optionnel) pour utilisateurs techniques :

Installer VS Code : https://code.visualstudio.com/Download

Installer plugin pour VS Code : beautify (indentation en sauvegardant), vscode-angular2-snippets (shortcut pour Angular2)


## Installation / Exécution 

Démarrer mongod.exe en cliquant sur le lien du bureau. Laisser rouler

Démarrer mongo.exe (client mongo) en cliquant sur le lien du bureau 
	-> Choisir (switcher) à la bd du projet en tapant dans la ligne de commande : use sarahdb2
	-> le nom de la BD est définit dans le fichier app.js (à la racine du dossier du projet sprint2v2.0)

Ouvrir le dossier du projet (sprint2v2.0) dans VS Code

Ouvrir 2 fenêtres DOS en ligne de commande en mode Administrateur. (important d'avoir 2 fenêtres)

Dans une fenêtre se positionner dans le dossier du projet, installer les packages (package dependencies) du dossier node_modules, taper :
	-> npm install

Se positionner dans le dossier : sprint2v2.0 dans les deux fenêtres

Dans la 1er fenêtre, taper : npm run gulp. Attendre quelques secondes que les fichiers soient compilés
	-> Laisser rouler, ne pas fermer, il s'agit du tasks builder

Dans la 2eme fenêtre, taper : npm start. Encore une fois ne pas fermer

Ouvrir un onglet Google Chrome et se rendre au : localhost:3000.
	* IMPORTANT: utiliser google chrome pour compatibilité, se référer à Bugs Connus pour explication

L'app est live. Lorsque changement de code côté client seulement re-rouler npm run gulp. Si changement côté serveur rouler npm run gulp + npm start dans leur fenêtre respective)


Installer des packages supplémentaires:
- installer dépendance local dev/prod de Ts dans le projet :
ex:	dev : npm install typescript@2.1.4 --save-dev
	prod : npm install nom_package --save


## Commandes

Quitter les fenêtres DOS : CTRL + C 

Version: node –v, npm –v, tsc -v 

Bd (mongo) : 
	-> use bd : use bd_nom
	-> lister collections bd : db.getCollectionNames()
	-> supprimer tous documents d'une collection : db.collection_nom.remove({})
	-> trouver tous les documents d'une collection : db.collection_nom.find()
	
	source:
	mongo db official docs
	http://stackoverflow.com/questions/7486528/mongoose-force-collection-name


## Structure des dossiers

#assets (dossier qui contient le dossier du code client)
	# app (dossier qui sera compilé et servi dans le browser à partir du dossier public)
		# chaque sous-dossier de app représente une composante dans Angular2.
		boot.ts permet de bootstrapper l'app côté client.
#bin(dossier qui contient le serveur, le crée et le configure)
#models (dossier qui contient les définitions des collections de la BD --> schéma mongoose)
#node_modules (dossier qui contient tous les packages JS nécessaires, appelés dépendances pour Angular2 ou pacakge de fonctionnalité)
#public (dossier qui contient tout le code qui va être exécuté dans le browser (TS compilé en JS, autant client que les dépendances nécessaires à Angular2 minifiés seront dans ce folder)
#routes (dossier qui contient le code serveur pour les routes routées par url)
#typings (dossier qui contient la définition des typings)
#views (dossier qui contient la single page app view, la vue de l'application que system.js va faire démarrer, des scripts y sont injectés)
.gitignore (fichier nécessaire pour ignorer le dossier node_modules volumineux et inutile à mettre en revision control)
app.js (fichier qui contient des API endpoints : permet de router les requêtes Http entrantes vers le bon fichier de routes du dossier routes)
gulpfile.js (fichier qui permet de builder mes tâches, de compiler le TS en JS dans le dossier public)
package.json (fichier qui contient tous les packages du NPM installés, avec les versions respectives)
readme.txt (fichier read me du projet)
systemjs.builder.js (fichier qui permet de minifier des fichiers JS en un bundle)
tsconfig.json (fichier qui contient la configuration de typescript)
typings.d.ts (fichier qui contient la référence pour du typing)
typings.json (fichier qui contient des dépendances pour du typing)


## Bugs Connus

Le browser doit être google chrome, car certains widgets ne sont pas compatibles dans firefox ou InternetExplorer
J'ai testé plusieurs packages, qui n'étaient pas fonctionnel dans mon projet
puisque Angular 2 est un cadre de travail en développement
J'ai cherché dans les composantes de Télérik, les date/time pickers seront disponibles en 2017 pour Angular2
Ceux que j'ai choisi sont fonctionnels dans mon projet seulement dans google chrome pour l'instant

## Updates:
	installer package npm-check (voir packages outdated, non utilisés) 
1) Updates packages globaux :
	-> npm-check -g
		-nodejs à v6.9.4 
		-npm à 3.10.10
		-typescript (1.8.10 à 2.1.4)
		-typings (1.4.10 à 2.1.0)

2) Updates packages locaux

-Vérifier que la version locale de Ts dans VS code est celle globale
	-> dossier du projet, run : tsc -v
	-> globale : tsc -v -g
	- setter le chemin de tsconfig "typescript.tsdk" dans les preferences/work settings de vs au dossier lib sous 
	./node_modules/typescript/lib

le gulp tool qui compile le Ts (gulp-typescript 3) n'est plus compatible avec typescript 1.x
alors avoir ts 2.x


## Breaking Changes depuis rc5 (rc6) :

Import provide from @angular/core -> deprecated 
	dans @NgModule providers : [ { provide: LocationStrategy useClass: HashLocationStrategy } ]

RouterConfig -> deprecated , use Routes pour déclarer un array de Routes
	const routes : Routes

public/systemjs.config.js -> mapping des packages du module loader systemjs a changé
	utiliser l'extension umd.js au lieu de index.js

gulpfile.js
le package de build du Ts (gulp-typescript) -> upgradé à 3.x (depuis 2.x) compatible seulement avec Ts 2.x (version 1.x dépréciée)
	.pipe(tsconfig()) au lieu de .pipe(gulpTypescript(tsconfig)) (filters enlevés)


## Autheur

Daphné Dargis-Cournoyer
