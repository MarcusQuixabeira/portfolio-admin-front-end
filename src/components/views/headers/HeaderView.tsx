import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Header } from "../../../types"
import { toast } from "react-toastify"
import Button from "../../base/Button"
import ApiHandler from "../../../api"
import Dialog from "../../base/Dialog"
import { LuLoader } from "react-icons/lu"

export default function HeaderView() {
  const [header, setHeader] = useState<Header>()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  let params = useParams()

  useEffect(() => {
    setLoading(true)
    ApiHandler.get(`/header/${params.header_id}`)
      .then(async (response) => {
        if (response.ok) {
          setHeader(await response.json())
        } else if (response.status === 401) {
          window.localStorage.removeItem("auth_token")
          toast.error('Unauthorized')
          navigate('/')
        }
      })
      .catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      }).finally(() => setLoading(false))
  }, [])

  let navigate = useNavigate()

  function handleBackClick() {
    navigate('/headers')
  }

  function handleEditClick() {
    navigate(`/headers/${params.header_id}/edit`)
  }

  function handleDeleteClick() {
    setShowModal(true)
  }

  function deleteIt() {
    setDeleting(true)
    ApiHandler.delete(`/header/${ params.language_id }`)
      .then((response) => {
        if (response.ok) {
          setShowModal(false)
          navigate('/headers')
          toast.success('Header deleted successfully.')
        } else if (response.status === 401) {
          window.localStorage.removeItem("auth_token")
          toast.error('Unauthorized')
          navigate('/')
        }
      }).catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      }).finally(() => setDeleting(false))
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="text-2xl text-zinc-800 font-bold">Viewing Header #{header?.id}</div>
        <div className="bg-zinc-50 p-5 flex flex-col gap-5 justify-center">
          {
            loading ?
            <div className="flex flex-col gap-3 w-full items-center justify-center">
              <LuLoader className="animate-[spin_2s_linear_infinite]" size={50} />
              <span>Loading...</span>
            </div>
            :
            <div className="flex flex-col gap-6">
              <div className="flex">
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Id:</div><span>{header?.id}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Name:</div><span>{header?.name}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Title:</div><span>{header?.title}</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Image URL:</div><span>{header?.image_url}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Image Alt:</div><span>{header?.image_alt}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Language Id:</div><span>{header?.language_id}</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Created at:</div><span>{header?.created_at || '-'}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Updated at:</div><span>{header?.updated_at || '-'}</span>
                </div>
              </div>
            </div>
          }
          <div className="h-1 border-t-1 border-zinc-300"></div>
          <div className='flex w-full gap-4 justify-end'>
            <Button text='Delete Language' loading={deleting} type='danger' onClick={handleDeleteClick} />
            <Button text='Back' type='secondary' onClick={handleBackClick} />
            <Button text='Edit Language' type='primary' onClick={handleEditClick} />
          </div>
        </div>
      </div>
      { showModal &&
        <Dialog
          title={`Delete confirmation of the Header ${header?.name}`}
          text="Are you sure?"
          size="small"
          confirmCallback={ deleteIt }
          toggle={ setShowModal }
        />
      }
    </>
  )
}