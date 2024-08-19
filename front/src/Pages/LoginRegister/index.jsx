import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginRegister() {
  const [haveAcc, setHaveAcc] = useState(true);
  const handleAcc = () => {
    setHaveAcc(!haveAcc);
  };
  return (
    <>
      {haveAcc ? (
        <Login handleAcc={} />
      ) : (
        <Register handleAcc={handleAcc} />
      )}
    </>
  );
}
