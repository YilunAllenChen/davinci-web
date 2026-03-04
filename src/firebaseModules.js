export default function log(message, data = {}) {
  // Firebase logging was removed; keep call sites working for static builds.
  console.log("[telemetry]", message, data);
}
