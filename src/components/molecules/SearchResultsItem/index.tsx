import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { MouseEventHandler } from 'react';

type SearchResultsItemProps = {
    secondaryAction?: any;
    selected?: boolean;
    onClick?: any;
    listItemTextPrimary: any;
    listItemTextSecondary: any;
}

const SearchResultsItem = ({secondaryAction, selected, onClick, listItemTextPrimary, listItemTextSecondary}: SearchResultsItemProps) => {
    return (
        <div className="search-results-item">
            <ListItem
                  alignItems="flex-start"
                  secondaryAction={secondaryAction}
                >
                  <ListItemButton
                    selected={selected}
                    onClick={onClick}
                  >
                    <ListItemText
                      primary={listItemTextPrimary}
                      secondary={listItemTextSecondary}
                    />
                  </ListItemButton>
                </ListItem>
        </div>
    )
}

export default SearchResultsItem;