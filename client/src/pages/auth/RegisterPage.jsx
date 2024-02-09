import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-center mb-5">Register</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md float-right"
          >
            Register
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">Already have an account?</p>
        <Link to="/login" className="text-sky-500">
          Login
        </Link>
      </div>
    </div>
  );
}
