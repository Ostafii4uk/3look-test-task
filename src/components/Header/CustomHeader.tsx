import Syles from './CustomHeader.module.css'
import Image from 'next/image'
import logoIcon from '../../../public/assets/svgs/logo.svg'

const CustomHeader: React.FC<{}> = ({}) => {
  return (
    <header className={Syles.header}>
      <div className={Syles.logo}>
        <Image src={logoIcon} alt='3look' priority={true} />
        <h2 className={Syles.title}>Memes</h2>
      </div>
      <div className={Syles.search}>
        <input type="text" className={Syles.inputSearch} placeholder='Search' />
      </div>
    </header>
  )
}

export default CustomHeader