export default function
Button({
  label,
  onClick,
  isSubmit,
  Icon,
  color,
  className
}) {
  if (isSubmit) {
    return (
    <>
      <input 
      type="submit" 
      className={`${className} btn btn-primary mt-3`} 
      onClick={onClick} 
      style={{fontSize: "1.1rem"}} 
      value={label}/>
    </>)
  }
  return <>
    <button className={`${className} d-flex align-items-center btn ${color} mt-3`} onClick={onClick} style={{fontSize: "1.1rem"}}>
      <Icon className="me-1"/>
      {label}
    </button>
  </>
}