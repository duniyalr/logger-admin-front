export default function
CommonContainer({
  children
}) {
  return (<>
      <div className={`commonContainer col-md-9 p-5 bg-white h-100`}>
        <div className="container p-2 h-100" style={{minHeight: "100vh"}}>
          {children}
        </div>
      </div>
  </>)
}