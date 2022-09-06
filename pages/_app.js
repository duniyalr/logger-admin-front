import Topbar from "../components/layout/base/Topbar";
import "bootstrap/dist/css/bootstrap.css";
import "./common.scss";
import { AuthProvider } from "../store/authContext";
import Menu from "../components/layout/menu/Menu";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { basicFetcher } from "../http/fetchers/basicFetcher";

export default function 
MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <>
      <SWRConfig value={{
        fetcher:{basicFetcher}
      }}>
        <AuthProvider>
          <div className="body container-fluid">
          {router.route === "/login" 
            ? 
            <Component {...pageProps} />
            :
            <>
              <Topbar />
              <div className="row">
                <Menu />
                <Component {...pageProps} />
              </div>
            </>
          }
          </div>
        </AuthProvider>
      </SWRConfig>
  </>
}