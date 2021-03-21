/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserLists = /* GraphQL */ `
  query GetUserLists($id: ID!) {
    getUserLists(id: $id) {
      id
      name
      description
      sendHour
      isDisabled
      owner {
        id
        email
        lists {
          nextToken
        }
        createdAt
        updatedAt
      }
      messages {
        items {
          id
          text
          author
          source
          nextSendDate
          lastSentDate
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      lists {
        items {
          id
          name
          description
          sendHour
          isDisabled
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        lists {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      name
      description
      sendHour
      isDisabled
      owner {
        id
        email
        lists {
          nextToken
        }
        createdAt
        updatedAt
      }
      messages {
        items {
          id
          text
          author
          source
          nextSendDate
          lastSentDate
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        sendHour
        isDisabled
        owner {
          id
          email
          createdAt
          updatedAt
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      text
      author
      source
      nextSendDate
      lastSentDate
      list {
        id
        name
        description
        sendHour
        isDisabled
        owner {
          id
          email
          createdAt
          updatedAt
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        author
        source
        nextSendDate
        lastSentDate
        list {
          id
          name
          description
          sendHour
          isDisabled
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
