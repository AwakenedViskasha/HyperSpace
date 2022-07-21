const HyperSpace = require("./HyperSpace");
const MakeExpress = require("../CommPost/MakeExpress");
const CommPost = require("../CommPost/CommPost.js");
/**
 *
 * @param {HyperSpace.ContactCard} idCard
 * @returns {Promise<HyperSpace>}
 */
async function MakeHyperSpace(idCard) {
  /**
   * @type {HyperSpace}
   */
  var hs = new HyperSpace(idCard);
  hs.commPost = new CommPost();
  hs.commPost.setExpress(await MakeExpress(idCard.host, idCard.port));
  return hs;
}

module.exports = { MakeHyperSpace };
