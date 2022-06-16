import type { DidKeystore } from '@zcloak/credential-core/types';

import { KeyringPair$Json } from '@polkadot/keyring/types';
import React, { createContext, useCallback, useContext, useState } from 'react';

import { JsonKeystore } from '@zcloak/credential-core';

import { createAccount } from './createKeyring';

interface KeystoreState {
  claimerKeystore: DidKeystore | null;
  attesterKeystore: DidKeystore | null;
  addKeystore: (mnemonic: string, type: ACCOUNT_TYPE, passphrase?: string) => KeyringPair$Json;
  restoreKeystore: (text: string, type: ACCOUNT_TYPE, passphrase?: string) => void;
}

export const KeystoreContext = createContext<KeystoreState>({
  claimerKeystore: null
} as KeystoreState);

export type ACCOUNT_TYPE = 'attester' | 'claimer';

const PREFIX = 'credential:account';

const ATTESTER: ACCOUNT_TYPE = 'attester';

const CLAIMER: ACCOUNT_TYPE = 'claimer';

function getAccountKeys(): string[] {
  const keys: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key?.startsWith(PREFIX)) {
      keys.push(key);
    }
  }

  return keys;
}

function filterKeys(keys: string[]): { claimerKeys: string[]; attesterKeys: string[] } {
  const claimerKeys: string[] = [];
  const attesterKeys: string[] = [];

  keys.forEach((key) => {
    if (key.startsWith(`${PREFIX}:${CLAIMER}`)) {
      claimerKeys.push(key);
    }

    if (key.startsWith(`${PREFIX}:${ATTESTER}`)) {
      attesterKeys.push(key);
    }
  });

  return { claimerKeys, attesterKeys };
}

const { attesterKeys, claimerKeys } = filterKeys(getAccountKeys());

let initClaimerKeystore: JsonKeystore | null = null;
let initAttesterKeystore: JsonKeystore | null = null;

if (claimerKeys.length > 0) {
  const data = localStorage.getItem(claimerKeys[0]);

  data && (initClaimerKeystore = new JsonKeystore(JSON.parse(data) as KeyringPair$Json));
}

if (attesterKeys.length > 0) {
  const data = localStorage.getItem(attesterKeys[0]);

  data && (initAttesterKeystore = new JsonKeystore(JSON.parse(data) as KeyringPair$Json));
}

const KeystoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [claimerKeystore, setClaimerKeystore] = useState<JsonKeystore | null>(initClaimerKeystore);
  const [attesterKeystore, setAttesterKeystore] = useState<JsonKeystore | null>(
    initAttesterKeystore
  );

  const addKeystore = useCallback((mnemonic: string, type: ACCOUNT_TYPE, passphrase?: string) => {
    const pair = createAccount(mnemonic, {
      type
    });

    const json = pair.toJson(passphrase);
    const key = `${PREFIX}:${type}:${pair.address}`;

    localStorage.setItem(key, JSON.stringify(json));

    const keystore = new JsonKeystore(json);

    keystore.unlock(passphrase);

    if (type === 'claimer') {
      setClaimerKeystore(keystore);
    } else {
      setAttesterKeystore(keystore);
    }

    return json;
  }, []);

  const restoreKeystore = useCallback((text: string, type: ACCOUNT_TYPE, passphrase?: string) => {
    const json = JSON.parse(text);
    const keystore = new JsonKeystore(json);

    // try unlock
    keystore.unlock(passphrase);

    const key = `${PREFIX}:${type}:${keystore.address}`;

    localStorage.setItem(key, text);

    if (type === 'claimer') {
      setClaimerKeystore(keystore);
    } else {
      setAttesterKeystore(keystore);
    }
  }, []);

  return (
    <KeystoreContext.Provider
      value={{ claimerKeystore, attesterKeystore, addKeystore, restoreKeystore }}
    >
      {children}
    </KeystoreContext.Provider>
  );
};

export function useKeystore() {
  const context = useContext(KeystoreContext);

  return context;
}

export default React.memo<typeof KeystoreProvider>(KeystoreProvider);
