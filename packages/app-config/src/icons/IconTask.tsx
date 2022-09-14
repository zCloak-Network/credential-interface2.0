// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconTaskSvg from '../assets/icon_task.svg';

function IconTask(props: any) {
  return (
    <SvgIcon
      component={IconTaskSvg}
      viewBox="0 0 16 12.799"
      {...props}
      sx={{ width: 16, height: 12.799, ...props?.sx }}
    />
  );
}

export default React.memo(IconTask);