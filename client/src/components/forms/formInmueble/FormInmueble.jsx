import { Form } from "react-bootstrap";
import BtnComun from "../../btnComun/BtnComun";
import "./style.css";
import { useEffect, useState } from "react";
import { scrollToTopWithOffset } from "../../../helpers/filterHelper";


export default function FormInmueble({
  filter,
  setFilter,
  onSearch,
  onReset
  //operacion,
  //setOperacion
}) {
  const [sizeWindows, setSizeWindows] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSizeWindows(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [sizeWindows]);

  const handleBuscar = async () => {
  await onSearch?.();
  scrollToTopWithOffset(-150); 
};

const handleReset = async () => {
  await onReset?.();                 // el padre ya recalcula resultados
  scrollToTopWithOffset(-150);       // solo el scroll
};

  // Helpers para actualizar el estado global del filtro
  const setField = (name, value) =>
    setFilter((prev) => ({ ...prev, [name]: value }));
  const setCheck = (name, checked) =>
    setFilter((prev) => ({
      ...prev,
      caracteristicas: { ...(prev.caracteristicas || {}), [name]: checked },
    }));

  // Listas de opciones (solo selects, sin inputs)
  const PRECIOS_VENTA = [
    20000, 40000, 60000, 80000, 100000, 120000, 150000, 200000, 300000, 400000,
    500000, 600000, 800000, 1000000, 1500000, 2000000, 2500000, 3000000,
    4000000,
  ];
  const PRECIOS_ALQUILER = [
    200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 1800, 2000, 2500, 3000,
    4000, 5000,
  ];
  const PRECIOS_OBRA = [
    50000, 75000, 100000, 125000, 150000, 200000, 300000, 400000, 500000,
    750000, 1000000, 2000000, 3000000, 5000000,
  ];

      const preciosActivos =
  Number(filter.operacion) === 3
    ? PRECIOS_ALQUILER
    : Number(filter.operacion) === 4
    ? PRECIOS_OBRA
    : PRECIOS_VENTA;

  const DORMS_OPTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const BANIOS_OPTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const SUPERF_OPTS = [
    20, 40, 60, 80, 100, 120, 150, 180, 200, 250, 300, 400, 500, 600, 700, 800,
    1000,
  ];
  const ANIO_MIN_OPTS = [1900, 1920, 1940, 1960, 1980, 2000, 2010, 2020, 2025];
  const ANIO_MAX_OPTS = [1950, 1970, 1990, 2000, 2010, 2020, 2025];

  const TIPOS = [
    { id: "", name: "Todos los tipos" },
    { id: 1, name: "Piso" },
    { id: 2, name: "Vivienda pareada" },
    { id: 3, name: "Vivienda adosada" },
    { id: 4, name: "Vivienda individual" },
    { id: 5, name: "Ático" },
    { id: 6, name: "Habitación" },
    { id: 7, name: "Parcela" },
    { id: 8, name: "Casa rústica" },
    { id: 9, name: "Garaje" },
    { id: 10, name: "Plaza de parking" },
    { id: 11, name: "Trastero" },
    { id: 12, name: "Edifico" },
    { id: 13, name: "Terreno" },
    { id: 14, name: "Nave industrial" },
    { id: 15, name: "Oficina" },
    { id: 16, name: "Local" }
  ];

  const CARACTS = [
    { value: "exterior", label: "Exterior" },
    { value: "luminoso", label: "Luminoso" },
    { value: "aire_acondicionado", label: "Aire Acondicionado" },
    { value: "armarios_empotrados", label: "Armarios Empotrados" },
    { value: "terraza", label: "Terraza" },
    { value: "cocina_amueblada", label: "Cocina Amueblada" },
    { value: "soleado", label: "Soleado" },
    { value: "chimenea", label: "Chimenea" },
    { value: "ascensor", label: "Ascensor" },
    { value: "piscina", label: "Piscina" },
    { value: "garaje", label: "Garaje" },
    { value: "trastero", label: "Trastero" },
    { value: "mostrar_precio", label: "Mostrar precio" },
    { value: "cocina_equipada", label: "Cocina Equipada" },
  ];

  const PROVINCIAS = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Girona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lleida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Ourense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
    "Santa Cruz de Tenerife",
    "A Coruña",
    "Ceuta",
    "Melilla",
  ];

  

  return (
    <div className="formInmuebles">
      <Form
        className="form-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="text-center">
          <h3>Filtrar resultados</h3>
        </div>

        {/* Operación */}
        <Form.Group className="mb-3">
          <Form.Label>Operación</Form.Label>
          <Form.Select
            name="operacion"
            value={filter.operacion ?? ""}
            onChange={(e) => setFilter(prev=>({...prev, operacion:Number(e.target.value)}))}
          >
            <option value={2}>Venta</option>
            <option value={3}>Alquiler</option>
            <option value={4}>Obra Nueva</option>
          </Form.Select>
        </Form.Group>
        {/* Ubicación */}
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Select
                name="ubicacion"
                value={filter.ubicacion ?? ""}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, ubicacion: e.target.value }))
                }
              >
                <option value="">Selecciona provincia</option>
                {PROVINCIAS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

        {/* Precio (solo selects con opciones) */}
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <div className="d-flex gap-2">
            <Form.Select
              name="precioMin"
              className="w-50"
              value={filter.precioMin ?? ""}
              onChange={(e) => setField("precioMin", e.target.value)}
            >
              <option value="">Min.</option>
              {preciosActivos.map((v) => (
                <option key={`pmin-${v}`} value={v}>
                  {v.toLocaleString("es-ES")}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              name="precioMax"
              className="w-50"
              value={filter.precioMax ?? ""}
              onChange={(e) => setField("precioMax", e.target.value)}
            >
              <option value="">Max.</option>
              {preciosActivos.map((v) => (
                <option key={`pmax-${v}`} value={v}>
                  {v.toLocaleString("es-ES")}
                </option>
              ))}
              {/* Sin límite: dejamos value="" (no poner tope) */}
              <option value="">Sin límite</option>
            </Form.Select>
          </div>
        </Form.Group>

        {/* Tipo */}
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            name="tipo"
            value={filter.tipo ?? ""}
            onChange={(e) => setField("tipo", e.target.value)}
          >
            {TIPOS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Estancias (solo selects) */}
        <Form.Group className="mb-3">
          <Form.Label>Estancias</Form.Label>
          <div className="d-flex gap-2">
            <Form.Select
              name="estanciaMin"
              className="w-50"
              value={filter.estanciaMin ?? ""}
              onChange={(e) => setField("estanciaMin", e.target.value)}
            >
              <option value="">Min.</option>
              {DORMS_OPTS.map((n) => (
                <option key={`emin-${n}`} value={n}>
                  {n}
                </option>
              ))}
              <option value="0">Sin mínimo</option>
            </Form.Select>
            <Form.Select
              name="estanciaMax"
              className="w-50"
              value={filter.estanciaMax ?? ""}
              onChange={(e) => setField("estanciaMax", e.target.value)}
            >
              <option value="">Max.</option>
              {DORMS_OPTS.map((n) => (
                <option key={`emax-${n}`} value={n}>
                  {n}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        {/* Baños (solo selects) */}
        <Form.Group className="mb-3">
          <Form.Label>Baños</Form.Label>
          <div className="d-flex gap-2">
            <Form.Select
              name="baniosMin"
              className="w-50"
              value={filter.baniosMin ?? ""}
              onChange={(e) => setField("baniosMin", e.target.value)}
            >
              <option value="0">Min.</option>
              {BANIOS_OPTS.map((n) => (
                <option key={`bmin-${n}`} value={n}>
                  {n}
                </option>
              ))}
              <option value="0">Sin mínimo</option>
            </Form.Select>
            <Form.Select
              name="baniosMax"
              className="w-50"
              value={filter.baniosMax ?? ""}
              onChange={(e) => setField("baniosMax", e.target.value)}
            >
              <option value="50">Max.</option>
              {BANIOS_OPTS.map((n) => (
                <option key={`bmax-${n}`} value={n}>
                  {n}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        {/* Superficie (solo selects) -- modificancion responsive */}
        {sizeWindows > 768 ? (
          <>
            {/* Superficie */}
            <Form.Group className="mb-3">
              <Form.Label>Superficie (m²)</Form.Label>
              <div className="d-flex gap-2">
                <Form.Select
                  name="superficieMin"
                  className="w-50"
                  value={filter.superficieMin ?? ""}
                  onChange={(e) => setField("superficieMin", e.target.value)}
                >
                  <option value="0">Min.</option>
                  {SUPERF_OPTS.map((n) => (
                    <option key={`smin-${n}`} value={n}>
                      {n}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  name="superficieMax"
                  className="w-50"
                  value={filter.superficieMax ?? ""}
                  onChange={(e) => setField("superficieMax", e.target.value)}
                >
                  <option value={1000}>Max.</option>
                  {SUPERF_OPTS.map((n) => (
                    <option key={`smax-${n}`} value={n}>
                      {n}
                    </option>
                  ))}
                  <option value={SUPERF_OPTS[SUPERF_OPTS.length-1]}>Sin límite</option>
                </Form.Select>
              </div>
            </Form.Group>

            {/* Año */}
            <Form.Group className="mb-3">
              <Form.Label>Año de construcción</Form.Label>
              <div className="d-flex gap-2">
                <Form.Select
                  name="anioMin"
                  className="w-50"
                  value={filter.anioMin ?? ""}
                  onChange={(e) => setField("anioMin", e.target.value)}
                >
                  <option value="">Min.</option>
                  {ANIO_MIN_OPTS.map((y) => (
                    <option key={`ymin-${y}`} value={y}>
                      {y}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  name="anioMax"
                  className="w-50"
                  value={filter.anioMax ?? ""}
                  onChange={(e) => setField("anioMax", e.target.value)}
                >
                  <option value="">Max.</option>
                  {ANIO_MAX_OPTS.map((y) => (
                    <option key={`ymax-${y}`} value={y}>
                      {y}
                    </option>
                  ))}
                  <option value="">Sin límite</option>
                </Form.Select>
              </div>
            </Form.Group>

            

            {/* Características */}
            <Form.Group className="mb-3">
              <Form.Label>Características</Form.Label>
              {CARACTS.map((c) => (
                <Form.Check
                  key={c.value}
                  type="checkbox"
                  label={c.label}
                  name={c.value}
                  checked={!!filter.caracteristicas?.[c.value]}
                  onChange={(e) => setCheck(c.value, e.target.checked)}
                />
              ))}
            </Form.Group>
          </>
        ) : (
          <div
            className="accordion border-0 shadow-none"
            id="accordionExample"
            style={{ background: "transparent" }}
          >
            {/* Superficie */}
            <div className="accordion-item border-0">
              <h2 className="accordion-header">
                <button
                  className="accordion-button py-2 px-3 bg-light collapsed border-0 shadow-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  style={{ fontSize: "0.95rem" }}
                >
                  Superficie
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body py-2 px-3">
                  <Form.Group className="mb-2">
                    <div className="d-flex gap-2">
                      <Form.Select
                        name="superficieMin"
                        className="w-50 form-select-sm"
                        value={filter.superficieMin ?? ""}
                        onChange={(e) =>
                          setField("superficieMin", e.target.value)
                        }
                      >
                        <option value="">Min.</option>
                        {SUPERF_OPTS.map((n) => (
                          <option key={`smin-${n}`} value={n}>
                            {n}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Select
                        name="superficieMax"
                        className="w-50 form-select-sm"
                        value={filter.superficieMax ?? ""}
                        onChange={(e) =>
                          setField("superficieMax", e.target.value)
                        }
                      >
                        <option value="">Max.</option>
                        {SUPERF_OPTS.map((n) => (
                          <option key={`smax-${n}`} value={n}>
                            {n}
                          </option>
                        ))}
                        <option value="">Sin límite</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>

            {/* Año */}
            <div className="accordion-item border-0">
              <h2 className="accordion-header">
                <button
                  className="accordion-button py-2 px-3 bg-light collapsed border-0 shadow-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontSize: "0.95rem" }}
                >
                  Año de construcción
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body py-2 px-3">
                  <Form.Group className="mb-2">
                    <div className="d-flex gap-2">
                      <Form.Select
                        name="anioMin"
                        className="w-50 form-select-sm"
                        value={filter.anioMin ?? ""}
                        onChange={(e) => setField("anioMin", e.target.value)}
                      >
                        <option value="">Min.</option>
                        {ANIO_MIN_OPTS.map((y) => (
                          <option key={`ymin-${y}`} value={y}>
                            {y}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Select
                        name="anioMax"
                        className="w-50 form-select-sm"
                        value={filter.anioMax ?? ""}
                        onChange={(e) => setField("anioMax", e.target.value)}
                      >
                        <option value="">Max.</option>
                        {ANIO_MAX_OPTS.map((y) => (
                          <option key={`ymax-${y}`} value={y}>
                            {y}
                          </option>
                        ))}
                        <option value="">Sin límite</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="accordion-item border-0">
              <h2 className="accordion-header">
                <button
                  className="accordion-button py-2 px-3 bg-light collapsed border-0 shadow-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  style={{ fontSize: "0.95rem" }}
                >
                  Características
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body py-2 px-3">
                  <Form.Group className="mb-2">
                    {CARACTS.map((c) => (
                      <Form.Check
                        key={c.value}
                        type="checkbox"
                        label={c.label}
                        name={c.value}
                        checked={!!filter.caracteristicas?.[c.value]}
                        onChange={(e) => setCheck(c.value, e.target.checked)}
                        className="small"
                      />
                    ))}
                  </Form.Group>
                </div>
              </div>
            </div>
            </div>
        )}

        <div className="d-flex justify-content-center mt-4 gap-4">
          <BtnComun style={{width:"40%"}} className="btn-2 reset-btn" text="Quitar Filtros" onClick={handleReset} />
          <BtnComun style={{width:"40%"}} className="btn-1" text="Buscar" onClick={handleBuscar} />
        </div>
      </Form>
    </div>
  );
}
