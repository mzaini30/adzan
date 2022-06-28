import csvv from "csvv";
import { sync } from "fast-glob";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import template from "./template";

const { stringify } = JSON;

if (!existsSync("dist")) {
  mkdirSync("dist");
}

let list: string[] = [];

const semuaData = sync("data/*.txt");

type NamaKota = {
  kota: string;
  file: string;
};

let namaKota: NamaKota[] = [];

for (const x of semuaData) {
  let isi = readFileSync(x).toString();
  isi = csvv(isi, "\t");
  let judul = x.replace("data", "dist").replace(".txt", ".json");
  list.push(judul.slice(5).slice(0, -5));
  writeFileSync(judul, stringify(isi, null, 2));

  namaKota.push({
    kota: x.replace("data/", "").replace(".txt", ""),
    file: x.replace("data/", "").replace(".txt", ".json"),
  });
}

writeFileSync("dist/index.html", template(list));
writeFileSync("dist/namaKota.json", stringify(namaKota, null, 2));
