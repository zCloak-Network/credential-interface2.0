// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconAttesterSvg from '../assets/icon_attester.svg';

function IconAttester(props: any) {
  return (
    <SvgIcon
      component={IconAttesterSvg}
      viewBox="0 0 12.757 13.676"
      {...props}
      sx={{ width: 12.757, height: 13.676, ...props?.sx }}
    />
  );
}

export default React.memo(IconAttester);