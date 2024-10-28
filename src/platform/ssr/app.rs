use crate::Routes;
use yew::prelude::*;
use yew_router::{
    history::{AnyHistory, History, MemoryHistory},
    Router as ServerRouter,
};

#[derive(Properties, PartialEq)]
pub struct Props {
    pub url: String,
}

#[function_component]
pub fn App(props: &Props) -> Html {
    let history = AnyHistory::from(MemoryHistory::new());
    history.push(&props.url);

    html! {
        <ServerRouter history={history}>
            <Routes />
        </ServerRouter>
    }
}
