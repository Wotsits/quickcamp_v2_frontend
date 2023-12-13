import { Alert, Button, TextField } from "@mui/material";
import React from "react";

import "./style.css";

type AddressEditFormProps = {
  /** mandatory, incoming address1 value */
  address1In: string;
  /** mandatory, incoming email value */
  address2In: string;
  /** mandatory, incoming townCity value */
  townCityIn: string;
  /** mandatory, incoming county value */
  countyIn: string;
  /** mandatory, incoming postcode value */
  postcodeIn: string;
  /** mandatory, incoming country value */
  countryIn: string;
  /** mandatory, callback function to be invoked when save button is clicked */
  callbackOnSave: (
    address1: string,
    address2: string,
    townCity: string,
    county: string,
    postcode: string,
    country: string
  ) => void;
  /** mandatory, loading indicator */
  loading: boolean;
  /** mandatory, error message */
  errorMessage: string | null;
  /** mandatory, success message */
  successMessage: string | null;
};

const AddressEditForm = ({
  address1In,
  address2In,
  townCityIn,
  countyIn,
  postcodeIn,
  countryIn,
  callbackOnSave,
  loading,
  errorMessage,
  successMessage,
}: AddressEditFormProps) => {
  // ------------
  // STATE
  // ------------

  const [address1, setAddress1] = React.useState(address1In);
  const [address2, setAddress2] = React.useState(address2In);
  const [townCity, setTownCity] = React.useState(townCityIn);
  const [county, setCounty] = React.useState(countyIn);
  const [postcode, setPostcode] = React.useState(postcodeIn);
  const [country, setCountry] = React.useState(countryIn);

  // ------------
  // HANDLERS
  // ------------

  const handleAddress1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress1(event.target.value);
  };

  const handleAddress2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress2(event.target.value);
  };

  const handleTownCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTownCity(event.target.value);
  };

  const handleCountyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCounty(event.target.value);
  };

  const handlePostcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleSave = () => {
    callbackOnSave(address1, address2, townCity, county, postcode, country);
  };

  // ------------
  // RENDER
  // ------------

  return (
    <div className="address-edit-form">
      <div className="address-edit-form-message-container">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>

      <form>
        <div className="address-edit-form-fields">
          <TextField
            required
            id="address1"
            label="Address Line 1"
            value={address1}
            onChange={handleAddress1Change}
            fullWidth
          />
          <TextField
            id="address2"
            label="Address Line 2"
            value={address2}
            onChange={handleAddress2Change}
            fullWidth
          />
          <TextField
            required
            id="townCity"
            label="Town/City"
            value={townCity}
            onChange={handleTownCityChange}
            fullWidth
          />
          <TextField
            required
            id="county"
            label="County"
            value={county}
            onChange={handleCountyChange}
            fullWidth
          />
          <TextField
            required
            id="postcode"
            label="Postcode"
            value={postcode}
            onChange={handlePostcodeChange}
            fullWidth
          />
          <TextField
            required
            id="country"
            label="Country"
            value={country}
            onChange={handleCountryChange}
            fullWidth
          />
        </div>
        <Button disabled={loading} variant="contained" onClick={handleSave}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default AddressEditForm;
