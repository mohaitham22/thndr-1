// "use client";
// import { Card } from "antd";
// import React, { useEffect, useState } from "react";
// import SearchComponent from "../Components/Search";

// const { Meta } = Card;

// type Movie = {
//   Title: string;
//   Year: string;
//   imdbID: string;
//   Type: string;
//   Poster: string;
// };

// type SearchResponse = {
//   Search?: Movie[];
//   totalResults: string;
//   Response: string;
//   Error?: string;  
// };

// export default function Movies() {
//   const [data, setData] = useState<SearchResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = (query: string) => {
//     setLoading(true);
//     setError(null);  

//     fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${query}`)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.Response === "True") {
//           setData(result);
//         } else {
//           setError(result.Error || "Movie not found");
//           setData(null);
//         }
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchData("ted-lasso"); 
//   }, []);

//   const handleSearch = (value: string) => {
//     fetchData(value);
//   };

//   function renderMovies() {
//     return data?.Search?.map((film: Movie) => (
//       <Card
//         key={film.imdbID}
//         hoverable
//         style={{ width: 240, marginBottom: 20 }}
//         cover={
//           <img
//             alt={`${film.Title} Poster`}
//             src={film.Poster !== "N/A" ? film.Poster : "default-image-url.jpeg"}
//           />
//         }
//       >
//         <Meta title={film.Title} description={film.Year} />
//       </Card>
//     ));
//   }

//   return (
//     <main style={{ padding: '20px' }}>
//       <SearchComponent onSearch={handleSearch} loading={loading} />
//       {loading && <h1>Loading...</h1>}
//       {error && <h1>{error}</h1>}
//       {!loading && !error && renderMovies()}
//     </main>
//   );
// }


















// "use client";
// import { Card } from "antd";
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import SearchComponent from "../Components/Search";

// const { Meta } = Card;

// type Movie = {
//   Title: string;
//   Year: string;
//   imdbID: string;
//   Type: string;
//   Poster: string;
// };

// type SearchResponse = {
//   Search?: Movie[];
//   totalResults: string;
//   Response: string;
//   Error?: string;  
// };

// const fetchMovies = async (query: string): Promise<SearchResponse> => {
//   const response = await fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${query}`);
//   return response.json();
// };

// export default function Movies() {
//   const [searchQuery, setSearchQuery] = React.useState("ted-lasso");

//   const { data, error, isLoading } = useQuery<SearchResponse>({
//     queryKey: ["movies", searchQuery],
//     queryFn: () => fetchMovies(searchQuery),
//     enabled: !!searchQuery, // Only run query if searchQuery is not empty
//   });

//   const handleSearch = (value: string) => {
//     setSearchQuery(value);
//   };

//   function renderMovies() {
//     return data?.Search?.map((film: Movie) => (
//       <Card
//         key={film.imdbID}
//         hoverable
//         style={{ width: 240, marginBottom: 20 }}
//         cover={
//           <img
//             alt={`${film.Title} Poster`}
//             src={film.Poster !== "N/A" ? film.Poster : "default-image-url.jpeg"}
//           />
//         }
//       >
//         <Meta title={film.Title} description={film.Year} />
//       </Card>
//     ));
//   }

//   return (
//     <main style={{ padding: '20px' }}>
//       <SearchComponent onSearch={handleSearch} loading={isLoading} />
//       {isLoading && <h1>Loading...</h1>}
//       {error && <h1>{(error as Error).message}</h1>}
//       {!isLoading && !error && renderMovies()}
//     </main>
//   );
// }














"use client";
import React, { useState, useEffect } from "react";
import { Spin, Card, Input, Empty } from "antd";
import { useInfiniteQuery } from "@tanstack/react-query";

const { Search } = Input;
const { Meta } = Card;

type MovieType = "movie" | "series" | "episode";
type Movie = {
  Title: string;
  Year: number;
  imdbID: string;
  Type: MovieType;
  Poster: string;
};

type SearchResponse = {
  Search?: Movie[];
  totalResults: string;
  Response: string;
};

async function fetchMovies({ queryKey, pageParam = 1 }: { queryKey: string[]; pageParam?: number }) {
  const searchTerm = queryKey[0];
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=8bdf708a&s=${searchTerm}&page=${pageParam}`
  );
  const data = await response.json();
  return { ...data, page: pageParam };
}

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [searchTerm],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      const totalResults = parseInt(lastPage.totalResults);
      const maxPages = Math.ceil(totalResults / 10);
      if (lastPage.page < maxPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!searchTerm,
  });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  function renderMovies() {
    if (!data?.pages.length || data.pages[0]?.Response === "False") {
      return <Empty />;
    } else {
      return data.pages.flatMap((page) =>
        page.Search?.map((movie: Movie) => (
          <Card
            key={movie.imdbID}
            hoverable
            style={{ width: 240, marginBottom: "20px" }}
            cover={<img alt={movie.Title} src={movie.Poster} />}
          >
            <Meta title={movie.Title} description={movie.Year} />
          </Card>
        )) || []
      );
    }
  }

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton
        size="large"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <div>{isLoading ? <Spin /> : renderMovies()}</div>
      {isFetchingNextPage && <Spin style={{ marginTop: 20 }} />}
    </>
  );
}
