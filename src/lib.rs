use bounce::helmet::Helmet;
use yew::prelude::*;
use yew_router::prelude::*;

#[cfg(all(not(target_arch = "wasm32"), feature = "hydration"))]
compile_error!("hydration feature should be used with trunk");

#[cfg_attr(target_arch = "wasm32", path = "platform/csr/mod.rs")]
#[cfg_attr(not(target_arch = "wasm32"), path = "platform/ssr/mod.rs")]
pub mod platform;

type Link = yew_router::components::Link<Route>;

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
        <div class="text-blue-500">
            <Helmet><title>{"A"}</title></Helmet>
            {"A!"}
            <Link to={Route::B}>{"to B"}</Link>
        </div>
    }
}

#[function_component]
fn B() -> Html {
    html! {
        <div class="text-red-500">
            <Helmet><title>{"B"}</title></Helmet>
            {"B!"}
            <Link to={Route::A}>{"to A"}</Link>
        </div>
    }
}
