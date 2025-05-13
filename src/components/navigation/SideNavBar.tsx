import { NavLink } from "react-router"
import './SideNavBar.css'

function SideNavBar() {
  return (
    <>
      <aside className="h-full w-(--sidebar-width) bg-zinc-300">
        <nav className="pt-10 h-full">
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