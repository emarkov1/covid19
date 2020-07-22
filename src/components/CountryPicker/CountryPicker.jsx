import React, {useState, useEffect} from "react";
import {NativeSelect, FormControl} from '@material-ui/core'
import './CountyPicker.module.css'
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCoutryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchApi();
  }, [setFetchedCountries]);
  return (
    <FormControl className="formControl">
      <NativeSelect defaultValue="" onChange={(e) => handleCoutryChange(e.target.value)}>
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => (
          <option value={country} key={i}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
