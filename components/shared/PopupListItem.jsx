export default function
PopupListItem({
  item,
  onClick
}) {
  return (<>
    <button className="d-flex text-secondary py-2 btn w-100" onClick={onClick}>
      <div className="flex-grow-1 text-center">{item.name}</div>
    </button>
  </>)
}