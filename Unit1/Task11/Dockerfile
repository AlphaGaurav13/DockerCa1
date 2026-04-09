FROM node:18-alpine 
# this is good to have light weight image rather then installing the whole Node image

WORKDIR /app


COPY package.json package-lock.json ./
# through these commands if the code is change but the dependencies remain same then package will not reinstall

RUN npm install --production


COPY . .

EXPOSE 3000

CMD ['node', "server.js"]