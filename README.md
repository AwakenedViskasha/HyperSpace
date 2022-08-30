

# HyperSpace

HyperSpace is a Node library used for creating WEB API quickly and simply. This library will help you creating a distributed method/object like architecture, hopefuly removing Web networking concern from your business logic.

## Features

* Create and manage WEB API.
* Links your differents Node instances through HyperSpace objects.
* Publish objects to your HyperSpace, they can now be called through the web.
* Create Impostor object and streamline your API creations and API calls through your HyperSpace network.

## Installation

Use the package manager npm to install.

```bash
npm install @awakenedviskasha/hyperspace
```

## Usage

* Instantiate an HyperSpace :

```javascript
//From NodeProgram1

const {Factory4HyperSpace} = require("@awakenedviskasha/hyperspace");

var pm1 = await Factory4HyperSpace.MakeHyperSpace({
  name: "HyperSpace1",
  host: "127.0.0.1",
  port: 80,
});
await hs1.launchThis()
//HyperSpace is now operable.

```
* Make contact with another HyperSpace :
```javascript
//From NodeProgram1

await hs1.addAndValidateContactCard({
  name: "HyperSpace2",
  host: "127.0.0.1",
  port: 88,
}) //Try to reach an Hyperspace using the provided ContactCard
await hs1.sendContactCard(hs1.IDCard); 
//HyperSpace2 has now received a ContactCard from HyperSpace1.
```
* Publish a class object to make it available anywhere :
```javascript
//From NodeProgram2

class HyperSpatialObject {
  constructor() {
    this.a = "a";
    this.b = "b";
    this.c = 0;
  }
  incrementC(int, int1) {
    this.c = this.c + int + int1;
  }
  concatAll() {
    return this.a + this.b + this.c;
  }
}

var hsObject = new HyperSpatialObject();
var publisher = new Publisher4HyperSpace(hs2, hsObject);
var impostorUrl = await publisher.publish4Impostor("myCuteImpostor");
//Data for creating an Impostor object of hsObject is now available on the HyperSpace network.
```
* Create and interact with an Impostor object from another HyperSpace :
```javascript
//From NodeProgram1

var impostor = await ImpostorMaker4HyperSpace(hs1, cc2, "myCuteImpostor");
// Impostor will act as a proxy for hsObject from NodeProgram2
console.log(impostor.c); //outputs "0".
await impostor.incrementC(3, 6);
console.log(await impostor.concatAll()); //outputs "ab9".
console.log(impostor.c); // still outputs "0".
await impostor.synchronizeProperties4Impostor(); //refresh data from hsObject
console.log(impostor.c); //outputs "9".
```
## Limitations
* Not tested with inherited class.
* You have to implement yourself orchestration for published objects or Hyperspace ContactCards.
* No security layer for now...

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Request for functionnality is open.

Feedbacks are welcome since it is my first public package.
## Contact

Do you have questions, suggestions or a business opportunity to offer ? You can contact me here : awakenedviskasha@gmail.com

## Donations

Donations are welcome. If the library helped you or you need an extra functionality, don't hesitate to buy me a coffee !

https://www.buymeacoffee.com/awakenedviskash

## License
MIT
