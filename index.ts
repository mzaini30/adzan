import csvv from "csvv";
import { sync } from "fast-glob";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";

const { stringify } = JSON;

if (!existsSync("dist")) {
  mkdirSync("dist");
}

let list = [];
let template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File JSON Jadwal Adzan</title>
  <meta name="description" content="Kumpulan file JSON jadwal adzan">
</head>
<body>
  <div class="p-5">
    <h1 class="text-center mb-4 font-bold uppercase">Kumpulan File JSON Jadwal Adzan</h1>
    <ol class="list-decimal ml-5">
      ${list.forEach((x) => {
        return `
          <li class="mb-3">
            <a href="${x}.json" class="underline">${x}</a>
          </li>
        `;
      })}
    </ol>
  </div>
</body>
</html>
`;

const semuaData = sync("data/*.txt");

for (const x of semuaData) {
  let isi = readFileSync(x).toString();
  isi = csvv(isi, "\t");
  let judul = x.replace("data", "dist").replace(".txt", ".json");
  list.push(judul);
  writeFileSync(judul, stringify(isi, null, 2));
}

writeFileSync("dist/index.html", template);
