import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const [verifyEmail, { loading: verifing }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION);

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    // verifyEmail({
    //   variables: {
    //     input: {
    //       code,
    //     },
    //   },
    // });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center mt-50">
      <h2 className="text-lg mb-2 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, dont't close this page....
      </h4>
    </div>
  );
};
