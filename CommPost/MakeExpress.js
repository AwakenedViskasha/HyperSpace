async function MakeExpress(padress, pport) {
  var prom = new Promise((resolve, reject) => {
    var express = require("express");
    this.express = express();
    this.router = express.Router();
    var path = require("path");
    var logger = require("morgan");
    var app = this.express;
    var port = pport || 80;
    var adress = padress || "127.0.0.1";
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.get("/", (req, res) => {
      res.send("Hello World! Im a Dev Server !");
    });
    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
      console.log(err);
      // render the error page
      res.status(err.status || 500);
      res.send("error : " + err);
    });
    var http = require("http");
    app.set("port", port);
    /**
     * Create HTTP server.
     */
    var server = http.createServer(app);
    this.server = server;
    var me = {};
    app.set("port", port);
    server.listen(port, adress, function () {
      me.host = JSON.parse(JSON.stringify(server.address())).address;
      me.port = server.address().port;
      console.log("Example app listening at http://%s:%s", me.host, me.port);
      resolve(app);
    });
    server.on("error", onError);
    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
      if (error.syscall !== "listen") {
        reject(error);
      }

      var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
  });
  var toReturn;
  await prom.then((res) => (toReturn = res));
  return toReturn;
}
module.exports = MakeExpress;
