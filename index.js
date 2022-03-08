const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(8080 || process.env.PORT, () => {
  console.log("Server started... using port " + port);
});
