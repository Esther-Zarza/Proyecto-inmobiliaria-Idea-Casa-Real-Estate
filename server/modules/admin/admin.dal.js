import executeQuery, { dbPool } from '../../config/db.js';

class AdminDal {
  addUser = async (data) => {
    let newData = data;
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sql1 = 'SELECT MAX(user_id) AS max_id FROM user';

      const result1 = await connection.query(sql1);

      let { max_id } = result1[0][0];

      if (max_id === null) {
        max_id = 1;
      } else {
        max_id++;
      }

      newData.splice(0, 0, max_id);

      let sql2 =
        'INSERT INTO user (user_id ,user_name, email, password,user_type) VALUES (?,?,?,?,?)';

      let result2 = await connection.query(sql2, newData);

      await connection.commit();

      return result2;
    } catch (error) {
      connection.rollback();
      throw error;
      
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  emailInUse = async(email) => {
    try {
      const sql = "SELECT email FROM user WHERE email = ?"

      let result = executeQuery(sql, [email]);

      return result;

    } catch (error) {
      res.status(500).json({ message: 'Error de server', dataError: error });
    }
  }

  addEstate = async (data) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      // obtener id de PROPERTY
      let sqlIdProperty = 'SELECT MAX(property_id) AS max_id FROM property';

      const resultIdProperty = await connection.query(sqlIdProperty);
      

      let { max_id } = resultIdProperty[0][0];
      
      let newIdProperty = max_id === null ? 1 : max_id + 1;
      

      // INSERT en PROPERTY
      let newProperty = [
        newIdProperty,
        data.title,
        data.description,
        data.price,
        data.price_hidden,
        data.ibi,
        data.catastral_reference,
        data.registry_surface,
        data.year_built,
        data.property_type,
        data.is_public,
        data.is_highlighted,
        data.bedrooms,
        data.toilets,
        data.number_floors,
        data.keys_delivered,
        data.elevator,
        data.private_observations,
      ];

      
      let sqlProperty =
        'INSERT INTO property (property_id, title, description, price, price_hidden, ibi, catastral_reference, registry_surface, year_built, property_type, is_public, is_highlighted, bedrooms, toilets, number_floors, keys_delivered, elevator, private_observations) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

      let result = await connection.query(sqlProperty, newProperty);
      

      // FECHA DE ACUERDO
      if (data.start_date && data.end_date) {
        // obtener id de PERIOD
        let sqlIdPeriod = 'SELECT MAX(period_id) AS max_id2 FROM period';

        const resultIdPeriod = await connection.query(sqlIdPeriod);
        

        let { max_id2 } = resultIdPeriod[0][0];
        
        let newIdPeriod = max_id2 === null ? 1 : max_id2 + 1;
        
        // INSERT en PERIOD
        let sqlPeriod =
          'INSERT INTO period (period_id, start_date, end_date, property_id) VALUES (?,?,?,?)';

        let newPeriod = [
          newIdPeriod,
          data.start_date,
          data.end_date,
          newIdProperty,
        ];

        let result2 = await connection.query(sqlPeriod, newPeriod);
        
      }

      await connection.commit();

      return newIdProperty;
    } catch (error) {
      connection.rollback();
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getPrincipal = async (property_id) => {
    try {
      let sql =
        'SELECT title, description, price, price_hidden, ibi, catastral_reference, registry_surface, year_built, property_type, is_public, is_highlighted, bedrooms, toilets, number_floors, keys_delivered, elevator, private_observations FROM property WHERE property_id =?';
      let result = executeQuery(sql, [property_id]);
      return result;
    } catch (error) {
      console.log('error al obtener principal', error);
      throw error;
    }
  };

  editPrincipal = async (dataUpdate) => {
    const connection = await dbPool.getConnection();

    try {
      //UPDATE de tabla PROPERTY
      let sqlProperty =
        'UPDATE property SET title=?, description=?, price=?, price_hidden=?, ibi=?, catastral_reference=?, registry_surface=?, year_built=?, property_type=?, is_public=?, is_highlighted=?, bedrooms=?, toilets=?, number_floors=?, keys_delivered=?, elevator=?, private_observations=? WHERE property_id =?';

      let valuesProperty = [
        dataUpdate.title,
        dataUpdate.description,
        dataUpdate.price,
        dataUpdate.price_hidden,
        dataUpdate.ibi,
        dataUpdate.catastral_reference,
        dataUpdate.registry_surface,
        dataUpdate.year_built,
        dataUpdate.property_type,
        dataUpdate.is_public,
        dataUpdate.is_highlighted,
        dataUpdate.bedrooms,
        dataUpdate.toilets,
        dataUpdate.number_floors,
        dataUpdate.keys_delivered,
        dataUpdate.elevator,
        dataUpdate.private_observations,
        dataUpdate.property_id,
      ];

      let result1 = await connection.query(sqlProperty, valuesProperty);
      

      // FECHA DE ACUERDO
      if (dataUpdate.start_date && dataUpdate.end_date) {
        // obtener id de PERIOD
        let sqlIdPeriod = 'SELECT MAX(period_id) AS max_id2 FROM period';

        const resultIdPeriod = await connection.query(sqlIdPeriod);
        

        let { max_id2 } = resultIdPeriod[0][0];
        
        let newIdPeriod = max_id2 === null ? 1 : max_id2 + 1;
        

        // INSERT en PERIOD
        let sqlPeriod =
          'INSERT INTO period (period_id, start_date, end_date, property_id) VALUES (?,?,?,?)';

        let newPeriod = [
          newIdPeriod,
          dataUpdate.start_date,
          dataUpdate.end_date,
          dataUpdate.property_id,
        ];

        let result2 = await connection.query(sqlPeriod, newPeriod);
        
      }

      await connection.commit();
    } catch (error) {
      connection.rollback();
      console.log(error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getAddress = async (property_id) => {
    try {
      let sql =
        'SELECT type_via, street_name, street_number, block, stairs, floor, door, zip_code, city, municipality, locality, urbanization, neighbourhood, street_observation FROM property WHERE property_id =?';
      let result = executeQuery(sql, [property_id]);
      return result;
    } catch (error) {
      console.log('error al obtener dirección', error);
      throw error;
    }
  };

  editAddress = async (dataUpdate) => {
    try {
      let sql =
        'UPDATE property SET type_via=?, street_name=?, street_number=?, block=?, stairs=?, floor=?, door=?, zip_code=?, city=?, municipality=?, locality=?, urbanization=?, neighbourhood=?, street_observation=? WHERE property_id=?';
      let values = [
        dataUpdate.type_via,
        dataUpdate.street_name,
        dataUpdate.street_number,
        dataUpdate.block,
        dataUpdate.stairs,
        dataUpdate.floor,
        dataUpdate.door,
        dataUpdate.zip_code,
        dataUpdate.city,
        dataUpdate.municipality,
        dataUpdate.locality,
        dataUpdate.urbanization,
        dataUpdate.neighbourhood,
        dataUpdate.street_observation,
        dataUpdate.property_id,
      ];

      let result = await executeQuery(sql, values);
      console.log('result edit', result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getClassification = async (property_id) => {
    try {
      let sql =
        'SELECT * FROM classification, surface WHERE classification.property_id =? AND surface.property_id =?';

      const result = await executeQuery(sql, [property_id, property_id]);

      return result;
    } catch (error) {
      console.log('error al obtener dirección', error);
      throw error;
    }
  };

  // no existe entrada en tabla, INSERT
  createClassification = async (dataInsert) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sqlClassification =
        'INSERT INTO classification (property_status, property_classification, agreement_type, energ_qualification, energ_certification, orientation, property_id) VALUES (?,?,?,?,?,?,?)';

      let newClassification = [
        dataInsert.property_status,
        dataInsert.property_classification,
        dataInsert.agreement_type,
        dataInsert.energ_qualification,
        dataInsert.energ_certification,
        dataInsert.orientation,
        dataInsert.property_id,
      ];

      await connection.query(sqlClassification, newClassification);

      let sqlSurface =
        'INSERT INTO surface (util_surface,garage_surface,terrace_surface,pool_surface, property_id) VALUES (?,?,?,?,?)';

      let newValueSurface = [
        dataInsert.util_surface,
        dataInsert.garage_surface,
        dataInsert.terrace_surface,
        dataInsert.pool_surface,
        dataInsert.property_id,
      ];

      await connection.query(sqlSurface, newValueSurface);

      let result = await connection.commit();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  editClassification = async (dataUpdate) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sqlClassification =
        'UPDATE classification SET property_status=?, property_classification=?, agreement_type=?, energ_qualification=?, energ_certification=?, orientation=? WHERE property_id=?';

      let newClassification = [
        dataUpdate.property_status,
        dataUpdate.property_classification,
        dataUpdate.agreement_type,
        dataUpdate.energ_qualification,
        dataUpdate.energ_certification,
        dataUpdate.orientation,
        dataUpdate.property_id,
      ];

      await connection.query(sqlClassification, newClassification);

      let sqlSurface =
        'UPDATE surface SET util_surface=?,garage_surface=?,terrace_surface=?,pool_surface=? WHERE property_id=?';

      let newValueSurface = [
        dataUpdate.util_surface,
        dataUpdate.garage_surface,
        dataUpdate.terrace_surface,
        dataUpdate.pool_surface,
        dataUpdate.property_id,
      ];

      await connection.query(sqlSurface, newValueSurface);

      let result = await connection.commit();
      return result;
    } catch (error) {
      console.log('error al obtener clasificación', error);

      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getEnvironment = async (property_id) => {
    try {
      let sql =
        'SELECT property_exterior, property_interior, interior_status,occupation_status,surroundings, type_neighbours_zone,type_neighbours_building,electricity_meter,water_meter,gas_meter FROM environment WHERE property_id=?';
      const result = executeQuery(sql, [property_id]);
      return result;
    } catch (error) {
      console.log('error al obtener entorno', error);
      throw error;
    }
  };

  createEnvironment = async (dataInsert) => {
    try {
      let sql =
        'INSERT INTO environment (property_exterior, property_interior, interior_status,occupation_status,surroundings, type_neighbours_zone,type_neighbours_building,electricity_meter,water_meter,gas_meter, property_id)  VALUES (?,?,?,?,?,?,?,?,?,?,?)';

      let values = [
        dataInsert.property_exterior,
        dataInsert.property_interior,
        dataInsert.interior_status,
        dataInsert.occupation_status,
        dataInsert.surroundings,
        dataInsert.type_neighbours_zone,
        dataInsert.type_neighbours_building,
        dataInsert.electricity_meter,
        dataInsert.water_meter,
        dataInsert.gas_meter,
        dataInsert.property_id,
      ];

      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editEnvironment = async (dataUpdate) => {
    try {
      let sqlEnvironment =
        'UPDATE environment SET property_exterior=?, property_interior=?, interior_status=?, occupation_status=?, surroundings=?, type_neighbours_zone=?, type_neighbours_building=?, electricity_meter=?,water_meter=?, gas_meter=?  WHERE property_id=?';

      let valuesEnvironment = [
        dataUpdate.property_exterior,
        dataUpdate.property_interior,
        dataUpdate.interior_status,
        dataUpdate.occupation_status,
        dataUpdate.surroundings,
        dataUpdate.type_neighbours_zone,
        dataUpdate.type_neighbours_building,
        dataUpdate.electricity_meter,
        dataUpdate.water_meter,
        dataUpdate.gas_meter,
        dataUpdate.property_id,
      ];

      let result = await executeQuery(sqlEnvironment, valuesEnvironment);
      
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getServices = async (property_id) => {
    try {
      let sql = 'SELECT * FROM zone_services WHERE property_id=?';
      let result = await executeQuery(sql, [property_id]);
      return result;
    } catch (error) {
      console.log('error al obtener servicios', error);
      throw error;
    }
  };

  // no existe entrada en tabla, INSERT
  createServices = async (dataInsert) => {
    try {
      let sql =
        'INSERT INTO zone_services (communications, supermarkets, street_status, mobile_coverage, parking, views, health_places, shops, schools, visitor_zone, visitor_building, visitor_property, property_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

      let values = [
        dataInsert.communications,
        dataInsert.supermarkets,
        dataInsert.street_status,
        dataInsert.mobile_coverage,
        dataInsert.parking,
        dataInsert.views,
        dataInsert.health_places,
        dataInsert.shops,
        dataInsert.schools,
        dataInsert.visitor_zone,
        dataInsert.visitor_building,
        dataInsert.visitor_property,
        dataInsert.property_id,
      ];

      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // si existe entrada en tabla, UPDATE
  editServices = async (dataUpdate) => {
    try {
      let sql =
        'UPDATE zone_services SET communications=?, supermarkets=?, street_status=?, mobile_coverage=?, parking=?, views=?, health_places=?, shops=?, schools=?, visitor_zone=?, visitor_building=?, visitor_property=? WHERE property_id=?';

      let values = [
        dataUpdate.communications,
        dataUpdate.supermarkets,
        dataUpdate.street_status,
        dataUpdate.mobile_coverage,
        dataUpdate.parking,
        dataUpdate.views,
        dataUpdate.health_places,
        dataUpdate.shops,
        dataUpdate.schools,
        dataUpdate.visitor_zone,
        dataUpdate.visitor_building,
        dataUpdate.visitor_property,
        dataUpdate.property_id,
      ];

      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  allProperties = async (page = 1, limit = 10, filtros={}) => {
    const connection = await dbPool.getConnection();
    
    try {
      await connection.beginTransaction();

      const offset = (page - 1) * limit;
      // esto son los registros que se salta en cada página
      
      const whereSql = ['property_type IN (2, 3, 4)'];
      let params = [];
      // params: para evitar inyección SQL

      if(filtros.eliminadas === 'true'){
        whereSql.push('is_disabled = 1');
      }
      if(filtros.ocultas === 'true'){
        whereSql.push('is_public = 0');
      }
      if(filtros.reservados === 'true'){
        whereSql.push('is_reserved = 1');
      }

      const typeFilters = [];
      if(filtros.venta === 'true'){
        typeFilters.push(2);
      }
      if(filtros.alquiler === 'true'){
        typeFilters.push(3);
      }
      if(filtros.obraNueva === 'true'){
        typeFilters.push(4);
      }
      
      if(typeFilters.length > 0) {
        const typeValues = typeFilters.map(()=>'?').join(',');
        whereSql.push(`property_type IN (${typeValues})`);
        params.push(...typeFilters);
      }

      const searchFields = [
        'title', 'description', 'price', 'ibi', 'catastral_reference',
        'year_built', 'registry_surface', 'bedrooms', 'toilets', 'number_floors',
        'private_observations', 'type_via', 'street_name', 'street_number',
        'block', 'stairs', 'floor', 'door', 'zip_code', 'city', 'municipality',
        'locality', 'neighbourhood', 'urbanization', 'street_observation'
      ];

      if(filtros.search && filtros.search.trim() !== ''){
        const likeSql = searchFields.map(field=>`${field} LIKE ?`);
        whereSql.push(`(${likeSql.join(' OR ')})`);

        const searchParam = `%${filtros.search.trim()}%`;
        params.push(...Array(searchFields.length).fill(searchParam));
      }

      let where = '';

      if(whereSql.length > 0){
        where = 'WHERE ' + whereSql.join(' AND ')
      }else{
        where = ''
      }

      let sql = `SELECT * FROM property 
                  ${where}
                  ORDER BY property_id DESC
                  LIMIT ${limit} OFFSET ${offset}`;
      params.push(limit, offset);

      let countSql = `SELECT COUNT(*) AS total
                  FROM property 
                  ${where}`;

      let [result] = await connection.query(sql, params);
      let [countResult] = await connection.query(countSql, params.slice(0, -2));
      
      const total = countResult[0]?.total || 0;
      const totalPages = Math.ceil(total / limit);

      await connection.commit();

      return {
        properties: result, 
        pagination: {
          total,
          totalPages,
          currentPage: page
        }
      };

    } catch (error) {
      console.log('Error al obtener propiedades desde base de datos', error);
      await connection.rollback();
      throw error;
    } finally {
      if(connection){
        connection.release();
      }
    }
  };

  allAppraisals = async (page = 1, limit = 10, filtros={}) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      const offset = (page - 1) * limit;
      // esto son los registros que se salta en cada página
      
      const whereSql = ['property_type = 1'];
      let params = [];
      // params: para evitar inyección SQL

      if(filtros.eliminadas === 'true'){
        whereSql.push('is_disabled = 1');
      }

      const searchFields = [
        'title', 'description', 'price', 'ibi', 'catastral_reference',
        'year_built', 'registry_surface', 'bedrooms', 'toilets', 'number_floors',
        'private_observations', 'type_via', 'street_name', 'street_number',
        'block', 'stairs', 'floor', 'door', 'zip_code', 'city', 'municipality',
        'locality', 'neighbourhood', 'urbanization', 'street_observation'
      ];

      if(filtros.search && filtros.search.trim() !== ''){
        const likeSql = searchFields.map(field=>`${field} LIKE ?`);
        whereSql.push(`(${likeSql.join(' OR ')})`);

        const searchParam = `%${filtros.search.trim()}%`;
        params.push(...Array(searchFields.length).fill(searchParam));
      }

      let where = '';

      if(whereSql.length > 0){
        where = 'WHERE ' + whereSql.join(' AND ');
      }else{
        where = '';
      }

      let sql = `SELECT * FROM property 
                  ${where}
                  ORDER BY property_id DESC
                  LIMIT ${limit} OFFSET ${offset}`;
      params.push(limit, offset);
      // se añaden al final para poder quitarlos en el conteo con slice()

      let countSql = `SELECT COUNT(*) AS total
                  FROM property 
                  ${where}`;

      let [result] = await connection.query(sql, params);
      let [countResult] = await connection.query(countSql, params.slice(0, -2));
      
      const total = countResult[0]?.total || 0;
      const totalPages = Math.ceil(total / limit);

      await connection.commit();

      return {
        appraisals: result, 
        pagination: {
          total,
          totalPages,
          currentPage: page
        }
      };
      
    } catch (error) {
      console.log('Error al obtener valoraciones desde base de datos', error);
      await connection.rollback();
      throw error;

    } finally {
      if(connection){
        connection.release();
      }
    }
  }

  getPropertyById = async (property_id) => {
    try {
      let sql = 'SELECT * FROM property WHERE property_id =?';
      const result = executeQuery(sql, [property_id]);
      return result;
    } catch (error) {
      console.log('Error al obtener la propiedad', error);
      throw error;
    }
  };

  editPropertyStatus = async (dataUpdate) => {
    try {
      let sql = 'UPDATE property SET is_public=?, is_disabled=?, is_reserved=? WHERE property_id =?';
      let values = [
        dataUpdate.is_public,
        dataUpdate.is_disabled,
        dataUpdate.is_reserved,
        dataUpdate.property_id
      ];

      const result = await executeQuery(sql, values);
      return result;
      
    } catch (error) {
      console.log('Error al editar status', error);
      throw error;
    }
  }

  editAppraisalStatus = async (dataUpdate) => {
    try {
      let sql = 'UPDATE property SET is_disabled=? WHERE property_id =?';
      let values = [
        dataUpdate.is_disabled,
        dataUpdate.property_id
      ];

      const result = await executeQuery(sql, values);
      return result;
      
    } catch (error) {
      console.log('Error al editar status', error);
      throw error;
    }
  }

  getDates = async (property_id) => {
    try {
      let sql = 'SELECT * FROM period WHERE property_id =?';
      const result = await executeQuery(sql, [property_id]);
      return result;
    } catch (error) {
      console.log('Error al obtener fechas', error);
      throw error;
    }
  }


  editProfile = async (values) => {
    try {
      let sql =
        'UPDATE user SET user_name=?, user_last_name=?, user_phone=?, user_dni=?, cif=? WHERE user_id = ?';
      let result = await executeQuery(sql, values);
      
    } catch (error) {
      throw error;
    }
  };

  getUsers = async (filter) => {
    const { filAdmin, filCol, currentPage, limitUser } = filter;
    let { search } = filter;

    const offset = (currentPage - 1) * limitUser;

    search = `%${search}%`;

    let data = [filCol];

    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sql0 = "SELECT COUNT(*) AS total FROM user WHERE is_disabled = ?";
      
      let sql = 'SELECT * FROM user WHERE is_disabled = ? ';

      if (search !== '%%') {
        sql += ` AND (user_name LIKE ?
                OR user_last_name LIKE ?
                OR CONCAT(user_name, ' ', user_last_name) LIKE ?)
                OR email LIKE ? `;
        sql0 += ` AND (user_name LIKE ?
                OR user_last_name LIKE ?
                OR CONCAT(user_name, ' ', user_last_name) LIKE ?)
                OR email LIKE ? `;
        data.push(search);
        data.push(search);
        data.push(search);
        data.push(search);
      }

      sql += ' AND user_type = ? ';
      sql0 += ' AND user_type = ? ';

      if (filAdmin === false) {
        data.push(2);
      } else {
        data.push(1);
      }

      sql += 'LIMIT ? OFFSET ?'; 

      data.push(limitUser);
      data.push(offset);

      const result0 = await connection.query(sql0, data);

      let result = await executeQuery(sql, data);

      await connection.commit();

      return {result, result0};

    } catch (error) {
      await connection.rollback();
      throw error;

    } finally {
      if (connection){
        connection.release();
      }
    }
  };

  disableUser = async (user_id) => {
    try {
      
      let sql = 'UPDATE user SET is_disabled = ? WHERE user_id = ?';

      let result = await executeQuery(sql, [1, user_id]);

    } catch (error) {
      throw error;
    }
  };

  enableUser = async (user_id) => {
    try {
      let sql = 'UPDATE user SET is_disabled = ? WHERE user_id = ?';

      let result = await executeQuery(sql, [0, user_id]);
    } catch (error) {
      throw error;
    }
  };

  confirmUser = async (user_id) => {
    try {
      let sql = 'UPDATE user SET is_confirmed = ? WHERE user_id = ?';

      let result = await executeQuery(sql, [1, user_id]);
    } catch (error) {
      throw error;
    }
  };

  getEquipment = async (property_id) => {
    try {
      const sql = `
        SELECT air_conditioning, alarm, high_standing, furished, built_in_wardrobes, bbq, chimney,
               furnished_kitchen, equiped_kitchen, outdoors, rustic_farm, independent, garden,
               community_garden, laundry_room, bright, parking, parking_space, private_pool,
               community_pool, porch, automatic_door, sunny, underfloor_heating, terrace,
               storage_room, turistic, sea_views, mountain_views
        FROM equipment
        WHERE property_id = ?`;
      return await executeQuery(sql, [property_id]);
    } catch (error) {
      console.log('error al obtener equipamientos', error);
      throw error;
    }
  };

  createEquipment = async (data) => {
    try {
      
      let sql = `
        INSERT INTO equipment (
          air_conditioning, alarm, high_standing, furished, built_in_wardrobes, bbq, chimney,
          furnished_kitchen, equiped_kitchen, outdoors, rustic_farm, independent, garden,
          community_garden, laundry_room, bright, parking, parking_space, private_pool,
          community_pool, porch, automatic_door, sunny, underfloor_heating, terrace,
          storage_room, turistic, sea_views, mountain_views, property_id
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      let values = [
        data.air_conditioning ? 1 : 0, data.alarm ? 1 : 0, data.high_standing ? 1 : 0, data.furished ? 1 : 0, data.built_in_wardrobes ? 1 : 0,
        data.bbq ? 1 : 0, data.chimney ? 1 : 0, data.furnished_kitchen ? 1 : 0, data.equiped_kitchen ? 1 : 0, data.outdoors ? 1 : 0,
        data.rustic_farm ? 1 : 0, data.independent ? 1 : 0, data.garden ? 1 : 0, data.community_garden ? 1 : 0, data.laundry_room ? 1 : 0,
        data.bright ? 1 : 0, data.parking ? 1 : 0, data.parking_space ? 1 : 0, data.private_pool ? 1 : 0, data.community_pool ? 1 : 0,
        data.porch ? 1 : 0, data.automatic_door ? 1 : 0, data.sunny ? 1 : 0, data.underfloor_heating ? 1 : 0, data.terrace ? 1 : 0,
        data.storage_room ? 1 : 0, data.turistic ? 1 : 0, data.sea_views ? 1 : 0, data.mountain_views ? 1 : 0,
        data.property_id
      ];

      await executeQuery(sql, values);
      
    } catch (error) {
      console.log(" error al actualizar equipamientos", error);
      throw error;
    }
  }

  editEquipment = async (data) => {
    try {
      let sql = `
        UPDATE equipment SET
          air_conditioning=?, alarm=?, high_standing=?, furished=?, built_in_wardrobes=?, bbq=?, chimney=?,
          furnished_kitchen=?, equiped_kitchen=?, outdoors=?, rustic_farm=?, independent=?, garden=?,
          community_garden=?, laundry_room=?, bright=?, parking=?, parking_space=?, private_pool=?,
          community_pool=?, porch=?, automatic_door=?, sunny=?, underfloor_heating=?, terrace=?,
          storage_room=?, turistic=?, sea_views=?, mountain_views=?
        WHERE property_id = ?`;

      let values = [
        data.air_conditioning ? 1 : 0, data.alarm ? 1 : 0, data.high_standing ? 1 : 0, data.furished ? 1 : 0, data.built_in_wardrobes ? 1 : 0,
        data.bbq ? 1 : 0, data.chimney ? 1 : 0, data.furnished_kitchen ? 1 : 0, data.equiped_kitchen ? 1 : 0, data.outdoors ? 1 : 0,
        data.rustic_farm ? 1 : 0, data.independent ? 1 : 0, data.garden ? 1 : 0, data.community_garden ? 1 : 0, data.laundry_room ? 1 : 0,
        data.bright ? 1 : 0, data.parking ? 1 : 0, data.parking_space ? 1 : 0, data.private_pool ? 1 : 0, data.community_pool ? 1 : 0,
        data.porch ? 1 : 0, data.automatic_door ? 1 : 0, data.sunny ? 1 : 0, data.underfloor_heating ? 1 : 0, data.terrace ? 1 : 0,
        data.storage_room ? 1 : 0, data.turistic ? 1 : 0, data.sea_views ? 1 : 0, data.mountain_views ? 1 : 0,
        data.property_id
      ];

      let result = await executeQuery(sql, values);

      return { message: "Equipamientos actualizados correctamente" };
    } catch (error) {
      console.log(" error al actualizar equipamientos", error);
      throw error;
    }
  };

  getCollaborators = async (property_id) => {
    try {
      let sql =
        'SELECT user_id, user_name, user_last_name FROM user WHERE user_type = 2 AND  is_confirmed = 1 AND is_deleted = 0 AND is_disabled = 0 ';

      let result = await executeQuery(sql);

      let sql2 =
        'SELECT user.* FROM user JOIN user_property ON user.user_id = user_property.user_id WHERE user_property.property_id = ?';

      let result2 = await executeQuery(sql2, [property_id]);
      
      return {
        allCollaborators: result,
        selectedCollaborators: result2,
      };
    } catch (error) {
      throw error;
    }
  };

  deleteCollaborator = async (property_id, user_id) => {
    try {
      let sql =
        'DELETE FROM user_property WHERE property_id = ? AND user_id = ?';
      let result = await executeQuery(sql, [property_id, user_id]);

      return result;
    } catch (error) {
      throw error;
    }
  };
  selectedCollaborator = async (property_id, user_id) => {
    try {
      let sql = `insert into user_property (user_id, property_id) VALUES (?,?);`;
      let result = await executeQuery(sql, [user_id, property_id]);

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  filterNameCollaborator  = async (filterCollaborator) => {
    const {nombre, apellidos} = filterCollaborator;
    let {search} = filterCollaborator;
    
   try {
    
   } catch (error) {
      throw error;
   }
  }

  getFiles = async(property_id) => {
    try {
      const sql = "SELECT * FROM file WHERE property_id = ?";
  
      const result = await executeQuery(sql, [property_id]);

      return result;

    } catch (error) {
      throw error;
    }
  };

  getFile = async(property_id) => {
    try {
      const sql = "SELECT * FROM file WHERE property_id = ? AND file_type = ? ORDER BY file_id ASC LIMIT 1";
  
      const result = await executeQuery(sql, [property_id, 1]);

      return result;

    } catch (error) {
      throw error;
    }
  };

  addImages = async(files, property_id, file_type, admin_file) => {
    //file_type= 1 imágenes, 2 planos, 3 archivos
    const connection = await dbPool.getConnection();
    try {

      await connection.beginTransaction();

      let sql1 = "SELECT MAX(file_id) AS max_id FROM file WHERE property_id = ?";

      const result1 = await connection.query(sql1,[property_id]);
      
      let { max_id } = result1[0][0];
      
      for (const file of files) {
        if (max_id === null) {
          max_id = 1;
        } else {
          max_id++;
        }
        

        const data = [property_id, max_id, file.filename, parseInt(file_type), admin_file];
        let sql2 = "INSERT INTO file (property_id, file_id, filename, file_type, admin_file) VALUES (?,?,?,?,?)";

        await connection.query(sql2, data);

      }
      
      await connection.commit();
      

    } catch (error) {
      console.log('error al subir las imagenes', error);
      await connection.rollback();
      
      throw error;

    } finally {
      console.log("cerramos la conexion", connection);
      if (connection){
        connection.release();
      }
    }
  };

  delImg = async(file_id, property_id) => {
    try {
      let sql = "DELETE FROM file WHERE file_id = ? AND property_id = ?";

      await executeQuery(sql, [file_id, property_id]);

    } catch (error) {
      throw error;
    }
  }

    
}

export default new AdminDal();
