import React from "react";

export const Login = () => {
  return (
    <span className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5 ">
          <input
            placeholder="Email"
            className=" bg-gray-200 shadow-inner  focus:outline-none border-green-600  border border-opacity-40 text-center mb-3 py-3 px-2 rounded-sm"
          />
          <input
            placeholder="Password"
            className=" bg-gray-200 shadow-inner  focus:outline-none border-green-600  border border-opacity-40 text-center py-3 px-2 rounded-sm"
          />
        </form>
      </div>
    </span>
  );
};
