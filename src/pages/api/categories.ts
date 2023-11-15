import { Category } from '@/types/categories';

const { v4: uuidv4 } = require('uuid');

let categories: Category[] = [
  {
    id: uuidv4(),
    title: 'Other',
    show: true,
    isNotDelete: true
  }
]

export default function categoriesAPI (req: any, res: any) {
  if (req.method === "GET") {
    res.status(200).json(categories)
  }
  
  if (req.method === "POST") {
    const category: Category = {
      id: uuidv4(),
      title: '',
      show: false
    }

    categories.push(category)
    res.status(201).json(category)
  }
  
  if (req.method === "PATCH") {
    const udpdateCategories: Category[] = req.body.categories

    if (udpdateCategories.length !== categories.length) {
      const udpdatedCategories = categories.map(categoryItem => {
        const findedCategory = udpdateCategories.find(category => category.id === categoryItem.id)
        if (findedCategory) {
          return {
            ...categoryItem,
            title: findedCategory.title,
            show: findedCategory.show,
            isNotDelete: findedCategory.isNotDelete
          }
        } else {
          return categoryItem
        }
      })
      categories = udpdatedCategories
    } else {
      categories = udpdateCategories
    }

    res.status(201).json(categories)
  }
  
  if (req.method === "DELETE") {
    const categoryID: string = req.body.id

    categories = categories.filter(category => category.id !== categoryID)
    res.status(201).json(categories)
  }
}