import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTestDto } from './dto/update-test.dto';
import { CoreService } from './core.service';
import { TestDto } from './dto/test.dto';

@Controller('tests')
@ApiTags('tests')
export class CoreController {
  constructor(private service: CoreService) {
  }

  @Get()
  findAllItems(): TestDto[] {
    return this.service.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'The item has been successfully created.', type: CreateTestDto })
  createItem(@Body() itemDto: CreateTestDto): TestDto {
    return this.service.create(itemDto);
  }

  @Put()
  @ApiOkResponse({ description: 'The item has been successfully updated.', type: TestDto })
  updateItem(@Body() itemDto: UpdateTestDto): TestDto {
    return this.service.update(itemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The item has been successfully removed.' })
  deleteItem(@Param('id', ParseIntPipe) id: number): void {
    this.service.delete(id);
  }
}
