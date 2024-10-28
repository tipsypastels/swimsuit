use super::DIST;
use anyhow::{Context, Result};
use axum::body::{Body, Bytes};
use futures::{stream, StreamExt};
use std::{convert::Infallible, path::Path};
use tokio::fs;
use yew::{BaseComponent, ServerRenderer};

#[derive(Debug, Clone)]
pub struct IndexHtml {
    // Can't use Arc, need to `impl Into<Bytes>`.
    before: Box<[u8]>,
    after: Box<[u8]>,
}

impl IndexHtml {
    pub async fn new() -> Result<Self> {
        let path = Path::new(DIST).join("index.html");
        let html = fs::read_to_string(path).await.context("read error")?;

        let (before, after) = html.split_once("<body>").context("lacks body")?;
        let mut before = before.to_string();
        before.push_str("<body>");

        let before = before.into_bytes().into_boxed_slice();
        let after = after.to_string().into_bytes().into_boxed_slice();

        Ok(Self { before, after })
    }

    pub fn render<C>(self, renderer: ServerRenderer<C>) -> Body
    where
        C: BaseComponent,
    {
        enum Item {
            Boxed(Box<[u8]>),
            String(String),
        }
        impl From<Item> for Bytes {
            fn from(item: Item) -> Self {
                match item {
                    Item::Boxed(b) => b.into(),
                    Item::String(s) => s.into(),
                }
            }
        }
        Body::from_stream(
            stream::once(async move { Item::Boxed(self.before) })
                .chain(renderer.render_stream().map(Item::String))
                .chain(stream::once(async move { Item::Boxed(self.after) }))
                .map(Ok::<_, Infallible>),
        )
    }
}
