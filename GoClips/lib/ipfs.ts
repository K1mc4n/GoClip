import { Web3Storage } from "web3.storage";

export function getAccessToken() {
  return process.env.WEB3_STORAGE_TOKEN!;
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export async function uploadToIPFS(file: File) {
  const client = makeStorageClient();
  const cid = await client.put([file]);
  return `https://${cid}.ipfs.w3s.link/${file.name}`;
}
