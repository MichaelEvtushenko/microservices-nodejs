import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'Access JWT to allow perform authorized operations.' })
  readonly token: string;
}
