import z, { ZodError } from 'zod';
import { addUserSchema } from '../../schemas/AddUserSchemas.js';
import { hashString } from '../../utils/hashUtils.js';
import { generateRandomPass, randomPass } from '../../utils/randomPassUtil.js';
import adminDal from './admin.dal.js';
import { sendNewUSerMail } from '../../services/sendMail.js';
import { editAddressSchema } from '../../schemas/formEditStateSchemas/editAddressSchema.js';
import { editProfileSchemas } from '../../schemas/editProfileSchemas.js';
import { editEquipmentSchema } from '../../schemas/formEditStateSchemas/editEquipmentSchema.js';
import { EditEnvironmentSchemas } from '../../schemas/formEditStateSchemas/EditEnvironmentSchemas.js';
import { editServicesSchema } from '../../schemas/formEditStateSchemas/editServicesSchema.js';
import { editClassificationSchema } from '../../schemas/formEditStateSchemas/editClassificationSchema.js';
import { addEstateSchema } from '../../schemas/formEditStateSchemas/addEstateSchema.js';
import deleteFile from '../../utils/fileSystemUtils.js';

class AdminController {
  addUser = async (req, res) => {
    const { name, email, userType } = req.body;

    try {
      //validaciones
      const validateAddUser = addUserSchema.parse(req.body);

      const emailInUse = await adminDal.emailInUse(req.body.email);
      
      if(emailInUse.length > 0){
        return res.status(400).json({message: "El email ya esta en uso"});
        
      } else {
        //const newPassword = randomPass();
        const newPassword = generateRandomPass();

        const hashedPass = await hashString(newPassword);
        let data = [name, email, hashedPass, userType];

        //mandamos los datos a la base de datos
        await adminDal.addUser(data);

        sendNewUSerMail(name, email, newPassword);

        res.status(200).json({ message: 'usuario agregado' });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'validaciones en el back no validas' });
      } else {
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
  };

  //editar perfil
  editProfileAdmin = async (req, res) => {
    try {
      //validaciones
      const validateEditProfile = editProfileSchemas.parse(req.body);

      const { user_name, user_last_name, user_phone, user_dni, cif, user_id } =
        req.body;
      

      let values = [
        user_name,
        user_last_name,
        user_phone,
        user_dni,
        cif,
        user_id,
      ];

      await adminDal.editProfile(values);

      res.status(200).json({ message: 'edit ok' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'validaciones en el back no validas' });
      } else {
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
  };

  // añadir propiedad
  addEstate = async (req, res) => {
    
    try {
      // validaciones
      const validateAddEstate = addEstateSchema.parse(req.body);

      // mandar al back
      await adminDal.addEstate(validateAddEstate);

      res.status(200).json({ message: 'create ok' });
    } catch (error) {
      if (error instanceof ZodError) {
        
        return res.status(400).json({
          message: 'Datos introducidos inválidos',
          errors: error.errors,
        });
      } else {        
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
  };

  // obtener datos form principal para edición
  getPrincipal = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      if (!property_id) {
        return res
          .status(404)
          .json({ message: 'No se encuentra la propiedad' });
      }

      const principal = await adminDal.getPrincipal(property_id);

      if (!principal) {
        return res.status(404).json({ message: 'No se encuentra principal' });
      }
      return res.status(200).json({ principal: principal });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  // editar form Principal (PUT)
  editPrincipal = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      //validaciones
      const validateEditPrincipal = addEstateSchema.parse(req.body);

      //mandar al back
      let dataUpdate = { ...validateEditPrincipal, property_id };
      await adminDal.editPrincipal(dataUpdate);

      
      res.status(200).json({ message: 'edit principal ok' });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return res.status(400).json({
          message: 'Datos introducidos inválidos',
          dataError: error.errors,
        });
      } else {
        console.log(error);
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
  };

  // obtener datos dirección para edición
  getAddressById = async (req, res) => {
    const { property_id } = req.params;

    try {
      if (!property_id) {
        return res
          .status(404)
          .json({ message: 'No se encuentra la propiedad' });
      }

      const address = await adminDal.getAddress(property_id);

      if (!address) {
        return res.status(404).json({ message: 'No se encuentra dirección' });
      }
      return res.status(200).json({ address: address });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  // editar dirección (PUT)
  editAddress = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      //validaciones
      const validateEditAddress = editAddressSchema.parse(req.body);

      //mandar al back
      let dataUpdate = { ...validateEditAddress, property_id };
      await adminDal.editAddress(dataUpdate);

      res.status(200).json({ message: 'edit address ok' });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return res.status(400).json({
          message: 'Datos introducidos inválidos',
          dataError: error.errors,
        });
      } else {
        if (error instanceof ZodError) {
          return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
        }else{
          console.log(error);
          res.status(500).json({ message: "Error de server", dataError: error });
        }
      }
    }
  };

  // obtener datos de clasificación para edición

  getClassificationById = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      if (!property_id) {
        return res.status(404).json({ message: 'No se encuentra la propiedad' });
      }

      const classification = await adminDal.getClassification(property_id);

      if (!classification) {
        return res
          .status(404)
          .json({ message: 'No se encuentra clasificación' });
      }
      return res.status(200).json({ classification: classification });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  createClassification = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      //validaciones
      const validateEditClassification = editClassificationSchema.parse(
        req.body
      );

      //mandar al back
      let dataInsert = { ...validateEditClassification, property_id };
      await adminDal.createClassification(dataInsert);
      res.status(200).json({ message: 'clasificación creada' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  };

  editClassification = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      //validaciones
      const validateEditClassification = editClassificationSchema.parse(
        req.body
      );

      //mandar al back
      let dataUpdate = { ...validateEditClassification, property_id };
      await adminDal.editClassification(dataUpdate);
      res.status(200).json({ message: 'Classification actualizada' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  };

  getServices = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      if (!property_id) {
        return res.status(404).json({ message: 'No se encuentra la propiedad' });
      }

      const services = await adminDal.getServices(property_id);
      return res.status(200).json({ services: services });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  createServices = async (req, res) => {
    const { property_id } = req.params;
    

    try {
      //validaciones
      const validateEditServices = editServicesSchema.parse(req.body);

      //mandar al back
      let dataInsert = { ...validateEditServices, property_id };
      await adminDal.createServices(dataInsert);
      res.status(200).json({ message: 'Services creado' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  };

  editServices = async (req, res) => {
    const { property_id } = req.params;
    

    try {
      //validaciones
      const validateEditServices = editServicesSchema.parse(req.body);

      //mandar al back
      let dataUpdate = { ...validateEditServices, property_id };
      await adminDal.editServices(dataUpdate);
      res.status(200).json({ message: 'Services actualizado' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  };


  allProperties = async (req, res) => {
    try {
      const {page = 1, limit = 10, ...filtros} = req.query;

      const result = await adminDal.allProperties(page, limit, filtros);
      

      res.status(200).json({
        properties: result.properties,
        pagination: result.pagination
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  allAppraisals = async (req, res) => {
    try {
      const {page = 1, limit = 10, ...filtros} = req.query;
      
      const result = await adminDal.allAppraisals(page, limit, filtros);
      

      res.status(200).json({
        appraisals: result.appraisals,
        pagination: result.pagination
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  getPropertyById = async (req, res) => {
    const { property_id } = req.params;

    try {
      const property = await adminDal.getPropertyById();
      
      res.status(200).json({ property: property });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  editPropertyStatus = async (req, res) => {
    const {property_id} = req.params;
    const {is_public, is_disabled, is_reserved} = req.body;
    

    try {
      if (typeof is_public !== 'boolean' || typeof is_disabled !== 'boolean' || typeof is_reserved !== 'boolean') {
        return res.status(400).json({ message: 'no llegan los checkbox como boolean'});
      }else{
        let dataUpdate = {is_public, is_disabled, is_reserved, property_id};
        await adminDal.editPropertyStatus(dataUpdate);
        res.status(200).json({mmessage: 'Status actualizado'});

      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  editAppraisalStatus = async (req, res) => {
    const {property_id} = req.params;
    const {is_disabled} = req.body;
    

    try {
      if (typeof is_disabled !== 'boolean') {
        return res.status(400).json({ message: 'no llega el checkbox como boolean'});
      }else{
        let dataUpdate = {is_disabled, property_id};
        await adminDal.editAppraisalStatus(dataUpdate);
        res.status(200).json({mmessage: 'Status actualizado'});

      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  getDates = async (req, res) => {
    const {property_id} = req.params;

    try {
      const dates = await adminDal.getDates(property_id);
      console.log(dates);
      res.status(200).json({ dates: dates });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  getEnvironment = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      if (!property_id) {
        return res
          .status(404)
          .json({ message: 'no se encuentra la propiedad seleccionada' });
      }
      const environment = await adminDal.getEnvironment(property_id);
      return res.status(200).json({ environment: environment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error del server', dataError: error });
    }
  };

  createEnvironment = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      //validaciones
      const validateEditEnvironment = EditEnvironmentSchemas.parse(req.body);

      //mandar al back
      let dataInsert = { ...validateEditEnvironment, property_id };
      await adminDal.createEnvironment(dataInsert);
      res.status(200).json({ message: 'Environment creado' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  };

  editEnvironment = async (req, res) => {
    const { property_id } = req.params;
    
    try {
      const validateEditEnvironment = EditEnvironmentSchemas.parse(req.body);
      let dataUpdate = { ...validateEditEnvironment, property_id };
      await adminDal.editEnvironment(dataUpdate);

      res.status(200).json({ message: 'edit environment ok' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await adminDal.getUsers(req.body);
      const pages = (Math.floor((users.result0[0][0].total / (req.body.limitUser + 1))) + 1);

        res.status(200).json({ users: users.result, pages});
        
      } catch (error) {
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    };

    disableUser = async (req, res) => {
      try {
        const { user_id } = req.body;

        adminDal.disableUser(user_id);

        res
          .status(200)
          .json({ message: 'usuario deshabilitado', is_disabled: 1 });
      } catch (error) {
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    };

    enableUser = async (req, res) => {
      try {
        const { user_id } = req.body;        

        adminDal.enableUser(user_id);

        res.status(200).json({ message: 'usuario habilitado', is_disabled: 0 });
      } catch (error) {
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    };

    confirmUser = async (req, res) => {
      try {
        const { user_id } = req.body;

        adminDal.confirmUser(user_id);

      res.status(200).json({message:"usuario confirmado", is_confirmed:1});
      
    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  
  getEquipment = async (req, res) => {
    try {
      const { property_id } = req.params;
      const equipment = await adminDal.getEquipment(property_id);
      res.status(200).json({ equipment: equipment});

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  createEquipment = async (req, res) => {
    const {property_id} = req.params;
    
    try {
      //validaciones
      const validateEditEquipment = editEquipmentSchema.parse(req.body);
      const data = Object.fromEntries(
        Object.keys(editEquipmentSchema.shape).map(k => [k, !!validateEditEquipment[k]])
      );

      //mandar al back
      let dataInsert = {...data, property_id};
      await adminDal.createEquipment(dataInsert);
      res.status(200).json({message: 'create equipamiento OK'});
      
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }else{
        console.log(error);
        res.status(500).json({ message: "Error de server", dataError: error });
      }
    }
  }

  editEquipment = async (req, res) => {
    const { property_id } = req.params;

    try {
      //validaciones
      const validateEditEquipment = editEquipmentSchema.parse(req.body);
      const data = Object.fromEntries(
        Object.keys(editEquipmentSchema.shape).map(k => [k, !!validateEditEquipment[k]])
      );

      //mandar al back
      let dataUpdate = {...data, property_id};
      await adminDal.editEquipment(dataUpdate);
      res.status(200).json({ message: "edit equipment ok" });

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", dataError: error.errors });
      }
      console.log(error);
      res.status(500).json({ message: "Error de server", dataError: error });
    }
  }

  getCollaborators = async (req, res) => {
    const { property_id } = req.params;
    try {
      const collaborators = await adminDal.getCollaborators(property_id);

      res.status(200).json({ collaborators });
    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  deleteCollaborator = async (req, res) => {
    const { property_id, user_id } = req.params;
    try {
      const deleteCollaborator = await adminDal.deleteCollaborator(
        property_id,
        user_id
      );
      res.status(200).json({ deleteCollaborator });
    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  selectedCollaborator = async (req, res) => {
    const { property_id, user_id } = req.params;

    const selectedCollaborator = await adminDal.selectedCollaborator(
      property_id,
      user_id
    );

    try {
      res.status(200).json({ selectedCollaborator });
    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  filterNameCollaborator = async (req, res) => {
    try {
      const filterNameCollaborator = await adminDal.filterNameCollaborator(req.body);
      res.status(200).json({ filterNameCollaborator });
    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  };

  getFiles = async(req, res) => {
    const { property_id } = req.params;

    try {
      if (!property_id) {
        return res
          .status(404)
          .json({ message: 'No se encuentra la propiedad' });
      }

      const files = await adminDal.getFiles(property_id);

      if (!files) {
        return res.status(404).json({ message: 'No se encuentran archivos' });
      }
      
      return res.status(200).json({ files });

    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  getFile = async(req, res) => {
    const { property_id } = req.params;

    try {
      if (!property_id) {
        return res
          .status(404)
          .json({ message: 'No se encuentra la propiedad' });
      }

      const file = await adminDal.getFile(property_id);

      if (!file) {
        return res.status(404).json({ message: 'No se encuentran archivos' });
      }
      
      return res.status(200).json({ file });

    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  postImg = async(req, res) => {
    const { property_id } = req.params;
    const {file_type, admin_file} = req.body;
   

    if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No se subieron imágenes" });
    }
  
    try {
      await adminDal.addImages(req.files, property_id, file_type, admin_file);
      
      return res.status(200).json({ message:"funciona" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  delImg = async(req,res) => {
    const { file_id, property_id, filename } = req.body;

    try {
      await adminDal.delImg(file_id, property_id);

      await deleteFile(filename, "propiedades");

      return res.status(200).json({ message:"imagen eliminada" });

    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

}

export default new AdminController();
