#!/usr/bin/env node
let organiseFn = require("./commands/organise");
let treeFn = require("./commands/tree");
let args = process.argv.slice(2);
let command = args[0];
let option = args[1];
let ifCut = args[2];
if (ifCut == "-x" || ifCut == "-X") {
  ifCut = true;
} else {
  ifCut = false;
}

switch (command) {
  case "tree":
    treeFn();
    break;
  case "organise":
    organiseFn(option, ifCut);
    break;
  case "help":
    helpFn();
    break;
}
