"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const messageControllers = require("../controllers/message");
const router = express.Router();
router.post('/', messageControllers.createMessage);
exports.default = router;
//# sourceMappingURL=message.js.map