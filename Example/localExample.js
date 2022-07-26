const Factory4HyperSpace = require("../HyperSpace/Factory4HyperSpace");
const HyperSpace = require("../HyperSpace/HyperSpace");
const Publisher4HyperSpace = require("../HyperSpace/Publisher4HyperSpace");
const ImpostorMaker4HyperSpace = require("../HyperSpace/ImpostorMaker4HyperSpace");

/**
 * @type {HyperSpace}
 */
var hs1;

/**
 * @type {HyperSpace}
 */
var hs2;

// We create ContactCard used to instantiate HyperSpace or as coordinate for contacting another HyperSpace.
/**
 * @type {HyperSpace.ContactCard}
 */
var cc1 = {
  name: "HyperSpace1",
  path: "HyperSpace1",
  host: "127.0.0.1",
  port: 89,
};
/**
 * @type {HyperSpace.ContactCard}
 */
var cc2 = {
  name: "HyperSpace2",
  path: "HyperSpace2",
  host: "127.0.0.1",
  port: 88,
};
var pm1;
var pm2;
// We create HyperSpace using a provided Factory function. HyperSpace are still not operable but waiting for all its components to be operable.
function localExample() {
  pm1 = Factory4HyperSpace.MakeHyperSpace(cc1);
  pm2 = Factory4HyperSpace.MakeHyperSpace(cc2);
  Promise.all([pm1, pm2]).then((values) => {
    hs1 = values[0];
    hs2 = values[1];
    LaunchHSAndTradeContactCard();
  });
}

async function LaunchHSAndTradeContactCard() {
  await hs1.launchThis();
  await hs2.launchThis();
  await hs2.addAndValidateContactCard(cc1).catch((err) => console.log(err)); // HyperSpace2 will contact HyperSpace1 in order to validate the new Contact Card.
  await hs2.sendContactCard(cc1).catch((err) => console.log(err)); // HyperSpace2 will try exchanging its ContactCard with HyperSpace1
  console.assert(
    hs1.contactCards[0].name == cc2.name,
    "Error Exchanging ContactCard"
  ); // Check if HyperSpace2 sucessfully exchanged its ContactCard with HyperSpace1.
  publishHyperSpatialObjectAndCreateImpostor();
}
// An object from the following class will be published by HyperSpace2 and an Impostor object wil impersonate it using HyperSpace1
class HyperSpatialObject {
  constructor() {
    this.a = "a";
    this.b = "b";
    this.c = 0;
  }
  /**
   *
   * @param {Number} int
   * @param {Number} int1
   * @return {void|Promise<void>}
   */
  incrementC(int, int1) {
    this.c = this.c + int + int1;
  }
  /**
   *
   * @return {String|Promise<String>}
   */
  concatAll() {
    return this.a + this.b + this.c;
  }
}
async function publishHyperSpatialObjectAndCreateImpostor() {
  var hsObject = new HyperSpatialObject(); //Object you want to publish
  const publisher = new Publisher4HyperSpace(hs2, hsObject, [
    "incrementC",
    "concatAll",
  ]);
  var impostorUrl = await publisher.publish4Impostor("myCuteImpostor", "meta"); //Publish a special object used to create a Impostor in a remote HyperSpace
  // [F2] Contact Card Direct Request Test
  var impostorCC = await publisher.publishImpostor("myCuteImpostor2", "meta");
  var impo = await hs1.makeImpostor(impostorCC);
  await impo["incrementC"](3, 6);
  console.assert((await impo.concatAll()) === "ab9", "concatAll [F2]");
  // [F2] Contact Card Direct Request Test : fin
  /**
   * @type {HyperSpatialObject}
   */

  var impostor = await ImpostorMaker4HyperSpace(hs1, cc2, impostorUrl);
  await impostor["incrementC"](3, 6);
  console.assert((await impostor.concatAll()) === "ab18", "concatAll");
  console.log("example finished");
}
module.exports = localExample;
