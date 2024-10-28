use crate::head::Head;
use yew::prelude::*;

#[hook]
pub fn use_head(f: impl FnOnce(Head) -> Head) {
    let head = f(Head::default());
    use_effect_with(head, |head| {
        if let Some(title) = head.title.as_ref() {
            gloo::utils::document().set_title(title);
        }
    });
}
