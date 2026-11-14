import dotenv from "dotenv";

dotenv.config();

const config = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT : process.env.PORT,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
}

export default config;