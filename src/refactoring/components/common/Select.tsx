interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
const Select = ({ options, value, onChange, className = '' }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
