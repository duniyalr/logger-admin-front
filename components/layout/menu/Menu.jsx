import s from "./menu.module.scss";
import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogoBuffer } from "react-icons/io";
import { TbSection } from "react-icons/tb";
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
        <Link href={"/sections"}>
            <a className="p-3 text-secondary">
              <TbSection  className="d-inline-block me-1" style={{fontSize: "24px"}}/>
              Sections
            </a>
        </Link>
        <Link href={"/logs"}>
            <a className="p-3 text-secondary">
              <IoLogoBuffer className="d-inline-block me-1" style={{fontSize: "24px"}}/>
              Logs
            </a>
        </Link>
      </div>
    </div>
  </>)
}