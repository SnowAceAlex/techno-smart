import { SignInButton } from "@clerk/nextjs";

const LoginButton = () => {
  return (
    <SignInButton mode="modal">
      <button className="text-sm font-semibold text-light_gray hover:text-light_blue hoverEffect">
        Login
      </button>
    </SignInButton>
  );
};

export default LoginButton;
