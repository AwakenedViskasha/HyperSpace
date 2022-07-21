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
  var toReturn = await hyperSpace
    .request(cc, methods["getProperties4Impostor"])
    .catch((res) => console.log(res));
  Object.getOwnPropertyNames(methods).forEach((arg) => {
    var arg2 = JSON.parse(JSON.stringify(methods[arg]));
    var newF = async function (...a) {
      return hyperSpace.request(cc, arg2, a);
    };
    toReturn[arg] = newF;
  });
  toReturn["synchronizeProperties4Impostor"] = async function () {
    var properties = await this.getProperties4Impostor();
    for (var property in properties) this[property] = properties[property];
  };
  return toReturn;
}
module.exports = makeImpostor;
