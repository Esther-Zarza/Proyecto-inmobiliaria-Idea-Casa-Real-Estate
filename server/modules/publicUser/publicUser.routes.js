import express from 'express';
import publicUserControllers from './publicUser.controllers.js';
import { tokenVerify } from '../../middlewares/tokenVerify.js';

const router = express.Router();

//entrada: http://localhost:4010/api/

//http://localhost:4010/api/login
router.post('/login', publicUserControllers.login);

//Trae los datos de un usuario en función del id que trae el token
//http://localhost:4010/api/getUserByToken
router.get('/getUserByToken', tokenVerify, publicUserControllers.getUserByToken);

//Formulario de contacto
router.post('/contact', publicUserControllers.contactmail);

//http://localhost:4010/api/newPassword
router.post("/newPassword", publicUserControllers.newPassword);


//entrada: http://localhost:4010/api/addAssessment
router.post("/addAssessment", publicUserControllers.addAssessment);

//http://localhost:4010/api/allProperties
router.get("/getProperties", publicUserControllers.getProperties);

//http://localhost:4010/api/getPropertiesHome
router.get("/getPropertiesHome", publicUserControllers.getPropertiesHome);

//http://localhost:4010/api/getPropertiesHighlights
router.get("/getPropertiesHighlights", publicUserControllers.getPropertiesHighlights);

//http://localhost:4010/api/admin/getPropertyById/:property_id
router.get("/getPropertyById/:property_id", publicUserControllers.getPropertyById);


router.get("/getEquipment/:property_id", publicUserControllers.getEquipment);
export default router;