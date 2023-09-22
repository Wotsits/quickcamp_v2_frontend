import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

type SearchFieldProps = {
    /** Mandatory, callback to parent with search field value */
    callback: (a: string) => void
    /** Optional, variant */
    variant?: "onLight" | "onDark"

}

const SearchField = ({callback, variant = "onDark"}: SearchFieldProps) => {
    const [value, setValue] = useState<string>("")

    function handleCallback(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            callback(value)
        }
    }

    const className = variant === "onDark" ? "search-field search-field-on-dark" : "search-field search-field-on-light"
  
    return (
    <div className={className}>
        <SearchIcon/>
        <input type="text" placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)}onKeyDown={(e) => handleCallback(e)}/>
    </div>
  )
};

export default SearchField;