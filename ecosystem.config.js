module.exports = {
  apps : [
      {
        name: "myapp",
        script: "./dist/index.js",
        watch: true,
        env: {
            "PORT": 5000,
            "NODE_ENV": "development",
            "MONGO_DB": "mongodb+srv://jacksari:Shingekino123@cluster0.nclr5.mongodb.net/schooling",
            "JWT_SECRET": "JWT_SECRET",
            "USER_EMAIL": "asd",
            "USER_PASSWORD": "asd"
        },
        env_production: {
            "PORT": 5000,
            "NODE_ENV": "production",
            "MONGO_DB": "mongodb+srv://jacksari:Shingekino123@cluster0.nclr5.mongodb.net/schooling",
            "JWT_SECRET": "JWT_SECRET",
            "USER_EMAIL": "asd",
            "USER_PASSWORD": "asd"
        }
      }
  ]
}
