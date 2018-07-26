FROM docker.finogeeks.club/public/node:10.7

WORKDIR /usr/src/app

COPY package.json *.lock ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
