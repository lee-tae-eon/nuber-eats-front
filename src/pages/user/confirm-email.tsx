import { gql, useMutation } from "@apollo/client";
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
};
