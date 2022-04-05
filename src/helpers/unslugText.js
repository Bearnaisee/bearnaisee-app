/**
 * @param { string } text
 * @returns {string}
 */
export default function unslugText(text) {
  const decodedURI = decodeURI(text)?.replaceAll('-', ' ');
  return `${decodedURI[0].toUpperCase()}${decodedURI.slice(1, decodedURI?.length)}`;
}
