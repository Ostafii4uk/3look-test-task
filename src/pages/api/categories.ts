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
    const udpatedCategories: Category[] = req.body.categories

    categories = udpatedCategories
    res.status(201).json(categories)
  }
  
  if (req.method === "DELETE") {
    const categoryID: string = req.body.id

    categories = categories.filter(category => category.id !== categoryID)
    res.status(201).json(categories)
  }
}