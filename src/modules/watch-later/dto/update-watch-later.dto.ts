import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchLaterDto } from './create-watch-later.dto';

export class UpdateWatchLaterDto extends PartialType(CreateWatchLaterDto) {}
