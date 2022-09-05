import { useAuthContext } from "../../../store/authContext";
import s from "./topbar.module.scss";

function UserProfileButton({
  user
}) {
  if(!user) { return null }
  return (<>
    <div className={`col-auto border border-secondary p-2`}>
      <span>{user.username}</span>
    </div>
  </>)
}

export default function 
Topbar() {
  const authContext = useAuthContext();

  return (<>
    <div className={`${s.topbar} row `}>
      <div className={`col`}></div>
      <UserProfileButton />
    </div>
  </>);
}