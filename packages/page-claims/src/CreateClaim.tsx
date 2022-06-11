import type { Did } from '@kiltprotocol/sdk-js';

import type { ICTypeMetadata } from '@credential/react-components/CTypeProvider/types';

import { CType } from '@kiltprotocol/sdk-js';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  FullScreenDialog,
  FullScreenDialogContent,
  FullScreenDialogHeader
} from '@credential/react-components';
import { CTypeForm } from '@credential/react-ctype';
import { useToggle } from '@credential/react-hooks';

import SubmitClaim from './SubmitClaim';

const CreateClaim: React.FC = () => {
  const [open, toggleOpen] = useToggle();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cType, setCType] = useState<CType>();
  const [attester, setAttester] = useState<Did.FullDidDetails | null>(null);
  const [contents, setContents] = useState<Record<string, unknown>>({});

  const onClose = useCallback(() => {
    toggleOpen();
    navigate('', { state: null });
  }, [navigate, toggleOpen]);

  useEffect(() => {
    if (state) {
      const { cType } = state as { cType?: ICTypeMetadata };

      if (cType) {
        try {
          setCType(CType.fromSchema(cType.schema, cType.owner));
          toggleOpen();
        } catch {}
      }
    }
  }, [state, toggleOpen]);

  if (!cType) return null;

  return (
    <FullScreenDialog onClose={onClose} open={open}>
      <FullScreenDialogHeader>{cType.hash}</FullScreenDialogHeader>
      <FullScreenDialogContent>
        <Typography mb={4} textAlign="center" variant="h2">
          Create Claim
        </Typography>
        <CTypeForm
          cType={cType}
          defaultAttester={cType.owner ?? undefined}
          handleAttester={setAttester}
          onChange={setContents}
        />
        <Box mt={4} textAlign="center">
          <SubmitClaim attester={attester} cType={cType} contents={contents} />
        </Box>
      </FullScreenDialogContent>
    </FullScreenDialog>
  );
};

export default React.memo(CreateClaim);
