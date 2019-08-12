class Decoder3WL {
  static convertValue(value) {
    let byte0 = Decoder3WL._convertToBitsArray(value);

    return {
      positionWithdrawn: byte0[3],
      positionInserted: !byte0[3],
      stateClosed: byte0[0],
      stateOpened: byte0[1],
      stateTripped: byte0[2],
      closingFailure: byte0[4],
      openingFailure: byte0[5],
      alarm: byte0[6]
    };
  }

  /**
   * @description method for converting byte into array of bits
   * @param {number} bytes byte to convert
   */
  static _convertToBitsArray(byte) {
    let bytesToReturn = [];

    for (let i = 0; i < 8; i++) {
      bytesToReturn.push(Decoder3WL._getBit(byte, i));
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

export default Decoder3WL;
