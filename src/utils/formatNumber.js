export default function formatNumber(n) {
  // Hacky way to round to two decimal places.
  return Math.round(n * 100) / 100;
}
