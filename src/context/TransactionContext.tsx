import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  userId: string;
  type: 'tuition' | 'siwes' | 'swep' | 'hostel' | 'other';
  amount: number;
  status: 'successful' | 'pending' | 'failed';
  reference: string;
  description: string;
  paymentMethod: 'bank_transfer' | 'card' | 'ussd';
  createdAt: Date;
  session: string;
  semester: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'reference' | 'createdAt'>) => Transaction;
  getTransactionById: (id: string) => Transaction | undefined;
  getUserTransactions: (userId: string) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Mock initial transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'tuition',
    amount: 350000,
    status: 'successful',
    reference: 'BU-TXN-2024-001234',
    description: 'Tuition Fee Payment - 2024/2025 Session',
    paymentMethod: 'bank_transfer',
    createdAt: new Date('2024-01-15'),
    session: '2024/2025',
    semester: 'First Semester',
  },
  {
    id: '2',
    userId: '1',
    type: 'siwes',
    amount: 25000,
    status: 'successful',
    reference: 'BU-TXN-2024-001235',
    description: 'SIWES Registration Fee',
    paymentMethod: 'card',
    createdAt: new Date('2024-02-20'),
    session: '2024/2025',
    semester: 'Second Semester',
  },
  {
    id: '3',
    userId: '1',
    type: 'swep',
    amount: 15000,
    status: 'pending',
    reference: 'BU-TXN-2024-001236',
    description: 'SWEP Program Fee',
    paymentMethod: 'ussd',
    createdAt: new Date('2024-03-10'),
    session: '2024/2025',
    semester: 'Second Semester',
  },
  {
    id: '4',
    userId: '1',
    type: 'hostel',
    amount: 120000,
    status: 'failed',
    reference: 'BU-TXN-2024-001237',
    description: 'Hostel Accommodation Fee',
    paymentMethod: 'bank_transfer',
    createdAt: new Date('2024-03-05'),
    session: '2024/2025',
    semester: 'First Semester',
  },
];

function generateReference(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `BU-TXN-${year}-${random}`;
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'reference' | 'createdAt'>): Transaction => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      reference: generateReference(),
      createdAt: new Date(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const getTransactionById = (id: string): Transaction | undefined => {
    return transactions.find(t => t.id === id);
  };

  const getUserTransactions = (userId: string): Transaction[] => {
    return transactions.filter(t => t.userId === userId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, getTransactionById, getUserTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
