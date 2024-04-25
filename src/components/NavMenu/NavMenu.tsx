import React from "react";
import { Box, Burger, Drawer } from "@mantine/core";
import styles from "./NavMenu.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import useUserAccount from "../../hooks/useUserAccount";
export interface INavMenuProps {}

/**
 *
 */
function NavMenu(props: INavMenuProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const { userExists } = useUserAccount();

  return (
    <div className={styles.root}>
      <Burger
        opened={opened}
        onClick={toggle}
        aria-label="Toggle navigation"
        className={styles.burger}
      />
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size={265}
        overlayProps={{ backgroundOpacity: 0.5, blur: 1 }}
        className={styles.drawer}
        closeButtonProps={{
          style: {
            color: "var(--tg-theme-text-color)",
          },
        }}
      >
        <Box className={styles.drawerWrapper}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/account">Account Details</NavLink>
          <NavLink to="/meet-airy">About Airy</NavLink>
        </Box>
      </Drawer>
    </div>
  );
}

export default NavMenu;
