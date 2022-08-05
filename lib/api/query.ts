import { gql } from "@apollo/client";
import { client } from "./index";

export const GET_BUSINESS = gql`
query getBusiness($term: String, $location: String, $limit: Int) {
    search(term: $term, location: $location, limit: $limit) {
      business {
        id
        name
        price
        photos
        rating
        categories {
          title
        }
        location {
          state
          country
          city
          address1
          address2
          address3
          postal_code
        }
      }
    }
  }`

export interface IGetBusinessRequest {
    term:string,
    location:string,
    limit:number
}

export const getBusinessQuery = async ({term,location,limit}:IGetBusinessRequest) => {
    return await client.query({
        query: GET_BUSINESS,
        variables: {
            term,
            location,
            limit
        },
      });
  }

  