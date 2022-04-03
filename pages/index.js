import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  useQuery,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  GET_LIMITTED_TOURNAMENTS,
  GET_ALL_TOURNAMENTS,
} from "../Graphql/Queries";
import Layout from "./Layout";
import Navbar from "../components/Navbar";
import { setAllTournaments } from "../store/tournamentStore/index";

export default function Home({ tournaments, allTournaments }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (tournaments) {
      setLoading(true);
      let localTournaments = localStorage.getItem("tournaments");
      localTournaments = JSON.parse(localTournaments);

      if (localTournaments && localTournaments.length > 0) {
        tournaments.forEach((x) => {
          const isTournamentExist = localTournaments.find((k) => k.id == x.id);
          if (!isTournamentExist) {
            localTournaments.push(x);
          }
        });
      } else {
        localTournaments = [...tournaments];
      }
      localStorage.setItem("tournaments", JSON.stringify(localTournaments));
    }
  }, [tournaments]);
  useEffect(() => {
    setLoading(false);
    if (allTournaments) {
      setLoading(true);
      const modifiedTournaments = [];
      allTournaments.forEach((x) => {
        if (x.name.includes("ฏ")) {
          modifiedTournaments.push({ ...x, name: "test" });
        } else {
          modifiedTournaments.push(x);
        }
      });
      dispatch(setAllTournaments(modifiedTournaments));
    }
  }, [allTournaments]);
  return (
    <>
      <Navbar />
      <Layout />
    </>
  );
}

export const getServerSideProps = async () => {
  const errorLink = onError(({ graphqlErrors }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "https://web.dev.daory.net/graphql" }),
  ]);

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  const { data: limittedData } = await client.query({
    query: GET_LIMITTED_TOURNAMENTS,
    variables: {
      count: 6,
      offset: 1,
    },
  });

  const { data: allData } = await client.query({
    query: GET_LIMITTED_TOURNAMENTS,
    variables: {
      count: 60,
      offset: 1,
    },
  });

  return {
    props: {
      tournaments: limittedData.listedTournaments,
      allTournaments: allData.listedTournaments,
    },
  };
};
