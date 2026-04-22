interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type,
  className,
}) => {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
};
