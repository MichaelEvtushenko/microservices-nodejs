import { CreateCoreDto } from './create-core.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateCoreDto extends PickType(CreateCoreDto, ['title']) {
  id: number;
}
