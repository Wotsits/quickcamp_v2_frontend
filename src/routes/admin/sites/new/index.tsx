import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../../components/molecules/PageHeader";
import {
  Alert,
  Button,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import AuthContext from "../../../../contexts/authContext";
import { createSite } from "../../../../services/mutations/post/createSite";

const NewSiteForm = () => {
  // -------------
  // CONTEXTS
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const queryClient = useQueryClient();

  // -------------
  // STATE
  // -------------

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [townCity, setTownCity] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [createSiteError, setCreateSiteError] = useState<string>("");
  const [createSiteSuccess, setCreateSiteSuccess] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  // -------------
  // MUTATIONS
  // -------------

  const { mutate } = useMutation({
    mutationFn: () =>
      createSite({
        token: user.token,
        name,
        description,
        address1,
        address2,
        townCity,
        county,
        postcode,
        country,
        tel,
        email,
        website,
        latitude,
        longitude,
      }),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      // Reset fields
      resetFields();
      // Set success message
      setCreateSiteSuccess("Site created successfully");
    },
    onError: (err: any) => {
      setCreateSiteError(
        err.response.data.message || err.message || "An error occurred"
      );
    },
  });

  // -------------
  // USEEFFECTS
  // -------------

  useEffect(() => {
    if (
      name &&
      description &&
      address1 &&
      townCity &&
      county &&
      postcode &&
      country &&
      tel &&
      email &&
      website &&
      latitude &&
      longitude
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    name,
    description,
    address1,
    address2,
    townCity,
    county,
    postcode,
    country,
    tel,
    email,
    website,
    latitude,
    longitude,
  ]);

  // -------------
  // EVENT HANDLERS
  // -------------

  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  function resetFields() {
    setName("");
    setDescription("");
    setAddress1("");
    setAddress2("");
    setTownCity("");
    setCounty("");
    setPostcode("");
    setCountry("");
    setTel("");
    setEmail("");
    setWebsite("");
    setLatitude(0);
    setLongitude(0);
  }

  // -------------
  // RENDER
  // -------------

  return (
    <div id="site-form" className="full-width flex-column h-full">
      <PageHeader title="New Site" />

      {createSiteError && (
        <Alert severity="error" className="margin-bottom-1">
          {createSiteError}
        </Alert>
      )}

      <form
        className="container-white-bg-rounded-full-width flex-grow overflow-y-auto"
        onSubmit={handleSubmission}
      >
        <TextField
          required
          id="name"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="description"
          className="margin-bottom-1"
          multiline
          fullWidth
          minRows={3}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          id="address1"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Address Line 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <TextField
          id="address2"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Address Line 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <TextField
          required
          id="townCity"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Town/City"
          value={townCity}
          onChange={(e) => setTownCity(e.target.value)}
        />
        <TextField
          required
          id="county"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="County"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />
        <TextField
          required
          id="postcode"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <TextField
          required
          id="country"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          required
          id="tel"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Telephone"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <TextField
          required
          id="email"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="website"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          required
          id="latitude"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Latitude"
          value={latitude}
          onChange={(e) => {
            let latNumber = Number(e.target.value);
            if (isNaN(latNumber)) {
              latNumber = 0;
            } else {
              latNumber = Number(latNumber.toFixed(5));
            }
            setLatitude(latNumber);
          }}
        />
        <TextField
          required
          id="longitude"
          className="margin-bottom-1"
          type="text"
          fullWidth
          label="Longitude"
          value={longitude}
          onChange={(e) => {
            let longNumber = Number(e.target.value);
            if (isNaN(longNumber)) {
              longNumber = 0;
            } else {
              longNumber = Number(longNumber.toFixed(5));
            }
            setLongitude(longNumber);
          }}
        />
      </form>
      <div className="full-width space-between margin-top-1 margin-bottom-1">
          <Button
            variant="contained"
            onClick={resetFields}
            color="secondary"
            type="reset"
          >
            Reset
          </Button>
          <Button
            variant="contained"
            disabled={!isValid}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
    </div>
  );
};

export default NewSiteForm;
