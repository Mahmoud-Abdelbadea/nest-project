import {PartialType} from '@nestjs/mapped-types'
import { CreateProfileDto } from './createProfile.dto'

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}