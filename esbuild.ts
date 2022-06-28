import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["index.ts"],
  outfile: "index.js",
  bundle: true,
  minify: true,
  platform: "node",
});
