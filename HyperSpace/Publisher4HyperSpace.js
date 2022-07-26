const HyperSpace = require("./HyperSpace");

class Publisher4HyperSpace {
  constructor(hs, object, listOfMethods) {
    /**
     * @type {HyperSpace}
     */
    this.hyperSpace = hs;
    this.object = object;
    this.methods = {};
    this.impostorContactCard = null;
    for (var method of listOfMethods) this.methods[method] = "";
  }
  async publishObject() {
    for (var method of Object.getOwnPropertyNames(this.methods)) {
      this.methods[method] = await this.hyperSpace
        .publish(this.object, this.object[method])
        .catch((res) => console.log(res));
    }
  }
  getProperties4Impostor() {
    return this.object;
  }
  getMethods4Impostor() {
    return this.methods;
  }
  async publish4Impostor(url, meta) {
    for (var method of Object.getOwnPropertyNames(this.methods)) {
      this.methods[method] = await this.hyperSpace
        .publish(this.object, this.object[method])
        .catch((res) => console.log(res));
    }
    /* this.methods["getProperties4Impostor"] = await this.hyperSpace
      .publish(this, this.getProperties4Impostor)
      .catch((res) => console.log(res)); */
    this.methods["getMethods4Impostor"] = await this.hyperSpace
      .publish(this, this.getMethods4Impostor, url)
      .catch((res) => console.log(res));
    this.impostorContactCard = {
      "impostor contact card": {
        type: this.object.constructor.name,
        path: this.methods["getMethods4Impostor"],
        HCC: this.hyperSpace.myContactCard,
      },
    };
    if (meta) this.impostorContactCard["impostor contact card"].meta = meta;
    return this.methods["getMethods4Impostor"];
  }

  async publishImpostor(url, meta) {
    for (var method of Object.getOwnPropertyNames(this.methods)) {
      this.methods[method] = await this.hyperSpace
        .publish(this.object, this.object[method])
        .catch((res) => console.log(res));
    }
    this.methods["getMethods4Impostor"] = await this.hyperSpace
      .publish(this, this.getMethods4Impostor, url)
      .catch((res) => console.log(res));
    var impostorContactCard = {
      ContactCard: {
        type: this.object.constructor.name,
        path: this.methods["getMethods4Impostor"],
        HCC: this.hyperSpace.myContactCard,
      },
    };
    if (meta) impostorContactCard["ContactCard"].meta = meta;
    return impostorContactCard;
  }
  async unpublishObject() {
    try {
      for (var method of Object.getOwnPropertyNames(this.methods)) {
        this.hyperSpace.unpublish(this.methods[method]);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async unpublishMethod(methodName) {
    if (!this.methods.hasOwnProperty(methodName)) return false;
    try {
      this.hyperSpace.unpublish(this.methods[methodName]);
    } catch (error) {
      throw new Error(error);
    }
    return true;
  }
}
module.exports = Publisher4HyperSpace;
