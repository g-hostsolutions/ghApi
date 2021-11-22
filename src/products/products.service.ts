import { Injectable } from '@nestjs/common'

const sources = [
  {
    _id: 'vec',
    source: 'Veículos & Cia.',
    image:
      'https://image.freepik.com/free-vector/group-vehicles_1308-33306.jpg',
  },
  {
    _id: 'bec',
    source: 'Livros & Cia.',
    image:
      'https://media.istockphoto.com/photos/female-student-searching-for-books-in-the-book-store-picture-id1149119293?b=1&k=20&m=1149119293&s=170667a&w=0&h=n-r6pkzNSD9eSn_D1QM54gsgMHkHK-pOGdOqg8LlWis=',
  },
]

@Injectable()
export class ProductsService {
  findAllSoucers() {
    return sources
  }

  findAll(source: string) {
    return `This action returns all products from a source #${source}`
  }

  findOne(source: string, id: string) {
    return `This action returns a #${id} product from a id source #${source}`
  }
}
