pub fn main() {
    #[cfg(feature = "hydration")]
    yew::Renderer::<crate::App>::new().hydrate();

    #[cfg(not(feature = "hydration"))]
    yew::Renderer::<crate::App>::new().render();
}
