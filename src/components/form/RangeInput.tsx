import React from "react";

export default function RangeInput({ value, onChange, max, step, min = 0 }) {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      max={max}
      step={step}
      min={min}
      className="w-full outline-none accent-indigo-500"
    />
  );
}
