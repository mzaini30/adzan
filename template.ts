export default function (list): string {
  return `
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
        ${list
          .map((x) => {
            return `
            <li class="mb-3">
              <a href="${x}.json" class="underline">${x}</a>
            </li>
          `;
          })
          .join("")}
      </ol>
    </div>
  </body>
  </html>
  `;
}
