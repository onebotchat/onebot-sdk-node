import crypto from 'crypto';

/**
 *
 * @param {string} body the signed message
 * @param {string} secret the shared secret used to generate the signature (Stream API secret)
 * @param {string} signature the signature to validate
 * @return {boolean}
 */
export function checkSignature(body: string, secret: string, signature: string) {
  const key = Buffer.from(secret, 'ascii');
  const hash = crypto.createHmac('sha256', key).update(body).digest('hex');
  return hash === signature;
}
