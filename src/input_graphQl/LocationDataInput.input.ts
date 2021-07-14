import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { Geometry } from 'geojson';
import { GeoJSONPoint } from 'src/scalar/GeoJSONPoint.scalar';

@InputType()
export class LocationDataInput {
	@IsString()
	@Field()
	name!: string;

	@IsNumber()
	@Type(() => Number)
	@Field(() => ID)
	locationGroupId!: number;

	@IsObject()
	@Field(() => GeoJSONPoint)
	coordinate!: Geometry;

	@IsNumber()
	@Type(() => Number)
	@Field()
	order_number!: number;
}
