import path from "path";
import fs from "fs";
export const rootDir = path.join(__dirname + "..");

export const deleteFile = (filename: string) => {
  fs.unlink(path.join(rootDir, filename), err => {
    console.log(err);
  });
};
