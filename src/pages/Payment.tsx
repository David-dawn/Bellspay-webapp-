import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/context/AuthContext';
import { useTransactions, Transaction } from '@/context/TransactionContext';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/formatters';
import { 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Building2, 
  MoreHorizontal,
  CreditCard,
  Building,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';

const feeTypes = [
  { id: 'tuition', name: 'Tuition Fees', description: 'School fees for the semester', icon: GraduationCap, amount: 350000 },
  { id: 'siwes', name: 'SIWES Fees', description: 'Industrial training registration', icon: Briefcase, amount: 25000 },
  { id: 'swep', name: 'SWEP Fees', description: 'Students work experience', icon: Wrench, amount: 15000 },
  { id: 'hostel', name: 'Hostel Fees', description: 'Accommodation payment', icon: Building2, amount: 120000 },
  { id: 'other', name: 'Other Fees', description: 'Departmental & miscellaneous', icon: MoreHorizontal, amount: 0 },
];

const paymentMethods = [
  { id: 'bank_transfer', name: 'Bank Transfer', description: 'Pay from any Nigerian bank', icon: Building },
  { id: 'card', name: 'Debit Card', description: 'Visa, Mastercard, Verve', icon: CreditCard },
  { id: 'ussd', name: 'USSD', description: 'Pay with USSD code', icon: Smartphone },
];

type Step = 'select-fee' | 'payment-method' | 'confirm' | 'processing' | 'success';

export default function Payment() {
  const navigate = useNavigate();
  const { user, updateBalance } = useAuth();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  
  const [step, setStep] = useState<Step>('select-fee');
  const [selectedFee, setSelectedFee] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [session] = useState('2024/2025');
  const [semester] = useState('Second Semester');
  const [newTransaction, setNewTransaction] = useState<Transaction | null>(null);

  const selectedFeeType = feeTypes.find(f => f.id === selectedFee);
  const amount = selectedFee === 'other' ? Number(customAmount) || 0 : selectedFeeType?.amount || 0;

  const handleSelectFee = () => {
    if (!selectedFee) {
      toast({ variant: 'destructive', title: 'Please select a fee type' });
      return;
    }
    if (selectedFee === 'other' && (!customAmount || Number(customAmount) <= 0)) {
      toast({ variant: 'destructive', title: 'Please enter a valid amount' });
      return;
    }
    setStep('payment-method');
  };

  const handleSelectPaymentMethod = () => {
    if (!paymentMethod) {
      toast({ variant: 'destructive', title: 'Please select a payment method' });
      return;
    }
    setStep('confirm');
  };

  const handleConfirmPayment = async () => {
    setStep('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;
    
    const transaction = addTransaction({
      userId: user!.id,
      type: selectedFee as 'tuition' | 'siwes' | 'swep' | 'hostel' | 'other',
      amount,
      status: isSuccess ? 'successful' : 'failed',
      description: `${selectedFeeType?.name} - ${session} ${semester}`,
      paymentMethod: paymentMethod as 'bank_transfer' | 'card' | 'ussd',
      session,
      semester,
    });
    
    setNewTransaction(transaction);
    
    if (isSuccess) {
      updateBalance(amount);
      setStep('success');
    } else {
      toast({
        variant: 'destructive',
        title: 'Payment Failed',
        description: 'Something went wrong. Please try again.',
      });
      setStep('confirm');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'select-fee':
        return (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Select Fee Type
              </h1>
              <p className="text-muted-foreground">
                Choose the type of fee you want to pay.
              </p>
            </div>

            <div className="grid gap-4 mb-8">
              {feeTypes.map((fee) => (
                <button
                  key={fee.id}
                  onClick={() => setSelectedFee(fee.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedFee === fee.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/30 bg-card'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedFee === fee.id ? 'bg-accent/10' : 'bg-muted'
                  }`}>
                    <fee.icon className={`w-6 h-6 ${selectedFee === fee.id ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{fee.name}</h3>
                    <p className="text-sm text-muted-foreground">{fee.description}</p>
                  </div>
                  {fee.amount > 0 && (
                    <p className="font-display font-bold text-foreground">
                      {formatCurrency(fee.amount)}
                    </p>
                  )}
                  {selectedFee === fee.id && (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  )}
                </button>
              ))}
            </div>

            {selectedFee === 'other' && (
              <div className="mb-8 animate-slide-up">
                <Label htmlFor="customAmount" className="text-base font-medium">
                  Enter Amount
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="0"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-10 h-14 text-xl font-display"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSelectFee} className="flex-1">
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        );

      case 'payment-method':
        return (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Payment Method
              </h1>
              <p className="text-muted-foreground">
                Choose how you want to pay.
              </p>
            </div>

            <RadioGroup value={paymentMethod || ''} onValueChange={setPaymentMethod} className="grid gap-4 mb-8">
              {paymentMethods.map((method) => (
                <Label
                  key={method.id}
                  htmlFor={method.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/30 bg-card'
                  }`}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    paymentMethod === method.id ? 'bg-accent/10' : 'bg-muted'
                  }`}>
                    <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  {paymentMethod === method.id && (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  )}
                </Label>
              ))}
            </RadioGroup>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep('select-fee')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSelectPaymentMethod} className="flex-1">
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Confirm Payment
              </h1>
              <p className="text-muted-foreground">
                Review your payment details before proceeding.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Fee Type</span>
                  <span className="font-medium text-foreground">{selectedFeeType?.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Session</span>
                  <span className="font-medium text-foreground">{session}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Semester</span>
                  <span className="font-medium text-foreground">{semester}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium text-foreground">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Student</span>
                  <span className="font-medium text-foreground">{user?.fullName}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Matric Number</span>
                  <span className="font-medium text-foreground">{user?.matricNumber}</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-lg font-semibold text-foreground">Total Amount</span>
                  <span className="font-display text-2xl font-bold text-accent">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-8">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Please confirm your details</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ensure all information is correct before proceeding. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep('payment-method')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConfirmPayment} variant="accent" className="flex-1">
                Pay {formatCurrency(amount)}
              </Button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="animate-fade-in text-center py-12">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Processing Payment
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Please wait while we process your payment. This may take a few seconds.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="animate-fade-in text-center py-12">
            <div className="w-20 h-20 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Your payment of {formatCurrency(amount)} has been processed successfully.
            </p>

            <div className="bg-card rounded-2xl border border-border p-6 max-w-md mx-auto mb-8 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono font-medium text-foreground">{newTransaction?.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium text-foreground">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-success font-medium">Successful</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/receipt/${newTransaction?.id}`)}
                className="flex-1"
              >
                View Receipt
              </Button>
              <Button onClick={() => navigate('/dashboard')} className="flex-1">
                Back to Dashboard
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          {step !== 'processing' && step !== 'success' && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {['select-fee', 'payment-method', 'confirm'].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s 
                      ? 'bg-accent text-accent-foreground' 
                      : i < ['select-fee', 'payment-method', 'confirm'].indexOf(step)
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {i < ['select-fee', 'payment-method', 'confirm'].indexOf(step) ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 2 && (
                    <div className={`w-12 h-0.5 ${
                      i < ['select-fee', 'payment-method', 'confirm'].indexOf(step)
                        ? 'bg-success'
                        : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {renderStep()}
        </div>
      </main>
    </div>
  );
}
