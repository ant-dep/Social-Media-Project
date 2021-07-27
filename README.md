Projet 7 du parcours Développeur Web OC
Créer un réseau social d'entreprise

Technologies utilisées:

-> Vue JS avec Booststrap
-> Node JS avec Express, Sequelize
-> MySQL avec Workbench, MAMP et DBeaver

####  FRONTEND  ####

Sur le dossier Groupomania avec un terminal:
    npm install
    npm run serve

####  BACKEND  ####

Sur le dossier backend avec un autre terminal:
    npm install
    nodemon server

####  MYSQL  ####

Utiliser un serveur de Base de Données type MAMP/XAMPP
Utiliser Workbench pour visualiser et lier les modèles de tables
Créer les 3 bases de données nécessaires :
    -> groupomania_test / groupomania_developement / groupomania_production

Utiliser Sequelize pour créer les tables directement via Node.JS
    -> sequelize db:create
    -> sequelize db:migrate


Contenu du dossier .env pour la connexion MYSQL:
DB_HOST= 'localhost',
DB_USERNAME= 'root',
DB_PASS= 'root'
