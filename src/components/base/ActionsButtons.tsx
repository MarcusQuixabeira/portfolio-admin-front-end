import { LuEye, LuPencil, LuTrash } from "react-icons/lu"
import { useNavigate } from "react-router"
import Dialog from "./Dialog"
import { useState } from "react"
import ApiHandler from "../../api"

interface ActionsButtonsProps {
  dataURL: string
  item: any
  updateData: Function
}

function ActionsButtons({ dataURL, item, updateData }: ActionsButtonsProps) {
  const [showModal, setShowModal] = useState(false)

  let navigate = useNavigate()
  
  function handleViewToClick() {
    navigate(`/${dataURL}/${item.id}/view`)
  }

  function handleEditToClick() {
    navigate(`/${dataURL}/${item.id}/edit`)
  }

  function deleteIt() {
    ApiHandler.delete(`/language/${ item.id }`)
      .then(() => {
        setShowModal(false)
        updateData()
      })
  }

  function handleDeleteToClick() {
    setShowModal(true)
  }

  return (
    <>
      <div className="flex gap-3">
        <div onClick={handleViewToClick} className='flex flex-col items-center hover:cursor-pointer underline'>
          <div><LuEye /></div>
          <div>View</div>
        </div>
        <div onClick={handleEditToClick} className='flex flex-col items-center hover:cursor-pointer underline'>
          <LuPencil />
          <div>Edit</div>
        </div>
        <div onClick={handleDeleteToClick} className='flex flex-col items-center hover:cursor-pointer underline'>
          <LuTrash />
          <div>Delete</div>
        </div>
      </div>
      { showModal &&
        <Dialog
          title="Delete confirmation"
          text="Are you sure?"
          size="small"
          confirmCallback={ deleteIt }
          toggle={ setShowModal }
        />
      }
    </>
  )
}

export default ActionsButtons