function CustomBtn({ label, isLoading, type = "button" }) {
  return (
    <button
      type={type}
      className="w-full rounded shadow-md py-2 bg-blue-500 text-white font-medium"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
}

export default CustomBtn;
