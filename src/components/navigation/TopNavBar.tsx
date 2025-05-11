import { NavLink, useNavigate } from 'react-router'
import './TopNavBar.css'
import { LuLogOut, LuX } from 'react-icons/lu'
import { UserContext } from "../../contexts/UserContext"
import { useContext, useState } from "react"
import Dialog from '../base/Dialog'
import { toast } from 'react-toastify'


function TopNavbar() {
  const user = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  function logout() {
    toast.success('Bye-bye!', { autoClose: 2000 })
    window.localStorage.removeItem('auth_token')
    navigate('/login')
  }

  function handleLogoutClick() {
    setShowModal(true)
  }
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
              { user?.username }
            </li>
            { user &&
              <li className='
                w-auto
                flex
                gap-2
                px-5
                text-white
                justify-center
                items-center
                hover:bg-rose-800
                hover:cursor-pointer'
                onClick={ handleLogoutClick }
              >
                  Logout
                <LuLogOut />
              </li>
            }
          </div>
        </ul>
        { showModal &&
        <Dialog
          title="Logout confirmation"
          text="Are you sure?"
          size="small"
          confirmCallback={ logout }
          toggle={ setShowModal }
        />
      }
      </nav>
    </>
  )
}

export default TopNavbar