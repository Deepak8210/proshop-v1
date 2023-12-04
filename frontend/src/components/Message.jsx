import React from "react";

const Message = ({ children, error }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border-2 rounded-md p-4 text-center">
        <h3 className="font-semibold">Something went wrong!</h3>
        <p>{error || "not found"}</p>
      </div>
    </div>
  );
};

export default Message;
