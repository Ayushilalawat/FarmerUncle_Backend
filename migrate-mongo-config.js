// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: "mongodb://localhost:27017/farmer",

    options: {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }
  },

 
  migrationsDir: "migrations",


  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
