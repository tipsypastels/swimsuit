use super::DIST;
use anyhow::{Context, Result};
use axum::body::{Body, Bytes};
use futures::{stream, StreamExt};
use std::{convert::Infallible, path::Path};
use tokio::fs;
use yew::{BaseComponent, ServerRenderer};

#[derive(Debug, Clone)]
pub struct IndexHtml {
    before: &'static str,
    after: &'static str,
}

impl IndexHtml {
    pub async fn new() -> Result<Self> {
        let path = Path::new(DIST).join("index.html");
        let html = fs::read_to_string(path).await.context("read error")?;

        let (before, after) = html.split_once("<body>").context("lacks body")?;
        let (mut before, after) = (before.to_string(), after.to_string());
        before.push_str("<body>");

        let before = Box::leak(Box::from(before));
        let after = Box::leak(Box::from(after));

        Ok(Self { before, after })
    }

    pub fn render<C>(self, renderer: ServerRenderer<C>) -> Body
    where
        C: BaseComponent,
    {
        enum Cow {
            Owned(String),
            Borrowed(&'static str),
        }
        impl From<Cow> for Bytes {
            fn from(cow: Cow) -> Self {
                match cow {
                    Cow::Owned(o) => o.into(),
                    Cow::Borrowed(b) => b.into(),
                }
            }
        }
        Body::from_stream(
            stream::once(async move { Cow::Borrowed(self.before) })
                .chain(renderer.render_stream().map(Cow::Owned))
                .chain(stream::once(async move { Cow::Borrowed(self.after) }))
                .map(Ok::<_, Infallible>),
        )
    }
}
