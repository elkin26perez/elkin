import { config } from "dotenv"

config()


export const tokenSecret = process.env.SECRET_KEY_JWT
export const refreshSecret = process.env.SECRET_KEY_JWT_REFRESH