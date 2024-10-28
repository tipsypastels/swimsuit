use anyhow::Result;
use axum::{extract::Request, Router};
use hyper::{body::Incoming, rt::Executor, service::service_fn};
use hyper_util::{rt::TokioIo, server};
use std::future::Future;
use tokio::net::TcpListener;
use tower::Service as _;
use yew::platform::Runtime;

pub async fn serve(listener: TcpListener, router: Router<()>) -> Result<()> {
    let exec = Exec {
        rt: Default::default(),
    };

    loop {
        let (socket, _) = listener.accept().await?;
        let router = router.clone();
        let exec = exec.clone();

        tokio::spawn(async move {
            let socket = TokioIo::new(socket);
            let service = service_fn(move |req: Request<Incoming>| router.clone().call(req));
            let _ = server::conn::auto::Builder::new(exec)
                .serve_connection_with_upgrades(socket, service)
                .await;
        });
    }
}

#[derive(Debug, Clone)]
pub struct Exec {
    rt: Runtime,
}

impl<F> Executor<F> for Exec
where
    F: Future + Send + 'static,
{
    fn execute(&self, fut: F) {
        self.rt.spawn_pinned(move || async move {
            fut.await;
        });
    }
}
