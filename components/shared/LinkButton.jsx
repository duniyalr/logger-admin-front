import Link from "next/link";

export default function
LinkButton({
  label,
  Icon,
  href
}) {
  return (<>
    <Link href={href}>
      <a className="text-decoration-none justify-self-end" style={{gap: "10px"}}>
        {Icon && <Icon className={"me-2"} />}
        <span>{label}</span>
      </a>
    </Link>
  </>)
}