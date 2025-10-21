import express from 'express';
import adminController from './admin.controller.js';
import { tokenVerify } from '../../middlewares/tokenVerify.js';
import uploadImage from '../../middlewares/multerMultiple.js';

const router = express.Router();

//entrada: http://localhost:4010/api/admin

//http://localhost:4010/api/admin/addUser
// ---- falta el tokenVerify para comprobar que es admin -----
router.post("/addUser", adminController.addUser);

//http://localhost:4010/api/admin/editProfileAdmin
router.put('/editProfileAdmin',tokenVerify, adminController.editProfileAdmin);

//http://localhost:4010/api/admin/addEstate
router.post("/addEstate", tokenVerify, adminController.addEstate);

//http://localhost:4010/api/admin/getPrincipal/:property_id
router.get("/getPrincipal/:property_id", tokenVerify, adminController.getPrincipal);

//http://localhost:4010/api/admin/editPrincipal/:property_id
router.put("/editPrincipal/:property_id", tokenVerify, adminController.editPrincipal);

//http://localhost:4010/api/admin/getAddress/:property_id
router.get("/getAddress/:property_id", tokenVerify, adminController.getAddressById);

//http://localhost:4010/api/admin/editAddress/:property_id
router.put("/editAddress/:property_id", tokenVerify, adminController.editAddress);

//http://localhost:4010/api/admin/getServices/:property_id
router.get("/getServices/:property_id", tokenVerify, adminController.getServices);

//http://localhost:4010/api/admin/createServices/:property_id
router.post("/createServices/:property_id", tokenVerify, adminController.createServices);

//http://localhost:4010/api/admin/editServices/:property_id
router.put("/editServices/:property_id", tokenVerify, adminController.editServices);

//http://localhost:4010/api/admin/getClassification:property_id
router.get("/getClassification/:property_id", tokenVerify, adminController.getClassificationById);

//http://localhost:4010/api/admin/createClassification/:property_id
router.post("/createClassification/:property_id", tokenVerify, adminController.createClassification);

//http://localhost:4010/api/admin/editClassification/:property_id
router.put("/editClassification/:property_id", tokenVerify, adminController.editClassification);

//http://localhost:4010/api/admin/allProperties
router.get("/allProperties", tokenVerify, adminController.allProperties);

//http://localhost:4010/api/admin/allAppraisals
router.get("/allAppraisals", tokenVerify, adminController.allAppraisals);

//http://localhost:4010/api/admin/editPropertyStatus/:property_id
router.put("/editPropertyStatus/:property_id", tokenVerify, adminController.editPropertyStatus);

//http://localhost:4010/api/admin/editPropertyStatus/:property_id
router.put("/editAppraisalStatus/:property_id", tokenVerify, adminController.editAppraisalStatus);

//http://localhost:4010/api/admin/getDates/:property_id
router.get("/getDates/:property_id", tokenVerify, adminController.getDates);

//http://localhost:4010/api/admin/infoVivienda/:property_id
router.get("/infoVivienda/:property_id", tokenVerify, adminController.getPropertyById);

//http://localhost:4010/api/admin/getEnvironment:property_id
router.get("/getEnvironment/:property_id", tokenVerify, adminController.getEnvironment);

//http://localhost:4010/api/admin/createEnvironment:property_id
router.post("/createEnvironment/:property_id", tokenVerify, adminController.createEnvironment);

//http://localhost:4010/api/admin/editEnvironment:property_id
router.put("/editEnvironment/:property_id", tokenVerify, adminController.editEnvironment);

//http://localhost:4010/api/admin/getUsers
router.post("/getUsers", adminController.getUsers);

//http://localhost:4010/api/admin/disableUser
router.put("/disableUser", tokenVerify, adminController.disableUser);

//http://localhost:4010/api/admin/enableUser
router.put("/enableUser", tokenVerify, adminController.enableUser);

//http://localhost:4010/api/admin/confirmUser
router.put("/confirmUser", tokenVerify, adminController.confirmUser);

// Equipamientos
router.get("/getEquipment/:property_id", tokenVerify, adminController.getEquipment);
router.post("/createEquipment/:property_id", tokenVerify, adminController.createEquipment);
router.put("/editEquipment/:property_id", tokenVerify, adminController.editEquipment);

//http://localhost:4010/api/admin/getCollaborators
router.get("/getCollaborators/:property_id", tokenVerify, adminController.getCollaborators);

//http://localhost:4010/api/admin/deleteCollaborators
router.delete('/deleteCollaborators/:property_id/:user_id', tokenVerify, adminController.deleteCollaborator)

//http://localhost:4010/api/admin/selectedCollaborator
router.post('/selectedCollaborator/:property_id/:user_id', tokenVerify, adminController.selectedCollaborator);

//http://localhost:4010/api/admin/filterNameCollaborator
router.get('/filterNameCollaborator', tokenVerify, adminController.filterNameCollaborator);

//http://localhost:4010/api/admin/getFiles/:property_id
router.get("/getFiles/:property_id", adminController.getFiles);

//http://localhost:4010/api/admin/getFile/:property_id
router.get("/getFile/:property_id", adminController.getFile);

//http://localhost:4010/api/admin/postImg/:property_id
router.post("/postImg/:property_id", tokenVerify, uploadImage("propiedades"),adminController.postImg);

//http://localhost:4010/api/admin/delImg
router.post("/delImg", tokenVerify, adminController.delImg);



export default router;