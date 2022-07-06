import { CType, Did } from '@kiltprotocol/sdk-js';
import { Button } from '@mui/material';
import React, { useCallback, useContext, useMemo } from 'react';

import { DidsContext, DidsModal, useDidDetails } from '@credential/react-dids';
import { AddCTypeStep, ExtrinsicStep } from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';
import { useKeystore } from '@credential/react-keystore';

const SubmitCType: React.FC<{
  title?: string;
  properties?: Record<string, { type: any }>;
  onDone: () => void;
}> = ({ onDone, properties, title }) => {
  const [open, toggleOpen] = useToggle();
  const { keyring } = useKeystore();
  const { didUri } = useContext(DidsContext);
  const attester = useDidDetails(didUri);

  const ctype = useMemo(() => {
    if (!properties || !title) return null;

    try {
      return CType.fromSchema({
        title,
        $schema: 'http://kilt-protocol.org/draft-01/ctype#',
        type: 'object',
        properties
      });
    } catch (error) {
      return null;
    }
  }, [properties, title]);

  const getExtrinsic = useCallback(async () => {
    if (!ctype) return null;

    if (!(attester instanceof Did.FullDidDetails)) {
      throw new Error('The DID with the given identifier is not on chain.');
    }

    const tx = await ctype.getStoreTx();
    const extrinsic = await attester.authorizeExtrinsic(tx, keyring, attester.identifier);

    return extrinsic;
  }, [attester, ctype, keyring]);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Submit
      </Button>
      <DidsModal
        onClose={toggleOpen}
        onDone={onDone}
        open={open}
        steps={(prevStep, nextStep, reportError, reportStatus) => [
          {
            label: 'Sign and submit ctype',
            content: (
              <ExtrinsicStep
                getExtrinsic={getExtrinsic}
                isFirst
                nextStep={nextStep}
                prevStep={prevStep}
                reportError={reportError}
                reportStatus={reportStatus}
                sender={attester?.authenticationKey.publicKey}
              />
            )
          },
          {
            label: 'Upload ctype',
            content: (
              <AddCTypeStep
                ctype={ctype}
                nextStep={nextStep}
                prevStep={prevStep}
                reportError={reportError}
                reportStatus={reportStatus}
                sender={attester?.uri}
              />
            )
          }
        ]}
        title="Submit ctype"
      />
    </>
  );
};

export default React.memo(SubmitCType);