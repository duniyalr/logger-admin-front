import Link from "next/link";

export default function
LinkButton({
  label,
  Icon,
  href,
  color = "text-primary",
  style
}) {
  return (<>
    <Link href={href}>
      <a className={`text-decoration-none justify-self-end btn ${color}`} style={style} >
        {Icon && <Icon className={"me-2"} />}
        <span>{label}</span>
      </a>
    </Link>
  </>)
}