const MakeHyperSpace = require("../../HyperSpace/Factory4HyperSpace");
const ImpostorMaker4HyperSpace = require("../../HyperSpace/ImpostorMaker4HyperSpace");
var hs2;
var cc2;
var cc1;
function remoteExample2(contactCard1, contactCard2, idCard2) {
  cc2 = contactCard2;
  cc1 = contactCard1;
  MakeHyperSpace.MakeHyperSpace(idCard2, cc2).then((values) => {
    hs2 = values;
    LaunchHSAndTradeContactCard();
  });
}
async function LaunchHSAndTradeContactCard() {
  await hs2.launchThis();
  await hs2.addAndValidateContactCard(cc1).catch((err) => console.log(err)); // HyperSpace2 will contact HyperSpace1 in order to validate the new Contact Card.
  await hs2.sendContactCard(cc1).catch((err) => console.log(err));
  var impostor = await ImpostorMaker4HyperSpace(hs2, cc1, "myCuteImpostor");
  await impostor["incrementC"](3, 6);
  console.log(await impostor.concatAll());
  console.log(impostor.c);
  await impostor.synchronizeProperties4Impostor(); //call this method if you want to actualize the values of the properties.
  console.log(impostor.c);
}

module.exports = remoteExample2;
