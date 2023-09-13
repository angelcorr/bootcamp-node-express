const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!,
    firstName: String!,
    lastName: String!,
    email: String!,
  }

  type Currency {
    id: ID!,
    type: String!,
    code: String
  }

  type Exchange {
    currency: Currency!,
    date: Date,
    rate: Int
  }

  type Account {
    id: ID!,
    capital: Float
    user: User!
    currency: Currency!
  }

  type Transaction {
    id: ID!,
    sourceAccount: Account!,
    deliverAccount: Account!,
    time: Date,
    description: String!,
    amount: Int,
    sourceCurrency: Currency,
    deliverCurrency: Currency,
    sourceExchange: Exchange,
    deliverExchange: Exchange,
  }

  type Query {
    transactions(page: Int, pageSize: Int, userId: ID, dateFrom: String, dateTo: String, accountId: ID, sortBy: String, sortOrder: String): [Transaction!]
    user(id: ID!): User!,
  }

  type Mutation {
    transaction(sourceAccountId: ID!, deliverAccountId: ID!, description: String!, amount: Int!): Transaction
  }
`;

export default typeDefs;
