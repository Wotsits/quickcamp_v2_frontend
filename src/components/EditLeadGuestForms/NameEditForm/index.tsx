import { Button, TextField } from "@mui/material";
import React from "react";

import "./style.css";

type NameEditFormProps = {
  /** mandatory, incoming firstName value */
  firstNameIn: string;
  /** mandatory, incoming lastName value */
  lastNameIn: string;
  /** mandatory, callback function to be invoked when save button is clicked */
  callbackOnSave: (firstName: string, surname: string) => void;
};

const NameEditForm = ({
  firstNameIn,
  lastNameIn,
  callbackOnSave,
}: NameEditFormProps) => {
  // ------------
  // STATE
  // ------------

  const [firstName, setFirstName] = React.useState(firstNameIn);
  const [lastName, setLastName] = React.useState(lastNameIn);

  // ------------
  // HANDLERS
  // ------------

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSave = () => {
    callbackOnSave(firstName, lastName);
  };

  // ------------
  // RENDER
  // ------------

  return (
    <div className="name-edit-form">
      <form>
        <div className="name-edit-form-fields">
          <TextField
            required
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
          />
        </div>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default NameEditForm;
