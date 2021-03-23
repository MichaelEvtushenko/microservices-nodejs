import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TestEntity } from './entity/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { TestDto } from './dto/test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class CoreService {
  private readonly items: TestEntity[];

  constructor() {
    this.items = [];
  }

  create(itemDto: CreateTestDto): TestDto {
    const isTitleTaken = !!this.items.find(item => item.title === itemDto.title);
    if (isTitleTaken) {
      throw new HttpException('Item\'s title has been already taken', HttpStatus.BAD_REQUEST);
    }

    const newEntity: TestEntity = {
      id: this.items.length + 1, title: itemDto.title, createdAt: new Date(),
    };

    this.items.push(newEntity);

    return newEntity;
  }

  update(itemDto: UpdateTestDto): TestDto {
    const index = this.items.findIndex(item => item.id === itemDto.id);
    if (index < 0) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    this.items[index].title = itemDto.title;

    return new TestDto(this.items[index]);
  }

  findAll(): TestDto[] {
    return this.items
      .map(item => new TestDto(item));
  }

  delete(id: number): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    this.items.splice(index, 1);
  }
}
