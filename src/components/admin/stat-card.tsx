interface Props {
  title: string;
  value: string;
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-white p-6">
      <p className="text-sm text-muted">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-heading">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}