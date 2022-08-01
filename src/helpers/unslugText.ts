export default function unslugText(text: string): string {
  if (!text?.length) return text;

  const decodedURI = decodeURI(text)?.replaceAll('-', ' ');

  return `${decodedURI[0].toUpperCase()}${decodedURI.slice(1, decodedURI?.length)}`;
}
