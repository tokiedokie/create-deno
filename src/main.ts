import { mainDataSrc, versionDataSrc } from "./data_src.ts";

await writeFiles();
gitInit();

async function writeFiles(target_path: string = "."): Promise<void> {
  await Deno.mkdir(`${target_path}/src`, { recursive: true });
  Deno.writeTextFile(`${target_path}/src/main.ts`, mainDataSrc);
  Deno.writeTextFile(`${target_path}/version.ts`, versionDataSrc);
}

async function gitInit(target_path: string = "."): Promise<void> {
  Deno.run({
    cmd: ["git", "init"],
    cwd: target_path
  })
}
