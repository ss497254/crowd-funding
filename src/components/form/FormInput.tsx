import React from "react";

export default function FormInput({
  type,
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className="w-full">
      <span className="block text-lg text-zinc-800">{label}*</span>
      {type === "textarea" ? (
        <textarea
          className="w-full p-4 outline-none resize-none bg-zinc-200 placeholder-zinc-500"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          rows={5}
          spellCheck="false"
        />
      ) : (
        <input
          className="w-full p-4 outline-none bg-zinc-200 placeholder-zinc-500"
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          value={value}
          step={0.1}
          min={0.1}
          spellCheck="false"
        />
      )}
    </label>
  );
}
