import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Header } from '../../../types'
import Button from '../../base/Button'
import Table from '../../base/Table'
import ApiHandler from '../../../api'

function LanguagesView() {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(false)

  const headers: Header[] = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
  ]

  useEffect(() => { fetchData() }, [])

  let navigate = useNavigate()

  function handleClickHome() {
    navigate('/')
  }

  function handleClickAdd() {
    navigate('/languages/new')
  }

  function updateData() {
    fetchData()
  }

  function fetchData() {
    setLoading(true)
    ApiHandler.get('/languages')
      .then(async (response) => {
        setLanguages(await response.json())
      })
      .catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="text-2xl text-zinc-800 font-bold">Languages Listing</div>
        <div className="bg-zinc-50 p-5 flex flex-col justify-center">
          <Table
            dataURL='languages'
            headers={ headers }
            items={ languages }
            loading={ loading }
            actions
            updateData={ updateData }
          />
          <div className='flex w-full gap-4 justify-end mt-15'>
            <Button text='Back' type='secondary' onClick={handleClickHome}/>
            <Button text='Add Language' type='primary' onClick={handleClickAdd}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default LanguagesView