import { Form } from "react-bootstrap";

export default function SelectOrder({ order, onChange }) {
  return (
    <Form.Group className="mb-2 d-flex align-items-center gap-2
    orderFormInmuebles">
      <Form.Label htmlFor="orderSelect" className="mb-0">Ordenar</Form.Label>
      <Form.Select
        id="orderSelect"
        value={order}
        onChange={(e) => onChange(e.target.value)}
        className="p-2"
        aria-label="Ordenar resultados"
      >
        <option value="recent">Más recientes</option>
        <option value="oldest">Antiguos</option>
        <option value="price_asc">Precio más bajo a más alto</option>
        <option value="price_desc">Precio más alto a más bajo</option>
      </Form.Select>
    </Form.Group>
  );
}
