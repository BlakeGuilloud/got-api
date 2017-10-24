const fetch = require('node-fetch');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const fetchData = url => url ? fetch(url)
  .then(response => response.json()) : null;

const filterNullValues = values => values
  .filter(value => !!value === true);

const AliasType = new GraphQLObjectType({
  name: 'Aliases',

  fields: () => ({
    alias: {
      type: GraphQLString,
      resolve: alias => alias,
    },
  }),
});

const TitleType = new GraphQLObjectType({
  name: 'Titles',

  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: title => title,
    },
  }),
});

const SwornMembersType = new GraphQLObjectType({
  name: 'swornMembers',
  fields: () => ({
    member: {
      type: CharacterType,
      resolve: data => fetchData(data),
    },
  }),
});

const HouseType = new GraphQLObjectType({
  name: 'House',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    region: {
      type: GraphQLString,
    },
    coatOfArms: {
      type: GraphQLString,
    },
    founded: {
      type: GraphQLString,
    },
    titles: {
      type: new GraphQLList(TitleType),
      resolve: args => filterNullValues(args.titles),
    },
    currentLord: {
      type: CharacterType,
      resolve: args => fetchData(args.currentLord),
    },
    heir: {
      type: CharacterType,
      resolve: args => fetchData(args.heir),
    },
    swornMembers: {
      type: new GraphQLList(SwornMembersType),
      resolve: args => args.swornMembers,
    }
  }),
})

const HousesType = new GraphQLObjectType({
  name: 'Houses',
  fields: () => ({
    house: {
      type: HouseType,
      resolve: data => fetchData(data),
    },
  }),
})

const CharacterType = new GraphQLObjectType({
  name: 'Character',

  fields: () => ({
    name: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    allegiances: {
      type: new GraphQLList(HousesType),
      resolve: args => args.allegiances,
    },
    aliases: {
      type: new GraphQLList(AliasType),
      resolve: args => filterNullValues(args.aliases),
    },
    titles: {
      type: new GraphQLList(TitleType),
      resolve: args => filterNullValues(args.titles),
    },
    spouse: {
      type: CharacterType,
      resolve: args => fetchData(args.spouse),
    },
    father: {
      type: CharacterType,
      resolve: args => fetchData(args.father),
    },
    mother: {
      type: CharacterType,
      resolve: args => fetchData(args.mother),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
      character: {
        type: CharacterType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetchData(`https://www.anapioficeandfire.com/api/characters/${args.id}`),
      },
      house: {
        type: HouseType,
        args: {
          id: {
            type: GraphQLInt,
          },
        },
        resolve: (root, args) =>
          fetchData(`https://www.anapioficeandfire.com/api/houses/${args.id}`),
      }
    }),
  }),
});