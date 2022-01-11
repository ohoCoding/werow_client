FROM node:14-alpine

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
#COPY package.json /app/package.json
COPY . /app
RUN npm install --global yarn
RUN yarn
#RUN npm install react-scripts@4.0.3 -g --silent

# 소스를 작업폴더로 복사하고 앱 실행

CMD ["npm", "start"]
