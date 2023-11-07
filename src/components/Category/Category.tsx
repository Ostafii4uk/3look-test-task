import Styles from './Category.module.css'
import { useState } from 'react'
import { Category } from '@/types/categories'
import deleteIcon from '../../../public/assets/svgs/delete.svg'
import Image from 'next/image'
import Dialog from '../Dialog/Dialog'
import Button from '../Button/Button'

const Category: React.FC<{ category: Category, setCategories: Function }> = ({ category, setCategories }) => {
  const [title, setTitle] = useState<string>(category.title)
  const [showCategory, setShowCategory] = useState<boolean>(category.show)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showButtons, setShowButtons] = useState<boolean>(false)

  const updateCategory = async () => {
    const updatedCategory = {
      id: category.id,
      title: title,
      show: showCategory
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
    setShowButtons(false)
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
    hideDialogHandler()
  }

  const showDialogHandler = () => {
    document.body.classList.add("stop-scrolling")
    setShowDialog(true)
  }

  const hideDialogHandler = () => {
    document.body.classList.remove("stop-scrolling")
    setShowDialog(false)
  }

  return (
    <>
    {showDialog && <Dialog closeFnc={hideDialogHandler} submitFnc={deleteCategory} />}
    <div className={Styles.category}>
      <input className={`${Styles.title} ${!category.show && Styles.titleHidden}`} onClick={() => setShowButtons(true)} type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Enter Category Name' />
      <div className={Styles.switcher} onClick={() => setShowButtons(true)}>
        <input className={Styles.checkbox} type="checkbox" name="show-category" id={category.id} checked={showCategory} onChange={(event) => setShowCategory(event.target.checked)} />
        <label className={Styles.label} htmlFor={category.id}></label>
      </div>
      {!category.isNotDelete && <Image className={Styles.deleteButton} src={deleteIcon} alt='delete-icon' onClick={() => showDialogHandler()} />}
    </div>
    {showButtons &&
     <div className={Styles.buttonsWrapper}>
       <div className={Styles.buttons}>
        <Button type='save' clickFnc={() => updateCategory()} />
        <Button type='cancel' clickFnc={() => setShowButtons(false)} />
      </div>
     </div>
    }
    </>
  )
}

export default Category