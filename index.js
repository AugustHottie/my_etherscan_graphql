const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const EtherDataSource = require('./datasource/ethDatasource');
require('dotenv').config();

// Resolver map 
const resolvers = {
  Query: {
    // Get ether balance for an address
    etherBalanceByAddress: (root, args, {dataSources}) => {
      return dataSources.etherDataSource.etherBalanceByAddress();
    },

    // Get total ether supply
    totalSupplyOfEther: (root, args, {dataSources}) => {
      return dataSources.etherDataSource.totalSupplyOfEther();
    },
    
    // Get latest Ethereum price
    latestEthereumPrice: (root, args, {dataSources}) => {
      return dataSources.etherDataSource.getLatestEthereumPrice();
    },

    // Get estimated block confirmation time
    blockConfirmationTime: (root, args, {dataSources}) => {
      return dataSources.etherDataSource.getBlockConfirmationTime();
    }
  }
};

// Initialize Apollo Server 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    // Instantiate EtherDataSource
    return {
      etherDataSource: new EtherDataSource()
    };
  }
});

// Start the server
server.listen('9000').then(({ url }) => {
  console.log(`🚀Server ready at ${url}`);
});
