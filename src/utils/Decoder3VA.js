class Decoder3VA {
  static convertValue(value) {
    let bytes = Decoder3VA._convertToByteArray(value);

    let byte0 = Decoder3VA._convertToBitsArray(bytes[0]);
    let byte1 = Decoder3VA._convertToBitsArray(bytes[1]);

    let lastTripReason = 0;
    if (byte0[4]) lastTripReason = Decoder3VA._setBit(lastTripReason, 0);
    if (byte0[5]) lastTripReason = Decoder3VA._setBit(lastTripReason, 1);

    return {
      stateClosed: !byte1[2] && byte1[3],
      stateOpened: (byte1[2] && !byte1[3]) || (byte1[2] && byte1[3]),
      stateTripped: byte1[2] && byte1[3],
      stateInvalid: !byte1[2] && !byte1[3],
      overloadWarning: byte1[7],//
      limitReached: byte0[0],
      alarm: byte0[1],
      writeProtection: byte0[2],
      lastTripReason: lastTripReason,
    };
  }

  /**
   * @description method for getting array of bytes
   * @param {number} value uInt16 value to be splitted into byte array
   */
  static _convertToByteArray(value) {
    return new Uint8Array(new Uint16Array([value]).buffer);
  }

  /**
   * @description method for converting byte into array of bits
   * @param {number} bytes byte to convert
   */
  static _convertToBitsArray(byte) {
    let bytesToReturn = [];

    for (let i = 0; i < 8; i++) {
      bytesToReturn.push(Decoder3VA._getBit(byte, i));
    }

    return bytesToReturn;
  }

  /**
   * @description method for getting bit in given variable
   * @param {number} number variable
   * @param {number} bitPosition bit position
   */
  static _getBit(number, bitPosition) {
    return (number & (1 << bitPosition)) === 0 ? false : true;
  }

  /**
   * @description method for setting bit in given variable
   * @param {number} number variable
   * @param {number} bitPosition bit position
   */
  static _setBit(number, bitPosition) {
    return number | (1 << bitPosition);
  }
}

export default Decoder3VA;
