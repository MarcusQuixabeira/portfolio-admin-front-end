import './ProgressBar.css'

function ProgressBar() {
  return (
    <>
      <div className='w-full h-1 bg-zinc-200 relative overflow-hidden'>
        <div className='h-full w-1/2 bg-zinc-900 pb-slider' />
      </div>
    </>
  )
}

export default ProgressBar