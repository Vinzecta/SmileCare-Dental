import fs from "fs";
import path from "path";

const filePath = path.resolve("source/data/dental_clinic_data.json");
const jsonString = fs.readFileSync(filePath, "utf-8");
const clinicData = JSON.parse(jsonString);

export default clinicData;
