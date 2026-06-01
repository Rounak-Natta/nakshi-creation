interface Props {
  children: React.ReactNode;
}

export default function LayoutShell({
  children,
}: Props) {
  return <>{children}</>;
}