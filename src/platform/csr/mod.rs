use crate::Routes;
use yew::{prelude::*, Renderer};
use yew_router::BrowserRouter;

pub use implicit_clone::unsync as sync;

#[function_component]
fn App() -> Html {
    html! {
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    }
}

pub fn main() {
    let renderer = Renderer::<App>::new();

    #[cfg(feature = "hydration")]
    renderer.hydrate();

    #[cfg(not(feature = "hydration"))]
    renderer.render();
}
