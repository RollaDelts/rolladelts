export default function LastEditedBy({ info }: { info: { editedBy: string; editedAt: string } | null }) {
  if (!info) return null;
  return (
    <p className="mt-2 text-xs text-foreground/50">
      Last edited by <span className="font-medium text-foreground/70">{info.editedBy}</span> on{" "}
      {new Date(info.editedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
    </p>
  );
}
