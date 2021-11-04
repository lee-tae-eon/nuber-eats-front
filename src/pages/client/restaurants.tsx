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
    restaurants(input: $Input) {
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
  const { data, loading } = useQuery<
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
  return (
    <div>
      <div>
        <input type="Search" placeholder="Search restaurants....." />
      </div>
    </div>
  );
};

export default Restaurants;
