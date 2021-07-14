import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId
} from 'typeorm';
import { Location_Group } from './location_group.entity';
import { Geometry } from 'geojson';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GeoJSONPoint } from 'src/scalar/GeoJSONPoint.scalar';
import { Time } from 'src/scalar/Time.scalar';

@ObjectType()
@Entity('location')
export class Location {
	@Field(() => ID)
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Field(() => String)
	@Column({ type: 'varchar' })
	name: string;

	@Field(() => GeoJSONPoint)
	@Column({
		type: 'geometry',
		nullable: true,
		spatialFeatureType: 'Point',
		srid: 4326
	})
	coordinate: Geometry;

	@Field(() => Int)
	@Column({ type: 'int' })
	order_number: number;

	@Field(() => Time)
	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@Field(() => Location_Group)
	@ManyToOne(
		() => Location_Group,
		(location_group) => location_group.locations
	)
	@JoinColumn([{ name: 'location_group_id' }])
	location_group: Location_Group;

	@RelationId((location: Location) => location.location_group)
	location_group_id: number;
}
