import Styles from './CustomHeader.module.css'
import Image from 'next/image'
import logoIcon from '../../../public/assets/svgs/logo.svg'
import { useState } from 'react'

const CustomHeader: React.FC<{searchCategories: Function, searchParam: string}> = ({searchCategories, searchParam}) => {
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false)

  return (
    <div className={Styles.header}>
      <div className={Styles.headerContainer}>
        <div className={Styles.logo}>
          <Image src={logoIcon} alt='3look' priority={true} />
          <h2 className={Styles.title}>Memes</h2>
        </div>
        <div className={`${Styles.search} ${isActiveSearch && Styles.searchMobile}`} onClick={() => setIsActiveSearch(true)}>
          <input type="text" className={Styles.inputSearch} value={searchParam} onBlur={() => setIsActiveSearch(false)} onChange={(event) => searchCategories(event.target.value)} placeholder='Search' />
        </div>
      </div>
    </div>
  )
}

export default CustomHeader