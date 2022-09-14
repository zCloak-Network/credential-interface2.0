// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconLogoCircleSvg from '../assets/icon_logo_circle.svg';

function IconLogoCircle(props: any) {
  return (
    <SvgIcon
      component={IconLogoCircleSvg}
      viewBox="0 0 60 60"
      {...props}
      sx={{ width: 60, height: 60, ...props?.sx }}
    />
  );
}

export default React.memo(IconLogoCircle);