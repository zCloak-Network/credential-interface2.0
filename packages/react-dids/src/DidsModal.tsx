import LockIcon from '@mui/icons-material/Lock';
import { Button, Dialog, DialogContent, InputAdornment, Stack } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { DialogHeader, InputPassword } from '@credential/react-components';

import { DidsContext } from './DidsProvider';

const DidsModal: React.FC<
  React.PropsWithChildren<{
    title: React.ReactNode;
    open: boolean;
    steps: React.ReactNode;
    onClose?: () => void;
  }>
> = ({ children, onClose, open, steps, title }) => {
  const { didUri, isLocked, unlockDid } = useContext(DidsContext);
  const [password, setPassword] = useState<string>('');

  const unlock = useCallback(async () => {
    if (!didUri) return;

    await unlockDid(didUri, password);
  }, [didUri, password, unlockDid]);

  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogHeader onClose={onClose}>{title}</DialogHeader>
      <DialogContent sx={{ minWidth: 325, width: 578, maxWidth: '100%', padding: 7.5 }}>
        <Stack spacing={3}>
          {children}
          {isLocked && (
            <>
              <InputPassword
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please input password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                }
              />
              <Button fullWidth onClick={unlock} variant="contained">
                Unlock
              </Button>
            </>
          )}
          {!isLocked && steps}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(DidsModal);
