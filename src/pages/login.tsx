import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import { Helmet } from "react-helmet-async";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constant";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
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
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    try {
      if (error) {
        console.log(error);
        return;
      }
      if (ok && token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        authTokenVar(token);
        isLoggedInVar(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber-eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} alt="" className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-2xl">Welcome back</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 mb-5 w-full"
        >
          <input
            placeholder="Email"
            className="input"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.password?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}

          <input
            placeholder="Password"
            className="input"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 2,
            })}
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-sm text-red-500">
              ??????????????? 5??? ??????????????? ?????????.
            </span>
          )}
          <Button canClick={isValid} loading={loading} actionText={"Log in"} />

          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber ?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
