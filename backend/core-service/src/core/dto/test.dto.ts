import { TestEntity } from '../entity/test.entity';

export class TestDto {
  readonly id: number;
  readonly title: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;

  constructor(entity: TestEntity) {
    const {
      id,
      title,
      createdAt,
      updatedAt,
    } = entity;

    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
