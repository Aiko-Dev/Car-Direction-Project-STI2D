"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    success: 3
};
const colors = {
    "error": "red",
    "warn": "yellow",
    "info": "cyan",
    "verbose": "gray",
    "success": "green"
};
winston.addColors(colors);
const winstonFormat = winston.format.combine(winston.format(info => {
    info.level = info.level.toUpperCase();
    return info;
})(), winston.format.colorize({
    all: true
}), winston.format.label({
    label: '[LOGGER]'
}), 
//winston.format.align(),
winston.format.printf((info) => `[${info.level}] ${info.message}`));
const logger = winston.createLogger({
    level: 'info',
    levels,
    format: winstonFormat,
    transports: [
        new winston.transports.Console({
            level: 'success'
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/all.log' }),
    ]
});
exports.default = logger;
//# sourceMappingURL=logger.js.map