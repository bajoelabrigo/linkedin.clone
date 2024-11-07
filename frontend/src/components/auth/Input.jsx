import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-primary " />
      </div>
      <input {...props} className="pl-10 input input-bordered w-full" />
    </div>
  );
};

export default Input;
