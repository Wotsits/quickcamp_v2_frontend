import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

type SearchFieldProps = {
  /** Mandatory, callback to parent with search field value */
  callback: (a: string) => void;
  /** Mandatory, trigger for the field to callback */
  trigger: "BLUR" | "CHANGE" | "ENTER";
  /** Optional, variant */
  variant?: "onLight" | "onDark";
};

const SearchField = ({
  callback,
  variant = "onDark",
  trigger,
}: SearchFieldProps) => {

  const className =
    variant === "onDark"
      ? "search-field search-field-on-dark"
      : "search-field search-field-on-light";

  return (
    <div className={className}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search..."
        onBlur={
          trigger === "BLUR" ? (e) => callback(e.target.value) : undefined
        }
        onKeyDown={
          trigger === "ENTER"
            ? (e) => {
                e.preventDefault();
                callback(e.currentTarget.value);
              }
            : undefined
        }
        onChange={
          trigger === "CHANGE" ? (e) => callback(e.target.value) : undefined
        }
      />
    </div>
  );
};

export default SearchField;
