import { Alert, Button, TextField } from "@mui/material";
import React from "react";

import "./style.css";

type NameEditFormProps = {
  /** mandatory, incoming firstName value */
  firstNameIn: string;
  /** mandatory, incoming lastName value */
  lastNameIn: string;
  /** mandatory, callback function to be invoked when save button is clicked */
  callbackOnSave: (firstName: string, surname: string) => void;
  /** mandatory, loading indicator */
  loading: boolean;
  /** mandatory, error message */
  errorMessage: string | null;
  /** mandatory, success message */
  successMessage: string | null;
};

const NameEditForm = ({
  firstNameIn,
  lastNameIn,
  callbackOnSave,
  loading,
  errorMessage,
  successMessage,
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
      <div className="name-edit-form-message-container">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>
      
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
        <Button disabled={loading} variant="contained" onClick={handleSave}>
          {!loading ? "Save" : "Saving..."}
        </Button>
      </form>
    </div>
  );
};

export default NameEditForm;
