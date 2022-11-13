export function formatAddress(address: string) {
  return address.substring(0, 4) + "...." + address.slice(-4);
}
