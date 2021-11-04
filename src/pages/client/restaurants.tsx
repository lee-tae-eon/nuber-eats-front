import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { url } from "inspector";
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
      <div className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="input rounded-md border-0 w-4/12"
          type="Search"
          placeholder="Search restaurants....."
        />
      </div>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8">
          <div className="flex justify-around max-w-screen-xs mx-auto">
            {data?.allCategories?.categories?.map((category) => (
              <div
                className=" w-12 h-12 rounded-full bg-red-500"
                style={{ backgroundImage: `url(${category.coverImg})` }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
