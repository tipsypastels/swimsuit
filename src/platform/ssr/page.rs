use super::DIST;
use aho_corasick::AhoCorasick;
use anyhow::{Context, Result};
use std::{path::Path, sync::LazyLock};
use tokio::fs;
use yew::{BaseComponent, ServerRenderer};

const PATTERNS_COUNT: usize = 1;
const PATTERNS: [&str; PATTERNS_COUNT] = ["<!--{{swimsuit:body}}-->"];

static AC: LazyLock<AhoCorasick> =
    LazyLock::new(|| AhoCorasick::new(PATTERNS).expect("invalid ac patterns"));

#[derive(Debug, Clone)]
pub struct Page {
    html: &'static str,
}

impl Page {
    pub async fn new() -> Result<Self> {
        let path = Path::new(DIST).join("index.html");
        let html = fs::read_to_string(path).await.context("read error")?;
        let html = Box::leak(Box::from(html));

        Ok(Self { html })
    }

    pub async fn render<C>(self, renderer: ServerRenderer<C>) -> String
    where
        C: BaseComponent,
    {
        let body = renderer.render().await;
        let replacements: [_; PATTERNS_COUNT] = [body];
        AC.replace_all(self.html, &replacements)
    }
}
