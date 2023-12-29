import { Alert, Button, TextField, TextareaAutosize } from "@mui/material";
import React from "react";

import "./style.css";

type NoteEditFormProps = {
  /** mandatory, noteType */
  noteTypeIn: "PUBLIC" | "PRIVATE";
  /** optional, incoming note value */
  noteContentIn?: string;
  /** optional, incoming note id */
  noteIdIn?: number;
  /** mandatory, callback function to be invoked when save button is clicked */
  callbackOnSave: (
    content: string,
    noteType: "PUBLIC" | "PRIVATE",
    id: number | undefined
  ) => void;
  /** mandatory, loading indicator */
  loading: boolean;
  /** mandatory, error message */
  errorMessage: string | null;
  /** mandatory, success message */
  successMessage: string | null;
};

const NoteEditForm = ({
  noteTypeIn,
  noteContentIn,
  noteIdIn,
  callbackOnSave,
  loading,
  errorMessage,
  successMessage,
}: NoteEditFormProps) => {
  // ------------
  // STATE
  // ------------

  const [content, setContent] = React.useState(noteContentIn || "");

  // ------------
  // HANDLERS
  // ------------

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    callbackOnSave(content, noteTypeIn, noteIdIn);
  };

  // ------------
  // RENDER
  // ------------

  return (
    <div className="note-edit-form">
      <div className="note-edit-form-message-container">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>

      <form>
        <div className="note-edit-form-fields">
          <TextField
            id="note"
            label="Note"
            multiline
            rows={4}
            value={content}
            onChange={handleNoteChange}
          />
        </div>
        <Button disabled={loading} variant="contained" onClick={handleSave}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default NoteEditForm;
