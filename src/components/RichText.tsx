import Link from "next/link";

/**
 * Renders plain text with minimal inline-link support: [label](/path) becomes
 * a real link. Used for admin-editable copy (FAQ answers, etc.) that
 * occasionally needs to link elsewhere on the site without a full rich-text
 * editor.
 */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={i}>{part}</span>;
        const [, label, href] = match;
        return (
          <Link key={i} href={href} className="font-semibold text-dtd-purple underline">
            {label}
          </Link>
        );
      })}
    </>
  );
}
