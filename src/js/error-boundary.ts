export const withErrorBoundary = (fn: () => Promise<void>) =>
  fn().catch((err) => {
    console.error("Caught by error boundary:", err);
    document.body.dataset.appError = "true";
    document.querySelector(".global-error")?.classList.remove("hidden");
  });

window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  document.body.dataset.appError = "true";
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled rejection:", e.reason);
  document.body.dataset.appError = "true";
});