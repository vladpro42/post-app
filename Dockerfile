FROM node:20.1.0-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
    make \
    python3 \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --unsafe-perm

COPY . .

EXPOSE 4444

CMD ["npm", "run", "start:dev"]