use yew::prelude::*;
use yew_router::prelude::*;

#[cfg_attr(target_arch = "wasm32", path = "csr.rs")]
#[cfg_attr(not(target_arch = "wasm32"), path = "ssr/mod.rs")]
pub mod entry;

#[derive(Routable, Debug, Clone, PartialEq, Eq)]
enum Route {
    #[at("/a")]
    A,
    #[at("/b")]
    B,
}

#[function_component]
fn Routes() -> Html {
    html! {
        <Switch<Route> render={switch} />
    }
}

fn switch(route: Route) -> Html {
    match route {
        Route::A => html! { <A /> },
        Route::B => html! { <B /> },
    }
}

#[function_component]
fn A() -> Html {
    html! {
        <div class="text-blue-500">{"A!"}</div>
    }
}

#[function_component]
fn B() -> Html {
    html! {
        <div class="text-red-500">{"B!"}</div>
    }
}
