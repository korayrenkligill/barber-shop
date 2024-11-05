import React from "react";

type Props = {
  text: string;
};

const Divider = ({ text }: Props) => {
  return (
    <div className="flex items-center my-4">
      <hr className="flex-1 border-t border-gray-300 dark:border-gray-700" />
      <span className="px-2 text-sm text-gray-500 ">{text}</span>
      <hr className="flex-1 border-t border-gray-300 dark:border-gray-700" />
    </div>
  );
};

export default Divider;
