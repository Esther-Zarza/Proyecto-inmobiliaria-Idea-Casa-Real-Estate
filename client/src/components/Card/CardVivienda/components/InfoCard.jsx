import { FaBed, FaShower, FaBuilding, FaRulerCombined } from 'react-icons/fa';

export default function InfoCard({ property, color }) {
  return (
    <div className="d-flex flex-wrap gap-3 py-2">
      <div className='d-flex gap-2 align-items-center'>
        <FaRulerCombined color={color} />
        <span className={color ? 'text-white' : ''}>
          {Number(property?.registry_surface).toLocaleString('es-ES')} m<sup>2</sup>
        </span>
      </div>
      <div className='d-flex gap-2 align-items-center'>
        <FaBed color={color} />
        <span className={color ? 'text-white' : ''}>{property?.bedrooms}</span>
      </div>
      <div className='d-flex gap-2 align-items-center'>
        <FaShower color={color} />
        <span className={color ? 'text-white' : ''}>{property?.toilets}</span>
      </div>
      <div className='d-flex gap-2 align-items-center'>
        <FaBuilding color={color} />
        <span className={color ? 'text-white' : ''}>
          {property?.number_floors}
        </span>
      </div>
    </div>
  );
}
