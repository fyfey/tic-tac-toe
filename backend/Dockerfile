FROM node:12

WORKDIR /usr/src
RUN pwd
RUN ls -l
COPY *.js package* tic-tac-toe-1.0.0.tgz ./
COPY src ./src
COPY dist ./dist
RUN pwd
RUN ls -l
RUN npm i
RUN ls -l

CMD node /usr/src/index.js
