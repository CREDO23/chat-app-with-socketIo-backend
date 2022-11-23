"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userControllers = require("../controllers/user");
const router = express.Router();
router.post('/singup', userControllers.register);
router.post('/singin', userControllers.login);
router.get('/', userControllers.getAllusers);
router.get('/:id', userControllers.getUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map