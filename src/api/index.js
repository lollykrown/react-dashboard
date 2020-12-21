import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// const world = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php";
// const byCountry = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php";
// const affectedCountriesList = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};


// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
  
      return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
  };

  
export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(world,  {
//       headers: {
//         "x-rapidapi-key": "483dc3069bmsh0df5c38d47dc0bep117fdbjsn3bd00ed53303",
//         "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com"
//       }
//     })
// console.log('data', data.total_cases)
//     return data.map(({ total_cases, total_recovered, total_deaths, statistics_taken_at: date }) => ({ confirmed: total_cases, recovered:total_recovered, death:total_deaths, date }));
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchCountries = async () => {
//   try {
//     const { data: { countries_stat } } = await axios.get(byCountry,{
//             headers: {
//               "x-rapidapi-key": "483dc3069bmsh0df5c38d47dc0bep117fdbjsn3bd00ed53303",
//               "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com"
//             }
//           })

//     return countries_stat.map((country) => country.country_name).sort();
//   } catch (error) {
//     return error;
//   }
// };
