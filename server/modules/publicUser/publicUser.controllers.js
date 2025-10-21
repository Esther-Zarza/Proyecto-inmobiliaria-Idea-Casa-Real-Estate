import { formularioContactoSchema } from '../../../client/src/schemas/contactSchemas.js';
import { loginSchema } from '../../../client/src/schemas/loginSchemas.js';
import z, { ZodError } from 'zod';
import { compareString } from '../../utils/hashUtils.js';
import { generateToken } from '../../utils/tokenUtils.js';
import publicUserDal from './publicUser.dal.js';
import adminDal from "../admin/admin.dal.js";

import { sendMailContact } from '../../services/sendMailContact.js';
import { sendNewAssesmentMail, sendNewPasswordMail } from '../../services/sendMail.js';
import { addAssessmentSchemas } from '../../schemas/AddAssessmentSchemas.js';


class PublicUserControllers {
  // login
  login = async (req, res) => {
    
    try {
      const validateLogin = loginSchema.parse(req.body);
      const { email, password } = req.body;
      const result = await publicUserDal.findUserByEmail(email);
      if (result.length === 0) {
        res.status(401).json({ message: 'Email no registrado' });
      } else if (result[0].is_confirmed === 0) {
        res.status(401).json({ message: 'La cuenta no ha sido confirmada' });
      }else if (result[0].is_deleted === 1 || result[0].is_disabled === 1) {
        res.status(401).json({ message: 'La cuenta ha sido borrada' });
      } else {
        const match = await compareString(password, result[0].password);
        if (!match) {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        } else {
          const token = generateToken(result[0].user_id);
          res.status(200).json({ token });
        }
      }
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: 'error de server',
        dataError: error,
      });
    }
  };

  //Trae los datos de un usuario según el id que trae el token

  getUserByToken = async (req, res) => {
    try {
      const { user_id } = req;
      const result = await publicUserDal.findUserById(user_id);

      res.status(200).json({ user: result[0] });
      
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: 'error de server',
        dataError: error,
      });
    }
  };

  contactmail = async (req, res) => {
    try {
      
      //validaciones
      const validateContact = formularioContactoSchema.parse(req.body);


     sendMailContact(req.body);

      res.status(200).json({ message: 'correo enviado' });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'validaciones en el back no validas' });
      } else {
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
  };

  addAssessment = async(req,res) => {    
    try {
      // validaciones
      const validateAddAssessment = addAssessmentSchemas.parse(req.body);

      // mandar email con datos
      sendNewAssesmentMail(req.body)


      res.status(200).json({message: 'correo enviado'});

    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return res.status(400).json({
          message: 'Datos introducidos inválidos',
          errors: error.errors,
        });
      } else {
        console.log(error);
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
  };

  newPassword = async (req, res) => {
    const { email } = req.body;
    

    try {
      const user = await publicUserDal.findIdByEmail(email);
     
      const user_id = user[0].user_id;

      const hashedData = generateToken(user_id, '15m');

      sendNewPasswordMail(email, hashedData);

      res.status(200).json({ message: 'mail mandado', complete: true });

    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  getProperties = async(req, res) => {
    try {
      const properties = await publicUserDal.getProperties();
      
      res.status(200).json({properties: properties});

    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Error de server", dataError: error});
    }
  }

  getPropertiesHome = async(req, res) => {
    try {
      const propertiesHome = await publicUserDal.getPropertiesHome();

      res.status(200).json({properties: propertiesHome});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Error de server", dataError: error});
    }
  }

  getPropertiesHighlights = async(req, res) => {
    try {
      const propertiesHighlights = await publicUserDal.getPropertiesHighlights();

      res.status(200).json({properties: propertiesHighlights});

    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Error de server", dataError: error});
    }
  }

  getPropertyById = async(req, res) => {
    const {property_id} = req.params;
    

    try {
      const property = await publicUserDal.getPropertyById(property_id);
      
      res.status(200).json({property: property});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Error de server", dataError: error});
    }
  }
  // <<<<<<<<<<<<<<< EQUIPAMIENTOS >>>>>>>>>>>>>>>>>
    getEquipment = async (req, res) => {
      try {
        const { property_id } = req.params;
        const rows = await adminDal.getEquipment(property_id);
        res.status(200).json({ equipment: rows[0] ?? null });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    };
}

export default new PublicUserControllers();
