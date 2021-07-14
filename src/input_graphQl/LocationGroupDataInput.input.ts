import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class LocationGroupDataInput {
	@IsString()
	@Field()
	name!: string;

	@IsNumber()
	@Type(() => Number)
	@Field()
	order_number!: number;
}
