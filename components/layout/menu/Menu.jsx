import s from "./menu.module.scss";
import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";

export default function
Menu() {
  return (<>
    <div className="col-md-3" style={{height: "100%", padding: 0}}>
      <div className={s.menu + " pt-3 d-flex flex-column w-100"}>
        <Link href={"/projects"}>
            <a className="p-3 text-secondary">
              <RiDashboardFill className="d-inline-block me-1" style={{fontSize: "24px"}}/>
              Projects
            </a>
        </Link>

      </div>
    </div>
  </>)
}