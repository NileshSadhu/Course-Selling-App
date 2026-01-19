function CustomInput({ label, type, placeholder, onChange }) {
  return (
    <div className="my-4 w-full">
      <label> {label} </label> <br />
      <input
        className=" border-none shadow-md px-4 py-1 rounded w-full outline-none"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default CustomInput;
