FROM node:22
# set the working directory inside the container
WORKDIR /app
# copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./
# install dependencies
RUN npm ci
# copy the rest of the application code
COPY . .
# run healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "npm", "run", "healthcheck" ]

CMD ["npm", "start"]