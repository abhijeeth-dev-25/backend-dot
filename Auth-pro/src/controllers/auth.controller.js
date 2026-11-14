import mongoose from 'mongoose';
import UserModel from '../models/auth.model.js';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from '../utils/auth.js';
import bcrypt from 'bcrypt'

export const userRegisterContoller = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            error: "Bad Request"
        });
    }

    const userfound = await UserModel.findOne({email});

    if(userfound){
        return res.status(400).json({
            success : false,
            message : 'User already exists',
            error : 'Bad Request'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        fullname,
        email,
        password : hashPassword,
    })

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly : true })


    return res.status(201).json({
        success : true,
        message : 'User registered successfully',
        error : null,
        data : {
            user,
            accessToken
        }
    })
}

export const userGetDataContoller = async (req, res) => {

    try {

        const accessToken = req.headers.token.split(' ')[1];

         console.log(accessToken)

         if(!accessToken){
            return res.status(401).json({
                success : false,
                message : 'Token not found',
                error : 'Unauthorized'
            })
        }

        const decodedToken = verifyAccessToken(accessToken);

        const user = await UserModel.findById(decodedToken.id);

        return res.status(200).json({   
            success : true,
            message : 'User data fetched successfully',
            error : null,
            data : user
        })

        
    } catch (error) {

        return res.status(401).json({
            success : false,
            message : 'Invalid token',
            error : 'Unauthorized'
        })
        
    }

}

export const refreshTokenController = async (req, res) => {

    try {

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            success: false,
            message: 'Refresh token not found',
            error: 'Unauthorized'
        })
    }
        const decodedToken = verifyRefreshToken(refreshToken);

    if(!decodedToken){
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: 'Unauthorized'
        })
    }

    const user = await UserModel.findById(decodedToken.id);

    if(refreshToken !== user.refreshToken){

        user.refreshToken = null;
        await user.save();

        return res.status(401).json({
            success : false,
            message : "Refresh Token Mismatch",
            error : "Unauthorized"
        })
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, { httpOnly : true});


    return res.status(200).json({
        success : true,
        message : 'Token refreshed successfully',
        error : null,
        data : {
            user,
            accessToken
        }
    })
        
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Invalid Token or expire refresh token",
            error : "Unauthorized"
        })
    }
}

