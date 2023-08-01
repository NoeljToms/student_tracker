import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted && !isLoading && !error) {
      navigate("/");
    }
  }, [formSubmitted, isLoading, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Mark the form as submitted
    await signup(email, password);
  };

  return (
    <div className="mt-[120px] flex items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
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
          <Link to="/">
            <Button
              className="mt-6"
              fullWidth
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Register
            </Button>
          </Link>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                Sign In
              </span>
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
