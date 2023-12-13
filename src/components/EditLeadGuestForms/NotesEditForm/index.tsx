import { Button, TextField, TextareaAutosize } from "@mui/material";
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
};

const NoteEditForm = ({
  noteTypeIn,
  noteContentIn,
  noteIdIn,
  callbackOnSave,
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
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default NoteEditForm;
