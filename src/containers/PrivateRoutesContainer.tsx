import React, { useEffect } from "react";
import { Switch } from "react-router";
import { Interpreter } from "xstate";
import MainLayout from "../components/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import TransactionsContainer from "./TransactionsContainer";
import UserSettingsContainer from "./UserSettingsContainer";
import TransactionCreateContainer from "./TransactionCreateContainer";
import { DataContext, DataSchema, DataEvents } from "../machines/dataMachine";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import { SnackbarContext, SnackbarSchema, SnackbarEvents } from "../machines/snackbarMachine";
import { useService } from "@xstate/react";
// import UserOnboardingContainer from "./UserOnboardingContainer";

export interface Props {
  isLoggedIn: boolean;
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
  notificationsService: Interpreter<DataContext, DataSchema, DataEvents, any>;
  snackbarService: Interpreter<SnackbarContext, SnackbarSchema, SnackbarEvents, any>;
  bankAccountsService: Interpreter<DataContext, any, DataEvents, any>;
}

const PrivateRoutesContainer: React.FC<Props> = ({
  isLoggedIn,
  authService,
  notificationsService,
  snackbarService,
  bankAccountsService,
}) => {
  const [, sendNotifications] = useService(notificationsService);

  useEffect(() => {
    sendNotifications({ type: "FETCH" });
  }, [sendNotifications]);

  return (
    <MainLayout notificationsService={notificationsService} authService={authService}>
      {/* <UserOnboardingContainer
        authService={authService}
        bankAccountsService={bankAccountsService}
      /> */}
      <Switch>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/(public|contacts|personal)?"}>
          <TransactionsContainer />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path="/user/settings">
          <UserSettingsContainer authService={authService} />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path="/transaction/new">
          <TransactionCreateContainer authService={authService} snackbarService={snackbarService} />
        </PrivateRoute>
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutesContainer;
