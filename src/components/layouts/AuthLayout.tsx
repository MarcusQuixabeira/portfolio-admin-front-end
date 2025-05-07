import { Outlet } from "react-router"
import Footer from "../navigation/Footer"
import SideNavBar from "../navigation/SideNavBar"
import TopNavbar from "../navigation/TopNavBar"

function AuthLayout() {
  return (
    <>
      <div className='flex-colum h-full w-full'>
        <TopNavbar />
        <div className='flex h-(--content-height) w-full'>
          <SideNavBar />
          <div className='m-10 w-full h-auto'>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default AuthLayout