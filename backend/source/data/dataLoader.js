// import fs from "fs";
// import path from "path";

// const filePath = path.resolve("data/dental_clinic_data.json");
// const jsonString = fs.readFileSync(filePath, "utf-8");
// const clinicData = JSON.parse(jsonString);

// export default clinicData;

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Lấy đường dẫn tuyệt đối của file hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON nằm cùng folder với dataLoader.js
const filePath = path.join(__dirname, "dental_clinic_data.json");

const jsonString = fs.readFileSync(filePath, "utf-8");
const clinicData = JSON.parse(jsonString);

export default clinicData;

