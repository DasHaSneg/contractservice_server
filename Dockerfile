FROM node:12.22.7

ARG DB_HOST

WORKDIR /app

COPY package*.json ./
# COPY ./ /app/

RUN npm install --global knex

RUN yarn install

COPY . .

EXPOSE 3000

# COPY ./startup-server.sh /usr/local/bin/

# RUN chmod +x /usr/local/bin/startup-server.sh
CMD ["yarn", "run", "watch"]
# ENTRYPOINT [ "/usr/local/bin/startup-server.sh" ]