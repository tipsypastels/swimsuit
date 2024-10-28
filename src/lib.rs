use yew::prelude::*;

#[cfg_attr(target_arch = "wasm32", path = "csr.rs")]
#[cfg_attr(not(target_arch = "wasm32"), path = "ssr/mod.rs")]
pub mod entry;

#[function_component]
pub fn App() -> Html {
    html! {
        <div>{"Foo!"}</div>
    }
}
