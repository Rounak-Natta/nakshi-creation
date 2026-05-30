export function AdminTopbar() {
  return (
    <div className="flex h-20 items-center justify-between border-b border-border bg-white px-8">
      <div>
        <h1 className="font-heading text-3xl">
          Dashboard
        </h1>

        <p className="text-sm text-muted">
          Manage your store
        </p>
      </div>

      <form
        action="/api/auth/logout"
        method="POST"
      >
        <button
          type="submit"
          className="rounded-xl bg-foreground px-5 py-3 text-sm text-white"
        >
          Logout
        </button>
      </form>
    </div>
  );
}