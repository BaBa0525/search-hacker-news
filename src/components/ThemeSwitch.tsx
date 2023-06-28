import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme === "light" ? (
    <BsSun
      onClick={() => setTheme("dark")}
      className="w-10 h-10 cursor-pointer hover:text-search-line-light"
    />
  ) : (
    <BsMoon
      onClick={() => setTheme("light")}
      className="w-10 h-10 cursor-pointer hover:text-search-line-dark"
    />
  );
};
