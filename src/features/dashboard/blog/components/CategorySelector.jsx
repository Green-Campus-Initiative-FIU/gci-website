"use client";

import { BLOG_CATEGORIES } from "../constants/categories";
import { useState, useRef, useMemo, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";

export default function CategorySelector({
  name = "category",
  defaultCategory = "",
  categories = BLOG_CATEGORIES,
  label = "Category",
  columns = 3,
  className,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultCategory);

  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef([]);

  const selected = useMemo(
    () => categories.find((c) => c.value === selectedValue),
    [categories, selectedValue]
  );

  // Close on outside click / escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, categories.length);
  }, [categories.length]);

  const handleSelect = (val) => {
    // Toggle same selection to empty
    const next = selectedValue === val ? "" : val;
    setSelectedValue(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Tailwind-safe grid cols mapping
  const colsClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-2"
        : columns === 4
          ? "grid-cols-4"
          : "grid-cols-3";

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Hidden input for server action/form */}
      <input type="hidden" name={name} value={selectedValue || ""} />

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "border-light-green min-w-42 inline-flex items-center justify-between gap-x-2.5 rounded-md border-2 bg-[#f5f5f5] p-3 text-black transition-[box-shadow,transform] placeholder:text-gray-500 focus:scale-[1.005] focus:shadow-[0_0_0_3px_rgba(57,81,59,0.2)]",
          selected ? "text-black" : "text-gray-500"
        )}
      >
        {selected?.label || label}
        {open ? (
          <ChevronUpIcon className="size-3" />
        ) : (
          <ChevronDownIcon className="size-3" />
        )}
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={buttonRef.current?.id}
          className="absolute z-50 mt-2 w-[560px] rounded-md bg-white p-2 shadow-lg"
        >
          <div className={cn("grid gap-2", colsClass)}>
            {/* Optional "All categories" entry. Uncomment if desired. */}
            {/* <button
              key="__all__"
              role="option"
              aria-selected={!selectedValue}
              onClick={() => handleSelect("")}
              className={cn(
                "hover:bg-light-green inline-flex items-center gap-2 rounded-sm px-3 py-3 text-left text-[#57595A] transition-colors hover:text-white",
                !selectedValue && "bg-light-green text-white"
              )}
            >
              <span>All categories</span>
            </button> */}

            {categories.map((c, i) => {
              const Icon = c.icon;
              const active = c.value === selectedValue;
              return (
                <button
                  key={c.value}
                  ref={(el) => el && (itemsRef.current[i] = el)}
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(c.value)}
                  onKeyDown={(e) => {
                    const cols =
                      columns < 1 ? 1 : columns > 6 ? 6 : Math.floor(columns);
                    const max = categories.length - 1;
                    let next = i;
                    if (e.key === "ArrowRight") next = Math.min(i + 1, max);
                    else if (e.key === "ArrowLeft") next = Math.max(i - 1, 0);
                    else if (e.key === "ArrowDown")
                      next = Math.min(i + cols, max);
                    else if (e.key === "ArrowUp") next = Math.max(i - cols, 0);
                    else if (e.key === "Enter" || e.key === " ") {
                      handleSelect(c.value);
                      return;
                    } else return;
                    e.preventDefault();
                    itemsRef.current[next]?.focus();
                  }}
                  className={cn(
                    "hover:bg-light-green inline-flex items-center gap-2 rounded-sm px-3 py-3 text-left text-[#57595A] transition-colors hover:text-white",
                    active && "bg-light-green text-white"
                  )}
                >
                  {Icon ? <Icon className="size-4 opacity-70" /> : null}
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
