import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      shortDescription
      longDescription
      price
      imageUrl
      rating
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      shortDescription
      longDescription
      price
      imageUrl
      rating
    }
  }
`;
