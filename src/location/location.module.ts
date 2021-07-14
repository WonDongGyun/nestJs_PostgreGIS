import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location_Group } from 'src/entities/location_group.entity';
import { Location } from 'src/entities/location.entity';
import { LocationGroupResolver, LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
import { LocationGroupDataLoader } from 'src/loader/LocationGroupDataLoader.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { LocationDataLoader } from 'src/loader/LocationDataLoader.loader';

@Module({
	imports: [TypeOrmModule.forFeature([Location_Group, Location])],
	providers: [
		// resolver
		LocationResolver,
		LocationGroupResolver,

		// service
		LocationService,

		// dataloader
		LocationGroupDataLoader,
		LocationDataLoader,
		{
			provide: APP_INTERCEPTOR,
			useClass: DataLoaderInterceptor
		}
	]
})
export class LocationModule {}
