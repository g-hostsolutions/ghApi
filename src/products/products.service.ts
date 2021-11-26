import { Injectable } from '@nestjs/common'
import { VehiclesService } from 'src/vehicles/vehicles.service'
import { HttpService } from '@nestjs/axios'
import { ProductReturn } from './types/prodReturnType.types'

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
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly httpService: HttpService,
  ) {}

  async handleResponse(resp: any, source: string): Promise<ProductReturn[]> {
    const response: ProductReturn[] = []
    switch (source) {
      case 'vec':
        for (const item of resp) {
          response.push({
            _id: item?._id,
            source: item?.type,
            price: item?.price,
            image: item?.image || '',
            description: `${item?.color} ${item?.plate}`,
          })
        }
        break
      case 'bec':
        for (const item of resp?.data?.books) {
          response.push({
            _id: item?.isbn13,
            source: item?.url,
            price: item?.price,
            image: item?.image || '',
            description: item?.title,
          })
        }
        break
    }

    return response
  }

  findAllSoucers() {
    return sources
  }

  async findAll(source: string) {
    let response = []
    switch (source) {
      case 'vec':
        const vecResp = await this.vehiclesService.findAll()
        response = await this.handleResponse(vecResp, source)
        break
      case 'bec':
        const becResp = await this.httpService
          .get(`https://api.itbook.store/1.0/new`)
          .toPromise()

        response = await this.handleResponse(becResp, source)
        break
    }

    return response
  }

  async findOne(source: string, search: string) {
    let response = []
    switch (source) {
      case 'vec':
        const vecResp = await this.vehiclesService.find(search)
        response = await this.handleResponse(vecResp, source)
        break
      case 'bec':
        const becResp = await this.httpService
          .get(`https://api.itbook.store/1.0/search/${search}`)
          .toPromise()

        response = await this.handleResponse(becResp, source)
        break
    }

    return response
  }
}
