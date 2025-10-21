// ---------- Helpers  ----------
export const scrollToTopWithOffset = (offset = -150, delay = 350) => {
  // sube al top y luego aplica el offset (negativo = más arriba)
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    window.scrollBy({ top: offset, behavior: "smooth" });
  }, delay);
};

export const between = (val, min, max) => {
  if (val == null || val === "") return true;
  const v = Number(val);
  const mn = min && min !== "" ? Number(min) : 0;
  const mx = max && max !== "" ? Number(max) : 99_999_999;
  return v >= mn && v <= mx;
};

export const normalize = (str) => {
  return (str || "")
    .toString()
    .toLowerCase()
    .normalize("NFD") // separa las tildes
    .replace(/[\u0300-\u036f]/g, ""); // elimina los acentos
};

export const matchesText = (text1, text2) => {
  const a = normalize(text1);
  const b = normalize(text2);
  if (!b) return true;            // sin término de búsqueda → no restringe
  if (!a) return false;           // no hay texto en la prop
  return a.includes(b);
};

export const sortList = (list, ord) => {
  const arr = [...(list ?? [])];
  const getPrice = (p) => (p.price_hidden ? null : Number(p.price));
  const getDate = (p) => (p.create_date ? new Date(p.create_date) : new Date(0));
  switch (ord) {
    case "price_asc":
      return arr.sort((a, b) => {
        const ap = getPrice(a), bp = getPrice(b);
        if (ap == null && bp == null) return 0;
        if (ap == null) return 1;
        if (bp == null) return -1;
        return ap - bp;
      });
    case "price_desc":
      return arr.sort((a, b) => {
        const ap = getPrice(a), bp = getPrice(b);
        if (ap == null && bp == null) return 0;
        if (ap == null) return 1;
        if (bp == null) return -1;
        return bp - ap;
      });
    case "oldest":
      return arr.sort((a, b) => getDate(a) - getDate(b));
    case "recent":
    default:
      return arr.sort((a, b) => getDate(b) - getDate(a));
  }
};

// ---------- Detección del campo "operación" (venta/alquiler/obra) ----------
const opFrom = (p) => {
  
  const candidates = [
    p?.operation_type,
    p?.operation_type_id,
    p?.property_type,    
    p?.operation,
    p?.op,
  ];
  const found = candidates.find(v => v !== undefined && v !== null && v !== "");
  const num = Number(found);
  return Number.isNaN(num) ? null : num;
};

// ---------- Filtro inicial (querystring) ----------
export const firstFilter = async (list, operacionURL, ubicacionURL) => {
  const all = list ?? [];
  const opWanted = Number(operacionURL ?? 2); // 2 venta | 3 alquiler | 4 obra nueva

  // Filtrado por operación (no excluye si la propiedad no trae ese dato)
  let base = all.filter(p => {
    if (!opWanted) return true;
    const op = opFrom(p);
    if (op == null) return true;          // si no sé la operación → no excluyo
    return op === opWanted;
  });

  // Ubicación flexible en múltiples campos (includes + normalización)
  if (ubicacionURL) {
    base = base.filter(p =>
      matchesText(p?.city,           ubicacionURL) ||
      matchesText(p?.municipality,   ubicacionURL) ||
      matchesText(p?.locality,       ubicacionURL) ||
      matchesText(p?.neighbourhood,  ubicacionURL) ||
      matchesText(p?.urbanization,   ubicacionURL) ||
      matchesText(p?.zip_code,       ubicacionURL) ||
      matchesText(p?.street_name,    ubicacionURL) ||
      matchesText(p?.province,       ubicacionURL) ||
      matchesText(p?.state,          ubicacionURL)
    );
  }

  return base;
};

// ---------- Filtro completo (form lateral) ----------
export const runFilter = (allProps, filter) => {
  const list = allProps ?? [];
  const q = filter?.ubicacion;

  return list
    // Operación (2/3/4). No excluir si la propiedad no expone el campo.
    .filter(p => {
      const want = Number(filter?.operacion);
      if (!want) return true;
      const op = opFrom(p);
      if (op == null) return true;
      return op === want;
    })

    // Ubicación: coincidencia parcial en varios campos
    .filter(p => {
      if (!q) return true;
      return (
        matchesText(p?.city,           q) ||
        matchesText(p?.municipality,   q) ||
        matchesText(p?.locality,       q) ||
        matchesText(p?.neighbourhood,  q) ||
        matchesText(p?.urbanization,   q) ||
        matchesText(p?.zip_code,       q) ||
        matchesText(p?.street_name,    q) ||
        matchesText(p?.province,       q) ||
        matchesText(p?.state,          q)
      );
    })

    // Precio / estancias / baños / superficie / año
    .filter(p => between(p?.price,             filter?.precioMin,     filter?.precioMax))
    .filter(p => between(p?.bedrooms,          filter?.estanciaMin,   filter?.estanciaMax))
    .filter(p => between(p?.toilets,           filter?.baniosMin,     filter?.baniosMax))
    .filter(p => between(p?.registry_surface,  filter?.superficieMin, filter?.superficieMax))
    .filter(p => between(p?.year_built,        filter?.anioMin,       filter?.anioMax))

    // Tipo / clasificación
    .filter(p => {
      if (filter?.tipo === "" || filter?.tipo == null) return true;
      return Number(p?.property_classification) === Number(filter?.tipo);
    })

    // Características
    .filter(p => {
      const req = filter?.caracteristicas || {};
      if (!Object.keys(req).length) return true;

      const mapa = {
        aire_acondicionado:   p?.air_conditioning,
        armarios_empotrados:  p?.built_in_wardrobes,
        cocina_amueblada:     p?.furnished_kitchen,
        cocina_equipada:      p?.equiped_kitchen,
        chimenea:             p?.chimney,
        luminoso:             p?.bright,
        soleado:              p?.sunny,
        exterior:             p?.outdoors,
        ascensor:             p?.elevator,
        trastero:             p?.storage_room,
        terraza:              p?.terrace,
        piscina_privada:      p?.private_pool,
        piscina_comunitaria:  p?.community_pool,
        garaje:               p?.parking || p?.parking_space,
        reformado:            p?.remodeled,
        promocion:            p?.is_promotion,
        reservado:            p?.is_reserved,
        destacado:            p?.is_highlighted,
        publico:              p?.is_public,
        entrega_llaves:       p?.keys_delivered,
        // mostrar_precio activo cuando NO está oculto
        mostrar_precio:       p?.price_hidden === 0 ? 1 : 0,
      };

      return Object.entries(req).every(([key, val]) => {
        if (!val) return true; // no filtra si no está activado
        return Number(mapa[key]) === 1;
      });
    });
};
