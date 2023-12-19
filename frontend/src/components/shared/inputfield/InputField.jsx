import React from "react";

const InputField = ({
  text,
  type,
  onChange,
  data,
  placeholder,
  value,
  min,
}) => {
  if (type == "dropdown") {
    return (
      <div className="font-nun mb-2">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            {text}
          </span>
          <select
            name=""
            id=""
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            className="w-full border rounded-md p-1 mt-1"
          >
            {data.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
      </div>
    );
  } else if (type == "textarea") {
    return (
      <div className="font-nun mb-2">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            {text}
          </span>
          <textarea
            onChange={(e) => {
              onChange(e);
            }}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder={placeholder}
            value={value}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="font-nun mb-1">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          {text}
        </span>
        <input
          type={type}
          name={text}
          min={min ? min : null}
          onChange={(e) => {
            onChange(e);
          }}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder={placeholder}
          value={value}
        />
      </label>
    </div>
  );
};

export default InputField;
