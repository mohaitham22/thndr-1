"use client";  // Ensure this is at the top of the file

import { Card } from "antd";
import React, { useEffect } from "react";

const { Meta } = Card;

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type Search = {
  Search: Movie[];
  totalResults: string;
  Response: string;
};

export default function Movies() {
  const [data, setData] = React.useState<Search | null>(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("https://www.omdbapi.com/?apikey=8bdf708a&s=hangover");
    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  function renderMovies() {
    return data?.Search.map((film: Movie) => (
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
    <main>
      {loading ? <h1>Loading...</h1> : renderMovies()}
    </main>
  );
}
