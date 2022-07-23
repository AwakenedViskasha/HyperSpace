const HyperSpace = require("./HyperSpace");
const MakeExpress = require("../CommPost/MakeExpress");
const CommPost = require("../CommPost/CommPost.js");
/**
 *
 * @param {HyperSpace.ContactCard} idCard
 * @param {HyperSpace.ContactCard} contactCard
 * @returns {Promise<HyperSpace>}
 */
async function MakeHyperSpace(idCard, contactCard) {
  /**
   * @type {HyperSpace}
   */
  var hs = new HyperSpace(idCard, contactCard);
  hs.commPost = new CommPost();
  hs.commPost.setExpress(await MakeExpress(idCard.host, idCard.port));
  return hs;
}

module.exports = { MakeHyperSpace };
