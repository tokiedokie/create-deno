import { mainDataSrc, versionDataSrc } from "./data_src.ts";

main();

async function main() {
  const target_path = Deno.args[0];
  await writeFiles(target_path);
  gitInit(target_path);
}

async function writeFiles(target_path = "."): Promise<void> {
  await Deno.mkdir(`${target_path}/src`, { recursive: true });
  Deno.writeTextFile(`${target_path}/src/main.ts`, mainDataSrc);
  Deno.writeTextFile(`${target_path}/version.ts`, versionDataSrc);
}

async function gitInit(target_path = "."): Promise<void> {
  Deno.run({
    cmd: ["git", "init"],
    cwd: target_path,
  });
}
