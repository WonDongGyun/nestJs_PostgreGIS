import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location_Group } from 'src/entities/location_group.entity';

@Injectable()
export class LocationDataLoader
	implements NestDataLoader<number, Location_Group>
{
	constructor(
		@InjectRepository(Location_Group)
		private readonly LocationGroupRepository: Repository<Location_Group>
	) {}

	generateDataLoader(): DataLoader<number, Location_Group> {
		return new DataLoader<number, Location_Group>(async (group_ids) => {
			const loader =
				await this.LocationGroupRepository.createQueryBuilder('lg')
					.where('lg.id IN (:...group_ids)', {
						group_ids
					})
					.getMany();

			const loaderNum = loader.reduce((acc, row) => {
				acc[row.id] = row;
				return acc;
			}, {});
			return group_ids.map((element) => loaderNum[element] || null);
		});
	}
}
