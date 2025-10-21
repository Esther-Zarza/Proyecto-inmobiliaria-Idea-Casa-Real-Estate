import { email } from "zod";
import userDal from "./user.dal.js";
import { hashString } from "../../utils/hashUtils.js";
import { sendNewPasswordMail } from "../../services/sendMail.js";
import { generateToken, verifyToken } from "../../utils/tokenUtils.js";

class UserControllers{

  newPassword = async(req, res) => {
    const { user_id } = req;

    try {
      const user = await userDal.findEmailById(user_id);
  
      const email = user[0].email;  
     
      const hashedData = generateToken(user_id); // quitado "15m"
  
      sendNewPasswordMail(email, hashedData);
  
      res.status(200).json({message: "mail mandado", complete: true});
      
    } catch (error) {
      res.status(500).json({message:"Error de server", dataError: error});
    }

  };

  changePassword = async(req, res) => {
    const [params, changePasswordForm] = req.body;
    
    const {token} = params;
    const {password} = changePasswordForm;

    //saco el id del token
    let user_id = verifyToken(token);
    

    //encripto la nueva contraseña
    const hashedPass = await hashString(password);

    //cambio la contraseña
    await userDal.changePassword(hashedPass, user_id.user_id);

    res.status(200).json({message: "contraseña cambiada"});
  }

  getProperties = async(req, res) => {
    try {
      const properties = await userDal.getProperties();
      
      res.status(200).json({properties: properties});

    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Error de server", dataError: error});
    }
  }

  getMyproperties = async (req, res)=> {
    const { user_id} = req.params;

      try {
        const getMyproperties = await userDal.getMyproperties( user_id);
  
       return  res.status(200).json({getMyproperties});
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error de server', dataError: error });
      }
    }
}

export default new UserControllers();