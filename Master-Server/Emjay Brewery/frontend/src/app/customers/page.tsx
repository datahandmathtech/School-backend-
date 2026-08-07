'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { cn } from '@/utils/cn';
import { ArrowLeft, Trash2, Edit, XCircle, Eye, Image as ImageIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MonthYearFilter from '@/components/MonthYearFilter';

function CustomerDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get('id') ?? '';

  const [customer, setCustomer] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [txFilterMonth, setTxFilterMonth] = useState(new Date().getMonth() + 1);
  const [txFilterYear, setTxFilterYear] = useState(new Date().getFullYear());
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [selectedBillImage, setSelectedBillImage] = useState<string | null>(null);
  const [editingTx, setEditingTx] = useState<any>(null);
  const [txForm, setTxForm] = useState({
    amount: '',
    paidCash: '',
    paidBank: '',
    type: 'debit',
    paymentMode: 'Cash',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const fetchData = async () => {
    if (!customerId) return;
    try {
      const [customerRes, txRes] = await Promise.all([
        api.get('/parties'),
        api.get(`/parties/${customerId}/transactions`),
      ]);
      const v = customerRes.data.find((p: any) => p._id === customerId);
      setCustomer(v);
      setTransactions(txRes.data);
    } catch {
      toast.error('Failed to load ledger data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const handleTxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTx) {
        await api.put(`/parties/transactions/${editingTx._id}`, { ...txForm, partyId: customerId });
        toast.success('Transaction updated');
      } else {
        await api.post('/parties/transaction', { ...txForm, partyId: customerId });
        toast.success('Transaction recorded');
      }
      setIsTxModalOpen(false);
      setEditingTx(null);
      setTxForm({ amount: '', paidCash: '', paidBank: '', type: 'debit', paymentMode: 'Cash', description: '', date: new Date().toISOString().split('T')[0] });
      fetchData();
    } catch {
      toast.error('Failed to save transaction');
    }
  };

  const deleteTx = async (id: string) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await api.delete(`/parties/transactions/${id}`);
      toast.success('Deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const filtered = transactions.filter((t) => {
    const d = new Date(t.date);
    const monthMatch = d.getMonth() + 1 === txFilterMonth;
    const yearMatch = d.getFullYear() === txFilterYear;
    return monthMatch && yearMatch;
  }).sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff === 0 && a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return dateDiff;
  });

  const displayTransactions = filtered.filter(t => !t.description?.includes('Payment for Purchase'));

  if (loading)
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );

  if (!customer)
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4 bg-gray-50">
        <p className="text-gray-500 font-medium">Customer not found.</p>
        <button onClick={() => router.push('/sales?tab=customers')} className="btn-primary">
            Back to Sales
        </button>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/sales?tab=customers')}
              className="p-2.5 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <span className="text-blue-600 font-bold text-xl">{customer.name?.charAt(0) || 'V'}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buyer/Customer Ledger</p>
                <h1 className="text-xl font-bold text-gray-900">{customer.name}</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MonthYearFilter
              selectedMonth={txFilterMonth}
              selectedYear={txFilterYear}
              onFilterChange={(m, y) => { setTxFilterMonth(m); setTxFilterYear(y); }}
            />
            <button
              onClick={() => {
                setEditingTx(null);
                const dueAmt = customer.balance && customer.balance > 0 ? customer.balance.toString() : '';
                setTxForm({ amount: dueAmt, paidCash: '', paidBank: '', type: 'debit', paymentMode: 'Cash', description: 'Payment towards due balance', date: new Date().toISOString().split('T')[0] });
                setIsTxModalOpen(true);
              }}
              className="btn-primary whitespace-nowrap"
            >
              RECORD PAYMENT
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Total Billed</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{filtered.filter(t => t.type === 'credit').reduce((a, b) => a + b.amount, 0).toLocaleString()}</h3>
            <p className="text-[10px] text-gray-400 mt-1">{filtered.filter(t => t.type === 'credit').length} transactions</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Total Paid</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{filtered.filter(t => t.type === 'debit').reduce((a, b) => a + b.amount, 0).toLocaleString()}</h3>
            <p className="text-[10px] text-gray-400 mt-1">{filtered.filter(t => t.type === 'debit').length} payments</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Current Balance</p>
            <h3 className={cn("text-2xl font-bold", (customer.balance || 0) <= 0 ? "text-green-600" : "text-red-600")}>
              ₹{Math.abs(customer.balance || 0).toLocaleString()}
            </h3>
            <p className="text-[10px] text-gray-400 mt-1">{(customer.balance || 0) <= 0 ? 'Settled / Advance' : 'Payable by them'}</p>
          </div>
        </div>

        {/* Balance Highlight */}
        <div className={cn(
            "p-5 rounded-xl mb-8 flex items-center justify-between border shadow-sm",
            (customer.balance || 0) <= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
        )}>
            <div>
                <p className={cn("text-[10px] font-bold uppercase tracking-wider", (customer.balance || 0) <= 0 ? "text-green-600" : "text-red-600")}>Total Outstanding</p>
                <p className="text-xs text-gray-500 font-medium">Net standing balance for this customer</p>
            </div>
            <h2 className={cn("text-3xl font-bold", (customer.balance || 0) <= 0 ? "text-green-600" : "text-red-600")}>
                {(customer.balance || 0) < 0 ? 'Adv: ' : ''}₹{Math.abs(customer.balance || 0).toLocaleString()}
            </h2>
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Transaction Ledger</h3>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Narration</th>
                  <th className="px-6 py-4 text-green-600">Paid Amount</th>
                  <th className="px-6 py-4 text-red-600">Bill Amount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayTransactions.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-medium text-gray-600">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 flex items-center">
                      {t.paymentMode && t.type === 'debit' && (
                        <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded mr-2 font-bold text-[9px] uppercase tracking-widest">{t.paymentMode}</span>
                      )}
                      <span>{t.description || '-'}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">{t.type === 'debit' ? `₹${t.amount.toLocaleString()}` : '₹0'}</td>
                    <td className="px-6 py-4 font-bold text-red-600">{t.type === 'credit' ? `₹${t.amount.toLocaleString()}` : '₹0'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {t.saleId?.billImage && (
                          <button
                            onClick={() => setSelectedBillImage(t.saleId.billImage)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="View Bill"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (t.saleId) {
                                router.push(`/sales?editSale=${t.saleId._id || t.saleId}&returnToCustomer=${customer._id}`);
                                return;
                            }
                            setEditingTx(t);
                            setTxForm({
                              amount: t.amount.toString(),
                              paidCash: '',
                              paidBank: '',
                              paymentMode: t.paymentMode || 'Cash',
                              type: t.type,
                              description: t.description || '',
                              date: t.date ? new Date(t.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                            });
                            setIsTxModalOpen(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600"
                          title={t.saleId ? "Edit Full Purchase" : "Edit Transaction"}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {!t.saleId && (
                          <button
                            onClick={() => deleteTx(t._id)}
                            className="p-1.5 text-gray-400 hover:text-red-600"
                            title="Delete Transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr>
                    <td colSpan={5} className="p-16 text-center text-gray-400 font-bold text-sm">
                      No ledger entries found for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Modal */}
        <AnimatePresence>
          {isTxModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setIsTxModalOpen(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-md z-50 relative shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                  <h3 className="font-bold text-gray-900">Record Transaction</h3>
                  <button onClick={() => setIsTxModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleTxSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 col-span-2">
                    {txForm.paymentMode === 'Split' ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Cash Amount (₹) *</label>
                          <input
                            type="number"
                            required
                            className="input-field"
                            value={txForm.paidCash}
                            onChange={(e) => {
                              const cash = e.target.value;
                              const bank = txForm.paidBank;
                              setTxForm({ ...txForm, paidCash: cash, amount: (Number(cash) + Number(bank)).toString() });
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Bank Amount (₹) *</label>
                          <input
                            type="number"
                            required
                            className="input-field"
                            value={txForm.paidBank}
                            onChange={(e) => {
                              const bank = e.target.value;
                              const cash = txForm.paidCash;
                              setTxForm({ ...txForm, paidBank: bank, amount: (Number(cash) + Number(bank)).toString() });
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Amount (₹) *</label>
                        <input
                          type="number"
                          required
                          className="input-field"
                          value={txForm.amount}
                          onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Type</label>
                      <div className="w-full bg-green-50 text-green-700 border border-green-200 rounded-lg p-2.5 text-sm font-bold shadow-inner">
                        Payment Received
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Payment Method</label>
                    <select
                      className="input-field"
                      value={txForm.paymentMode}
                      onChange={(e) => setTxForm({ ...txForm, paymentMode: e.target.value })}
                    >
                        <option value="Cash">Cash Only</option>
                        <option value="UPI">UPI / Online Only</option>
                        <option value="Split">Split (Cash + UPI)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Date</label>
                    <input
                      type="date"
                      required
                      className="input-field"
                      value={txForm.date}
                      onChange={(e) => setTxForm({ ...txForm, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Narration</label>
                    <textarea
                      className="input-field min-h-[80px]"
                      placeholder="Enter description..."
                      value={txForm.description}
                      onChange={(e) => setTxForm({ ...txForm, description: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary py-3">
                    Save Entry
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      {/* Bill Image Viewer Modal */}
      {selectedBillImage && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedBillImage(null)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-[151] max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" /> Uploaded Bill
              </h3>
              <button onClick={() => setSelectedBillImage(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex justify-center bg-gray-50 flex-1">
              <img src={selectedBillImage} alt="Bill" className="max-w-full h-auto object-contain rounded-lg shadow-sm border border-gray-200" />
            </div>
          </motion.div>
        </div>
      )}
      </main>
    </div>
  );
}

export default function CustomerDetail() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <CustomerDetailContent />
    </Suspense>
  );
}
