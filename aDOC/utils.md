<!-- install NVM -->

https://www.youtube.com/watch?v=w_RIcUZspBI

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

<!-- lignes à ajouter dans ".zshrc" : -->
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0


nvm install 20
nvm use 20



*******************************************
Ces commandes doivent être faites dans le dossier qui contient le package.json du backend :

npm init -y
npm install typeorm reflect-metadata pg
npm install -D ts-node typescript


npm install express
npm install -D @types/express
