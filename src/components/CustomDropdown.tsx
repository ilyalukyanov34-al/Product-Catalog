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

  // useRef — это "прямая ссылка" на реальный DOM-элемент <div>,
  // как только React его нарисует. Используем её, чтобы проверить,
  // попал ли клик внутрь этого элемента или за его пределы.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Если список закрыт — слушатель кликов не нужен вообще, выходим сразу
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      // containerRef.current — это сам DOM-элемент <div>.
      // .contains(...) проверяет: находится ли то, на что кликнули,
      // ВНУТРИ этого элемента (включая кнопку и список).
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Это "уборка" — когда компонент закрывается или пересоздаётся,
    // обязательно снимаем слушатель, иначе он будет работать вечно
    // даже когда дропдаун уже не нужен (это называется "утечка памяти")
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

      {/* Список теперь ВСЕГДА в DOM — видимость управляется классом, не условием */}
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
