import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @ApiProperty({ example: '9875654521' })
  readonly mobileNumber: string;

  @IsNotEmpty()
  @ApiProperty({ example: '91' })
  readonly countryCode: string;
}
export class SendEmailOtpDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  readonly email: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '8451' })
  @ValidateIf((o) => o.emailOtp === null || o.emailOtp === undefined)
  @IsOptional()
  readonly mobileOtp: string;

  @ApiProperty({ example: '8451' })
  @ValidateIf((o) => o.mobileOtp === null || o.mobileOtp === undefined)
  @IsOptional()
  readonly emailOtp: string;
}
