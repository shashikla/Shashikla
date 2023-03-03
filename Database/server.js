const http = require('http');
const app = require("./app");
const cors = require('cors');
const server = http.createServer(app);

const express = require("express");
app.use(express.json())
app.use(cors());

server.listen(3000, console.log("app is running"));