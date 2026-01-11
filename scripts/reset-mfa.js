"use strict";
/**
 * Vantus Systems - Reset MFA for a user (admin operation)
 *
 * Usage (recommended):
 *   npx tsx scripts/reset-mfa.ts --email=user@example.com --yes
 *
 * Safety:
 *   - Requires --yes to actually perform the reset (prevents accidental runs).
 *   - Loads .env from project root so DATABASE_URL works.
 */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var client_1 = require("@prisma/client");
function loadDotEnv(dotenvPath) {
    if (dotenvPath === void 0) { dotenvPath = node_path_1.default.join(process.cwd(), ".env"); }
    if (!node_fs_1.default.existsSync(dotenvPath))
        return;
    var content = node_fs_1.default.readFileSync(dotenvPath, "utf8");
    for (var _i = 0, _a = content.split(/\r?\n/); _i < _a.length; _i++) {
        var raw = _a[_i];
        var line = raw.trim();
        if (!line || line.startsWith("#"))
            continue;
        var cleaned = line.startsWith("export ") ? line.slice(7).trim() : line;
        var eq = cleaned.indexOf("=");
        if (eq === -1)
            continue;
        var key = cleaned.slice(0, eq).trim();
        var val = cleaned.slice(eq + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        }
        if (!process.env[key])
            process.env[key] = val;
    }
}
function parseArgs(argv) {
    var out = { yes: false };
    for (var _i = 0, _a = argv.slice(2); _i < _a.length; _i++) {
        var a = _a[_i];
        if (a.startsWith("--email="))
            out.email = a.split("=", 2)[1];
        if (a === "--yes")
            out.yes = true;
    }
    return out;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var args, email, prisma, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loadDotEnv();
                    args = parseArgs(process.argv);
                    email = args.email || process.env.ADMIN_BOOTSTRAP_EMAIL;
                    if (!email) {
                        console.error("❌ Missing --email=... and ADMIN_BOOTSTRAP_EMAIL not set");
                        process.exit(2);
                    }
                    if (!args.yes) {
                        console.error("❌ Refusing to reset MFA without --yes");
                        process.exit(2);
                    }
                    prisma = new client_1.PrismaClient();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 4, 6]);
                    return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        console.error("\u274C User not found: ".concat(email));
                        process.exit(2);
                    }
                    return [4 /*yield*/, prisma.user.update({
                            where: { email: email },
                            data: {
                                mfaEnabled: false,
                                mfaSecret: null,
                                mfaRecoveryCodes: null,
                                mfaSetupAt: null,
                                mfaLastUsedAt: null,
                            },
                        })];
                case 3:
                    _a.sent();
                    console.log("\u2705 MFA reset for: ".concat(email));
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error("❌ reset-mfa failed:", (err === null || err === void 0 ? void 0 : err.message) || err);
    process.exit(1);
});
