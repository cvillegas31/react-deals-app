/* eslint-disable consistent-return */
import axios from 'axios';

const APIKEY = import.meta.env.REACT_APP_RAPID_API_TRAVEL_API_KEY;

export const getPlacesData = async (type, sw, ne) => {

  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'b923bb80dbmsh1aad711046b4364p18aa4ajsnf65f4d7b453c'
      },
    });



    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': 'b923bb80dbmsh1aad711046b4364p18aa4ajsnf65f4d7b453c'
        }


      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
