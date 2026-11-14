import jwt from 'jsonwebtoken';
import config from '../config/config.js'

export const generateTokens = ( userId ) => {
       const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
       const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

       return { accessToken, refreshToken }
}

export const verifyAccessToken = (token) => {

    console.log(token)

    const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);


    console.log(decodedToken)

    return decodedToken;

}

export const verifyRefreshToken = (token) => {

    const decodedToken = jwt.verify(token, config.REFRESH_TOKEN_SECRET)

    return decodedToken;

}