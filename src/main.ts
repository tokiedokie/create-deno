import { mainDataSrc, versionDataSrc } from "./data_src.ts";

main();

async function main() {
  const target_path = Deno.args[0] === "--force" ? Deno.args[1] : Deno.args[0]
  
  if (await isDirEmpty(target_path) || Deno.args.includes("--force")) {
    await writeFiles(target_path);
    await gitInit(target_path);
  } else {
    console.warn("dir is not empty. if you really create deno project in the directory use --force.");
  }
}

async function isDirEmpty(target_path = "."): Promise<boolean> {
  return Deno.stat(target_path).then(() => {
    let isEmpty = true;
    for (const _entry of Deno.readDirSync(target_path)) {
      isEmpty = false;
    }
    return isEmpty;
  }).catch(() => {
    return true;
  });
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
