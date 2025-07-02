import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Language } from "../../../types"
import { toast } from "react-toastify"
import Button from "../../base/Button"
import ApiHandler from "../../../api"
import Dialog from "../../base/Dialog"
import { LuLoader } from "react-icons/lu"

function LanguageView() {
  const [language, setLanguage] = useState<Language>()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  let params = useParams()

  useEffect(() => {
    setLoading(true)
    ApiHandler.get(`/language/${params.language_id}`)
      .then(async (response) => {
        if (response.ok) {
          setLanguage(await response.json())
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
    navigate('/languages')
  }

  function handleEditClick() {
    navigate(`/language/${params.language_id}/edit`)
  }

  function handleDeleteClick() {
    setShowModal(true)
  }

  function deleteIt() {
    setDeleting(true)
    ApiHandler.delete(`/language/${ params.language_id }`)
      .then((response) => {
        if (response.ok) {
          setShowModal(false)
          navigate('/languages')
          toast.success('Language deleted successfully.')
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
        <div className="text-2xl text-zinc-800 font-bold">Viewing Language #{language?.id}</div>
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
                  <div className="font-bold">Id:</div><span>{language?.id}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Name:</div><span>{language?.name}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Description:</div><span>{language?.description}</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Created at:</div><span>{language?.created_at}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Updated at:</div><span>{language?.updated_at || '-'}</span>
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
          title={`Delete confirmation of the Language ${language?.name}`}
          text="Are you sure?"
          size="small"
          confirmCallback={ deleteIt }
          toggle={ setShowModal }
        />
      }
    </>
  )
}

export default LanguageView