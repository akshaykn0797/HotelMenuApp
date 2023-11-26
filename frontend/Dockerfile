FROM node:16-alpine
WORKDIR /app/frontend
COPY package*.json /app/frontend/
RUN yarn install 
COPY . /app/frontend/
CMD ["yarn", "start"]