"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('HELLOOOO');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
