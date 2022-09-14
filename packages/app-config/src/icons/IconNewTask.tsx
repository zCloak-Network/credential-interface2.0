// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import IconNewTaskSvg from '../assets/icon_new_task.svg';

function IconNewTask(props: any) {
  return (
    <SvgIcon
      component={IconNewTaskSvg}
      viewBox="0 0 16.448 19"
      {...props}
      sx={{ width: 16.448, height: 19, ...props?.sx }}
    />
  );
}

export default React.memo(IconNewTask);