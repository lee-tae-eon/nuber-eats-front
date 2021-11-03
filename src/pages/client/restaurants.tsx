import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($Input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCnt
      }
    }
    # todo: isPromoted 추가
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        name
        id
        coverImg
        category {
          name
        }
        address
      }
    }
  }
`;

const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      Input: {
        page: 1,
      },
    },
  });
  if (!loading) {
    console.log(data);
  }
  return <div>hello</div>;
};

export default Restaurants;
