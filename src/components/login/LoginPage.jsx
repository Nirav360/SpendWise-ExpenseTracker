import { Card, CardContent, CardHeader } from "@mui/material";
import LoginForm from "./LoginForm";
import RegistrationForm from "../register/RegistrationForm";

const LoginPage = ({ type }) => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="lg:w-1/3 md:w-1/2 w-3/4">
          <Card elevation={10} className="!bg-slate-100">
            <CardHeader title={type === "login" ? "Login" : "Register"} />
            <CardContent>
              {type === "login" ? <LoginForm /> : <RegistrationForm />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
