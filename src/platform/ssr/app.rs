use crate::Routes;
use bounce::{
    helmet::{self, HelmetBridge},
    BounceRoot,
};
use yew::prelude::*;
use yew_router::{
    history::{AnyHistory, History, MemoryHistory},
    Router as ServerRouter,
};

#[derive(Properties, PartialEq)]
pub struct Props {
    pub helmet: helmet::StaticWriter,
    pub url: String,
}

#[function_component]
pub fn App(props: &Props) -> Html {
    let history = AnyHistory::from(MemoryHistory::new());
    history.push(&props.url);

    html! {
        <BounceRoot>
            <HelmetBridge writer={props.helmet.clone()} />
            <ServerRouter history={history}>
                <Routes />
            </ServerRouter>
        </BounceRoot>
    }
}
