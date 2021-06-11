import React, { ReactNode } from "react";

import { TransactionResponseItem, TransactionPagination } from "../models";

import TxCambioNom from "components/txCambio";

export interface TransactionListProps {
  header: string;
  transactions: TransactionResponseItem[];
  isLoading: Boolean;
  showCreateButton?: Boolean;
  loadNextPage: Function;
  pagination: TransactionPagination;
  filterComponent: ReactNode;
}

const TransactionList: React.FC<TransactionListProps> = () => {
  return <TxCambioNom />;
};

export default TransactionList;
