use crate::App;
use yew::Renderer;

pub fn main() {
    let renderer = Renderer::<App>::new();

    #[cfg(feature = "hydration")]
    renderer.hydrate();

    #[cfg(not(feature = "hydration"))]
    renderer.render();
}
