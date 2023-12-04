import React from "react";

import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <ColorRing height="100" width="100" />
    </div>
  );
};

export default Loader;
