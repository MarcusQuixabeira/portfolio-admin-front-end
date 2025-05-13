import { Outlet } from "react-router"
import Footer from "../navigation/Footer"
import SideNavBar from "../navigation/SideNavBar"
import TopNavbar from "../navigation/TopNavBar"
import Loading from "../base/Loading"
import { useEffect, useRef, useState } from "react"
import ApiHandler from "../../api"
import { UserContext } from "../../contexts/UserContext"
import { CSSTransition } from "react-transition-group"

interface AuthLayoutProps {
  loading?: boolean
}

function AuthLayout({ loading }: AuthLayoutProps) {
  const [user, setUser] = useState(null)
  const [displaySidebar, setDisplaySidebar] = useState(true)

  const nodeRef = useRef(null);

  useEffect(() => {
    ApiHandler.get('/get_current_user').then(async (response) => {
      if (response.ok) {
        setUser(await response.json())
      }
    })
  }, [])

  function toogleSidebar() {
    setDisplaySidebar(!displaySidebar)
  }

  return (
    <>
      {loading ? <Loading /> :
        <UserContext value={user}>
          <div className='flex-colum h-full w-full'>
            <TopNavbar toogleSidebar={toogleSidebar} />
            <div className='flex h-(--content-height) w-full'>
              <CSSTransition
                nodeRef={nodeRef}
                in={displaySidebar}
                timeout={300}
                classNames="fade"
                unmountOnExit
              > 
              <div ref={nodeRef}>
                <SideNavBar />
              </div>
              </CSSTransition>
              <div className='m-10 w-full h-auto'>
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </UserContext>
      }
    </>
  )
}

export default AuthLayout