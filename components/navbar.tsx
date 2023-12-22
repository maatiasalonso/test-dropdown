import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Tooltip } from "@nextui-org/tooltip";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="static">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full px-28"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Tooltip placement="bottom" content="Toggle theme" showArrow={true}>
            <ThemeSwitch />
          </Tooltip>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
