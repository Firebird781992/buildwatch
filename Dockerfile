FROM ruby:2.3.3

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs

RUN mkdir /buildwatch
WORKDIR /buildwatch

COPY Gemfile /buildwatch/Gemfile

COPY package.json /buildwatch/package.json

RUN gem install bundler
RUN bundle install
RUN npm install
COPY . /buildwatch

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Launch servers
CMD ["bash", "-c", "./server_start.sh"] 