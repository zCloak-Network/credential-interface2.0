// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconScanSvg from '../assets/icon_scan.svg';

function IconScan(props: any) {
  return (
    <SvgIcon
      component={IconScanSvg}
      viewBox="0 0 14 14"
      {...props}
      sx={{ width: 14, height: 14, ...props?.sx }}
    />
  );
}

export default React.memo(IconScan);