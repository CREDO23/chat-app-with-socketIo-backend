"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongostore = void 0;
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const connectDB = async (URI) => {
    try {
        await mongoose
            .connect(URI)
            .then(() => {
            console.log('Connection to database established');
        })
            .catch((error) => console.log(error));
    }
    catch (error) {
        console.log(error);
    }
};
const connectMongostore = (URI) => {
    return MongoStore.create({
        mongoUrl: URI,
        collectionName: 'sessions',
        ttl: 60 * 60 * 24 * 1000,
        autoRemove: 'native',
    });
};
exports.connectMongostore = connectMongostore;
exports.default = connectDB;
//# sourceMappingURL=database.js.map