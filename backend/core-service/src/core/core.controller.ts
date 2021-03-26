import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateCoreDto } from './dto/create-core.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCoreDto } from './dto/update-core.dto';
import { CoreService } from './core.service';
import { CoreDto } from './dto/core.dto';

@Controller('/api/core')
@ApiTags('Core')
export class CoreController {
  constructor(private service: CoreService) {
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns list of items. Makes a fake request to auth service.',
    type: CoreDto,
    isArray: true,
  })
  findAllItems(): Promise<CoreDto[]> {
    return this.service.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'The item has been successfully created.', type: CoreDto })
  createItem(@Body() itemDto: CreateCoreDto): CoreDto {
    return this.service.create(itemDto);
  }

  @Put()
  @ApiOkResponse({ description: 'The item has been successfully updated.', type: CoreDto })
  updateItem(@Body() itemDto: UpdateCoreDto): CoreDto {
    return this.service.update(itemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The item has been successfully removed.' })
  deleteItem(@Param('id', ParseIntPipe) id: number): void {
    this.service.delete(id);
  }
}
