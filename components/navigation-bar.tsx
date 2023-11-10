"use client";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toLogoString } from "@/lib/utils";

type navbarProps = {
  theme: string | undefined;
  toggleTheme: () => void;

  title: string;
};

export const Navbar = () => {  
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const pathname = usePathname();
  const logoString = toLogoString(pathname.substring(1));

  // prevent hydration error -------------------------
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  // ----------------------------------------------------
  return (
    <>
      <div className="hidden lg:block">
        <DesktopNavbar title={logoString} theme={theme} toggleTheme={toggleTheme} />
      </div>

      <div className="lg:hidden mt-10 ml-5">
        <MobileNavbar title={logoString} theme={theme} toggleTheme={toggleTheme} />
      </div>
    </>
  );
}

const DesktopNavbar: React.FC<navbarProps> = ({title, theme, toggleTheme}) => {
  return (
    <>
      <header className="container p-4 mt-4 flex flex-row items-center justify-between">
        {/* logo / application's name */}
        <div>
          <h1 className="text-4xl font-bold upper">{title}</h1>
        </div>

        {/* main nav */}
        <nav className="flex gap-8 xl:text-xl font-semibold">
          <Link href={"/"} className="hover:text-primary">
            Portfolio
          </Link>
          <Link href={"/"} className="hover:text-primary">
            Others
          </Link>
        </nav>

        {/* side options */}
        <Button
          variant={'ghost'}
          onClick={toggleTheme}
          className="p-2 rounded-full text-primary hover:bg-accent"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </header>
    </>
  );
};

const MobileNavbar: React.FC<navbarProps> = ({title, theme, toggleTheme }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu className="h-10 w-10" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          {/* logo / application's name */}
          <SheetHeader>
            <SheetTitle className="text-3xl font-bold text-primary">
              {title}
            </SheetTitle>
          </SheetHeader>

          {/* main nav */}
          <nav className="flex flex-col items-center justify-center my-10 text-xl font-semibold gap-4 text-secondary-foreground">
            <Link href={"/"} className="hover:text-primary">
              Portfolio
            </Link>
            <Link href={"/"} className="hover:text-primary">
              Others
            </Link>
          </nav>

          {/* side options */}
          <Button
            onClick={toggleTheme}
            variant={"secondary"}
            className="w-full py-2 rounded-lg hover:bg-accent text-xl"
          >
            {theme === "light" ? (
              <>
                <Moon className="mr-2 h-4 w-4" /> Dark
              </>
            ) : (
              <>
                <Sun className="mr-2 h-4 w-4" /> Light
              </>
            )}
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
};