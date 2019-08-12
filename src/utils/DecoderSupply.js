class DecoderSupply {
  static convertValue(value) {
    let byte0 = DecoderSupply._convertToBitsArray(value);

    return {
      tr1Supply: byte0[0],
      tr2Supply: byte0[1],
      genSupply: byte0[2],
      genStarted: byte0[3],
      genReady: byte0[4]
    };
  }

  /**
   * @description method for converting byte into array of bits
   * @param {number} bytes byte to convert
   */
  static _convertToBitsArray(byte) {
    let bytesToReturn = [];

    for (let i = 0; i < 8; i++) {
      bytesToReturn.push(DecoderSupply._getBit(byte, i));
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

export default DecoderSupply;
