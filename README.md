# wasm-mandelbrot

I'm using this project as a way to explore various different mechanisms for creating WebAssembly modules. So far it includes:

 - Emscripten, the 'standard' way to create WASM modules from C / C++ code
 - wasm-toolchain, a minimal toolchain based on clang / llc / BinaryEm
 - AssemblyScript, create WASM modules from TypeScript

You can see the various approaches in action here:

https://colineberhardt.github.io/wasm-mandelbrot/