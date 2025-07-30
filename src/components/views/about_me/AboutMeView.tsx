import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AboutMe } from "../../../types"
import { toast } from "react-toastify"
import Button from "../../base/Button"
import ApiHandler from "../../../api"
import Dialog from "../../base/Dialog"
import { LuLoader } from "react-icons/lu"

export default function AboutMeView() {
  const [aboutMe, setAboutMe] = useState<AboutMe>()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  let params = useParams()

  useEffect(() => {
    setLoading(true)
    ApiHandler.get(`/about-mes/${params.about_me_id}`)
      .then(async (response) => {
        if (response.ok) {
          setAboutMe(await response.json())
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
    navigate('/about-mes')
  }

  function handleEditClick() {
    navigate(`/about-mes/${params.about_me_id}/edit`)
  }

  function handleDeleteClick() {
    setShowModal(true)
  }

  function deleteIt() {
    setDeleting(true)
    ApiHandler.delete(`/about-mes/${ params.about_me_id }`)
      .then((response) => {
        if (response.ok) {
          setShowModal(false)
          navigate('/about-mes')
          toast.success('About me deleted successfully.')
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
        <div className="text-2xl text-zinc-800 font-bold">Viewing About me #{aboutMe?.id}</div>
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
                  <div className="font-bold">Id:</div><span>{aboutMe?.id}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Title:</div><span>{aboutMe?.title}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Language Id:</div><span>{aboutMe?.language_id}</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Created at:</div><span>{aboutMe?.created_at || '-'}</span>
                </div>
                <div className="flex gap-2 w-1/3">
                  <div className="font-bold">Updated at:</div><span>{aboutMe?.updated_at || '-'}</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex gap-2 w-full">
                  <div className="font-bold w-1/6">Text:</div><span className="w-5/6">{aboutMe?.text}</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex gap-2 w-full">
                  <div className="font-bold w-1/6">Complementary text:</div><span className="w-5/6">{aboutMe?.text2}</span>
                </div>
              </div>
            </div>
          }
          <div className="h-1 border-t-1 border-zinc-300"></div>
          <div className='flex w-full gap-4 justify-end'>
            <Button text='Delete About me' loading={deleting} type='danger' onClick={handleDeleteClick} />
            <Button text='Back' type='secondary' onClick={handleBackClick} />
            <Button text='Edit About me' type='primary' onClick={handleEditClick} />
          </div>
        </div>
      </div>
      { showModal &&
        <Dialog
          title={`Delete confirmation of the About me ${aboutMe?.title}`}
          text="Are you sure?"
          size="small"
          confirmCallback={ deleteIt }
          toggle={ setShowModal }
        />
      }
    </>
  )
}