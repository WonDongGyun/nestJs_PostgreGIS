import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LocationGroupWhereInput {
	@IsString()
	@Field()
	name!: string;
}
