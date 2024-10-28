use anyhow::{Context, Result};
use axum::{body::Body, extract::State, handler::HandlerWithoutStateExt, routing::get, Router};
use futures::{stream, StreamExt};
use std::{convert::Infallible, path::Path};
use tokio::{fs, net::TcpListener};
use tower_http::services::ServeDir;

const DIST: &str = "dist";

#[derive(Debug, Clone)]
struct Ssr {
    index_html_before: String,
    index_html_after: String,
}

#[tokio::main]
pub async fn main() -> Result<()> {
    let (index_html_before, index_html_after) = {
        let path = Path::new(DIST).join("index.html");
        let html = fs::read_to_string(path).await.context("index.html error")?;
        let (before, after) = html.split_once("<body>").context("index.html lacks body")?;
        let mut before = before.to_string();
        before.push_str("<body>");
        (before, after.to_string())
    };

    let ssr = Ssr {
        index_html_before,
        index_html_after,
    };

    let getter = get(render).with_state(ssr.clone()).into_service();
    let service = ServeDir::new(DIST)
        .append_index_html_on_directories(false)
        .fallback(getter);

    let router = Router::new().fallback_service(service).with_state(ssr);
    let listener = TcpListener::bind("0.0.0.0:8080").await.unwrap();

    println!("Listening on {}.", listener.local_addr()?);
    axum::serve(listener, router).await?;

    Ok(())
}

async fn render(State(ssr): State<Ssr>) -> Body {
    let renderer = yew::ServerRenderer::<swimsuit::App>::new();
    let stream = stream::once(async move { ssr.index_html_before })
        .chain(renderer.render_stream())
        .chain(stream::once(async move { ssr.index_html_after }))
        .map(Ok::<_, Infallible>);

    Body::from_stream(stream)
}
