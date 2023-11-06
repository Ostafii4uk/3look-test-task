import Styles from './Button.module.css'
import plusIcon from '../../../public/assets/svgs/plus.svg'
import checkIcon from '../../../public/assets/svgs/check-circle.svg'
import Image from 'next/image'

type ButtonType = 'create' | 'save' | 'cancel'

const Button: React.FC<{type: ButtonType}> = ({type}) => {
  const getButtonText = () => {
    if (type === 'save') {
      return 'save changes'
    } else if (type === 'create') {
      return 'create category'
    } else {
      return type

    }
  }

  return (
    <button className={`${Styles.button} ${Styles[type]}`}>
      {type === 'create' && <Image src={plusIcon} alt='plus-icon' />}
      {type === 'save' && <Image src={checkIcon} alt='check-icon' />}
      <span className={Styles.text}>{getButtonText()}</span>
    </button>
  )
}

export default Button