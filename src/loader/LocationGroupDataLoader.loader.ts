import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location_Group } from 'src/entities/location_group.entity';
import { Location } from 'src/entities/location.entity';

@Injectable()
export class LocationGroupDataLoader
	implements NestDataLoader<number, Location[]>
{
	constructor(
		@InjectRepository(Location_Group)
		private readonly LocationGroupRepository: Repository<Location_Group>
	) {}

	generateDataLoader(): DataLoader<number, Location[]> {
		return new DataLoader<number, Location[]>(async (locations_ids) => {
			const loader =
				await this.LocationGroupRepository.createQueryBuilder('lg')
					.leftJoinAndSelect('lg.locations', 'locations')
					.where('lg.id IN (:...locations_ids)', { locations_ids })
					.orderBy('lg.order_number', 'DESC')
					.getMany();
			return loader.map((element) => element.locations || null);
		});
	}
}
