import { Outlet } from "react-router"
import Loading from "../base/Loading"

interface UnauthLayoutProps {
  loading?: boolean
}

function UnauthLayout({ loading }: UnauthLayoutProps) {
  return (
    <>
      { loading ? <Loading /> :
        <div className='
          flex flex-col
          justify-center
          items-center
          h-full
          w-full
          bg-gradient-to-r
          from-zinc-900
          to-zinc-800
          text-zinc-400'
        >
          <Outlet />
        </div>
      }
    </>
  )
}

export default UnauthLayout