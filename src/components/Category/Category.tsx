import Styles from './Category.module.css'
import { useState } from 'react'
import { Category } from '@/types/categories'
import deleteIcon from '../../../public/assets/svgs/delete.svg'
import Image from 'next/image'
import Dialog from '../Dialog/Dialog'

const Category: React.FC<{ category: Category, setCategories: Function }> = ({ category, setCategories }) => {
  const [title, setTitle] = useState<string>(category.title)
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const updateCategory = async (status: boolean) => {
    const updatedCategory = {
      id: category.id,
      show: status
    }
    const response = await fetch("/api/categories", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...updatedCategory
      })
    })
    setCategories(await response.json())
  }

  const deleteCategory = async () => {
    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: category.id,
      })
    })
    setCategories(await response.json())
  }

  return (
    <>
    {showDialog && <Dialog closeFnc={() => setShowDialog(false)} submitFnc={deleteCategory} />}
    <div className={Styles.category}>
      <input className={Styles.title} type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Enter Category Name' />
      <div className={Styles.switcher}>
        <input className={Styles.checkbox} type="checkbox" name="show-category" id={category.id} checked={category.show} onChange={(event) => updateCategory(event.target.checked)} />
        <label className={Styles.label} htmlFor={category.id}></label>
      </div>
      <Image src={deleteIcon} alt='delete-icon' onClick={() => setShowDialog(true)} />
    </div>
    </>
  )
}

export default Category