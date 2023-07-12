FROM node:18.16

COPY . /app
WORKDIR /app

RUN npm install && \
    npm run build

ENV NEXT_PUBLIC_API_URL="http://mai-backend.stickinteractive.com"

EXPOSE 3000

CMD ["npm", "run", "start"]
