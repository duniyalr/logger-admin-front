export default function
Button({
  label,
  onClick,
  isSubmit,
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
    <button className={`${className} btn btn-primary mt-3`} onClick={onClick} style={{fontSize: "1.1rem"}}>
      {label}
    </button>
  </>
}