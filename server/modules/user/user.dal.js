import executeQuery, {dbPool} from "../../config/db.js";

class UserDal{

  findEmailById = async (id) => {
    try {
      let sql = 'SELECT email FROM user WHERE user_id =?';
      const result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  changePassword = async(password, id) => {
    try {
      let sql = "UPDATE user SET password = ? WHERE user_id = ?"
      const result = await executeQuery(sql, [password, id])

    } catch (error) {
      throw error;
    }
  }

  getProperties = async() => {
    try {
      let sql = `SELECT * FROM property WHERE
                  WHERE is_disabled = 0`;
      // PUEDE ACCEDER A VALORACIONES QUE TENGA ASIGNADAS
      
      const result = executeQuery(sql);
      return result;
    } catch (error) {
      console.log("Error al obtener propiedades desde base de datos", error);
      throw error;
    }
  }

  getMyproperties = async (user_id) =>{
    try {
      let sql = `SELECT * FROM property INNER JOIN user_property ON property.property_id = user_property.property_id WHERE user_property.user_id = ?`

      const result = await executeQuery(sql, [user_id]); 
      
      return result;
    } catch (error) {
      console.log("Error al obtener propiedades del usuario", error);
      throw error;
    }
  }

}


export default new UserDal();