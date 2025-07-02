import { TableHeader } from "../../types"
import ActionsButtons from "./ActionsButtons"
import ProgressBar from "./ProgressBar"

interface TableProps {
  headers: TableHeader[]
  items: any[] | null
  loading: boolean
  dataURL: string
  actions?: boolean
  noDataText?: string
  updateData: Function
}

function Table({headers, items, loading, dataURL, actions, noDataText, updateData}: TableProps) {
  return (
    <>
      <div className="flex flex-col w-full">
        <table className="table-none md:table-fixed w-full">
          <thead className='border-b-1 border-zinc-200'>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className={ header.className ? 'p-3 ' + header.className : 'p-3 text-left' }>{header.text}</th>
              ))}
              { actions &&
                <th className="p-3 flex justify-end">Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            {items?.map((item, outerIndex) => (
              <tr key={ outerIndex } className='border-b-1 border-zinc-200'>
                {headers.map((header, innerIndex) => (
                  <td key={ innerIndex } className='p-3'>{ item[header.value] }</td>
                ))}
                { actions &&
                  <td className="p-3 flex justify-end">
                    <ActionsButtons
                      dataURL={dataURL}
                      item={item}
                      updateData={ updateData }
                    />
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
        { (items?.length === 0) && <div className="h-3 p-4 w-full text-center">{ noDataText ? noDataText : 'No available data.'}</div> }
        { loading && <ProgressBar /> }
      </div>
    </>
  )
}

export default Table