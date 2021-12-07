import { init, WASI } from 'https://deno.land/x/wasm/wasi.ts';

// This is needed to load the WASI library first
await init();

let wasi = new WASI({
  env: {},
  args: [],
});

const moduleBytes = fetch("https://deno.land/x/wasm/tests/demo.wasm");
const module = await WebAssembly.compileStreaming(moduleBytes);
await wasi.instantiate(module, {});

let exitCode = wasi.start();
let stdout = wasi.getStdoutString();
 // This should print "hello world (exit code: 0)"
console.log(`${stdout}(exit code: ${exitCode})`);
