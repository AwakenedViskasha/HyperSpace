const { resolve } = require("path");
const CommPost = require("../CommPost/CommPost.js");
var crypto = require("crypto");
/**
 * @typedef {Object} ContactCard
 * @property {String} name
 * @property {String} host
 * @property {String} path
 * @property {Number} port
 */
class HyperSpace {
  /**
   *
   * @param {ContactCard} idCard Contains data for application interface
   * @param {ContactCard} [contactCard] Contains data for application interfaces
   */
  constructor(idCard, contactCard) {
    this.idCard = idCard;
    this.myContactCard = contactCard || idCard;
    this.contactCards = [];
    this.returnFunctionMessage = () => {
      return true;
    };
  }
  JSDOCBLABLA() {
    /**
     * @type {CommPost}
     */
    // @ts-ignore
    this.commPost;
  }
  /**
   * Gets the HyperSpace in an operable state.
   */
  async launchThis() {
    await this.commPost.publish(
      this.myContactCard.path,
      this.returnFunctionMessage,
      this
    );
    await this.commPost.publish(
      this.myContactCard.path
        ? this.myContactCard.path + "/contactCardReceiver"
        : "contactCardReceiver",
      this.contactCardReceiver,
      this
    );
  }
  /**
   *  Checks if received ContactCards are still valable. Return an Array of invalid ContactCards. Remove invalid ContactCards.
   * @returns {Promise<Array<ContactCard>>}
   */
  async checkMyContactCards() {
    var toReturn = [];

    var pmArray = [];
    for (var cc of this.contactCards) {
      pmArray.push(this.checkContactCard(cc));
    }
    await Promise.all(pmArray).then((res) => {
      toReturn = res;
      toReturn = toReturn.filter((item) => typeof item === "object");
    });
    this.contactCards = toReturn;
    return toReturn;
  }
  /**
   *  Checks if ContactCards are still valable. Return the valid ContactCards or false if invalid.
   * @returns {Promise<Array<ContactCard>|Boolean>}
   */
  async checkContactCard(cc) {
    var toReturn = false;
    await this.commPost
      .read(cc, "", {})
      .then((res) => {
        if (res == true) toReturn = cc;
        else toReturn = false;
      })
      .catch((err) => {
        throw new Error();
      });
    return toReturn;
  }
  /**
   * Use the ContactCard to contact an HyperSpace. If succesful, add the ContactCard to the Hyperspace and returns true.
   * @param {ContactCard} cc
   * @returns {Promise<Boolean>}
   */
  async addAndValidateContactCard(cc) {
    var toReturn = false;
    await this.commPost
      .read(cc, "", {})
      .then((res) => {
        if (res == true) {
          this.contactCards.push(cc);
          console.log(this.contactCards);
          toReturn = true;
        } else toReturn = false;
      })
      .catch((err) => {
        console.log("err");
        throw err;
      });
    return toReturn;
  }
  //TODO
  async removeContactCard() {}
  /**
   * Sends a ContactCard to the designed HyperSpace. Returns true if successful.
   * @param {ContactCard} cc
   * @returns {Promise<Boolean>}
   */
  async sendContactCard(cc) {
    var toReturn = false;
    var me = this;
    await this.commPost
      .read(cc, "/contactCardReceiver", [me.myContactCard])
      .then((res) => {
        toReturn = true;
      })
      .catch((err) => {
        throw err;
      });
    return toReturn;
  }
  /**
   *
   * @param {ContactCard} cc
   * @returns
   */
  async contactCardReceiver(cc) {
    return await this.addAndValidateContactCard(cc);
  }
  /**
   * Publishes a method into the HyperSpace.
   * @param {Object} objectToCallback
   * @param {Function} callback
   * @param {String} [path]
   * @returns {Promise<String>}
   */
  async publish(objectToCallback, callback, path) {
    var uid = path || Date.now() + Math.floor(Math.random() * 10000);
    for (var route of this.commPost.express._router.stack) {
      if (route.path !== undefined && route.path === path)
        throw new Error("Path Already Exist.");
    }
    await this.commPost.publish(
      this.myContactCard.path ? this.myContactCard.path + "/" + uid : uid,
      callback,
      objectToCallback
    );
    return uid;
  }

  /**
   * Removes a path from local HyperSpace.
   * @param {String} path
   */
  unpublish(path) {
    var myPath = this.myContactCard.path
      ? "/" + this.myContactCard.path + "/" + path
      : "/" + path;
    //console.log(this.commPost.express._router.stack);
    //console.log(myPath);
    this.commPost.express._router.stack =
      this.commPost.express._router.stack.filter((item) => {
        return item.path !== myPath;
      });
  }
  async request(cc, path, param) {
    var toReturn;
    await this.commPost.read(cc, "/" + path, param).then((res) => {
      toReturn = res;
    });
    return toReturn;
  }
  async requestFromContactCard(cc, param) {
    return await this.request(cc.ContactCard.HCC, cc.ContactCard.path, param);
  }

  async makeImpostor(icc) {
    var hyperSpace = this;
    var cc = icc.ContactCard.HCC;
    var target = icc.ContactCard.path;
    /**
     * @type [Array<String>]
     */
    var methods = await hyperSpace.request(cc, target);
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
}
module.exports = HyperSpace;
