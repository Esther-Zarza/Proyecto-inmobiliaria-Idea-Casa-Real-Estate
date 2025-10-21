import "./btnComun.css"
export default function BtnComun({ style, text, onClick, active, className }) {
    return <button style={style} onClick={onClick} className={`${active ? 'active' : ''} ${className}`}>{text}</button>;
}