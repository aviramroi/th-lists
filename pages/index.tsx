import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { List } from "../components/List";
import { useContext, useState } from "react";
import { MainContext } from "../context";
import { IBusiness } from "../types";
import { Filter } from "../components/Filter";
import {
  getBusinessQuery,
  GET_BUSINESS,
  IGetBusinessRequest,
} from "../lib/api/query";
import { defaultSearch } from "../lib/constants";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

const Home = ({ business, ...props }: { business: IBusiness[] } & NextPage) => {
  const [list, setList] = useState(business);
  const router = useRouter();
  const [getBusiness, { loading }] = useLazyQuery(GET_BUSINESS);

  const { favorites, isFavorite } = useContext(MainContext);

  const favoritesFilter = (record: IBusiness) => {
    if (isFavorite) {
      return favorites.includes(record.id);
    }
    return true;
  };

  const fetchData = async ({ term, limit, location }: IGetBusinessRequest) => {
    const data = await getBusiness({
      variables: {
        term,
        limit,
        location,
      },
    });

    if (data.data) {
      router.push({
        pathname: "",
        query: {
          l: limit,
          t: term,
          p: location,
        },
      });
      setList(data.data.search.business);
    } else {
      // handle error
      alert(data.error?.message);
    }
  };

  return (
    <div className="flex-grow flex flex-col gap-3 relative h-full">
      <Head>
        <title>Take home task</title>
        <meta name="description" content="Built by AR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isFavorite ? (
        <div className=" h-12 pt-3" />
      ) : (
        <Filter refetch={fetchData} />
      )}
      <List business={list.filter(favoritesFilter)} loading={loading} />
    </div>
  );
};

export async function getServerSideProps(
  props: GetServerSideProps & { query: { [key: string]: string } }
) {
  const { query } = props;

  const data = await getBusinessQuery({
    term: query.t ?? defaultSearch.term,
    location: query.p ?? defaultSearch.location,
    limit: query.l ? +query.l : defaultSearch.limit,
  });

  return {
    props: data.data.search ?? { business: [] },
  };
}

export default Home;
