import { MouseEventHandler } from "react"

type ButtonType = 'primary' | 'secondary' | 'danger' | 'disabled'
type ButtonSizeType = 'regular' | 'large' | 'small' | 'fluid'

enum ButtonTypeEnum {
  'primary' = 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-400 hover:cursor-pointer active:scale-95',
  'secondary' = 'bg-zinc-500 text-zinc-100 hover:bg-zinc-400 hover:border-zinc-200 hover:cursor-pointer active:scale-95',
  'danger' = 'bg-rose-800 text-zinc-100 hover:bg-rose-700 hover:border-rose-400 hover:cursor-pointer active:scale-95',
  'disabled' = 'bg-zinc-300 text-white'
}

enum ButtonSizeEnum {
  'small' = 'w-[100px]',
  'regular' = 'w-[200px]',
  'large' = 'w-[400px]',
  'fluid' = 'w-full',
}

interface ButtonProps {
  text: string
  type?: ButtonType
  size?: ButtonSizeType
  disabled?: boolean
  loading?: boolean
  onClick: MouseEventHandler
}

function Button({ text, type, size, disabled, onClick }: ButtonProps) {

  function getButtonType(): ButtonType {
    return disabled ? 'disabled' : type || 'primary'
  }

  return(
    <>
      <button
        type="button"
        onClick={onClick}
        className={`
            p-2
            ${ButtonSizeEnum[size || 'regular']}
            ${getButtonType() ? ButtonTypeEnum[getButtonType()] : ButtonTypeEnum['primary']}
            border-l-4
            border-transparent
          `
        }>
          { text }
      </button>
    </>
  )
}

export default Button