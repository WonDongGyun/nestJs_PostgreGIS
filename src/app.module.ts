import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location_Group } from './entities/location_group.entity';
import { Location } from './entities/location.entity';
import { LocationModule } from './location/location.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gpl',
			buildSchemaOptions: {
				dateScalarMode: 'isoDate',
				numberScalarMode: 'integer'
			}
		}),
		TypeOrmModule.forFeature([Location_Group, Location]),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: '1234',
			database: 'mydatabase',
			entities: [Location, Location_Group],
			logging: ['query'],
			synchronize: true
		}),
		LocationModule
	]
})
export class AppModule {}
