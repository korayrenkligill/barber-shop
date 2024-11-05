import React from "react";

interface SidebarItemProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`${
        isActive && "bg-zinc-500/20"
      } w-full text-left px-2 py-2 mb-1 rounded-md hover:bg-zinc-500/20 transition duration-200`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default SidebarItem;
