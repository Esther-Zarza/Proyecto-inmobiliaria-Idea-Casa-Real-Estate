import BtnLink from "../../../../components/btnLink/BtnLink";

export default function SubMenu({ active, onChange }) {
  return (
    <div className="d-flex gap-4 mb-2">
      <BtnLink
        icon="bi-list-ul"
        text="Lista"
        isActive={active === "lista"}
        onClick={() => onChange?.("lista")}
      />
    </div>
  );
}
