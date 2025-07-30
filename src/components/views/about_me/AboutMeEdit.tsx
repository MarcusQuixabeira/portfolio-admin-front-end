import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { FieldErrors, useForm } from 'react-hook-form'
import { AboutMe, Language } from "../../../types"
import ApiHandler from "../../../api"
import Button from "../../base/Button"
import { toast } from "react-toastify"
import { LuLoader } from "react-icons/lu"

export default function HeaderEdit() {
  const [aboutMe, setAboutMe] = useState<AboutMe>()
  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      values: {
        title: aboutMe?.title,
        text: aboutMe?.text,
        text2: aboutMe?.text2,
        language_id: aboutMe?.language_id
      }
    }
  )
  let params = useParams()
  let navigate = useNavigate()

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

  useEffect(() => {
    ApiHandler.get(`/languages`)
      .then(async (response) => {
        if (response.ok) {
          setLanguages(await response.json())
        } else if (response.status === 401) {
          window.localStorage.removeItem("auth_token")
          toast.error('Unauthorized')
          navigate('/')
        }
      })
      .catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      })
  }, [])

  function handleCancelClick() {
    navigate('/about-mes')
  }

  function handleSaveClick() {
    handleSubmit(onSubmit)()
  }

  function onSubmit(data: any) {
    setSaving(true)
    ApiHandler.patch(data, `/about-mes/${aboutMe?.id}`)
      .then(async (response) => {
        if (response.ok) {
          toast.success('About me updated successfully.')
          navigate('/about-mes')
        } else if (response.status === 401) {
          window.localStorage.removeItem("auth_token")
          toast.error('Unauthorized')
          navigate('/')
        }
      })
      .catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      })
      .finally(() => {
        setSaving(false)
      })
  }

  function getInputClass(errors: FieldErrors, inputName: string) {
    const normalClass = "bg-zinc-200 outline-1 outline-zinc-300 p-1 w-full focus:outline-2 focus:outline-zinc-400"
    const errorClass = "bg-rose-50 outline-2 outline-rose-700 p-1 w-full"

    return errors && errors[inputName] ? errorClass : normalClass
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="text-2xl text-zinc-800 font-bold">Editing About me #{aboutMe?.id}</div>
        <div className="bg-zinc-50 p-5 flex flex-col gap-5 justify-center">
        { loading ?
            <div className="flex flex-col gap-3 w-full items-center justify-center">
              <LuLoader className="animate-[spin_2s_linear_infinite]" size={50} />
              <span>Loading...</span>
            </div>
            :
            <form action={onSubmit} className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex gap-10">
                {/* BEGIN of Input Title*/}
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="justify-start font-bold" htmlFor="title">Title*:</label>
                  <input
                    type="text"
                    className={getInputClass(errors, "title")}
                    {...register("title", { required: true })}
                  />
                  {errors?.title && <div className="text-rose-800 text-sm">Title is required</div>}
                </div>
                {/* END of Input Title */}

                {/* BEGIN of Input Language*/}
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="justify-start font-bold" htmlFor="language_id">Language*:</label>
                  <select
                    className={getInputClass(errors, "language_id")}
                    
                    {...register("language_id", { required: true })}
                  >
                    { languages?.map((language) => (
                      <option key={language.id} value={language.id}>{ language.name }</option>
                    ))}
                  </select>
                  {errors?.language_id && <div className="text-rose-800 text-sm">Language is required</div>}
                </div>
                {/* END of Input Language */}
              </div>
              <div className="flex gap-10 w-full">
                {/* BEGIN of Input Text */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="justify-start font-bold" htmlFor="name">Text*:</label>
                  <textarea
                    rows={7}
                    className={getInputClass(errors, "text")}
                    {...register("text", { required: true })}
                  />
                  {errors?.text && <div className="text-rose-800 text-sm">Text is required</div>}
                </div>
                {/* END of Input Text */}
              </div>
              <div className="flex gap-10 w-full">
                {/* BEGIN of Input Complementary text */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="justify-start font-bold" htmlFor="name">Complementary Text*:</label>
                  <textarea
                    rows={7}
                    className={getInputClass(errors, "text2")}
                    {...register("text2", { required: true })}
                  />
                  {errors?.text2 && <div className="text-rose-800 text-sm">Text is required</div>}
                </div>
                {/* END of Input Complementary text */}
              </div>
            </div>
          </form>
        }
          <div className="h-1 border-t-1 border-zinc-300"></div>
          <div className='flex w-full gap-4 justify-end'>
            <Button text='Cancel' type='secondary' onClick={handleCancelClick} />
            <Button text='Edit Language' loading={ saving } type='primary' onClick={handleSaveClick} />
          </div>
        </div>
      </div>
    </>
  )
}