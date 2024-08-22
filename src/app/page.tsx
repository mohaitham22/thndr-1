'use client';

import React from "react";
import Movies from '../Components/Movies';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Home() {
  // Create QueryClient with defaultOptions
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

