import Styles from './Category.module.css'
import { useState } from 'react'
import { Category } from '@/types/categories'
import deleteIcon from '../../../public/assets/svgs/delete.svg'
import dragAndDropIcon from '../../../public/assets/svgs/drag.svg'
import Image from 'next/image'
import Dialog from '../Dialog/Dialog'
import Button from '../Button/Button'
import { DraggableStateSnapshot } from 'react-beautiful-dnd'

const Category: React.FC<{category: Category, setCategories: Function, setFilteredCategories: Function, snapshot: DraggableStateSnapshot}> = ({ category, setCategories, setFilteredCategories, snapshot }) => {
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
    const categories = await response.json()
    setCategories(categories)
    setFilteredCategories(categories)
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
      <input className={`${Styles.title} ${!showCategory && Styles.titleHidden}`} type="text" value={title} onChange={(event) => {setTitle(event.target.value); setShowButtons(true)}} placeholder='Enter Category Name' />
      <div className={Styles.switcher} onClick={() => setShowButtons(true)}>
        <input className={Styles.checkbox} type="checkbox" name="show-category" id={category.id} checked={showCategory} onChange={(event) => setShowCategory(event.target.checked)} />
        <label className={Styles.label} htmlFor={category.id}></label>
      </div>
      {!category.isNotDelete && <Image className={Styles.deleteButton} src={deleteIcon} alt='delete-icon' onClick={() => showDialogHandler()} />}
      <Image className={`${Styles.dragAndDropButton} ${snapshot.isDragging && Styles.dragAndDropButtonActive}`} src={dragAndDropIcon} alt='drag-and-drop-icon' />
    </div>
    {showButtons &&
     <div className={Styles.buttonsWrapper}>
       <div className={Styles.buttons}>
        <Button type='save' clickFnc={() => updateCategory()} disabled={!Boolean(title)} />
        <Button type='cancel' clickFnc={() => {setShowButtons(false); setShowCategory(category.show); setTitle(category.title) }} />
      </div>
     </div>
    }
    </>
  )
}

export default Category