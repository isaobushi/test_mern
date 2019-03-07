# FROM node:alpine
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# CMD ["npm","run","dev"]

FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]