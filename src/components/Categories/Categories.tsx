import Styles from './Categories.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { Category } from '@/types/categories'
import CategoryComponent from '@/components/Category/Category'

const Categories: React.FC<{}> = ({}) => {
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories = async () => {
    let response = await fetch("api/categories")
    setCategories(await response.json())
  }

  const createNewCategory = async () => {
    let response = await fetch("/api/categories", {
      method: "POST"
    })
    setCategories(await response.json())
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (  
    <div className={Styles.categories}>
      <Button type='create' clickFnc={createNewCategory} />
      <ul className={Styles.categoriesList}>
        {categories.map(category => {
          return (
            <CategoryComponent category={category} />
          )
        })}
      </ul>
    </div>
  )
}

export default Categories