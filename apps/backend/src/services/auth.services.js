import {Song, User} from '../models/index.js';
import bcrypt from 'bcrypt';
export const login =()=>{

}

export const register=async(userData)=>{
    const usedEmail = await findByEmail(userData?.email)
    const password = await bcrypt.hash(userData?.password, 10)
    const newUser = await User.create({
        ...userData,
        password
    })
    delete newUser.dataValues.password
    return newUser
}

export const findByEmail=async (email)=>{
    return await User.findOne({where: {email}})
}

