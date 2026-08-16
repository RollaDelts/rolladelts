"use client";

type ReorderButtonsProps = {
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp: boolean;
  disableDown: boolean;
};

export default function ReorderButtons({ onMoveUp, onMoveDown, disableUp, disableDown }: ReorderButtonsProps) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={onMoveUp}
        disabled={disableUp}
        aria-label="Move up"
        className="rounded border border-dtd-purple/20 px-2 py-1 text-xs font-bold text-dtd-purple transition hover:bg-dtd-cream disabled:cursor-not-allowed disabled:opacity-30"
      >
        &uarr;
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={disableDown}
        aria-label="Move down"
        className="rounded border border-dtd-purple/20 px-2 py-1 text-xs font-bold text-dtd-purple transition hover:bg-dtd-cream disabled:cursor-not-allowed disabled:opacity-30"
      >
        &darr;
      </button>
    </div>
  );
}
