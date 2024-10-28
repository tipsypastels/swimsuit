use anyhow::{bail, Result};
use tokio::process::Command;

pub async fn auto() -> Result<()> {
    let status = Command::new("trunk")
        .args(["build", "--features", "hydration"])
        .status()
        .await?;

    if !status.success() {
        bail!("failed with status {status}");
    }

    Ok(())
}
