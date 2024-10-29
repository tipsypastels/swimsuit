use crate::Routes;
use bounce::{helmet::HelmetBridge, BounceRoot};
use yew::{prelude::*, Renderer};
use yew_router::BrowserRouter;

pub use implicit_clone::unsync as sync;

#[function_component]
fn App() -> Html {
    html! {
        <BounceRoot>
            <HelmetBridge />
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </BounceRoot>
    }
}

pub fn main() {
    let renderer = Renderer::<App>::new();

    #[cfg(feature = "hydration")]
    renderer.hydrate();

    #[cfg(not(feature = "hydration"))]
    renderer.render();
}
