import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toLogoString (slug: string) : string {
  const str:string[] = slug.split("-");
  let res:string = "";
  for (let i = 0; i < str.length; i++) {
    res = res + str[i].charAt(0).toUpperCase() + str[i].substring(1) + " ";
  }

  return res.trimEnd();
}