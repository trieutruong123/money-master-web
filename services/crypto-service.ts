import { AES, enc } from "crypto-js";

const HASH_KEY:string = process.env.NEXT_PUBLIC_HASH_KEY||'';

export const cryptoService = { encrypt, decrypt };

function encrypt(data: string) {
  const encrypted = AES.encrypt(data, HASH_KEY).toString();
  return encrypted;
}

function decrypt(hashed: string) {
  const decrypted = AES.decrypt(hashed, HASH_KEY);
  return decrypted.toString(enc.Utf8);
}
