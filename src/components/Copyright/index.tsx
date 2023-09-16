import { Link, Typography } from '@mui/material';
import React from 'react';
import { APPLICATIONNAME, INFOWEBSITEADDRESS } from '../../settings';

const Copyright = (props: any) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href={INFOWEBSITEADDRESS}>
          {APPLICATIONNAME}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  export default Copyright;