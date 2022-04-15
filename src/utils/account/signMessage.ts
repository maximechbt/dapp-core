import { SignableMessage, Address } from '@elrondnetwork/erdjs';
import { getAccountProvider } from 'providers/accountProvider';
import { getAddress } from 'utils';

interface UseSignMessageType {
  message: string;
  callbackRoute?: string;
}

export async function signMessage({
  message,
  callbackRoute
}: UseSignMessageType) {
  const address = await getAddress();
  const provider = getAccountProvider();

  const callbackUrl = `${window.location.origin}${callbackRoute}`;
  const signableMessage = new SignableMessage({
    address: new Address(address),
    message: Buffer.from(message, 'ascii')
  });
  const signedMessage = await provider.signMessage(signableMessage, {
    callbackUrl: encodeURIComponent(callbackUrl)
  });

  return signedMessage;
}

export default signMessage;
