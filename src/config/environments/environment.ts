export default {
    PORT: process.env.PORT || 4000,
    DB: {
        MONGO_DB: process.env.MONGO_DB || ''
    },
    JWT_SECRET: process.env.JWT_SECRET || 'ASD',
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD
}