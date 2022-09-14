// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconRevokeSvg from '../assets/icon_revoke.svg';

function IconRevoke(props: any) {
  return (
    <SvgIcon
      component={IconRevokeSvg}
      viewBox="0 0 12 12"
      {...props}
      sx={{ width: 12, height: 12, ...props?.sx }}
    />
  );
}

export default React.memo(IconRevoke);