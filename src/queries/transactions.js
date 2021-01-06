export const createTransaction = {
  query: `mutation create_transaction($transaction: transactions_insert_input!) {
    insert_transactions_one(object: $transaction) {
      id,
      artwork_id
    } 
  }`,
};

const fields = `
  id
  psbt
  amount 
  hash
  type
  created_at
  asset
  user {
    id
    username
    avatar_url
  } 
  artwork {
    id
    title
    filename
    bid {
      amount
      user {
        id
        username
      } 
    } 
  } 
`;

export const getArtworkTransactions = (id) => `subscription {
  transactions(order_by: {created_at: desc}, where: {artwork_id: {_eq: "${id}"}}, limit: 3) {
    ${fields}
  }
}`;


export const getTransaction = (id) => `subscription {
  transactions_by_pk(id: "${id}") {
    ${fields}
  }
}`;

export const getTransactions = `subscription {
  transactions(order_by: {created_at: desc}) {
    ${fields}
  }
}`;

export const getOffers = `subscription {
  offers {
    id
    amount 
    psbt
    artwork {
      id
      title
      filename
      bid {
        amount
        user {
          id
          username
        } 
      } 
    } 
  }
}`;

export const acceptOffer = {
  query: `mutation update_artwork($id: uuid!, $owner_id: uuid!, $amount: Int!, $psbt: String!) {
    update_artworks_by_pk(
      pk_columns: { id: $id }, 
      _set: { 
        owner_id: $owner_id,
        list_price: 0
      }
    ) {
      id
    }
    insert_transactions_one(object: {
      artwork_id: $id,
      type: "accept",
      amount: $amount,
      hash: "",
      psbt: $psbt
    }) {
      id,
      artwork_id
    } 
  }`,
};
