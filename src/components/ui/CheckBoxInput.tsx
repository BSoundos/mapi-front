const CheckboxInput = ({ id, name, value, checked, label, onChange, disabled }) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <input
          id={id}
          className="input-checkbox appearance-none"
          type="radio"
          checked={checked}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <label htmlFor={id} className="cursor-pointer flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-full border p-2 flex justify-center items-center relative ${
              checked
                ? 'bg-[#3B73CE] border-[#4379D0]'
                : disabled
                ? 'bg-[#7E89AC] border border-transparent'
                : 'bg-transparent border-[#7E89AC] border-opacity-30'
            }`}
          >
            <span
              className={`absolute w-2 h-2 rounded-full bg-[#1F1F1F]`}
            />
          </div>
          <span className="text-[#BFBFBF] text-sm ">{label}</span>
        </label>
      </div>
    </div>
  );
};

export default CheckboxInput;