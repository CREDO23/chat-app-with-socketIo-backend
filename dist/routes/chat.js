"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chatControllers = require("../controllers/chat");
const router = express.Router();
router.post('/', chatControllers.createChat);
router.get('/:userId', chatControllers.getChatByUser);
router.put('/:chatId', chatControllers.addMessage);
router.put('/:chatId/:userId/:lastview', chatControllers.updateLastViewChat);
exports.default = router;
//# sourceMappingURL=chat.js.map