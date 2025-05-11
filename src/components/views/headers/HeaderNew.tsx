import { useEffect, useState } from "react"
import Button from "../../base/Button"
import { useNavigate } from "react-router"
import { useForm } from 'react-hook-form'
import ApiHandler from "../../../api"
import { toast } from "react-toastify"
import { Language } from "../../../types"

export default function LanguageNew() {
  const [loading, setLoading] = useState(false)
  const [languages, setLanguages] = useState<Language[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm()

  let navigate = useNavigate()

  useEffect(() => {
    ApiHandler.get(`/languages`)
      .then(async (response) => {
        if (response.ok) {
          setLanguages(await response.json())
        } else {
          if (response.status === 401) {
            toast.error('Unauthorized!')
            window.localStorage.removeItem('auth_token')
            navigate('/login')
          }
        }
      })
      .catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      })
  }, [])

  function handleCancelClick() {
    navigate('/headers')
  }

  function handleSaveClick() {
    handleSubmit(onSubmit)()
  }

  function onSubmit(data: any) {
    setLoading(true)
    ApiHandler.post(data, '/header')
      .then(async (response) => {
        if (response.ok) {
          toast.success('Header created successfully.')
          navigate('/headers')
        } else {
          if (response.status === 401) {
            toast.error('Unauthorized!')
            window.localStorage.removeItem('auth_token')
            navigate('/login')
          }
        }
      })
      .catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function getInputClass(inputName: string) {
    const normalClass = "bg-zinc-200 outline-1 outline-zinc-300 p-1 w-full focus:outline-2 focus:outline-zinc-400"
    const errorClass = "bg-rose-50 outline-2 outline-rose-700 p-1 w-full"

    return errors && errors[inputName] ? errorClass : normalClass
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="text-2xl text-zinc-800 font-bold">Creating Header</div>
        <div className="bg-zinc-50 p-5 flex flex-col gap-5 justify-center">
          <form action={onSubmit} className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex gap-10">
                {/* BEGIN of Input Name */}
                <div className="flex flex-col gap-2 w-1/3">
                  <label className="justify-start font-bold" htmlFor="name">Name*:</label>
                  <input
                    type="text"
                    className={getInputClass("name")}
                    {...register("name", { required: true })}
                  />
                  {errors?.name && <div className="text-rose-800 text-sm">Name is required</div>}
                </div>
                {/* END of Input Name */}

                {/* BEGIN of Input Title*/}
                <div className="flex flex-col gap-2 w-1/3">
                  <label className="justify-start font-bold" htmlFor="title">Title*:</label>
                  <input
                    type="text"
                    className={getInputClass("title")}
                    {...register("title", { required: true })}
                  />
                  {errors?.title && <div className="text-rose-800 text-sm">Title is required</div>}
                </div>
                {/* END of Input Title */}

                {/* BEGIN of Input Language*/}
                <div className="flex flex-col gap-2 w-1/3">
                  <label className="justify-start font-bold" htmlFor="language_id">Language*:</label>
                  <select
                    className={getInputClass("language_id")}
                    
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
              <div className="flex gap-10">
                {/* BEGIN of Input Image URL*/}
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="justify-start font-bold" htmlFor="image_url">Image URL*:</label>
                  <input
                    type="text"
                    className={getInputClass("image_url")}
                    {...register("image_url", { required: true })}
                  />
                  {errors?.image_url && <div className="text-rose-800 text-sm">Image URL is required</div>}
                </div>
                {/* END of Input Image URL */}

                {/* BEGIN of Image Alt */}
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="justify-start font-bold" htmlFor="image_alt">Image Alt*:</label>
                  <input
                    type="text"
                    className={getInputClass("image_alt")}
                    {...register("image_alt", { required: true })}
                  />
                  {errors?.image_alt && <div className="text-rose-800 text-sm">Image Alt is required</div>}
                </div>
                {/* END of Input Image Alt */}
              </div>
            </div>
          </form>
          <div className="h-1 border-t-1 border-zinc-300"></div>
          <div className='flex w-full gap-4 justify-end'>
            <Button text='Cancel' type='secondary' onClick={handleCancelClick} />
            <Button text='Create' type='primary' loading={ loading } onClick={handleSaveClick} />
          </div>
        </div>
      </div>
    </>
  )
}