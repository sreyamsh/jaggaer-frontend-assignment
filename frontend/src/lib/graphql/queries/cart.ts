import { gql } from '@apollo/client';

export const GET_CART = gql`
  query GetCart {
    cart {
      items {
        id
        productId
        quantity
        product {
          id
          name
          price
          imageUrl
          shortDescription
        }
      }
      count
      total
    }
  }
`;

export const GET_CART_COUNT = gql`
  query GetCartCount {
    cartCount
  }
`;
