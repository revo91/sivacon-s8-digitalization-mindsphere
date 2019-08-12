class DecoderATSE {
  static convertValue(value) {
    let byte0 = DecoderATSE._convertToBitsArray(value);

    return {
      notReady: byte0[0],
      manual: byte0[1],
      auto: byte0[2],
      alarm: byte0[3]
    };
  }

  /**
   * @description method for converting byte into array of bits
   * @param {number} bytes byte to convert
   */
  static _convertToBitsArray(byte) {
    let bytesToReturn = [];

    for (let i = 0; i < 8; i++) {
      bytesToReturn.push(DecoderATSE._getBit(byte, i));
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

module.exports = DecoderATSE;
