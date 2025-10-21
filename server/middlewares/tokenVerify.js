import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const tokenVerify = (req, res, next) => {
    const tokenBeared = req.headers.authorization;
    
    if(!tokenBeared){
         return res.status(401).json({message: "No autorizado, no hay token"});
    }else{
        // comprobar si el token es válido
        const token = tokenBeared.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, result)=>{
            if(err){
                return res.status(401).json({message: "No autorizado"});
            }else{
               req.user_id = result.user_id;
               next();
            }
        })
    }
}

