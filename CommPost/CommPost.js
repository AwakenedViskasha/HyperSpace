class CommPost {
  constructor(pm) {
    var crypto = require("crypto");
    this.mySecret = crypto.randomUUID();
  }
  prepareForPorteMod(pm) {
    if (!pm) return this;
    this.IDAddress = [
      "AxxelSoftware",
      "HyperSpaceSuite",
      "CommPost",
      "CommPost",
      "v0",
    ];
    this.functionalAddress = ["HyperSpaceSuite", "CommPost", "CommPost"];
    preparePorteModForClass(this);
    function preparePorteModForClass(me) {
      if (pm.getModByFunctionalAddr(me.functionalAddress)) return;
      pm.registerClassAsMod(CommPost, me.IDAddress);
      pm.setModToFunctionalAddress(me.IDAddress, me.functionalAddress);
    }
    return this;
  }
  setConfig(config) {
    this.config = config;
  }
  setExpress(express) {
    this.express = express;
  }
  setJWT() {}

  async publish(path, callback, objectToCallBack) {
    var me = this;
    var reqStruct = { path: "path", function: "any" };
    path = "/" + path;
    var functionSocket = async function (req, res) {
      try {
        var response = await callback.apply(objectToCallBack, req.body.param);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
      }
    };
    await this.express.get(path, functionSocket);
  }
  /**
   *
   * @param {Object} param
   * @param {Object} param.hostname
   * @param {Object} param.path
   * @param {Object} [param.port]
   * @param {Object} [param.data]
   */

  async read(contactCard, addressToRead, dataToSend) {
    var me = this;

    var functName = "send";
    /**
     * @type {Promise}
     */
    var send = new Promise((resolve, reject) => {
      var http = require("http");
      var hostname;
      var path;
      var port;
      var data;
      hostname = contactCard.host;
      path = "/" + contactCard.name + addressToRead;
      port = contactCard.port;
      data = { param: dataToSend };
      data = JSON.stringify(data);
      var options = {
        hostname: hostname,
        port: port,
        path: path,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      };
      var req = http.request(options, function (res) {
        var results = "";

        res.on("data", function (chunk) {
          results = results + chunk;
        });
        res.on("end", function () {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            var previous;
            var error;
            try {
              previous = JSON.parse(results);
              error = JSON.parse(results);
            } catch (e) {
              error = "Error " + results + ".";
            }
            reject({ webcodeError: res.statusCode, msg: error });
          } else {
            var temp;
            try {
              temp = JSON.parse(results);
            } catch (error) {
              temp = JSON.parse(JSON.stringify(results));
            }

            resolve(temp);
          }
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.on("timeout", function () {
        // Timeout happend. Server received request, but not handled it
        // (i.e. doesn't send any response or it took to long).
        // You don't know what happend.
        // It will emit 'error' message as well (with ECONNRESET code).

        console.log("timeout");
        reject("timeout");
        req.destroy();
      });
      req.write(data);
      req.setTimeout(2000);
      req.end();
    });
    var toReturn;
    await send
      .then((res) => (toReturn = res))
      .catch((err) => {
        toReturn = Promise.reject(err);
      });
    return toReturn;
  }
  syncRead(contactCard, addressToRead, dataToSend, cb) {
    var me = this;
    var done = false;
    var functName = "send";

    var http = require("http");
    var hostname;
    var path;
    var port;
    var data;

    hostname = contactCard.host;
    path = "/" + contactCard.name + addressToRead;
    port = contactCard.port;
    data = { param: dataToSend };
    data = JSON.stringify(data);
    var options = {
      hostname: hostname,
      port: port,
      path: path,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };
    console.log("request!");
    var req = http.request(options, function (res) {
      var results = "";

      res.on("data", function (chunk) {
        results = results + chunk;
      });
      res.on("end", function () {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          var previous;
          var error;
          try {
            previous = JSON.parse(results);
            error = JSON.parse(results);
          } catch (e) {
            error = "Error " + results + ".";
          }
          //toReturn = { webcodeError: res.statusCode, msg: error };
          cb({ webcodeError: res.statusCode, msg: error });
          console.log("done");
          done = true;
        } else {
          var temp;
          try {
            temp = JSON.parse(results);
          } catch (error) {
            temp = JSON.parse(JSON.stringify(results));
          }

          //toReturn = temp;
          cb(temp);
        }
      });
    });
    req.on("error", (error) => {
      //toReturn = error;
      cb();
    });
    req.on("timeout", function () {
      // Timeout happend. Server received request, but not handled it
      // (i.e. doesn't send any response or it took to long).
      // You don't know what happend.
      // It will emit 'error' message as well (with ECONNRESET code).

      console.log("timeout");
      //toReturn = "timeout!";
      cb("timeout");
      req.destroy();
    });
    var once = false;

    req.write(data);

    req.setTimeout(2000);

    req.end();
    console.log("Endrequest!");
  }
}
module.exports = CommPost;
