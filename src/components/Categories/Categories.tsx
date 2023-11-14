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

  const searchCategories = (param: string) => {
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
        setCategories(data)
        setFilteredCategories(data)
      })
  }

  const reorderTasks = (categories: Category[], startIndex: number, endIndex: number) => {
    const updatedCategories = [...categories]
    const [removedCategory] = updatedCategories.splice(startIndex, 1)
    updatedCategories.splice(endIndex, 0, removedCategory)
    
    return updatedCategories
  }

  const onDragEnd = (result: any) => {
    const { source, destination} = result

    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    const updatedCategories = reorderTasks(categories, source.index, destination.index)

    setCategories(updatedCategories)
    setFilteredCategories(updatedCategories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <CustomHeader searchCategories={searchCategories} />
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
                  <Draggable draggableId={category.id} index={index} key={category.id}>
                    {(provide, snapshot) => (
                      <div className={Styles.categoryConteiner} ref={provide.innerRef} {...provide.draggableProps} {...provide.dragHandleProps}>
                        <CategoryComponent category={category} setCategories={setCategories} setFilteredCategories={setFilteredCategories} snapshot={snapshot} />
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
    </>
    
  )
}

export default Categories