import Styles from './Category.module.css'
import { useState } from 'react'
import { Category } from '@/types/categories'
import deleteIcon from '../../../public/assets/svgs/delete.svg'
import Image from 'next/image'

const Category: React.FC<{ category: Category }> = ({ category }) => {
  const [title, setTitle] = useState<string>(category.title)
  const [checkbox, setCheckbox] = useState<boolean>(category.show)

  return (
    <div className={Styles.category}>
      <input className={Styles.title} type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Enter Category Name' />
      <div className={Styles.switcher}>
        <input className={Styles.checkbox} type="checkbox" name="show-category" id="show-category" checked={checkbox} onChange={(event) => setCheckbox(event.target.checked)} />
        <label className={Styles.label} htmlFor="show-category"></label>
      </div>
      <Image src={deleteIcon} alt='delete-icon' />
    </div>
  )
}

export default Category