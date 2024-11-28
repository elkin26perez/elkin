config()
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { config } from 'dotenv'
import { refreshSecret, tokenSecret } from '../config.js'

export const createToken = (user) => {
  console.log(refreshSecret);
  console.log(tokenSecret);
  
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
  }
  return jwt.sign(payload, tokenSecret, {expiresIn:"1d"})
}


export const createRefreshToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
  }
  return jwt.sign(payload, refreshSecret, {expiresIn:"1d"})
}