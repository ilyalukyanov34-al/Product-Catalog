import {
  useProductStore,
  type SortField,
  type SortOrder,
} from "../store/useProductStore";
import CustomDropdown from "./CustomDropdown";
import "../scss/SortSelect.scss";

const FIELD_OPTIONS: { value: SortField; label: string }[] = [
  { value: "title", label: "По названию" },
  { value: "price", label: "По цене" },
  { value: "stock", label: "По количеству" },
];

const ORDER_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "asc", label: "По возрастанию" },
  { value: "desc", label: "По убыванию" },
];

function SortSelect() {
  const { sortBy, order, setSort } = useProductStore();

  return (
    <div className="sort-select">
      <span className="sort-select__label">Сортировать по:</span>

      <CustomDropdown
        options={FIELD_OPTIONS}
        value={sortBy}
        onChange={(newField) => setSort(newField, order)}
      />

      <CustomDropdown
        options={ORDER_OPTIONS}
        value={order}
        onChange={(newOrder) => setSort(sortBy, newOrder)}
      />
    </div>
  );
}

export default SortSelect;
