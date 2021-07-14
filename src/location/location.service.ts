import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location_Group } from 'src/entities/location_group.entity';
import { Location } from 'src/entities/location.entity';
import { Repository } from 'typeorm/repository/Repository';
import { LocationGroupDataInput } from 'src/input_graphQl/LocationGroupDataInput.input';
import { LocationDataInput } from 'src/input_graphQl/LocationDataInput.input';
import { LocationGroupWhereInput } from 'src/input_graphQl/LocationGroupWhereInput.input';

@Injectable()
export class LocationService {
	constructor(
		@InjectRepository(Location_Group)
		private readonly LocationGroupRepository: Repository<Location_Group>,

		@InjectRepository(Location)
		private readonly LocationRepository: Repository<Location>
	) {}

	findLocationAll(): Promise<Location[]> {
		return this.LocationRepository.find({
			order: { order_number: 'DESC' }
		});
	}

	findLocationGroupAll(): Promise<Location_Group[]> {
		return this.LocationGroupRepository.find({
			order: { order_number: 'DESC' }
		});
	}

	findLocationGroup(id: number): Promise<Location_Group> {
		return this.LocationGroupRepository.findOne({
			id: id
		});
	}

	findLocation(id: number): Promise<Location> {
		return this.LocationRepository.findOne({
			id: id
		});
	}

	getGroup(data: LocationGroupWhereInput): Promise<Location_Group[]> {
		return this.LocationGroupRepository.createQueryBuilder('lg')
			.where('lg.name like :name', { name: `%${data.name}%` })
			.orderBy('lg.order_number', 'DESC')
			.getMany();
	}

	getDWithin(center: any): Promise<Location[]> {
		return this.LocationRepository.createQueryBuilder('l')
			.where(
				`ST_DWithin(coordinate :: geography, ST_SetSRID(ST_MakePoint(${center['coordinates'][0]}, ${center['coordinates'][1]}), 4326) :: geography, 5000, true)`
			)
			.orderBy('l.order_number', 'DESC')
			.getMany();
	}

	// getLocations(locationGroupId): Promise<Location[]> {
	// 	return this.LocationRepository.find({
	// 		where: {
	// 			location_group: locationGroupId
	// 		}
	// 	});
	// }

	// getLocationGroup(locationGroupId): Promise<Location_Group> {
	// 	return this.LocationGroupRepository.findOne({
	// 		id: locationGroupId
	// 	});
	// }

	setLocationGroup(data: LocationGroupDataInput): Promise<Location_Group> {
		const newGroup = this.LocationGroupRepository.create(data);
		return this.LocationGroupRepository.save(newGroup);
	}

	async setLocation(data: LocationDataInput): Promise<Location> {
		const findGroup = await this.LocationGroupRepository.findOne({
			id: data.locationGroupId
		});

		const locationGroup: Location_Group = new Location_Group();
		locationGroup.id = findGroup.id;

		const location: Location = new Location();
		location.name = data.name;
		location.order_number = data.order_number;
		location.coordinate = data.coordinate;
		location.location_group = locationGroup;

		const newLocation = this.LocationRepository.create(location);
		return this.LocationRepository.save(newLocation);
	}
}
