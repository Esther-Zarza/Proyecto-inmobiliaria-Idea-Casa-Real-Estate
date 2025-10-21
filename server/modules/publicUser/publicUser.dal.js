import executeQuery, { dbPool } from '../../config/db.js';

class PublicUserDal {
  findUserByEmail = async (email) => {
    try {
      const sql = 'SELECT user_id, password, email, is_confirmed, is_deleted, is_disabled FROM user WHERE email = ?';
      const result = await executeQuery(sql, [email]);
      return result;
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  findUserById = async (id) => {
    try {
      const sql = 'SELECT * FROM user WHERE user_id = ?';
      const result = await executeQuery(sql, [id]);
      return result;

    } catch (error) {
      throw error;
    }
  };

  findIdByEmail = async (email) => {
    try {
      const sql = 'SELECT user_id FROM user WHERE email = ?';
      const result = await executeQuery(sql, [email]);
      return result;

    } catch (error) {
      throw error;
    }
  };

  
  getPropertiesBasic = async () => {
    try {
      const sql = `
        SELECT * FROM property
        WHERE property_type IN (2, 3, 4)
          AND is_disabled = 0
          AND is_public = 1
      `;
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log("Error al obtener propiedades (basic)", error);
      throw error;
    }
  };

  // === LISTA: MISMO NOMBRE que usa el front, pero con JOIN a equipment ===
  getProperties = async () => {
    try {
      const sql = `
        SELECT
          p.*,
          c.property_classification,
          c.energ_qualification,

          -- EQUIPAMIENTOS (alias iguales a los que usa el front)
          e.outdoors,
          e.bright,
          e.air_conditioning,
          e.built_in_wardrobes,
          e.terrace,
          e.furnished_kitchen,
          e.sunny,
          e.chimney,
          e.private_pool,
          e.community_pool,
          e.parking,
          e.parking_space,
          e.storage_room,
          e.equiped_kitchen
        FROM property p
        LEFT JOIN classification c ON c.property_id = p.property_id
        LEFT JOIN equipment      e ON e.property_id = p.property_id
        WHERE p.is_public = 1
          AND p.is_disabled = 0
          AND p.property_type IN (2,3,4)
      `;
      const rows = await executeQuery(sql);
      
      
      return rows;
    } catch (err) {
      console.error('getProperties error:', err);
      throw err;
    }
  };

  // nuevos inmuebles
  getPropertiesHome = async () => {
    try {
      const sql = `
        SELECT * FROM property
        WHERE property_type IN (2, 3, 4)
          AND is_disabled = 0
          AND is_public = 1
          ORDER BY property_id DESC
          LIMIT 4
      `;

      const result = await executeQuery(sql);
      return result;

    } catch (error) {
      console.log("Error al obtener propiedades (basic)", error);
      throw error;
    }
  }

  // destacados
  getPropertiesHighlights = async () => {
    try {
      const sql = `
        SELECT * FROM property
        WHERE property_type IN (2, 3, 4)
          AND is_disabled = 0
          AND is_public = 1
          ORDER BY is_highlighted DESC, property_id DESC
          LIMIT 4
      `;

      const result = await executeQuery(sql);
      return result;

    } catch (error) {
      console.log("Error al obtener propiedades (basic)", error);
      throw error;
    }
  }



  // === DETALLE (como lo tenías) ===
  getPropertyById = async (property_id) => {
    try {
      const sql = `
        SELECT 
          p.*,
          c.energ_qualification,
          c.energ_certification,
          c.orientation
        FROM property p
        LEFT JOIN classification c
          ON c.property_id = p.property_id
        WHERE p.property_id = ?
          AND p.property_type IN (2, 3, 4)
          AND p.is_disabled = 0
          AND p.is_public = 1
      `;
      const result = await executeQuery(sql, [property_id]); //  await con parámetro
      return result; // -> el controller ya responde { property: rows }
    } catch (error) {
      console.log('Error al obtener la propiedad', error);
      throw error;
    }
  };


}

export default new PublicUserDal();
