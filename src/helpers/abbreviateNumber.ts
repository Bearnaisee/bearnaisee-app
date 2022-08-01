export default function abbreviateNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}m`;
  }

  if (num >= 100_000) {
    return `${Math.floor(num / 1_000)}k`;
  }

  return num.toString();
}
