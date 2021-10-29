import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import useMe from "../../hooks/useMe";

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const { register, handleSubmit, getValues } = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me?.email,
      password: "",
    },
  });

  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-sm grid max gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("email")}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button loading={false} canClick={true} actionText="save profile" />
      </form>
    </div>
  );
};
