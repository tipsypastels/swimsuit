use self::{app::App, index_html::IndexHtml, serve::serve};
use anyhow::{Context, Result};
use axum::{
    body::Body, extract::State, handler::HandlerWithoutStateExt, http::Uri, routing::get, Router,
};
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use yew::ServerRenderer;

mod app;
mod index_html;
mod serve;

const DIST: &str = "dist";

#[derive(Debug, Clone)]
struct Ssr {
    index_html: IndexHtml,
}

#[tokio::main]
pub async fn main() -> Result<()> {
    #[cfg(debug_assertions)]
    anyhow::ensure!(
        tokio::process::Command::new("trunk")
            .args(["build", "--features", "hydration"])
            .status()
            .await
            .context("hydration error")?
            .success(),
        "hydration failed"
    );

    let index_html = IndexHtml::new().await.context("index.html error")?;
    let ssr = Ssr { index_html };

    let getter = get(render).with_state(ssr.clone()).into_service();
    let service = ServeDir::new(DIST)
        .append_index_html_on_directories(false)
        .fallback(getter);

    let router = Router::new().fallback_service(service).with_state(ssr);
    let listener = TcpListener::bind("0.0.0.0:8080").await.unwrap();

    println!("Listening on {}.", listener.local_addr()?);
    serve(listener, router).await?;

    Ok(())
}

async fn render(uri: Uri, State(ssr): State<Ssr>) -> Body {
    let url = uri.path().to_string();
    let props = app::Props { url };
    let renderer = ServerRenderer::<App>::with_props(|| props);

    ssr.index_html.render(renderer)
}
