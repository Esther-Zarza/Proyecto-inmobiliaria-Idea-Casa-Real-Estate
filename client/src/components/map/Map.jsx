
import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mueve la vista cuando llega position (sin re-montar el mapa)
function MoveTo({ position, zoom = 17 }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    const t = setTimeout(() => {
      map.invalidateSize();
      map.setView(position, zoom, { animate: false });
    }, 80);
    return () => clearTimeout(t);
  }, [position, zoom, map]);
  return null;
}

const geoCache = new Map();

const cleanUrb = (s) =>
  (s || "")
    .replace(/\b(urb\.?|urbanizacion|urbanización)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

// Construye variantes de consulta (de más a menos específicas)
function buildQueries(direccion) {
  if (!direccion) return [];

  if (typeof direccion === "string") {
    return [direccion.trim()];
  }

  const typeVia = direccion?.type_via || "";
  const street = cleanUrb(direccion?.street_name || "");
  const number = direccion?.street_number || "";
  const urbaniz =
    cleanUrb(
      direccion?.urbanization ||
        direccion?.neighbourhood ||
        direccion?.barrio
    ) || "";
  const muniOrCity = direccion?.municipality || direccion?.city || "";
  const city = direccion?.city || "";
  const zip = direccion?.zip_code || "";

  const streetFull = [typeVia, street, number].filter(Boolean).join(" ");
  const streetNoNumber = [typeVia, street].filter(Boolean).join(" ");

  // 4 variantes sencillas
  const q1 = [streetFull, urbaniz, muniOrCity, zip, "España"].filter(Boolean).join(", ");
  const q2 = [streetFull, muniOrCity, zip, "España"].filter(Boolean).join(", ");           
  const q3 = [streetNoNumber, urbaniz, muniOrCity, zip, "España"].filter(Boolean).join(", "); 
  const q4 = [city || muniOrCity, zip, "España"].filter(Boolean).join(", ");               

  // quita duplicados vaciando fals y repetidos
  const arr = [q1, q2, q3, q4].filter(Boolean);
  return Array.from(new Set(arr));
}

export default function MapaConDireccion({ direccion }) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  // Guardamos una etiqueta legible (limpia "urb.")
  const etiqueta =
    typeof direccion === "string"
      ? direccion
      : [
          direccion?.type_via,
          cleanUrb(direccion?.street_name),
          direccion?.street_number,
          direccion?.city || direccion?.municipality,
          direccion?.zip_code,
        ]
          .filter(Boolean)
          .join(" ") || "(sin dirección)";

  // Variantes de búsqueda
  const queries = useMemo(() => buildQueries(direccion), [direccion]);

  useEffect(() => {
    if (!queries.length) return;

    // cache: si cualquiera de las queries está en caché, úsala
    const cached = queries.find((q) => geoCache.has(q));
    if (cached) {
      setPosition(geoCache.get(cached));
      setError(null);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    (async () => {
      try {
        setError(null);

        let found = null;
        for (const q of queries) {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=es&q=${encodeURIComponent(
              q
            )}`,
            { signal: ac.signal, headers: { "Accept-Language": "es" } }
          );
          if (!res.ok) throw new Error(`Nominatim ${res.status}`);
          const data = await res.json();
          if (data && data.length) {
            const pos = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            geoCache.set(q, pos);
            found = pos;
            break;
          }
        }

        if (found) {
          setPosition(found);
        } else {
          setError("No se encontraron resultados para esa dirección.");
          setPosition(null);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(`Error al buscar coordenadas: ${e.message}`);
          setPosition(null);
        }
      }
    })();

    return () => ac.abort();
  }, [queries]);

  return (
    <div style={{ height: "650px", width: "100%" }}>
      <MapContainer
        zoom={6}
        minZoom={3}
        maxZoom={19}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {position && (
          <>
            <MoveTo position={position} zoom={17} />
            <CircleMarker
              center={position}
              radius={200}
              pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.5 }}
            />
          </>
        )}
      </MapContainer>

      {!position && !error && queries.length > 0 && (
        <p style={{ marginTop: 8 }}>Cargando mapa para “{etiqueta}”…</p>
      )}
      {error && (
        <p style={{ marginTop: 8 }}>
          {error} [{etiqueta}]
        </p>
      )}
    </div>
  );
}
