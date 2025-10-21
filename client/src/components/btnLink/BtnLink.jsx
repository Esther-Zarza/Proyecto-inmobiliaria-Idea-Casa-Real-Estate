import "./btnLink.css";

export default function BtnLink({ icon, text, onClick, isActive }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-link d-flex align-items-center gap-2 ${isActive ? "is-active" : ""}`}
    >
      {icon && <i className={`bi ${icon}`}></i>}
      {text}
    </button>
  );
}
