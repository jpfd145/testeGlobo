import React from "react";
import { Interpreter } from "xstate";
import { useService } from "@xstate/react";
import clsx from "clsx";
import {
  useMediaQuery,
  useTheme,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
} from "@material-ui/icons";

import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";

const drawerWidth = 240;

export const mainListItems = (
  toggleDrawer: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined,
  showTemporaryDrawer: Boolean
) => (
  <div>
    <ListItem
      button
      // @ts-ignore
      onClick={() => showTemporaryDrawer && toggleDrawer()}
      component={RouterLink}
      to="/"
      data-test="sidenav-home"
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
  </div>
);

export const secondaryListItems = (signOutPending: Function) => (
  <div>
    <ListItem button onClick={() => signOutPending()} data-test="sidenav-signout">
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    marginTop: 50,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  userProfile: {
    padding: theme.spacing(2),
  },
  userProfileHidden: {
    display: "none",
  },
  accountBalance: {
    marginLeft: theme.spacing(2),
  },
  amount: {
    fontWeight: "bold",
  },
  accountBalanceHidden: {
    display: "none",
  },
  cypressLogo: {
    width: "40%",
  },
}));

interface Props {
  closeMobileDrawer: () => void;
  toggleDrawer: () => void;
  drawerOpen: boolean;
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const NavDrawer: React.FC<Props> = ({
  toggleDrawer,
  closeMobileDrawer,
  drawerOpen,
  authService,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [authState, sendAuth] = useService(authService);
  const showTemporaryDrawer = useMediaQuery(theme.breakpoints.only("xs"));

  const currentUser = authState?.context?.user;
  const signOut = () => sendAuth("LOGOUT");

  return (
    <Drawer
      data-test="sidenav"
      variant={showTemporaryDrawer ? "temporary" : "persistent"}
      classes={{
        paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
      }}
      open={drawerOpen}
      ModalProps={{
        onBackdropClick: () => closeMobileDrawer(),
        closeAfterTransition: showTemporaryDrawer,
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={drawerOpen ? classes.userProfile : classes.userProfileHidden}
      >
        <Grid item>
          <ListItem
            button
            // @ts-ignore
            onClick={() => showTemporaryDrawer && toggleDrawer()}
            component={RouterLink}
            to="/"
            data-test="sidenav-home"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Grid>
        <Grid item>
          {currentUser?.defaultPrivacyLevel === "private" && (
            <>
              <ListItem
                button
                // @ts-ignore
                onClick={() => showTemporaryDrawer && toggleDrawer()}
                component={RouterLink}
                to="/user/settings"
                data-test="sidenav-user-settings"
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </>
          )}
          <Grid item>
            <List>{secondaryListItems(signOut)}</List>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default NavDrawer;
