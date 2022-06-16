import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import { alpha, Box, CircularProgress, IconButton, Link, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { LogoBlackIcon } from '@credential/app-config/icons';
import { AppContext, ButtonUnlock, useDids } from '@credential/react-components';

import AccountInfo from './AccountInfo';
import Network from './Network';

const Logo: React.FC = () => {
  return (
    <Link
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 700,
        cursor: 'pointer'
      }}
    >
      <Box component={LogoBlackIcon} mr={1.5} />
      Credential&nbsp;
      <Box color="black" component="span">
        Platform
      </Box>
    </Link>
  );
};

const Header: React.FC<{ open: boolean; toggleOpen: () => void }> = ({ open, toggleOpen }) => {
  const { account } = useDids();
  const [loading, setLoading] = useState(false);
  const { sync } = useContext(AppContext);

  return (
    <Stack
      alignItems="center"
      direction="row"
      height={70}
      justifyContent="space-between"
      position="fixed"
      px={5}
      sx={({ palette }) => ({
        background: palette.common.white,
        borderBottom: '1px solid',
        borderBottomColor: alpha(palette.primary.main, 0.1)
      })}
      width="100%"
      zIndex={999}
    >
      <Stack alignItems="center" direction="row" spacing={2}>
        <IconButton color="inherit" edge="start" onClick={toggleOpen}>
          {open ? <FormatIndentDecreaseIcon /> : <FormatAlignJustifyIcon />}
        </IconButton>
        <Logo />
      </Stack>
      <Stack direction="row" spacing={2}>
        <ButtonUnlock
          loading={loading}
          loadingIndicator={
            <Stack alignItems="center" direction="row" spacing={1}>
              <CircularProgress size={16} />
              Syncing
            </Stack>
          }
          onClick={() => {
            setLoading(true);
            sync().finally(() => setLoading(false));
          }}
          triggerUnlocked
          unlockText="Click to sync"
        >
          Click to sync
        </ButtonUnlock>
        <Network />
        {account && <AccountInfo account={account} />}
      </Stack>
    </Stack>
  );
};

export default React.memo(Header);