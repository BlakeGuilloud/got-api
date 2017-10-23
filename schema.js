const fetch = require('node-fetch');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const AliasType = new GraphQLObjectType({
  name: 'Aliases',
  description: '...',

  fields: () => ({
    alias: {
      type: GraphQLString,
      resolve: alias => alias,
    },
  }),
});

const TitleType = new GraphQLObjectType({
  name: 'Titles',
  description: '...',

  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: title => title,
    },
  }),
});

const FatherType = new GraphQLObjectType({
  name: 'Father',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: root => fetch(root)
        .then(response => response.json())
        .then(data => data.name)
    },
    gender: {
      type: GraphQLString,
    },
    aliases: {
      type: new GraphQLList(AliasType),
    },
    titles: {
      type: new GraphQLList(TitleType),
    },
  }),

})

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    aliases: {
      type: new GraphQLList(AliasType),
    },
    titles: {
      type: new GraphQLList(TitleType),
    },
    father: {
      type: FatherType,
    },
  }),
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '..',

    fields: () => ({
      character: {
        type: CharacterType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetch(`https://www.anapioficeandfire.com/api/characters/${args.id}`)
          .then(response => response.json())
      },
    }),
  }),
});