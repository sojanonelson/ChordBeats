import axios from 'axios';
import { ApiConstants } from '../constants';


const fetchData = async (instrumentName) => {
    try {
        // Accessing environment variable properly
        console.log("backend Api url:", ApiConstants.BACKEND_API.BASE_API_URL)
        const response = await axios.get(`http://localhost:4000/api/instrument/${instrumentName}`)
        console.log("FetchData:", response.data); 

        
        return response.data;
    } catch (err) {
        console.log(err);
        throw err; 
    }
}



export  {fetchData}
