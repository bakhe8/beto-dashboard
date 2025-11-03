export const withErrorBoundary = (fn: () => Promise<void>) =>
  fn().catch(err => {
    console.error(err);
    document.body.dataset.appError = "true";
    document.querySelector(".global-error")?.classList.remove("hidden");
  });

window.addEventListener("error", e => {
  document.body.dataset.appError = "true";
  try {
    // Ensure the error is surfaced for diagnostics and satisfy lint unused param
    console.error("Global error:", (e as ErrorEvent).error);
  } catch {}
});
