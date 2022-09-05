export default function
PasswordInput({
  registerFunc,
  name,
  isRequired,
  className,
  label,
  value
}) {
  return (<>
    <label className="d-flex flex-column gap-1 mb-3" style={{fontSize: "1.1rem"}}>
      {label}
      <input className={className + " mt-1 rounded border border-secondary p-1 text-secondary"} type="password" {...registerFunc(name, {required: isRequired})} value={value}/>
    </label>
  </>)
}