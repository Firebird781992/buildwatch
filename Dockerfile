FROM node:6.9.2

RUN apt-get update
RUN apt-get -y install sqlite3 libsqlite3-dev

RUN mkdir /var/buildwatch
WORKDIR "/var/buildwatch/"

# Install app dependencies
COPY package.json /var/buildwatch/
RUN npm install

COPY . /var/buildwatch

RUN users


RUN npm install
CMD ["npm", "start"] 