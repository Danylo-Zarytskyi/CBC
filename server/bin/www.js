import dotenv from "dotenv";
import dbRunner from "./runners/db.js";
import httpRunner from "./runners/http.js";

dotenv.config();

await dbRunner();
await httpRunner();
