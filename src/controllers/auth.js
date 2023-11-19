import * as sevices from "../sevices";
import { internalSeverError,notFound } from '../middlewares/handle_error';

export const register = async (req ,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){ return res.status(400).json({
            err :1 ,
            mes : 'Missing payloads'
        })}
        const response = await sevices.register(req.body)

        return res.status(200).json(response)
    } catch (error) {
        return internalSeverError(res)
    }
}


export const login = async (req ,res) => {
    
    try {
        const {email, password} = req.body;
        if(!email || !password){ return res.status(400).json({
            err :1 ,
            mes : 'Missing payloads'
        })}
        const response = await sevices.login(req.body)

        return res.status(200).json(response)
    } catch (error) {
        return internalSeverError(res)
    }
}