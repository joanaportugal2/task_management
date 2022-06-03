const config = {
  SECRET: process.env.SECRET,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
};
// ATLAS URL
config.URL = `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.ycyob.mongodb.net/${config.DB}?retryWrites=true&w=majority`;

module.exports = config;
