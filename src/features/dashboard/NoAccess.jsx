import Link from "next/link";

export default function NoAccess() {
  return (
    <div className="panel">
      <h1 className="dash-title">Admins only</h1>
      <p style={{ marginTop: 10, maxWidth: "34em" }}>
        Your account doesn&apos;t have editing access yet. Ask a GCI admin to give you access, then log out and back in.
      </p>
      <Link className="btn btn-small" href="/dashboard" style={{ marginTop: 18 }}>
        Back to overview
      </Link>
    </div>
  );
}
