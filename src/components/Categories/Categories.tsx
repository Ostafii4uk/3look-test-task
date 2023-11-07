import Styles from './Categories.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { Category } from '@/types/categories'
import CategoryComponent from '@/components/Category/Category'

const Categories: React.FC<{}> = ({}) => {
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories = async () => {
    const response = await fetch("api/categories")
    response.json()
      .then(data => setCategories(data))
  }

  const createNewCategory = async () => {
    const response = await fetch("/api/categories", {
      method: "POST"
    })
    response.json()
      .then(data => setCategories(data))
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className={Styles.categories}>
      <Button type='create' clickFnc={createNewCategory} />
      <ul className={Styles.categoriesList}>
        {categories.map(category => <CategoryComponent category={category} setCategories={setCategories} key={category.id} />)}
      </ul>
    </div>
  )
}

export default Categories