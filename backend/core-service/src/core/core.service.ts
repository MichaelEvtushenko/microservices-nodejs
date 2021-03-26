import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CoreEntity } from './entity/core.entity';
import { CreateCoreDto } from './dto/create-core.dto';
import { CoreDto } from './dto/core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';
import Axios, { AxiosResponse } from 'axios';

@Injectable()
export class CoreService {
  private readonly items: CoreEntity[];

  constructor() {
    this.items = [];
  }

  create(itemDto: CreateCoreDto): CoreDto {
    const isTitleTaken = !!this.items.find(item => item.title === itemDto.title);
    if (isTitleTaken) {
      throw new HttpException('Item\'s title has already been existing', HttpStatus.BAD_REQUEST);
    }

    const newEntity: CoreEntity = {
      id: this.items.length + 1, title: itemDto.title, createdAt: new Date(),
    };

    this.items.push(newEntity);

    return newEntity;
  }

  update(itemDto: UpdateCoreDto): CoreDto {
    const index = this.items.findIndex(item => item.id === itemDto.id);
    if (index < 0) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    this.items[index].title = itemDto.title;

    return new CoreDto(this.items[index]);
  }

  async findAll(): Promise<CoreDto[]> {
    const axiosInstance = Axios.create({
      baseURL: 'http://auth-svc:8001', // auth service ip inside cluster
    });

    try {
      const resp: AxiosResponse = await axiosInstance.get('/api/auth/token');
      console.log('GET /api/auth/token succeeded with response:', resp.data);
    } catch (err) {
      console.error('GET /api/auth/token FAILED with error message: ', err.message);
      // throw new HttpException(err.message, 500);
    }

    return this.items
      .map(item => new CoreDto(item));
  }

  delete(id: number): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    this.items.splice(index, 1);
  }
}
