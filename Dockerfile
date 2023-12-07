# Étape de construction
FROM node:alpine as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN npm run build

# Supprimer les fichiers inutiles
RUN rm -rf node_modules && \
    npm prune --production && \
    npm cache clean --force

# Étape de production
FROM node:alpine
WORKDIR /usr/src/app

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Ajouter le chemin d'exécution de node_modules/.bin à $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Exposer le port sur lequel l'application écoute
EXPOSE ${LISTEN_PORT}

# Commande de démarrage
CMD ["node", "dist/main.js"]
