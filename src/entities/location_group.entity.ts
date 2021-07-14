import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Time } from 'src/scalar/Time.scalar';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Location } from './location.entity';

@ObjectType()
@Entity('location_group')
export class Location_Group {
	@Field(() => ID)
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Field(() => String)
	@Column({ type: 'varchar' })
	name: string;

	@Field(() => Int)
	@Column({ type: 'int' })
	order_number: number;

	@Field(() => Time)
	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@Field(() => [Location])
	@OneToMany(() => Location, (location) => location.location_group, {
		onDelete: 'CASCADE'
	})
	locations: Location[];
}
