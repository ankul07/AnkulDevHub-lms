import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({
  title,
  options,
  isOpen,
  onToggle,
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full py-2 text-left font-medium"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="ml-2 mt-2 space-y-2">
          {options.map((option) => (
            <label
              key={option.label || option}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                className="rounded"
                checked={selectedFilters.includes(option.label || option)}
                onChange={() => onFilterChange(option.label || option)}
              />
              <span>{option.label || option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
