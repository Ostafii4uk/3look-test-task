import { Category } from '@/types/categories';

const { v4: uuidv4 } = require('uuid');

let categories: Category[] = [
  {
    id: '1',
    title: 'First Category',
    show: true
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
  }
}