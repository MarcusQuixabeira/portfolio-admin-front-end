import { useState } from "react"
import Button from "../../base/Button"
import { useNavigate } from "react-router"
import { useForm } from 'react-hook-form'
import ApiHandler from "../../../api"

function LanguageNew() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  let navigate = useNavigate()

  function handleCancelClick() {
    navigate('/languages')
  }

  function handleSaveClick() {
    handleSubmit(onSubmit)()
  }

  function onSubmit(data: any) {
    setLoading(true)
    ApiHandler.post(data, '/language')
      .then(async () => {
        navigate('/languages')
      })
      .catch((error) => {
        console.log(error)
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
        <div className="text-2xl text-zinc-800 font-bold">Creating Language</div>
        <div className="bg-zinc-50 p-5 flex flex-col gap-5 justify-center">
          <form action={onSubmit} className="p-5">
            <div className="flex flex-col">
              <div className="flex gap-10">
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="justify-start font-bold" htmlFor="name">Name*:</label>
                  <input
                    type="text"
                    className={getInputClass("name")}
                    {...register("name", { required: true })}
                  />
                  {errors?.name && <div className="text-rose-800 text-sm">Name is required</div>}
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="justify-start font-bold" htmlFor="description">Description*:</label>
                  <input
                    type="text"
                    className={getInputClass("description")}
                    {...register("description", { required: true })}
                  />
                  {errors?.description && <div className="text-rose-800 text-sm">Description is required</div>}
                </div>
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

export default LanguageNew