import { CoreEntity } from '../entity/core.entity';

export class CoreDto {
  readonly id: number;
  readonly title: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;

  constructor(entity: CoreEntity) {
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
