//funciones para gestionar token

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export const generateToken = (id, time="2d") => {
    const payload = {user_id: id }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: time})
    return token;
}

export const verifyToken = (token) => {
  try {
    
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    
    return payload;

  } catch (err) {
    console.log(err.message);
    return null; // token inválido o expirado
  }
};


