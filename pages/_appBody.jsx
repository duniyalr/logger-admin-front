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
    (async () => {
      const response = await httpWho()
      setIsLoading(false);
      if (response  instanceof HttpError) {
        return authContext.setUserHandler(false);
      }

      authContext.setUserHandler(response.data);
    })()
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (pageProps.protected && !authContext.user) {
    router.push("/login")
    return <></>
  }

  return (<>
    {children}
  </>)
}