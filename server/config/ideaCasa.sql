 DROP DATABASE ideacasa;
CREATE DATABASE ideacasa;
USE ideacasa;
select * from user;

CREATE TABLE user( -- usuarios y clientes con propiedades en web
	user_id INT UNSIGNED NOT NULL PRIMARY KEY,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL, 
    user_name VARCHAR(50),
    user_last_name VARCHAR(60),
    user_type TINYINT UNSIGNED NOT NULL DEFAULT 2, -- 2 tipos (admin ppal/admin 1, colaborador/cliente 2)
    user_phone VARCHAR(30),
    user_dni VARCHAR(10),
    cif VARCHAR(10),
    is_confirmed BOOLEAN NOT NULL DEFAULT 0, -- cambia a 1 (true) cuando rellena datos
    is_disabled BOOLEAN NOT NULL DEFAULT 0, -- admin gestiona si puede acceder
    is_deleted BOOLEAN NOT NULL DEFAULT 0 --  se eliminan ellos mismos de la base de datos
);


CREATE TABLE property ( -- PROPIEDADES
	property_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    title VARCHAR(150), -- título del anuncio
    description VARCHAR (5000), 
    price DECIMAL(14, 2), -- precio máx 999.999.999.999,99
	price_hidden BOOLEAN NOT NULL DEFAULT 1, -- mostrar precio - true
    ibi DECIMAL(11,2), -- IBI - impuesto bienes inmuebles  999.999.999,99
    catastral_reference VARCHAR(30), -- referencia catastral
    year_built YEAR, -- año construcción
    registry_surface DECIMAL(9,2), -- superficie registral ***  -- 9.999.999,99
    bedrooms TINYINT UNSIGNED, -- habitaciones
    toilets TINYINT UNSIGNED, -- baños
    number_floors TINYINT UNSIGNED, -- nº plantas
    
    -- fechas creación / edición
    create_date DATE NOT NULL DEFAULT (CURDATE()),
    last_edit_date DATE,

    private_observations VARCHAR (200),
    keys_delivered BOOLEAN NOT NULL DEFAULT 0, -- llaves
	elevator BOOLEAN NOT NULL DEFAULT 0, -- ascensor

    property_type TINYINT UNSIGNED, -- 1-valoración, 2-venta, 3-alquiler, 4-obra nueva
    is_public BOOLEAN NOT NULL DEFAULT 0, -- oculta 0 / visible en web pública 1 -- en 'valoración' siempre oculta
    is_disabled BOOLEAN NOT NULL DEFAULT 0, -- dudas
    is_highlighted BOOLEAN NOT NULL DEFAULT 0, -- destacados - false
    is_promotion BOOLEAN NOT NULL DEFAULT 0, -- promoción - false  -> asegurarse!
    is_reserved BOOLEAN NOT NULL DEFAULT 0, -- reservado - false = no reservado  true = reservado
    
    -- dirección
	type_via VARCHAR(50), -- tipo de vía (calle, plaza...) ***
	street_name VARCHAR(100), -- nombre
    street_number VARCHAR(10), -- número
    block VARCHAR(10), -- bloque
    stairs VARCHAR(10), -- escalera
    floor VARCHAR(10), -- piso
    door VARCHAR(10), -- puerta
    zip_code VARCHAR(10), -- código postal
    city VARCHAR(168), -- ciudad
    municipality VARCHAR(50), -- municipio
    locality VARCHAR(50), -- localidad / pedanía
    neighbourhood VARCHAR(50), -- barrio / barriada
    urbanization VARCHAR(60), -- urbanización
    street_observation VARCHAR(200), -- observaciones extra dirección
    
    
    -- ------------------------------------------------------- REVISAR https://leafletjs.com/  -------------------------------------
    latitude DECIMAL(11, 8),  -- MEJOR POR SEPARADO O TIPO POINT?       
	longitude DECIMAL(11, 8),
    -- ----------------------------------------------------------------------------------------------------------------------------
    
    remodeled BOOLEAN, -- reformado
    
    user_id INT UNSIGNED,
	CONSTRAINT fk_user_1 FOREIGN KEY (user_id)
    REFERENCES user(user_id)
);

CREATE TABLE period ( -- (FECHA DEL ACUERDO)
	period_id INT UNSIGNED NOT NULL PRIMARY KEY,
	start_date DATE,
    end_date DATE,
    
    property_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_property_1 FOREIGN KEY (property_id)
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE user_property(
	user_id INT UNSIGNED NOT NULL,
    property_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, property_id),
    
    CONSTRAINT fk_property_2 FOREIGN KEY (property_id)
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE classification ( -- CLASIFICACIÓN Y ESTADO // CERTIFICACIÓN ENERGÉTICA // ORIENTACIÓN
	property_status TINYINT, -- (Estado de la vivienda) -> 1 Inactiva, 2 Prospecto, 3 Disponible, 4 Reservado, 4 Alquilado, 5 Vendido
    property_classification TINYINT, 	-- (Tipo de vivienda) -> Piso, Vivienda pareada, Vivienda adosada, Vivienda individual, Ático, Habitación, Parcela, 
							-- Casa rústica, Garaje, Plaza de parking, Trastero, Edificio, Terreno, Nave industrial, Oficina, Local
    agreement_type TINYINT, -- (Tipo de acuerdo) ->  1 Exclusiva,2 Competencia libre, 3 Colaboración con propietarios
    
    energ_qualification TINYINT, -- (Calificación energ) -> A, B, C, D, E, F, G, En trámite, No especificado, Exento
    energ_certification TINYINT, -- (Certif. energ) -> A, B, C, D, E, F, G, En trámite, No especificado, Exento
    orientation TINYINT, -- (Orientación) -> Norte, Sur, Este, Oeste, Noroeste, Noreste, Suroeste, Sureste
    
    exterior_appearance TINYINT,
    interior_appearance TINYINT,
    
    
    property_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_property_3 FOREIGN KEY (property_id) 
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE surface ( -- SUPERFICIES
	util_surface DECIMAL(9,2), -- superficie útil  -- 9.999.999,99
    garage_surface DECIMAL(7,2), -- superficie garage
    terrace_surface DECIMAL(7,2), -- superficie terrazas
	pool_surface DECIMAL(6,2), -- superficie piscina
    
    property_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_property_4 FOREIGN KEY (property_id) 
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE environment (
	surroundings TINYINT, -- (Alrededores del inmueble) -> Zona muy buena, Zona buena, Zona normal, Zona deprimida, Zona conflictiva, Zona okupas
    property_exterior TINYINT, -- (Exteriores del inmueble) ->  Nuevo, Seminuevo, Antiguo, Antiguo-deteriorado
    property_interior TINYINT, -- (Interiores del inmueble) ->  Nuevo, Seminuevo, Antiguo, Antiguo-deteriorado
    interior_status TINYINT, -- (Estado del interior) ->  Antiguo, Limpieza y cuidado, Limpieza y descuidado, Deteriorado
    occupation_status TINYINT, -- (Situación de ocupación del inmueble) -> Está ocupado, Indicios de ocupación, Indicios de no ocupación, Propietario anterior, Inquilinos, Okupas
    electricity_meter BOOLEAN, -- Sí / No
    gas_meter BOOLEAN, -- Sí / No
    water_meter BOOLEAN, -- Sí / No
    
    type_neighbours_zone TINYINT, -- Alto, Medio, Bajo
    type_neighbours_building TINYINT, -- Alto, Medio, Bajo
    
    property_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_property_5 FOREIGN KEY (property_id) 
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE file( -- archivos (todos con borrado físico)
	property_id BIGINT UNSIGNED NOT NULL,
	file_id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (property_id, file_id),
    filename VARCHAR(200) NOT NULL,
    file_type TINYINT NOT NULL, -- 1 imágenes, 2 planos, 3 archivos privados (certf. energ., nota simple...)
    admin_file BOOLEAN NOT NULL, -- true - fotos de administrador, false - fotos de colaborador
    
    CONSTRAINT fk_property_6 FOREIGN KEY (property_id) 
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE zone_services (
	communications TINYINT UNSIGNED, -- (Comunicaciones) 1-10
    supermarkets TINYINT UNSIGNED, -- (Supermercados) 1-10
    street_status TINYINT UNSIGNED, -- (Estado de la calle) 1-10
    mobile_coverage TINYINT UNSIGNED, -- (Cobertura) 1-10
    parking TINYINT UNSIGNED, -- (Aparcamiento) 1-10
    views TINYINT UNSIGNED, -- (Vistas) 1-10
    health_places TINYINT UNSIGNED, -- (Centro de salud / Hospital) 1-10
    shops TINYINT UNSIGNED, -- (Comercios) 1-10
    schools TINYINT UNSIGNED, -- (Colegios) 1-10
    visitor_zone TINYINT UNSIGNED, -- (Zona) 1-10
    visitor_building TINYINT UNSIGNED, -- (Edificio) 1-10
    visitor_property TINYINT UNSIGNED, -- (Vivienda) 1-10
    
    property_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_property_7 FOREIGN KEY (property_id) 
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE equipment (
	air_conditioning BOOLEAN, -- aire acondicionado
    alarm BOOLEAN, -- alarma
    high_standing BOOLEAN, -- alto standing
    furished BOOLEAN, -- amueblado
    built_in_wardrobes BOOLEAN, -- armarios empotrados
    bbq BOOLEAN, -- barbacoa
    chimney BOOLEAN, -- chimenea
    furnished_kitchen BOOLEAN, -- cocina amueblada
    equiped_kitchen BOOLEAN, -- cocina equipada
    outdoors BOOLEAN, -- exterior
    rustic_farm BOOLEAN, -- finca rústica
    independent BOOLEAN, -- independiente
    garden BOOLEAN, -- jardín
    community_garden BOOLEAN, -- jardín comunitario
    laundry_room BOOLEAN, -- lavadero
    bright BOOLEAN, -- luminoso
    parking BOOLEAN, -- parking
    parking_space BOOLEAN, -- plaza de garaje incluida
    private_pool BOOLEAN, -- piscina
    community_pool BOOLEAN, -- piscina comunitaria
    porch BOOLEAN, -- porche
    automatic_door BOOLEAN, -- puerta automática
    sunny BOOLEAN, -- soleado
    underfloor_heating BOOLEAN, -- suelo radiante
    terrace BOOLEAN, -- terraza
    storage_room BOOLEAN, -- trastero incluido
    turistic BOOLEAN, -- turístico
    sea_views BOOLEAN, -- vistas al mar
    mountain_views BOOLEAN, -- vistas a la montaña


    property_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_property_8 FOREIGN KEY (property_id) 
    REFERENCES property(property_id) ON DELETE CASCADE ON UPDATE CASCADE
);












-- BLOG
CREATE TABLE post(
	post_id INT UNSIGNED NOT NULL PRIMARY KEY,
    post_title VARCHAR(100),
    post_body VARCHAR(1000),
    post_category TINYINT UNSIGNED DEFAULT 0,
    post_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE post_image(
	post_id INT UNSIGNED NOT NULL,
    post_image_id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (post_id, post_image_id),
    post_filename VARCHAR(200) NOT NULL,
    
    CONSTRAINT fk_post_1 FOREIGN KEY (post_id) 
    REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);
