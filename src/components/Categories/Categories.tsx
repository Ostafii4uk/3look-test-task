import Styles from './Categories.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { Category } from '@/types/categories'
import CategoryComponent from '@/components/Category/Category'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
import Loader from '@/components/Loader/Loader'

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

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <CustomHeader searchCategories={searchCategories} />
      <div className={Styles.categories}>
        <Button type='create' clickFnc={createNewCategory} />
        <ul className={Styles.categoriesList}>
          {loading && <Loader />}
          {!loading && !filteredCategories.length && <li>Categories not found</li>}
          {!loading && filteredCategories.map(category => <CategoryComponent category={category} setCategories={setCategories} setFilteredCategories={setFilteredCategories} key={category.id} />)}
        </ul>
      </div>
    </>
    
  )
}

export default Categories