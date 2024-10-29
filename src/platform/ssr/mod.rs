use self::{app::App, page::Page, serve::serve};
use anyhow::{Context, Result};
use axum::{
    extract::State, handler::HandlerWithoutStateExt, http::Uri, response::Html, routing::get,
    Router,
};
use bounce::helmet;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use yew::ServerRenderer;

pub use implicit_clone::sync;

mod app;
mod page;
mod serve;

const DIST: &str = "dist";

#[derive(Debug, Clone)]
struct Ssr {
    page: Page,
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

    let page = Page::new().await.context("index.html error")?;
    let ssr = Ssr { page };

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

async fn render(uri: Uri, State(ssr): State<Ssr>) -> Html<String> {
    let (helmet_renderer, helmet_writer) = helmet::render_static();
    let url = uri.path().to_string();
    let props = app::Props {
        helmet: helmet_writer,
        url,
    };

    let renderer = ServerRenderer::<App>::with_props(|| props);
    let html = ssr.page.render(renderer, helmet_renderer).await;

    Html(html)
}
