import { NavLink } from "react-router"

function SideNavBar() {
  return (
    <>
      <aside className="h-full w-(--sidebar-width) bg-zinc-300">
        <nav className="mt-10">
          <ul className="flex-column">
            <NavLink
              to="/languages"
            >
              <li className="p-4 hover:bg-zinc-500 hover:text-white hover:border-l-4 hover:cursor-pointer border-green-400">
                Languages
              </li>
            </NavLink>
            <NavLink to="/headers">
              <li className="p-4 hover:bg-zinc-500 hover:text-white hover:border-l-4 hover:cursor-pointer border-green-400">
                Headers
              </li>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default SideNavBar