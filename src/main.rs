#[cfg(target_arch = "wasm32")]
mod main_csr;
#[cfg(target_arch = "wasm32")]
pub use main_csr::main;

#[cfg(not(target_arch = "wasm32"))]
mod main_ssr;
#[cfg(not(target_arch = "wasm32"))]
pub use main_ssr::main;
