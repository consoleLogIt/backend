"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./routes/api/v1"));
// Create an Express application
const app = (0, express_1.default)();
// Set the port number for the server
const port = 3000;
app.use("/api/v1", v1_1.default);
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
