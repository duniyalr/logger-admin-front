import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronRight
} from "react-icons/hi"

export default function
Pagination({
  page,
  take,
  pageCount,
  hasNext,
  hasPrevious,
  itemCount,
  pageHandler
}) {
  console.log("page" + page)
  return (<>
    <div className="d-flex justify-content-center">
      <div className="btn-group" role="group">
        <button type="button" className="btn border-0" disabled={page === 1}
          onClick={() => pageHandler(1)}
        >
          <HiOutlineChevronDoubleLeft />
        </button>
        <button type="button" className="btn border-0" disabled={!hasPrevious}
          onClick={() => pageHandler(page - 1)}
        >
          <HiOutlineChevronLeft />
        </button>
        <button type="button" className="btn border-0" disabled={true}>
          {(page - 1) * take} - {page === pageCount ? itemCount : page * take}
        </button>
        <button type="button" className="btn border-0" disabled={!hasNext}
          onClick={() => pageHandler(page + 1)}
        >
          <HiOutlineChevronRight />
        </button>
        <button type="button" className="btn border-0" disabled={page === pageCount}
          onClick={() => pageHandler(pageCount)}
        >
          <HiOutlineChevronDoubleRight />
        </button>
      </div>
    </div>
  </>)
}