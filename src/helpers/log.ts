/**
 * @summary console.log wrapper that disables in prod
 */
export default function log(message: unknown, type = 'log'): void {
  if (process.env.NODE_ENV !== 'production') {
    if (type === 'error') {
      console.error(new Date().toISOString(), message);
    } else if (type === 'dir') {
      console.dir(new Date().toISOString(), message);
    } else {
      console.log(new Date().toISOString(), message);
    }
  }
}
