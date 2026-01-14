import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';
import { formatCurrency, formatDateTime, getTransactionTypeLabel, getPaymentMethodLabel } from '@/lib/formatters';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download, 
  Share2, 
  ArrowLeft,
  Printer,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Receipt() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getTransactionById } = useTransactions();
  const { toast } = useToast();
  
  const transaction = id ? getTransactionById(id) : undefined;

  if (!transaction) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Transaction Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The transaction you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/history')}>
              View All Transactions
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (transaction.status) {
      case 'successful':
        return {
          icon: CheckCircle2,
          label: 'Payment Successful',
          color: 'text-success',
          bg: 'bg-success/10',
          border: 'border-success/20',
        };
      case 'pending':
        return {
          icon: Clock,
          label: 'Payment Pending',
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/20',
        };
      case 'failed':
        return {
          icon: XCircle,
          label: 'Payment Failed',
          color: 'text-destructive',
          bg: 'bg-destructive/10',
          border: 'border-destructive/20',
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown Status',
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const handleCopyReference = () => {
    navigator.clipboard.writeText(transaction.reference);
    toast({
      title: 'Copied!',
      description: 'Transaction reference copied to clipboard.',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/history" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </Link>

          {/* Receipt Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            {/* Status Header */}
            <div className={`${statusConfig.bg} ${statusConfig.border} border-b p-6 text-center`}>
              <div className={`w-16 h-16 ${statusConfig.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
              </div>
              <h1 className={`font-display text-xl font-bold ${statusConfig.color} mb-1`}>
                {statusConfig.label}
              </h1>
              <p className="font-display text-3xl font-bold text-foreground">
                {formatCurrency(transaction.amount)}
              </p>
            </div>

            {/* Transaction Details */}
            <div className="p-6">
              <h2 className="font-semibold text-foreground mb-4">Transaction Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Reference Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium text-foreground">{transaction.reference}</span>
                    <button 
                      onClick={handleCopyReference}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Fee Type</span>
                  <span className="font-medium text-foreground">{getTransactionTypeLabel(transaction.type)}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-foreground text-right max-w-[60%]">{transaction.description}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Session</span>
                  <span className="font-medium text-foreground">{transaction.session}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Semester</span>
                  <span className="font-medium text-foreground">{transaction.semester}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium text-foreground">{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="font-medium text-foreground">{formatDateTime(transaction.createdAt)}</span>
                </div>
              </div>

              {/* Student Info */}
              <h2 className="font-semibold text-foreground mt-8 mb-4">Student Information</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Full Name</span>
                  <span className="font-medium text-foreground">{user?.fullName}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Matric Number</span>
                  <span className="font-medium text-foreground">{user?.matricNumber}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium text-foreground">{user?.department}</span>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium text-foreground">{user?.level}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-muted/50 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={handlePrint}>
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            This is an official payment receipt from Bells Pay. For any queries, contact support@bellspay.edu.ng
          </p>
        </div>
      </main>
    </div>
  );
}
