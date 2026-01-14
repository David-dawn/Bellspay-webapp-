import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';
import { formatCurrency, formatDateTime, getTransactionTypeLabel, getPaymentMethodLabel } from '@/lib/formatters';
import { 
  Search, 
  Filter, 
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Download
} from 'lucide-react';

export default function History() {
  const { user } = useAuth();
  const { getUserTransactions } = useTransactions();
  
  const transactions = user ? getUserTransactions(user.id) : [];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.reference.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        getTransactionTypeLabel(t.type).toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }
    
    // Filter by type
    if (typeFilter !== 'all') {
      result = result.filter(t => t.type === typeFilter);
    }
    
    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [transactions, searchQuery, statusFilter, typeFilter, sortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
              Transaction History
            </h1>
            <p className="text-muted-foreground">
              View and manage all your payment transactions.
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by reference or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Fee Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tuition">Tuition</SelectItem>
                  <SelectItem value="siwes">SIWES</SelectItem>
                  <SelectItem value="swep">SWEP</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'newest' | 'oldest')}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>

        {/* Transaction List */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No transactions found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : "You haven't made any payments yet."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredTransactions.map((transaction) => (
                <Link 
                  key={transaction.id} 
                  to={`/receipt/${transaction.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.status === 'successful' 
                      ? 'bg-success/10' 
                      : transaction.status === 'pending' 
                        ? 'bg-warning/10' 
                        : 'bg-destructive/10'
                  }`}>
                    {transaction.status === 'successful' ? (
                      <ArrowUpRight className="w-5 h-5 text-success" />
                    ) : transaction.status === 'pending' ? (
                      <Clock className="w-5 h-5 text-warning" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground truncate">
                        {getTransactionTypeLabel(transaction.type)}
                      </p>
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full shrink-0 ${getStatusBadge(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-mono">{transaction.reference}</span>
                      <span>•</span>
                      <span>{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(transaction.createdAt)}
                    </p>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-foreground">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {transaction.session}
                    </p>
                  </div>
                  
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
