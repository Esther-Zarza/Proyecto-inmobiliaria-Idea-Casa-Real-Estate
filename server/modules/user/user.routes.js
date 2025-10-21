import express from 'express';
import userControllers from './user.controllers.js';
import { tokenVerify } from '../../middlewares/tokenVerify.js';

const router = express.Router();

//entrada: http://localhost:4010/api/user

//http://localhost:4010/api/user/newPassword
// ---- falta el tokenVerify para comprobar que es user -----
router.get("/newPassword", tokenVerify, userControllers.newPassword);

//http://localhost:4010/api/user/changePassword/:token
router.put("/changePassword", userControllers.changePassword);

//http://localhost:4010/api/user/allProperties
router.get("/getProperties", tokenVerify, userControllers.getProperties);

//http://localhost:4010/api/user/getMyproperties/:user_id
router.get('/getMyproperties/:user_id',tokenVerify, userControllers.getMyproperties )

export default router;