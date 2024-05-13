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
                        message: 'Antes de empezar, por favor verifica que tu archivo este en la carpeta de Descargas de tu computadora',
                    },
                    {
                        type: 'fuzzypath',
                        name: 'path',
                        excludePath: function (nodePath) { return nodePath.startsWith('node_modules'); },
                        excludeFilter: function (nodePath) { return nodePath == '.'; },
                        itemType: 'directory',
                        rootPath: '/mnt/c/Users/proja/Downloads',
                        message: 'Selecciona el archivo en el que buscaremos los datos',
                        suggestOnly: false,
                        depthLimit: 5,
                    },
                    {
                        type: 'checkbox',
                        name: 'type',
                        message: 'Que tabla deseas actualizar?',
                        choices: ['Taxis', 'Trayectorias'],
                    },
                ];
                return [4 /*yield*/, inquirer.prompt(questions)];
            case 1:
                answers = _a.sent();
                console.log('Answers:', answers);
                // console.log('EL PATH', answers.path)
                // console.log('EL TYPE', answers.type)
                console.log('Procesando...');
                return [4 /*yield*/, dataInjection(answers.path, answers.type)];
            case 2:
                _a.sent();
                console.log('Tarea completada.');
                return [2 /*return*/];
        }
    });
}); };
var dataInjection = function (path, type) { return __awaiter(void 0, void 0, void 0, function () {
    var files, _i, files_1, file, fullPath, fileData, fileDataSplit, taxiData, cleanData, createTaxi, trajectoryData, cleanData, createTrajectory, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!path.includes('taxis') && !path.includes('trajectories')) {
                    console.log('No se encuentra ninguna carpeta o archivo relacionado a la tabla taxis o trayectorias');
                    return [2 /*return*/];
                }
                files = fs.readdirSync(path) //[1]
                ;
                console.log('🚀 ~ dataInjection ~ files:', files);
                _i = 0, files_1 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 6];
                file = files_1[_i];
                fullPath = "".concat(path, "/").concat(file);
                fileData = fs.readFileSync(fullPath, 'utf8');
                fileDataSplit = fileData.split('\n');
                if (!path.includes('taxis')) return [3 /*break*/, 3];
                if (!(type[0] === 'Taxis')) return [3 /*break*/, 3];
                taxiData = fileDataSplit.map(function (taxi) {
                    var taxArr = taxi.split(',');
                    // Y aquí lo estructuro como un objeto con la estructura necesaria para entrar a mi base de datos mediante Prisma
                    return { id: +taxArr[0], plate: taxArr[1] };
                });
                cleanData = taxiData.filter(function (taxi) { return taxi.id !== undefined && taxi.plate !== undefined; });
                return [4 /*yield*/, prisma.taxis.createMany({
                        data: cleanData,
                        skipDuplicates: true,
                    })];
            case 2:
                createTaxi = _a.sent();
                console.log("🚀 ~ files.forEach ~ createTaxi:", createTaxi);
                _a.label = 3;
            case 3:
                if (!path.includes('trajectories')) return [3 /*break*/, 5];
                if (!(type[0] === 'Trayectorias')) return [3 /*break*/, 5];
                trajectoryData = fileDataSplit.map(function (trajectory) {
                    var trajArr = trajectory.split(',');
                    return { taxi_id: +trajArr[0], date: new Date(trajArr[1]), latitude: +trajArr[2], longitude: +trajArr[3] };
                });
                trajectoryData.pop();
                cleanData = trajectoryData.filter(function (trajectory) { return trajectory.taxi_id !== undefined && trajectory.date !== undefined && trajectory.latitude !== undefined && trajectory.longitude !== undefined; });
                return [4 /*yield*/, prisma.trajectories.createMany({
                        data: cleanData,
                        skipDuplicates: true,
                    })];
            case 4:
                createTrajectory = _a.sent();
                console.log("🚀 ~ //files.forEach ~ createTrajectory:", createTrajectory);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log('Error al leer la carpeta:', error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
answers();
