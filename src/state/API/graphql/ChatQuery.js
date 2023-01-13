import { gql } from "@apollo/client";

export const FETCH_CONVERSATION = gql`
  query Query($query: ReaderInput) {
    readChat(query: $query) {
      success
      data {
        from
        to
        relationString
        payload {
          body
          types
        }
        isDeleted
        createdAt
        updatedAt
        isEncrypted
        encryptionAlgo
        integrity
        app
        fromImage
        fromName
      }
      message
      meta {
        pageNumber
        hasNextPage
        totalPages
        total
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Mutation($body: MessageInput) {
    saveChat(body: $body) {
      success
      message
      data {
        from
        to
        relationString
        payload {
          body
          types
        }
        isDeleted
        createdAt
        updatedAt
        isEncrypted
        encryptionAlgo
        integrity
        app
      }
    }
  }
`;

export const CHAT_SUBSCRIPTION = gql`
  subscription Subscription($toId: String, $fromId: String) {
    newChat(toId: $toId, fromId: $fromId) {
      success
      message
      data {
        from
        fromName
        fromImage
        to
        relationString
        payload {
          body
          types
        }
        isDeleted
        createdAt
        updatedAt
        isEncrypted
        encryptionAlgo
        integrity
        app
      }
    }
  }
`;
