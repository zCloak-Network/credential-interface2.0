// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconAddressSvg from '../assets/icon_address.svg';

function IconAddress(props: any) {
  return (
    <SvgIcon
      component={IconAddressSvg}
      viewBox="0 0 48 48"
      {...props}
      sx={{ width: 14, height: 14, ...props?.sx }}
    />
  );
}

export default React.memo(IconAddress);