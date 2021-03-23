import { CreateTestDto } from './create-test.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateTestDto extends PickType(CreateTestDto, ['title']) {
  id: number;
}
