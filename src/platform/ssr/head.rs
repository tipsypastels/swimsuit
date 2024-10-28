use crate::head::Head;
use implicit_clone::ImplicitClone;
use std::sync::{Arc, OnceLock};
use yew::prelude::*;

pub type HeadLockContextProvider = ContextProvider<HeadLock>;

#[derive(Debug, Default, Clone, ImplicitClone, PartialEq)]
pub struct HeadLock {
    inner: Arc<OnceLock<Head>>,
}

impl HeadLock {
    pub fn title(&self) -> Option<&str> {
        dbg!(self.inner.get()).and_then(|h| h.title.as_deref())
    }
}

#[hook]
pub fn use_head(f: impl FnOnce(Head) -> Head) {
    let headlock = use_context::<HeadLock>().expect("no headlock");
    dbg!(&headlock);
    let head = f(Head::default());
    headlock.inner.set(head).expect("failed to set head")
}
