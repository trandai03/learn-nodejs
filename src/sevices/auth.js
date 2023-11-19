import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register =  ({email , password}) => new Promise( async (resolve , reject) => {
    try {

        const reponse = await db.User.findOrCreate({
            where:{ email } ,
            defaults: {
                email: email,
                password: hashPassword(password)
            }
            
        })
        const token = reponse[1] ? jwt.sign(
            { 
                id : reponse[0].id , 
                email: reponse[0].email , 
                role_code: reponse[0].role_code
            } ,
            "" +process.env.JWT_SECRET, 
             {expiresIn: '5d'}) : null
        console.log(token)
        resolve({
            err : reponse[1] ? 0 : 1 ,
            mes : reponse[1] ? 'Register success' : 'Email is used',
            'access token ' : `Bearer ${token}`

        })
        resolve({
            err : 0 ,
            mes: "register sevice"
        })
    } catch (error) {
        reject(error)
    }
})


export const login =  ({email , password}) => new Promise( async (resolve , reject) => {
    try {
        
        const response = await db.User.findOne({
            where:{ email } ,
            raw : true
            
        })

        const isChecked = response && bcrypt.compareSync(password, response.password) 
        const token = isChecked ? jwt.sign(
            {
                id: response.id,
                email: response.email ,
                role_code: response.role_code
            },
            "" +process.env.JWT_SECRET, 
             {expiresIn: '5d'}) : null
        
        
        resolve({
            err : token ? 0 : 1 ,
            mes : token ? 'Login success' : response ? ' Password wrong' : 'Email has not been registered',
            'access token ' : token ? `Bearer ${token}` : token 
        })
        resolve({
            err : 0 ,
            mes: "register sevice"
        })
    } catch (error) {
        reject(error)
    }
})