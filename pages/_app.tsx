import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../layout";
import { useState } from "react";
import { MainContext } from "../context";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/api";

function MyApp({ Component, pageProps }: AppProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setFavorite] = useState(false);

  const favoriteToggle = () => setFavorite((prev) => !prev);

  const handleSetFavorites = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((value) => value != id));
    } else {
      setFavorites((prev) => [...prev, id]);
    }
  };

  return (
    <ApolloProvider client={client}>
      <MainContext.Provider
        value={{
          favorites,
          handleFavoritePressed: handleSetFavorites,
          isFavorite,
          viewToggle: favoriteToggle,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MainContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
