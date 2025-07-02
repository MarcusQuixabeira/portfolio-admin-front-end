import { NavLink } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext } from "react"

import './SideNavBar.css'

function SideNavBar() {
  const user = useContext(UserContext)
  return (
    <>
      <aside className="absolute w-full h-(--content-height) sm:relative sm:w-(--sidebar-width) bg-zinc-300">
        <nav className="pt-10 h-full">
          <div className="sm:hidden">
            <div className="flex flex-col gap-1 p-3">
              <div>Logged in as:</div>
              <div className="font-bold">{user?.username}</div>
            </div>
            <div className="border-t border-zinc-400"></div>
          </div>
          <ul className="flex flex-col h-full">
            <li className="flex">
              <NavLink
                to="/languages"
                className={({ isActive }) =>
                  isActive ? "p-4 w-full bg-zinc-500 text-white border-l-4 cursor-pointer border-green-400" : "p-4 w-full hover:bg-zinc-500 hover:text-white hover:border-l-4 hover:cursor-pointer border-zinc-400"
                }
              >
                Languages
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/headers"
                className={({ isActive }) =>
                  isActive ? "p-4 w-full bg-zinc-500 text-white border-l-4 cursor-pointer border-green-400" : "p-4 w-full hover:bg-zinc-500 hover:text-white hover:border-l-4 hover:cursor-pointer border-zinc-400"
                }
              >
                Headers
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default SideNavBar