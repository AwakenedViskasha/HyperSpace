const Factory4HyperSpace = require("../../HyperSpace/Factory4HyperSpace");
const Publisher4HyperSpace = require("../../HyperSpace/Publisher4HyperSpace");
var hs1;
var pm1;
function remoteExample1(contactCard1, host1) {
  pm1 = Factory4HyperSpace.MakeHyperSpace(host1, contactCard1).then(
    (values) => {
      hs1 = values;
      LaunchHSAndTradeContactCard();
    }
  );
}

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
    console.log("incrementC " + int + " " + int1);
  }
  /**
   *
   * @return {String|Promise<String>}
   */
  concatAll() {
    console.log("ConcatAll : " + this.a + this.b + this.c);
    return this.a + this.b + this.c;
  }
}
async function LaunchHSAndTradeContactCard() {
  await hs1.launchThis();
  var hsObject = new HyperSpatialObject(); //Object you want to publish
  const publisher = new Publisher4HyperSpace(hs1, hsObject, [
    "incrementC",
    "concatAll",
  ]);
  await publisher.publish4Impostor("myCuteImpostor");
  console.log("Now you can launch HyperSpace2");
}
module.exports = remoteExample1;
