import { useContext, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";

const Register = () => {
  const { register, isLoading } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const response = await register(username, email, password);

    if (!response.success) {
      setError(response.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl px-20 py-10">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-sm text-gray-600 mt-1">
          Start your learning journey.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <CustomInput
            label="Username"
            type="text"
            placeholder="Nilesh Sadhu"
            onChange={(e) => {
              setError("");
              setUsername(e.target.value);
            }}
          />

          <CustomInput
            label="Email"
            type="email"
            placeholder="xyz@example.com"
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="atleast 8 character long"
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />

          <CustomBtn label="Submit" type="submit" isLoading={isLoading} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="text-xs text-center mt-5">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
