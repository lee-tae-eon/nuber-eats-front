import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import { Helmet } from "react-helmet-async";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface IJoinForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    watch,
    handleSubmit,
  } = useForm<IJoinForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const history = useHistory();

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;

    if (ok) {
      alert("계정이 생성 되었습니다. 로그인 하세요");
      history.push("/");
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber-eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} alt="" className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-2xl">
          Lets get started
        </h4>

        {/* email patter : https://emailregex.com/ */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 mb-5 w-full"
        >
          <input
            placeholder="Email"
            className="login--input"
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
            className="login--input"
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
              비밀번호는 5자 이상이어야 합니다.
            </span>
          )}

          <select
            {...register("role", { required: true })}
            className="login--input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option className=" appearance-none" key={index}>
                {role}
              </option>
            ))}
          </select>
          <Button
            canClick={isValid}
            loading={false}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account ?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};
