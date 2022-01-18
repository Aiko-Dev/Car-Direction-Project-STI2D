"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const fileDir = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(fileDir));
app.get('/', (req, res) => {
    res.sendFile(fileDir + '/index.html');
});
app.listen(1234, () => {
    logger_1.default.success("Web server listening on port 1234");
});
//# sourceMappingURL=index.js.map