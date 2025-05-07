import Button from "./Button"
import { LuX } from 'react-icons/lu'

type DialogSize = 'small' | 'normal' | 'large'

enum DialogSizeClassEnum {
  'small' = 'flex w-3/10 flex-col bg-white',
  'normal' = 'flex w-5/10 flex-col bg-white',
  'large' = 'flex w-8/10 flex-col bg-white',
}

interface DialogProps {
  size?: DialogSize
  title: string
  text: string
  confirmText?: string
  cancelText?: string
  confirmCallback: Function
  toggle: Function
}

function Dialog({ size, title, text, confirmText, cancelText, confirmCallback, toggle }: DialogProps) {

  function getSizeClass() {
    return DialogSizeClassEnum[size || 'normal']
  }

  function close() {
    toggle(false)
  }

  function confirm() {
    if (confirmCallback) {
      confirmCallback()
    }
    close()
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-zinc-500/40">
        <div className={ getSizeClass() }>
          <div className="flex justify-between bg-zinc-800 p-3 text-zinc-100">
            <div className="">{ title }</div>
            <div className="flex cursor-pointer" onClick={ close }><LuX size="20"/></div>
          </div>
          <div className="p-3">{ text }</div>
          <div className="flex justify-end gap-2 border-t-1 bg-zin border-zinc-200 p-2">
            <Button size="small" text={ cancelText || 'Cancel' } type="danger" onClick={ close }/>
            <Button size="small" text={ confirmText || 'Confirm' } type="primary" onClick={ confirm }/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dialog