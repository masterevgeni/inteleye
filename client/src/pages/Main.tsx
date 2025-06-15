import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Chart from './../components/Chart'; // Adjust the import path as necessary
import { fatchCurrency } from '../services/currency'; // Adjust the import path as necessary


const Main: React.FC = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['coins'],
        queryFn: fatchCurrency,
    });

    console.log('data: ', data);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Bitcoin Price</h1>
            {data && (
                <p>Current Bitcoin Price: ${data.bitcoin.usd}</p>
            )}
            <Chart chartData={data}/>
        </div>
    );
};

export default Main;