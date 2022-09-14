// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconDetailsSvg from '../assets/icon_details.svg';

function IconDetails(props: any) {
  return (
    <SvgIcon
      component={IconDetailsSvg}
      viewBox="0 0 12 12"
      {...props}
      sx={{ width: 12, height: 12, ...props?.sx }}
    />
  );
}

export default React.memo(IconDetails);