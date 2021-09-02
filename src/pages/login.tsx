import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  PotatoMutation,
  PotatoMutationVariables,
} from "./mytypes.d.ts/PotatoMutation";

const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();
  const [loginMutation, { loading, error, data }] = useMutation<
    PotatoMutation,
    PotatoMutationVariables
  >(LOGIN_MUTATION);

  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-5 px-5"
        >
          <input
            placeholder="Email"
            className="login--input"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}

          <input
            placeholder="Password"
            className="login--input"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 5,
            })}
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-sm text-red-500">
              비밀번호는 5자 이상이어야 합니다.
            </span>
          )}
          <button className="btn">Log In</button>
        </form>
      </div>
    </div>
  );
};
