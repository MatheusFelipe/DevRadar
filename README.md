# DevRadar
Implementation of Rocketseat's DevRadar, presented in OmniStack Week 10.0

## backend
Implementation of DevRadar's backend with Node.js. Uses `graphql` as middleware and `postgresql` as database.
Install with `npm ci`, run migrations with `npx knex migrate:latest`, start with `npm start` (or `npm run dev` with `nodemon`)

### backend environment variables
```
DB_USER=<postgres db username>
DB_PASSWORD=<postgres db user password>
DB_HOST=<postgres db host>
DB_PORT=<postgres db port>
DB_DATABASE=<postgres db name>
NODE_ENV=<node environment (production, development, test, ...)>
```

## web
Implementation of DevRadar's web page with ReactJS. Install with `npm ci`, start with `npm start`

### web environment variables
```
REACT_APP_API_URI=<backend uri (ex.: http://localhost:4000/graphql)>
```

## mobile
Implementation of DevRadar's mobile application with React Native and Expo. Install with `yarn`, ensures global `expo-cli` install with `yarn global add expo-cli`, add `export PATH="${yarn global bin}:$PATH"` to your `.bashrc` or `.bash_profile`, start with `yarn start`.

### mobile environment variables
```
REACT_APP_API_URI=<tunneled backend uri (ex.: http://192.168.xxx.xxx:4000/graphql)>
```
