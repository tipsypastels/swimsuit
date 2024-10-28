use crate::platform::sync::IString;
use implicit_clone::ImplicitClone;

pub use crate::platform::use_head;

#[derive(Debug, Default, Clone, ImplicitClone, PartialEq)]
#[allow(clippy::manual_non_exhaustive)]
pub struct Head {
    pub title: Option<IString>,
    _priv: (),
}

impl Head {
    pub fn title(mut self, title: impl Into<IString>) -> Self {
        self.title = Some(title.into());
        self
    }
}
