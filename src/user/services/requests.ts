import axios from "axios";

export const loadTimezones = async() => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users/timezones');
    return {
        status: response.status,
        body: response.data,
    };
}