import axios from "axios";
const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

export const fatchCurrency = async (): Promise<any> => {
    try {
        const response = await axios.get(url);
        console.log('response: ', response);
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
