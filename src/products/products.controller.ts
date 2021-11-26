import { Controller, Get, Param } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllSources() {
    return this.productsService.findAllSoucers()
  }

  @Get(':source')
  findAll(@Param('source') source: string) {
    return this.productsService.findAll(source)
  }

  @Get(':source/:search')
  findOne(@Param('source') source: string, @Param('search') search: string) {
    return this.productsService.findOne(source, search)
  }
}
