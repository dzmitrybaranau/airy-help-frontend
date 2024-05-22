import React from "react";
import { Box, Burger, Drawer } from "@mantine/core";
import styles from "./NavMenu.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, useLocation } from "react-router-dom";
import { useUserStore } from "../../store";

export interface INavMenuProps {}

/**
 *
 */
function NavMenu(props: INavMenuProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const userAccount = useUserStore((state) => state.userAccount);
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case "/":
      title = "";
      break;
    case "/goals":
      title = userAccount ? "My Goals" : "Create Account";
      break;
    case "/account":
      title = userAccount ? "Account Details" : "Create Account";
      break;
    case "/meet-airy":
      title = "Meet Airy!";
      break;
    default:
      title = "";
  }

  return (
    <div className={styles.root}>
      <div className={styles.pageName}>{title}</div>
      {userAccount && location.pathname !== "/" && (
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
          className={styles.burger}
          color="#24a1de"
        />
      )}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size={265}
        overlayProps={{ backgroundOpacity: 0.5, blur: 1 }}
        className={styles.drawer}
      >
        <Box className={styles.drawerWrapper}>
          <NavLink onClick={close} to="/">
            Home
          </NavLink>
          <NavLink onClick={close} to="/account">
            Account Details
          </NavLink>
          <NavLink onClick={close} to="/meet-airy">
            About Airy
          </NavLink>
        </Box>
      </Drawer>
    </div>
  );
}

export default NavMenu;
