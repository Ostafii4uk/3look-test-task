import { Category } from '@/types/categories';

const { v4: uuidv4 } = require('uuid');

let categories: Category[] = [
  {
    id: '1',
    title: 'Other',
    show: true,
    isNotDelete: true
  }
]

export default function categoriesAPI (req: any, res: any) {
  if (req.method === "GET") {
    res.status(200).json(categories)
  } else if (req.method === "POST") {
    const category = {
      id: uuidv4(),
      title: '',
      show: false
    }

    categories.push(category)
    res.status(201).json(categories)
  } else if (req.method === "PATCH") {
    const udpatedCategory: Category = req.body
    const updatedCategories = categories.map((category: Category) => {
      if (category.id === udpatedCategory.id) {
        return {
          ...category,
          show: udpatedCategory.show,
          title: udpatedCategory.title
        }
      } else {
        return category
      }
    })

    categories = updatedCategories
    res.status(201).json(categories)
  } else if (req.method === "DELETE") {
    const categoryID: string = req.body.id

    categories = categories.filter(category => category.id !== categoryID)
    res.status(201).json(categories)
  }
}