import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// creamos una pool para comunicarnos con la base de datos
export const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
    //connectionLimit: 10, //numero máximo de conexiones activas
    // queueLimit: 1000, //Número máximo de solicitudes en cola (0 = sin límite)
})


//creo una función que que hace peticiones a la base de datos a través de la pool
const executeQuery = async (sql, values=[]) =>{
    let connection
    try {
        //obtener conexión con bd
        connection = await dbPool.getConnection();

        //ejecutar la consulta
    
        const [result] = await connection.query(sql, values);
        return result;
    } catch (error) {
        console.log("error en la consulta", error);
        throw error;
    } finally {
        //cierro y libero la conexión
        if(connection){
            connection.release();
        }
    }
}


export default executeQuery;

