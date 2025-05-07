import { NavLink } from 'react-router'
import './TopNavBar.css'
import { LuLogOut, LuX } from 'react-icons/lu'

function TopNavbar() {
  return (
    <>
      <nav className='h-(--top-bar-height) top-0'>
        <ul className='h-full flex align-center justify-between bg-zinc-800'>
          <div className='flex justify-start w-90'>
            <li className='w-auto px-5 text-white flex justify-center items-center hover:bg-zinc-700'>
              <a href="#">
                <LuX size={20} />
              </a>
            </li>
            <NavLink to='/' className='flex justify-center items-center w-auto px-5 text-white hover:bg-zinc-700'>
              <li>
                Home
              </li>
            </NavLink>
          </div>
          <div className='flex'>
            <NavLink to="/" className='w-auto px-5 text-2xl text-white font-black flex justify-center items-center'>
              <li>
                Porfolio Admin
              </li>
            </NavLink>
          </div>
          <div className='flex justify-end w-90'>
            <li className='w-auto px-5 text-white flex justify-center items-center'>
              Marcus Quixabeira
            </li>
            <li className='w-auto flex gap-2 px-5 text-white justify-center items-center hover:bg-rose-800'>
                Logout
              <LuLogOut />
            </li>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default TopNavbar