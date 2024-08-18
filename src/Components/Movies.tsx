"use client";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import SearchComponent from "../Components/Search";

const { Meta } = Card;

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type SearchResponse = {
  Search?: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;  
};

export default function Movies() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (query: string) => {
    setLoading(true);
    setError(null);  

    fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${query}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.Response === "True") {
          setData(result);
        } else {
          setError(result.Error || "Movie not found");
          setData(null);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData("ted-lasso"); 
  }, []);

  const handleSearch = (value: string) => {
    fetchData(value);
  };

  function renderMovies() {
    return data?.Search?.map((film: Movie) => (
      <Card
        key={film.imdbID}
        hoverable
        style={{ width: 240, marginBottom: 20 }}
        cover={
          <img
            alt={`${film.Title} Poster`}
            src={film.Poster !== "N/A" ? film.Poster : "default-image-url.jpeg"}
          />
        }
      >
        <Meta title={film.Title} description={film.Year} />
      </Card>
    ));
  }

  return (
    <main style={{ padding: '20px' }}>
      <SearchComponent onSearch={handleSearch} loading={loading} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {!loading && !error && renderMovies()}
    </main>
  );
}
