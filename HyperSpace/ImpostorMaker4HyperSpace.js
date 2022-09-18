const HyperSpace = require("./HyperSpace");

/**
 *
 * @param {HyperSpace} hyperSpace
 * @param {HyperSpace.ContactCard} cc
 * @param {String} targetUrl
 * @return {Promise<Object>}
 */
async function makeImpostor(hyperSpace, cc, targetUrl) {
  /**
   * @type [Array<String>]
   */
  var methods = await hyperSpace.request(cc, targetUrl);
  var toReturn = {};
  Object.getOwnPropertyNames(methods).forEach((arg) => {
    var arg2 = JSON.parse(JSON.stringify(methods[arg]));
    var newF = async function (...a) {
      return hyperSpace.request(cc, arg2, a);
    };
    toReturn[arg] = newF;
  });

  return toReturn;
}
module.exports = makeImpostor;
