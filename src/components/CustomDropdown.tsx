import { useEffect, useRef, useState } from "react";
import "../scss/CustomDropdown.scss";

interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface CustomDropdownProps<T extends string> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

function CustomDropdown<T extends string>({
  options,
  value,
  onChange,
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    function handleScroll() {
      timeoutId = setTimeout(() => {
        setOpen(false);
      }, 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [open]);

  return (
    <div className="custom-dropdown" ref={containerRef}>
      <button
        type="button"
        className="custom-dropdown__trigger"
        onClick={() => setOpen(!open)}
      >
        <span>{selected?.label}</span>
        <span className="custom-dropdown__chevron">▾</span>
      </button>

      <ul
        className={
          open
            ? "custom-dropdown__list custom-dropdown__list--open"
            : "custom-dropdown__list"
        }
      >
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              className={
                option.value === value
                  ? "custom-dropdown__item custom-dropdown__item--active"
                  : "custom-dropdown__item"
              }
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomDropdown;
