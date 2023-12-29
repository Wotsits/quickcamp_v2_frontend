import { Alert, Button, TextField } from "@mui/material";
import React from "react";

import "./style.css";

type ContactDetailsEditFormProps = {
  /** mandatory, incoming tel value */
  telIn: string;
  /** mandatory, incoming email value */
  emailIn: string;
  /** mandatory, callback function to be invoked when save button is clicked */
  callbackOnSave: (tel: string, email: string) => void;
  /** mandatory, loading indicator */
  loading: boolean;
  /** mandatory, error message */
  errorMessage: string | null;
  /** mandatory, success message */
  successMessage: string | null;
};

const ContactDetailsEditForm = ({
  telIn,
  emailIn,
  callbackOnSave,
  loading,
  errorMessage,
  successMessage,
}: ContactDetailsEditFormProps) => {
  // ------------
  // STATE
  // ------------

  const [tel, setTel] = React.useState(telIn);
  const [email, setEmail] = React.useState(emailIn);

  // ------------
  // HANDLERS
  // ------------

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSave = () => {
    callbackOnSave(tel, email);
  };

  // ------------
  // RENDER
  // ------------

  return (
    <div className="contact-details-edit-form">
      <div className="contact-details-edit-form-message-container">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>
      <form>
        <div className="contact-details-edit-form-fields">
          <TextField
            required
            id="tel"
            label="Telephone"
            value={tel}
            onChange={handleTelChange}
            fullWidth
          />
          <TextField
            required
            id="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
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

export default ContactDetailsEditForm;
