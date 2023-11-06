import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { Category } from '@/types/categories'

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
    <div>
      <Button type='create' clickFnc={createNewCategory} />
      <ul>
        {categories.map(category => {
          return (
            <li>{category.id}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories