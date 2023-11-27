import React from "react";
import PageHeader from "../../../../components/PageHeader";
import { Button, FormControl, Input, InputLabel, TextField, TextareaAutosize } from "@mui/material";

const SiteForm = () => {
    // -------------
    // STATE
    // -------------

    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [address1, setAddress1] = React.useState<string>("");
    const [address2, setAddress2] = React.useState<string>("");
    const [townCity, setTownCity] = React.useState<string>("");
    const [county, setCounty] = React.useState<string>("");
    const [postcode, setPostcode] = React.useState<string>("");
    const [country, setCountry] = React.useState<string>("");
    const [tel, setTel] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [website, setWebsite] = React.useState<string>("");
    const [latitude, setLatitude] = React.useState<string>("");
    const [longitude, setLongitude] = React.useState<string>("");


    function handleSubmission() {
        console.log("handleSubmission")
    }

    return (
        <div id="site-form" className="site-form full-width">
            <PageHeader title="New Site" />

            <form className="container-white-bg-rounded-full-width" onSubmit={handleSubmission}>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextField
                        id="name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField
                        id="description"
                        multiline
                        fullWidth
                        minRows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="address1">Address Line 1</InputLabel>
                    <TextField
                        id="address1"
                        type="text"
                        fullWidth
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="address2">Address Line 2</InputLabel>
                    <TextField
                        id="address2"
                        type="text"
                        fullWidth
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="townCity">Town/City</InputLabel>
                    <TextField
                        id="townCity"
                        type="text"
                        fullWidth
                        value={townCity}
                        onChange={(e) => setTownCity(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="county">County</InputLabel>
                    <TextField
                        id="county"
                        type="text"
                        fullWidth
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="postcode">Postcode</InputLabel>
                    <TextField
                        id="postcode"
                        type="text"
                        fullWidth
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <TextField
                        id="country"
                        type="text"
                        fullWidth
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="tel">Telephone</InputLabel>
                    <TextField
                        id="tel"
                        type="tel"
                        fullWidth
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField
                        id="email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="website">Website</InputLabel>
                    <TextField
                        id="website"
                        type="url"
                        fullWidth
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="latitude">Latitude</InputLabel>
                    <TextField
                        id="latitude"
                        type="number"
                        fullWidth
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </FormControl>
                <FormControl className="margin-bottom-1" fullWidth>
                    <InputLabel htmlFor="longitude">Longitude</InputLabel>
                    <TextField
                        id="longitude"
                        type="number"
                        fullWidth
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </FormControl>
                <div className="full-width space-between">
                    <Button variant="contained" color="secondary" type="reset">
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}

export default SiteForm;