/**
 * This function takes an `string` as Input and returns the turncated version with ellipses.
 *
 * @param {string} address
 * @param {string} length - "short" | "long"
 * @returns {string} - a formatted string
 *
 * - Reference taken from the {@link https://github.com/DefiLlama/chainlist  ChainList Repository}
 *
 * @example
 *  `Input = `  (0x9CD96215c2Db3821d7345c887b56D5f610d45dC3, "short")
 *  `Output = ` 0x9CD9...5dC3
 *
 *  @isTestWrittenForThisFunction `true`
 */
export function formatLargeStringsAddress(address: string, length = "short") {
    if (address && length === "short") {
        address = address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
        return address;
    } else if (address && length === "long") {
        address = address.substring(0, 12) + "..." + address.substring(address.length - 8, address.length);
        return address;
    } else {
        return null;
    }
}