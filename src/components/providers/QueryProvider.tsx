'use client';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const Qclient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={Qclient}>
        <Hydrate state={null}>{children}</Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default QueryProvider;
