import Link from "next/link";

export default function NoAccess() {
  return (
    <div className="panel">
      <h1 className="dash-title">No access to this page</h1>
      <p style={{ marginTop: 10, maxWidth: "34em" }}>
        Your account doesn&apos;t have access to this part of the dashboard. If you need it, ask a GCI admin to change your access.
      </p>
      <Link className="btn btn-small" href="/dashboard" style={{ marginTop: 18 }}>
        Back to overview
      </Link>
    </div>
  );
}
