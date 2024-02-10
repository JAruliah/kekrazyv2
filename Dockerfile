FROM node:16-slim

#Set the working directory
WORKDIR /app

#Copy the rest of the files to the working directory
COPY . /app

#install openssl for prisma
RUN apt-get update -y \
  && apt-get install -y openssl

#Install the dependencies
RUN npm install

#Generate the Prisma Client
RUN npx prisma generate

#create the build
RUN npm run build

CMD ["npm", "run", "start"]