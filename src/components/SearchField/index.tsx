import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

type SearchFieldProps = {
    /** Mandatory, callback to parent with search field value */
    callback: (a: string) => void
}

const SearchField = ({callback}: SearchFieldProps) => {
    const [value, setValue] = useState<string>("")

    function handleCallback(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            callback(value)
        }
    }

  return (
    <div className="search-field">
        <SearchIcon/>
        <input type="text" placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)}onKeyDown={(e) => handleCallback(e)}/>
    </div>
  )
};

export default SearchField;