import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Alert,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted && !isLoading && !error) {
      navigate("/");
    }
  }, [formSubmitted, isLoading, error, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Mark the form as submitted
    await login(email, password);
  };
  return (
    <div className="mt-[120px] flex align-center justify-center center">
      {isLoading ? (
        <div className="text-center flex">
          <Spinner className="h-12 w-12" />
          <h1 className="mx-3 text-5xl">Loading..</h1>
        </div>
      ) : (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to login.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error && (
              <Alert color="red" variant="gradient">
                <span>{error}</span>
              </Alert>
            )}
            <Button
              className="mt-6"
              fullWidth
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Signup;
