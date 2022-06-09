FROM node:12.22.7

WORKDIR /app

COPY package*.json ./

RUN npm install --global knex

RUN yarn install

COPY . .

EXPOSE 3000

# COPY ./startup-server.sh /usr/local/bin/

# RUN chmod +x /usr/local/bin/startup-server.sh
CMD ["yarn", "run", "watch"]
# ENTRYPOINT [ "/usr/local/bin/startup-server.sh" ]