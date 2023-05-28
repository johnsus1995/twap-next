import { useCallback, useState } from "react";
import TextInput from "../TextInput";
import Modal from "../Modal";
import useRegister from "@/hooks/useRegister";
import useLogin from "@/hooks/useLogin";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegister();
  const loginModal = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //todo
      await axios.post("/api/register", {
        email,
        username,
        name,
        password,
      });

      toast.success("Account created.");

      signIn("credentials", { email, password,callbackUrl:"http://localhost:8080/" });

      registerModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, username, name, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <TextInput
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <TextInput
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Sign in"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
