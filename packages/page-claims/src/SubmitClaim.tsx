import {
  CType,
  Did,
  IEncryptedMessage,
  Message,
  RequestForAttestation
} from '@kiltprotocol/sdk-js';
import { Button } from '@mui/material';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { credentialDb } from '@credential/app-db';
import { DidsContext, DidsModal, useDidDetails } from '@credential/react-dids';
import { encryptMessage, requestAttestation, sendMessage } from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';
import { useKeystore } from '@credential/react-keystore';

const SubmitClaim: React.FC<{
  contents: Record<string, unknown>;
  attester: Did.FullDidDetails | null;
  ctype?: CType;
  onDone?: () => void;
}> = ({ attester, contents, ctype, onDone }) => {
  const { keyring } = useKeystore();
  const { didUri } = useContext(DidsContext);
  const [open, toggleOpen] = useToggle();
  const sender = useDidDetails(didUri);
  const [request, setRequest] = useState<RequestForAttestation>();
  const [encryptedMessage, setEncryptedMessage] = useState<IEncryptedMessage>();

  const message = useMemo(
    () =>
      sender && attester && request
        ? new Message(
            {
              content: { requestForAttestation: request },
              type: Message.BodyType.REQUEST_ATTESTATION
            },
            sender.uri,
            attester.uri
          )
        : null,
    [attester, request, sender]
  );

  const _onDone = useCallback(() => {
    if (message) {
      credentialDb.message.add({ ...message, deal: 0, isRead: 1 });
    }

    onDone?.();
  }, [message, onDone]);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Submit
      </Button>
      <DidsModal
        onClose={toggleOpen}
        onDone={_onDone}
        open={open}
        steps={[
          {
            label: 'Request for attestation and sign',
            exec: () =>
              requestAttestation(keyring, sender, ctype, contents as Record<string, any>).then(
                setRequest
              )
          },
          {
            label: 'Encrypt message',
            exec: () => encryptMessage(keyring, message, sender, attester).then(setEncryptedMessage)
          },
          {
            label: 'Send message',
            exec: () => sendMessage(encryptedMessage)
          }
        ]}
        submitText="Submit claim"
        title="Submit claim"
      />
    </>
  );
};

export default React.memo(SubmitClaim);
