import { GraphQLScalarType } from 'graphql';

export const GeoJSONPoint = new GraphQLScalarType({
	name: 'GeoJSONPoint',
	description: 'Geometry scalar type',
	parseValue(value) {
		return value;
	},

	serialize(value) {
		return value;
	},

	parseLiteral(ast) {
		const geometryData = {
			type: '',
			coordinates: []
		};

		for (const i in ast['fields']) {
			if (ast['fields'][i]['name']['value'] == 'type') {
				if (ast['fields'][i]['value']['value'] != 'point') {
					return null;
				}
				geometryData.type = ast['fields'][i]['value']['value'];
			}

			if (ast['fields'][i]['name']['value'] == 'coordinate') {
				for (const j in ast['fields'][i]['value']['values']) {
					geometryData.coordinates.push(
						parseFloat(
							ast['fields'][i]['value']['values'][j]['value']
						)
					);
				}
			}
		}
		return geometryData;
	}
});
