var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable */
import fs from 'fs';
import inquirer from 'inquirer';
import inquirerfuzzypath from 'inquirer-fuzzy-path';
import { PrismaClient } from '@prisma/client';
var prisma = new PrismaClient();
inquirer.registerPrompt('fuzzypath', inquirerfuzzypath);
var answers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var questions, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questions = [
                    {
                        type: 'confirm',
                        name: 'validation',
                        message: 'Before you begin, please verify that your file is in the Downloads folder of your computer.',
                    },
                    {
                        type: 'fuzzypath',
                        name: 'path',
                        excludePath: function (nodePath) { return nodePath.startsWith('node_modules'); },
                        excludeFilter: function (nodePath) { return nodePath == '.'; },
                        itemType: 'directory',
                        rootPath: '/mnt/c/Users/namel/Downloads',
                        message: 'Select the file in which to search for the data',
                        suggestOnly: false,
                        depthLimit: 5,
                    },
                    {
                        type: 'checkbox',
                        name: 'type',
                        message: 'Which table do you want to update?',
                        choices: ['Taxis', 'Trajectories'],
                    },
                ];
                return [4 /*yield*/, inquirer.prompt(questions)];
            case 1:
                answers = _a.sent();
                console.log('Answers:', answers);
                console.log('Processing...');
                return [4 /*yield*/, dataInjection(answers.path, answers.type)];
            case 2:
                _a.sent();
                console.log('Task completed.');
                return [2 /*return*/];
        }
    });
}); };
var dataInjection = function (path, type) { return __awaiter(void 0, void 0, void 0, function () {
    var files, filesTxt, _i, filesTxt_1, file, fullPath, fileData, fileDataSplit, taxiData, cleanData, trajectoryData, cleanData, fileError_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                if (!path.includes('taxis') && !path.includes('trajectories')) {
                    console.log('No folder or file related to taxis or trajectories table is found.');
                    return [2 /*return*/];
                }
                else if (path.includes('trajectories') && type[0] !== 'Trajectories') {
                    console.log('No folder or file related to the trajectories table is found.');
                    return [2 /*return*/];
                }
                else if (path.includes('taxis') && type[0] !== 'Taxis') {
                    console.log('No folder or file related to the taxis table is found.');
                    return [2 /*return*/];
                }
                files = fs.readdirSync(path);
                filesTxt = files.filter(function (file) { return file.includes('.txt'); });
                if (filesTxt.length === 0) {
                    console.log('No .txt files found in selected folder');
                    return [2 /*return*/];
                }
                _i = 0, filesTxt_1 = filesTxt;
                _a.label = 1;
            case 1:
                if (!(_i < filesTxt_1.length)) return [3 /*break*/, 9];
                file = filesTxt_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                fullPath = "".concat(path, "/").concat(file);
                fileData = fs.readFileSync(fullPath, 'utf8');
                fileDataSplit = fileData.split('\n');
                if (!(type[0] === 'Taxis')) return [3 /*break*/, 4];
                taxiData = fileDataSplit.map(function (taxi) {
                    var taxArr = taxi.split(',');
                    return { id: +taxArr[0], plate: taxArr[1] };
                });
                cleanData = taxiData.filter(function (taxi) { return taxi.id !== undefined && taxi.plate !== undefined; });
                return [4 /*yield*/, prisma.taxis.createMany({
                        data: cleanData,
                        skipDuplicates: true,
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                if (!(type[0] === 'Trajectories')) return [3 /*break*/, 6];
                trajectoryData = fileDataSplit.map(function (trajectory) {
                    var trajArr = trajectory.split(',');
                    var date = new Date(trajArr[1]);
                    var latitude = parseFloat(trajArr[2]);
                    var longitude = parseFloat(trajArr[3]);
                    return {
                        taxi_id: +trajArr[0],
                        date: !isNaN(date.getTime()) ? date : null,
                        latitude: !isNaN(latitude) ? latitude : null,
                        longitude: !isNaN(longitude) ? longitude : null,
                    };
                });
                cleanData = trajectoryData.filter(function (trajectory) {
                    return trajectory.taxi_id &&
                        trajectory.date !== null &&
                        trajectory.latitude !== null &&
                        trajectory.longitude !== null;
                });
                return [4 /*yield*/, prisma.trajectories.createMany({
                        data: cleanData,
                        skipDuplicates: true,
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                fileError_1 = _a.sent();
                console.log('Error processing file:', file);
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 1];
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                console.log('Error reading the folder:', error_1);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
answers();
