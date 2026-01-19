import { useContext, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";

const Login = () => {
  const { login, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All field are required");
      return;
    }

    const response = await login(email, password);

    if (!response.success) {
      setError(response.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl px-20 py-10">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-600 mt-1">
          Please contiune your learning journey.
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <CustomInput
            label="Email"
            type="email"
            placeholder="wxy@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="at least 8 character long"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <CustomBtn label="Submit" type="Submit" isLoading={isLoading} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="text-xs text-center mt-5">
          Don't have an account ?
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
