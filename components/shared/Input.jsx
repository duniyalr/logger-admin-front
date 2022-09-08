export default function
TextInput({
  registerFunc,
  name,
  isRequired,
  className,
  label,
  type = "text",
  value
}) {
  return (<>
    <label className="d-flex flex-column gap-1 mb-3" style={{fontSize: "1.1rem"}}>
      {label}
      <input className={className + " mt-1 rounded border border-secondary p-1 px-2 text-secondary"} type={type} {...(registerFunc && registerFunc(name, {required: isRequired}))} value={value}/>
    </label>
  </>)
}