import csvv from "csvv";
import { sync } from "fast-glob";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import template from './template'

const { stringify } = JSON;

if (!existsSync("dist")) {
  mkdirSync("dist");
}

let list = [];


const semuaData = sync("data/*.txt");

for (const x of semuaData) {
  let isi = readFileSync(x).toString();
  isi = csvv(isi, "\t");
  let judul = x.replace("data", "dist").replace(".txt", ".json");
  list.push(judul.slice(5).slice(0, -5));
  writeFileSync(judul, stringify(isi, null, 2));
}

writeFileSync("dist/index.html", template(list));
// console.log(template(list))