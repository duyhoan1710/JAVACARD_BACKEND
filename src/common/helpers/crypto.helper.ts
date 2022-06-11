import * as fs from 'fs';
import * as crypto from 'crypto';

export function encryptText(plainText) {
  return crypto.publicEncrypt(
    {
      key: fs.readFileSync(`${process.cwd()}/dist/src/pem/public.pem`, 'utf8'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(plainText),
  );
}

export function decryptText(encryptedText) {
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync(`${process.cwd()}/dist/src/pem/private.pem`, 'utf8'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedText, 'base64'),
  );
}
