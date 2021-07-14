import {
	Args,
	ID,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Location_Group } from 'src/entities/location_group.entity';
import { Location } from 'src/entities/location.entity';
import { LocationDataInput } from 'src/input_graphQl/LocationDataInput.input';
import { LocationGroupDataInput } from 'src/input_graphQl/LocationGroupDataInput.input';
import { LocationService } from './location.service';
import { LocationGroupWhereInput } from 'src/input_graphQl/LocationGroupWhereInput.input';
import { GeoJSONPoint } from 'src/scalar/GeoJSONPoint.scalar';
import { LocationGroupDataLoader } from 'src/loader/LocationGroupDataLoader.loader';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { LocationDataLoader } from 'src/loader/LocationDataLoader.loader';

@Resolver(() => Location)
export class LocationResolver {
	constructor(private readonly locationService: LocationService) {}

	// 모든 LocationGroup을 조회합니다. 하위의 Location도 같이 조회합니다.
	@Query(() => [Location])
	async AllLocation(): Promise<Location[]> {
		return this.locationService.findLocationAll();
	}

	// Location의 id로 Location을 조회하는 query입니다. 없을 경우 null을 리턴하면 됩니다.
	@Query(() => Location)
	async location(
		@Args('id', { type: () => ID }) id: number
	): Promise<Location> {
		return await this.locationService.findLocation(id);
	}

	// center input으로 들어온 GeoJSONPoint로 부터 5km 이내에 있는 Location들을 조회하는 query입니다.
	// ST_SetSrid, ST_DWithin를 검색해보세요.
	// ST_DWithin 쿼리를 사용할 때에는 geometry를 geography로 캐스팅하고 use_speriod = true로 하세요.
	@Query(() => [Location])
	async locationFromCenter(
		@Args('center', { type: () => GeoJSONPoint }) center: any
	): Promise<Location[]> {
		return this.locationService.getDWithin(center);
	}

	// Location을 생성하는 mutation입니다.
	@Mutation(() => Location)
	async createLocation(
		@Args('data') data: LocationDataInput
	): Promise<Location> {
		return await this.locationService.setLocation(data);
	}

	// DataLoader 활용전
	// @ResolveField(() => Location_Group)
	// location_group(@Parent() location: Location): Promise<Location_Group> {
	// 	return this.locationService.getLocationGroup(
	// 		location.location_group.id
	// 	);
	// }

	// DataLoader 활용
	@ResolveField(() => Location_Group)
	location_group(
		@Parent() location: Location,
		@Loader(LocationDataLoader.name)
		locationDataLoader: DataLoader<number, Location_Group>
	): Promise<Location_Group> {
		return locationDataLoader.load(location.location_group_id);
	}
}

@Resolver(() => Location_Group)
export class LocationGroupResolver {
	constructor(private readonly locationService: LocationService) {}

	// 모든 LocationGroup을 조회합니다. 하위의 Location도 같이 조회합니다.
	@Query(() => [Location_Group])
	async AllLocationGroup(): Promise<Location_Group[]> {
		return this.locationService.findLocationGroupAll();
	}

	// LocationGroup의 id로 Location을 조회하는 query입니다. 없을 경우 null을 리턴하면 됩니다.
	@Query(() => Location_Group)
	async locationGroup(
		@Args('id', { type: () => ID }) id: number
	): Promise<Location_Group> {
		return this.locationService.findLocationGroup(id);
	}

	// LocationGroup들을 조회하는 query입니다.
	// data 파라미터를 넣었을 경우에는 input으로 들어온 name을 LocationGroup의 name 필드에 대해 Like로 필터하여 리턴하면 됩니다.
	// name 필드에 들어온 문자열을 포함하는 name을 가진 LocationGroup들로 필터하면 됩니다.
	@Query(() => [Location_Group])
	async locationGroups(
		@Args('data') data: LocationGroupWhereInput
	): Promise<Location_Group[]> {
		return this.locationService.getGroup(data);
	}

	// LocationGroup을 생성하는 mutation입니다.
	@Mutation(() => Location_Group)
	async createLocationGroup(
		@Args('data') data: LocationGroupDataInput
	): Promise<Location_Group> {
		return await this.locationService.setLocationGroup(data);
	}

	// DataLoader 활용전
	// @ResolveField(() => [Location])
	// locations(@Parent() location_group: Location_Group): Promise<Location[]> {
	// 	return this.locationService.getLocations(location_group.id);
	// }

	// DataLoader 활용
	@ResolveField(() => [Location])
	locations(
		@Parent() location_group: Location_Group,
		@Loader(LocationGroupDataLoader.name)
		locationGroupDataLoader: DataLoader<number, Location[]>
	): Promise<Location[]> {
		return locationGroupDataLoader.load(location_group.id);
	}
}
