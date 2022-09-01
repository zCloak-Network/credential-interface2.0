// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconApproveSvg from '../assets/icon_approve.svg';

function IconApprove(props: any) {
  return (
    <SvgIcon
      component={IconApproveSvg}
      viewBox="0 0 12 12"
      {...props}
      sx={{ width: 12, height: 12, ...props?.sx }}
    />
  );
}

export default React.memo(IconApprove);
