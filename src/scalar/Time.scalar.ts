import { GraphQLScalarType } from 'graphql';

export const Time = new GraphQLScalarType({
	name: 'Time',
	description: 'UTC timestamp with timezone. output is ISOString',
	parseValue(value) {
		return value;
	},

	serialize(value) {
		const createdTime = new Date(value);

		if (createdTime.toString() == 'invalid Date') {
			return null;
		}

		return createdTime.toISOString();
	},

	parseLiteral(ast) {
		return ast;
	}
});
