import { useEffect, useState } from "react";
import HttpError from "../http/HttpError";
import { httpWho } from "../http/who";
import { useAuthContext } from "../store/authContext";
import Loading from "../components/loading/Loading";
import { useRouter } from "next/router";
export default function
AppBody({
  children,
  pageProps
}) {
  const router = useRouter();
  const authContext = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect from _appBody");
    (async () => {
      setIsLoading(true);
      const response = await httpWho()
      setIsLoading(false);
      console.log("dani", response)
      if (response instanceof HttpError) {
        console.log("unAuthenticated")
        return authContext.setUserHandler(false);
      }

      authContext.setUserHandler(response.data);
    })()
  }, [authContext.token]);

  useEffect(() => {
    if (isLoading) return;
    if (pageProps.protected && !authContext.user) {
      console.log("redirecting", router)
      router.push("/login?from=" + encodeURIComponent(router.asPath));
    }
  }, [isLoading])

  if (isLoading || (pageProps.protected && !authContext.user)) {
    return <Loading />
  }

  return (<>
    {children}
  </>)
}