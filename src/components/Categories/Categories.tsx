import Styles from './Categories.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { Category } from '@/types/categories'
import CategoryComponent from '@/components/Category/Category'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
import Loader from '@/components/Loader/Loader'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Categories: React.FC<{}> = ({}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showButtons, setShowButtons] = useState<boolean>(false)
  const [searchParam, setSearchParam] = useState<string>('')
  const categoriesHasEmptyTitle = filteredCategories.some(categoryItem => !categoryItem.title)
  const isAvailableDraggable = categories.length === filteredCategories.length

  const searchCategories = (param: string) => {
    setSearchParam(param)
    if (param === '') {
      setFilteredCategories(categories)
    } else {
      const result = categories.filter(category => category.title.toLowerCase().includes(param.toLowerCase()))
      setFilteredCategories(result)
    }
  }

  const getCategories = async () => {
    setLoading(true)
    const response = await fetch("api/categories")
    response.json()
      .then(data => {
        setCategories(data)
        setFilteredCategories(data)
        setLoading(false)
      })
  }

  const createNewCategory = async () => {
    const response = await fetch("/api/categories", {
      method: "POST"
    })
    response.json()
      .then(data => {
        setCategories([...categories, data])
        setFilteredCategories([...filteredCategories, data])
      })
  }

  const updateCategory = async () => {
    const response = await fetch("/api/categories", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categories: filteredCategories
      })
    })
    response.json()
      .then(data => {
        setCategories(data)
        setFilteredCategories(data)
        setShowButtons(false)
        setSearchParam('')
      })
  }

  const reorderCategory = (categories: Category[], startIndex: number, endIndex: number) => {
    const updatedCategories = [...categories]
    const [removedCategory] = updatedCategories.splice(startIndex, 1)
    updatedCategories.splice(endIndex, 0, removedCategory)
    
    return updatedCategories
  }

  const onDragEnd = (result: any) => {
    const { source, destination} = result

    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    const updatedCategories = reorderCategory(filteredCategories, source.index, destination.index)

    setFilteredCategories(updatedCategories)
    setShowButtons(true)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <CustomHeader searchCategories={searchCategories} searchParam={searchParam} />
      <div className={Styles.categories}>
        <div className={Styles.createButtonWrapper}>
          <Button type='create' clickFnc={createNewCategory} />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='categories-list'>
          {provided => (
            <ul className={Styles.categoriesList} ref={provided.innerRef} {...provided.droppableProps}>
              {loading && <Loader />}
              {!loading && !filteredCategories.length && <li>Categories not found</li>}
              {!loading && filteredCategories.map((category, index) => {
                return (
                  <Draggable draggableId={category.id} index={index} key={category.id} isDragDisabled={!isAvailableDraggable}>
                    {(provide, snapshot) => (
                      <div className={Styles.categoryConteiner} ref={provide.innerRef} {...provide.draggableProps} {...provide.dragHandleProps}>
                        <CategoryComponent
                          categories={filteredCategories}
                          category={category}
                          setCategories={setFilteredCategories}
                          setFilteredCategories={setFilteredCategories}
                          snapshot={snapshot}
                          setShowButtons={setShowButtons}
                          showButtons={showButtons}
                          isAvailableDraggable={isAvailableDraggable}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
          </Droppable>
        </DragDropContext>
      </div>
      {showButtons &&
      <div className={Styles.buttonsWrapper}>
        <div className={Styles.buttons}>
          <Button type='save' clickFnc={() => updateCategory()} disabled={categoriesHasEmptyTitle} />
          <Button type='cancel' clickFnc={() => {setShowButtons(false); setFilteredCategories(categories) }} />
        </div>
      </div>
      }
    </>
  )
}

export default Categories