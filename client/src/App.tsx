import React from 'react';
import Header from './components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardPage from './pages/DashboardPage'

import './App.css';

const queryClient = new QueryClient({});

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <DashboardPage/>
    </QueryClientProvider>
  );
};

export default App;
