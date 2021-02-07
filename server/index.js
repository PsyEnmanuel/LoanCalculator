const express = require('express')
const app = express()
const port = 4005
const path = require('path')

const CLIENT_BUILD_PATH = path.join(path.resolve(), "/build");

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

app.get("*", function (request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})