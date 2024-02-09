import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signInErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signInErrors.map((error, index) => (
          <div className="bg-red-500 text-white text-center my-2" key={index}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-2 bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md float-right"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">Dont have an account?</p>
        <Link to="/register" className="text-sky-500">
          Register
        </Link>
      </div>
    </div>
  );
}
