use super::head::{HeadLock, HeadLockContextProvider};
use crate::Routes;
use yew::prelude::*;
use yew_router::{
    history::{AnyHistory, History, MemoryHistory},
    Router as ServerRouter,
};

#[derive(Properties, PartialEq)]
pub struct Props {
    pub headlock: HeadLock,
    pub url: String,
}

#[function_component]
pub fn App(props: &Props) -> Html {
    let history = AnyHistory::from(MemoryHistory::new());
    history.push(&props.url);

    html! {
        <HeadLockContextProvider context={props.headlock.clone()}>
            <ServerRouter history={history}>
                <Routes />
            </ServerRouter>
        </HeadLockContextProvider>
    }
}
