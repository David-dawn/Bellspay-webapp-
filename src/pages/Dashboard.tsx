import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';
import { formatCurrency, formatShortDate, getGreeting, getTransactionTypeLabel } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  History, 
  Download, 
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { getUserTransactions } = useTransactions();
  
  const transactions = user ? getUserTransactions(user.id) : [];
  const recentTransactions = transactions.slice(0, 5);
  
  const totalPaid = transactions
    .filter(t => t.status === 'successful')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      successful: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      failed: 'bg-destructive/10 text-destructive',
    };
    return styles[status as keyof typeof styles] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
            {getGreeting()}, {user?.fullName.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your account and recent activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-card animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Account Balance</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {formatCurrency(user?.balance || 0)}
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {formatCurrency(totalPaid)}
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {formatCurrency(pendingAmount)}
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Transactions</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {transactions.length}
            </p>
          </div>
        </div>

        {/* Quick Actions & Recent Transactions */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Quick Actions</h2>
            
            <Link to="/payment" className="block">
              <div className="bg-[#0010B4] p-6 rounded-2xl text-primary-foreground group hover:shadow-elegant transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Pay Fees</h3>
                    <p className="text-sm text-primary-foreground/70">Tuition, SIWES, SWEP & more</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/history" className="block">
              <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-all group hover:shadow-card-hover">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <History className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">View History</h3>
                    <p className="text-sm text-muted-foreground">All your transactions</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </Link>

            <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-all group hover:shadow-card-hover cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Download Receipts</h3>
                  <p className="text-sm text-muted-foreground">Get payment proofs</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* Student Info Card */}
            <div className="bg-muted/50 p-6 rounded-2xl mt-6">
              <h3 className="font-semibold text-foreground mb-4">Student Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matric Number</span>
                  <span className="font-medium text-foreground">{user?.matricNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium text-foreground">{user?.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium text-foreground">{user?.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground">Recent Transactions</h2>
              <Link to="/history">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {recentTransactions.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">No transactions yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start by making your first payment.
                  </p>
                  <Link to="/payment">
                    <Button className='bg-[#0010B4]'>Make a Payment</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentTransactions.map((transaction) => (
                    <Link 
                      key={transaction.id} 
                      to={`/receipt/${transaction.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                        <ArrowDownRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {getTransactionTypeLabel(transaction.type)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatShortDate(transaction.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {formatCurrency(transaction.amount)}
                        </p>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${getStatusBadge(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
