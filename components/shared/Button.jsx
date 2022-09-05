export default function
Button({
  label,
  onClick,
  className
}) {
  return <>
    <button className={`${className} btn btn-primary mt-3`} onClick={onClick} style={{fontSize: "1.1rem"}}>
      {label}
    </button>
  </>
}