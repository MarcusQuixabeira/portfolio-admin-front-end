import { toast } from 'react-toastify'
import { FieldErrors, useForm } from 'react-hook-form'
import ApiHandler from '../../../api';
import Button from '../../base/Button';
import { useNavigate } from 'react-router';

export default function LoginView() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  let navigate = useNavigate()

  function handleLoginClick() {
    handleSubmit(onSubmit)()
  }

  function onSubmit(data: any) {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    ApiHandler.auth(formData, `/token`)
      .then(async (response) => {
        if (response.ok) {
          data = await response.json()
          window.localStorage.setItem('auth_token', data.access_token)
          toast.success('Logged in successfully.')
          navigate("/dashboard")
        } else {
          if (response.status === 401) {
            toast.error('Invalid username or password.')
          }
        }
      }).catch((error) => {
        toast.error(`An unexpected error happened: ${error.message}`)
      })
  }

  function getInputClass(errors: FieldErrors, inputName: string) {
    const normalClass = "bg-transparent outline-1 outline-zinc-300 p-1 w-full focus:outline-2 focus:outline-zinc-400"
    const errorClass = "outline-2 outline-rose-900 p-1 w-full"

    return errors && errors[inputName] ? errorClass : normalClass
  }
  return (
    <>
      <div className="w-[400px] min-h-[400px] outline-1 outline-zinc-400">
        <div className="flex flex-col p-6 items-center">
          <div className="font-bold text-2xl">
            Portfolio Admin
          </div>
          <div className="font-bold">
            (Login)
          </div>
        </div>
        <div className="flex flex-col">
          <form action={onSubmit} className="p-5">
            <div className="flex flex-col">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="justify-start font-bold" htmlFor="username">Username*:</label>
                  <input
                    type="text"
                    className={getInputClass(errors, "username")}
                    {...register("username", { required: true })}
                  />
                  {errors?.username && <div className="text-rose-800 text-sm">Username is required</div>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="justify-start font-bold" htmlFor="password">Password*:</label>
                  <input
                    type="text"
                    className={getInputClass(errors, "password")}
                    {...register("password", { required: true })}
                  />
                  <input type='text' className='autofill:bg-transparent' />
                  {errors?.password && <div className="text-rose-800 text-sm">Password is required</div>}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='flex w-full my-10 justify-center'>
          <Button text='Login' type='secondary' onClick={handleLoginClick} />
        </div>
      </div>
    </>
  )
}