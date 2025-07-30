import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { TableHeader } from '../../../types'
import Button from '../../base/Button'
import Table from '../../base/Table'
import ApiHandler from '../../../api'
import { toast } from 'react-toastify'

export default function AboutMeList() {
  const [about_mes, setAboutMes] = useState(null)
  const [loading, setLoading] = useState(false)

  const tableAboutMes: TableHeader[] = [
    { text: 'Title', value: 'title' },
    { text: 'Text', value: 'text' },
    { text: 'Complementary text', value: 'text2' },
    { text: 'Language Id', value: 'language_id' },
  ]

  useEffect(() => { fetchData() }, [])

  let navigate = useNavigate()

  function handleClickHome() {
    navigate('/dashboard')
  }

  function handleClickAdd() {
    navigate('/about-mes/new')
  }

  function updateData() {
    fetchData()
  }

  function fetchData() {
    setLoading(true)
    ApiHandler.get('/about-mes')
      .then(async (response) => {
        if (response.ok) {
          setAboutMes(await response.json())
        } else if (response.status === 401) {
          window.localStorage.removeItem("auth_token")
          toast.error('Unauthorized')
          navigate('/')
        }
      })
      .catch((error) => {
        toast.error(`An unexpected error ocurred: ${error.message}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="text-2xl text-zinc-800 font-bold">About Me Listing</div>
        <div className="bg-zinc-50 p-5 flex flex-col justify-center">
          <Table
            dataURL='about-mes'
            headers={ tableAboutMes }
            items={ about_mes }
            loading={ loading }
            actions
            updateData={ updateData }
          />
          <div className='flex w-full gap-4 justify-end mt-15'>
            <Button text='Back' type='secondary' onClick={handleClickHome}/>
            <Button text='Add About Me' type='primary' onClick={handleClickAdd}/>
          </div>
        </div>
      </div>
    </>
  )
}