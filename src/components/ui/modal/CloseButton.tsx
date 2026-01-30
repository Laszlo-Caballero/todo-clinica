"use client";
import cx from "@/lib/cx";
import { useModalContext } from "./Modal";

interface CloseButtonProps {
  className?: string;
}

export default function CloseButton({ className }: CloseButtonProps) {
  const { onClose } = useModalContext();

  return (
    <button
      type="button"
      className={cx(
        "text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center",
        className,
      )}
      onClick={onClose}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
}
