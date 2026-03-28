"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number; // ms
  className?: string;
}

const SearchTable = ({
  value,
  onChange,
  placeholder = "Search...",
  debounce = 300,
  className = "",
}: Props) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue);
    }, debounce);

    return () => clearTimeout(timer);
  }, [internalValue]);

  // keep sync when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className={`relative w-[220px] ${className}`}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

      <Input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="pl-8 h-9 text-sm"
      />
    </div>
  );
};

export default SearchTable