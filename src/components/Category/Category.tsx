import Styles from './Category.module.css'
import { useState } from 'react'
import { Category } from '@/types/categories'
import deleteIcon from '../../../public/assets/svgs/delete.svg'
import dragAndDropIcon from '../../../public/assets/svgs/drag.svg'
import Image from 'next/image'
import Dialog from '../Dialog/Dialog'
import { DraggableStateSnapshot } from 'react-beautiful-dnd'

const Category: React.FC<{
  categories: Category[],
  category: Category,
  setCategories: Function,
  setFilteredCategories: Function,
  snapshot: DraggableStateSnapshot,
  setShowButtons: Function,
  showButtons: boolean
}> = ({
  categories,
  category,
  setCategories,
  setFilteredCategories,
  snapshot,
  setShowButtons,
  showButtons
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const updateCategoryVisible = (value: boolean) => {
    const updatedCategories = categories.map(categoryItem => {
      if (categoryItem.id === category.id) {
        return {
          ...categoryItem,
          show: value
        }
      } else {
        return categoryItem
      }
    })

    setCategories(updatedCategories)
  }


  const updateCategoryTitle = (title: string) => {
    const updatedCategories = categories.map(categoryItem => {
      if (categoryItem.id === category.id) {
        return {
          ...categoryItem,
          title: title
        }
      } else {
        return categoryItem
      }
    })

    setCategories(updatedCategories)
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
        <input
          className={`${Styles.title} ${!category.show && Styles.titleHidden} ${showButtons && !category.title && Styles.titleWarning}`}
          type="text" value={category.title}
          onChange={(event) => {updateCategoryTitle(event.target.value); setShowButtons(true)}}
          placeholder={showButtons && !category.title ? 'Please Enter Category Name' : 'Enter Category Name'}
        />
        <div className={Styles.switcher} onClick={() => setShowButtons(true)}>
          <input className={Styles.checkbox} type="checkbox" name="show-category" id={category.id} checked={category.show} onChange={(event) => updateCategoryVisible(event.target.checked)} />
          <label className={Styles.label} htmlFor={category.id}></label>
        </div>
        {!category.isNotDelete && <Image className={Styles.deleteButton} src={deleteIcon} alt='delete-icon' onClick={() => showDialogHandler()} />}
        <Image className={`${Styles.dragAndDropButton} ${snapshot.isDragging && Styles.dragAndDropButtonActive}`} src={dragAndDropIcon} alt='drag-and-drop-icon' />
      </div>
    </>
  )
}

export default Category