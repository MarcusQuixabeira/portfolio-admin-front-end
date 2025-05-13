import { useState } from "react"
import { IconType } from "react-icons"
import { ClassNameValue, twMerge } from "tailwind-merge"

interface ToogleButtonProps {
  text?: String
  className: ClassNameValue
  activeIcon: IconType,
  innactiveIcon: IconType,
  toogleCallback: Function,
}

export default function ToogleButton({ text, className, activeIcon, innactiveIcon, toogleCallback }: ToogleButtonProps) {
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
    toogleCallback()
  }

  function getIconComponent(Icon: IconType) {
    return (
      <>
        <Icon size={20}/>
      </>
    )
  }

  return (
  <>
    <button className={ twMerge('flex gap-2 cursor-pointer w-full h-full justify-center items-center', className) } onClick={ handleClick }>
      <div>
        { active ? getIconComponent(activeIcon) : getIconComponent(innactiveIcon) }
      </div>
      { text && 
        <div>
          { text }
        </div>
      }
    </button>
  </>
)
}