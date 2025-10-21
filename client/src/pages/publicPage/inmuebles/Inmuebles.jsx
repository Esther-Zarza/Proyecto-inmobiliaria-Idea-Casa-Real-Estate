import BtnComun from "../../../components/btnComun/BtnComun";
import SubMenu from "./components/SubMenu";
import SelectOrder from "./components/SelectOrder";
import { CardBusqueda } from "../../../components/Card/cardBusqueda/CardBusqueda";
import FormInmueble from "../../../components/forms/formInmueble/FormInmueble";
import {  useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import {  useSearchParams } from "react-router-dom";
import { fetchData } from "../../../helpers/axiosHelper";
import { CardViviendaPhone } from "../../../components/Card/CardVivienda/cardViviendaPhone";
import { Container } from 'react-bootstrap';
import { firstFilter, runFilter} from "../../../helpers/filterHelper";
import { PageItems } from "./components/PageItems";
import { runOrder } from "../../../helpers/orderHelper"


import "./style.css";
import { DefaultContext } from "react-icons/lib";

  const styleBtn = {
    width: '200px',
    padding: '.5em 0',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#120690',
    color: 'white',
  };


// Filtros  (solo selects/checkboxes)
const DEFAULT_FILTERS = {
  operacion: null,
  precioMin: '',
  precioMax: '',
  estanciaMin: '',
  estanciaMax: '',
  baniosMin: '',
  baniosMax: '',
  superficieMin: '',
  superficieMax: '',
  anioMin: '',
  anioMax: '',
  tipo: '',
  certificacionEnergetica: '',
  ubicacion: '',
  caracteristicas: {},
};


// const all = [...propsList].sort((a, b) => b.property_id - a.property_id);

export default function Inmuebles() {
  //captamos ubicación y tipo desde params-querys
  const [allProps, setAllProps] = useState(); //estado que contiene todas las propiedades
  const [tab, setTab] = useState("lista"); // "lista" | "mapa" | "favoritos"
  const [searchParams] = useSearchParams();
  const ubicacionURL = searchParams.get("ubicacion") ;
  const tipoURL = searchParams.get("tipo"); 
  const [operacion, setOperacion] = useState(tipoURL?Number(tipoURL):2); // 2 venta | 3 alquiler | 4 obra nueva
  const [page, setPage] = useState();
  const [filteredList, setFilteredList] = useState([]); //estado que se pinta
  const [loadingProps, setLoadingProps] = useState(true);
  const [sizeWindows, setSizeWindows] = useState(window.innerWidth);
  
  const {user} = useContext(AuthContext);

  const [filter, setFilter] = useState(DEFAULT_FILTERS);
  
  const [order, setOrder] = useState("recent"); // "recent" | "oldest" | "price_asc" | "price_desc"
  
  
  // console.log("filtro", filter);
  // console.log("filtro", ubicacionURL);
  // console.log("filtro", tipoURL);
  // console.log("user", user);
  
  
  useEffect(()=>{
    if(ubicacionURL && tipoURL){
      setFilter({...DEFAULT_FILTERS, operacion:tipoURL, ubicacion:ubicacionURL })
    }else{
      setFilter({...DEFAULT_FILTERS, operacion:2})
    }
  },[])

  // listener del tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => setSizeWindows(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // console.log(sizeWindows);
    return () => window.removeEventListener("resize", handleResize);
  }, [sizeWindows]);


  // trae todas las propiedades
  useEffect(() => {                                            
    const load = async () => {
      try {
        const res = await fetchData("/getProperties", "GET"); // endpoint que ya aplica is_public=1
         console.log("data total", res.data.properties);
        setAllProps(res.data.properties);
        const finalList = await firstFilter(res.data.properties, operacion, ubicacionURL);
        setFilteredList(finalList);
        setPage(1);
        if(tipoURL && ubicacionURL) setFilter({...filter, operacion:(Number(tipoURL)), ubicacion:ubicacionURL})
        setFilter
      } finally {
        setLoadingProps(false);
      }
    };
    load();
  }, []);

// console.log("propsList", filteredList);
// console.log("opercion", operacion);
  

  // ---------- Efectos ----------
  useEffect(() => {
    if (loadingProps) return;         
    // setBaseline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operacion, filteredList]); 

    
  // ---------- Acciones ----------

  const typeOperacionHandler = async (num) =>{
    setFilter({...filter, operacion: num});
    setOperacion(num);
    const finalList = await firstFilter(allProps, num, ubicacionURL);
    setFilteredList(finalList);
  }

  const applyOrders = (selectedOrder) => {
      setOrder(selectedOrder); //
   const propsOrder = runOrder(filteredList || allProps, selectedOrder);
      setFilteredList(propsOrder);
  }//

  const applyFilters = () => {
    const filtered = runFilter(allProps, filter);
    
    //cambiamos el browser del navegador pero no navegamos
    if(user?.user_type===0){
      window.history.replaceState({}, "", `/admin/inmueble/?ubicacion=${filter.ubicacion}&tipo=${filter.operacion}`);
    }else{
      window.history.replaceState({}, "", `/inmueble/?ubicacion=${filter.ubicacion}&tipo=${filter.operacion}`);
    }

    console.log("filltracionnnnnnnnnnnnnnnnn", filtered);
    setOperacion(filter.operacion)
    setFilteredList(filtered);
  };

  const resetFilters = () => {
  const next =
    tipoURL && ubicacionURL
      ? { ...DEFAULT_FILTERS, operacion: Number(tipoURL), ubicacion: ubicacionURL }
      : { ...DEFAULT_FILTERS, operacion };

  setFilter(next);

  // 🔴 recalcula aquí MISMO (sin esperar a onSearch)
  const filtered = runFilter(allProps, next);
  setFilteredList(filtered);
  setPage(1);
};



  // ---------- Render ----------
  return (
    <div>
      <div className="d-flex flex-column align-items-center mt-4 contentTopBtnInmuebles">
        <h2>La diferencia entre buscar y encontrar</h2>
        <div className="line-title"></div>

        {/* Botones operación */}
        <div className="d-flex gap-4 mt-2 mb-4 btnOperacionesInmuebles">
          <BtnComun
            style={styleBtn}
            className={operacion === 2 ? 'active' : ''}
            text="Venta"
            onClick={() => typeOperacionHandler(2)}
          />
          <BtnComun
            style={styleBtn}
            className={operacion === 3 ? 'active' : ''}
            text="Alquiler"
            onClick={() => typeOperacionHandler(3)}
          />
          <BtnComun
            style={styleBtn}
            className={operacion === 4 ? 'active' : ''}
            text="Obra Nueva"
            onClick={() => typeOperacionHandler(4)}
          />
        </div>
      </div>

      <div
        className="d-flex justify-content-between gap-4 mb-5 w-100 contentMainInmuebles"
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Form controlado (solo selects/checkboxes) */}
        <FormInmueble         
          filter={filter}
          setFilter={setFilter}
          onSearch={applyFilters}
          onReset={resetFilters}
          operacion={operacion}
          setOperacion={setOperacion}
        />

        <div className="contentMainPaginacionInmueble" >
                  <div className="d-flex justify-content-between paginacionInmuebles">
                    {sizeWindows > 768 && <SubMenu active={tab} onChange={setTab} />}
                    <SelectOrder order={order} onChange={applyOrders} />
                  </div>
        
        <PageItems 
          propsList={filteredList} 
          sizeWindows={sizeWindows} 
          page={page} 
          setPage={setPage}
        />
          


       
        </div>
      </div>
    </div>
  );
}