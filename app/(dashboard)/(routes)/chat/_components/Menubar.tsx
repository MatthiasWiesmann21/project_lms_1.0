import { Users } from "lucide-react";

interface MenubarProps {
  onUserMenuClick: () => void;
}

export default function Menubar({ onUserMenuClick }: MenubarProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-e bg-white p-3">
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick}/>
        </span>
      </div>
    </div>
  );
}
