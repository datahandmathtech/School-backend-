'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Plus, 
  CreditCard, 
  History, 
  Search,
  XCircle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  UserPlus,
  ArrowLeftRight,
  User,
  Trash2
} from 'lucide-react';
import { cn } from '@/utils/cn';

const PartyLedger = () => {
  const [parties, setParties] = useState<any[]>([]);
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'supplier' | 'customer'>('supplier');
  const [partyForm, setPartyForm] = useState({ name: '', type: 'supplier', phone: '', address: '', gstRegistered: false, gstNumber: '', openingBalanceAmount: '', openingBalanceType: 'receivable' });
  const [txForm, setTxForm] = useState({ amount: '', paidCash: '', paidBank: '', type: 'credit', paymentMode: 'Cash', description: '', date: new Date().toISOString().split('T')[0] });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/parties');
      setParties(res.data);
    } catch (error) {
      toast.error('Failed to load parties');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (party: any) => {
    try {
      const res = await api.get(`/parties/${party._id}/transactions`);
      setTransactions(res.data);
      setSelectedParty(party);
    } catch (error) {
      toast.error('Failed to load ledger history');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddParty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amt = Number(partyForm.openingBalanceAmount) || 0;
      const openingBalance = partyForm.openingBalanceType === 'payable' ? -amt : amt;
      const payload = { ...partyForm, openingBalance };
      await api.post('/parties', payload);
      toast.success('Party added successfully');
      setIsPartyModalOpen(false);
      setPartyForm({ name: '', type: activeTab, phone: '', address: '', gstRegistered: false, gstNumber: '', openingBalanceAmount: '', openingBalanceType: 'receivable' });
      fetchData();
    } catch (error) {
      toast.error('Failed to add party');
    }
  };

  const handleAddTx = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/parties/transaction', { ...txForm, partyId: selectedParty._id });
      toast.success('Journal entry recorded');
      setIsTxModalOpen(false);
      setTxForm({ amount: '', paidCash: '', paidBank: '', type: 'credit', paymentMode: 'Cash', description: '', date: new Date().toISOString().split('T')[0] });
      // Refresh both party info (for balance) and transactions
      const res = await api.get('/parties');
      const updatedParties = res.data;
      setParties(updatedParties);
      const updated = updatedParties.find((p: any) => p._id === selectedParty._id);
      fetchTransactions(updated);
    } catch (error) {
      toast.error('Failed to record transaction');
    }
  };

  const deleteParty = async (id: string) => {
      if(!confirm('This will delete the party and ALL ledger history. Continue?')) return;
      try {
          await api.delete(`/parties/${id}`);
          toast.success('Party expunged');
          if(selectedParty?._id === id) setSelectedParty(null);
          fetchData();
      } catch (error) {
          toast.error('Operation failed');
      }
  }

  if (loading) return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64 p-8 overflow-y-auto"><div className="animate-pulse space-y-8"><div className="h-40 bg-white rounded-2xl"></div><div className="h-96 bg-white rounded-2xl"></div></div></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic underline decoration-indigo-500 underline-offset-8">Party Ledgers</h1>
            <p className="text-slate-500 mt-4 font-semibold uppercase tracking-widest text-[10px]">Financial reconciliation & counterparty accounts</p>
          </div>
          <button 
            onClick={() => setIsPartyModalOpen(true)}
            className="btn-primary flex items-center gap-2 group shadow-xl shadow-indigo-600/20"
          >
            <UserPlus className="w-4 h-4" />
            Enlist New Party
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Parties Sidebar */}
          <div className="lg:col-span-4 space-y-4">
             <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search parties..." className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm" />
             </div>
             <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
                <button 
                  onClick={() => setActiveTab('supplier')} 
                  className={cn("flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all", activeTab === 'supplier' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700')}
                >
                  Suppliers / Vendors
                </button>
                <button 
                  onClick={() => setActiveTab('customer')} 
                  className={cn("flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all", activeTab === 'customer' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700')}
                >
                  Customers (Sales)
                </button>
             </div>
             <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {parties.filter(p => p.type === activeTab).map(p => (
                  <div 
                    key={p._id} 
                    onClick={() => fetchTransactions(p)}
                    className={cn(
                        "p-5 rounded-2xl cursor-pointer border transition-all relative group",
                        selectedParty?._id === p._id 
                            ? "bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/20 text-white translate-x-2" 
                            : "bg-white border-slate-100 text-slate-900 hover:border-indigo-100 hover:shadow-md"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-black italic text-lg tracking-tight uppercase truncate mr-2">{p.name}</span>
                        <span className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                            selectedParty?._id === p._id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        )}>{p.type}</span>
                    </div>
                    <p className={cn("text-xs font-bold font-outfit", selectedParty?._id === p._id ? "text-indigo-100" : "text-slate-400")}>Bal: ₹{p.balance.toLocaleString()}</p>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); deleteParty(p._id); }}
                        className={cn("absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-rose-500 hover:text-white", 
                        selectedParty?._id === p._id ? "text-white/50" : "text-slate-300")}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
             </div>
          </div>

          {/* Ledger History */}
          <div className="lg:col-span-8">
            {selectedParty ? (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">{selectedParty.name}</h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Party UID: {selectedParty._id.slice(-8)}</p>
                            {selectedParty.gstRegistered && <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px] mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded">GST: {selectedParty.gstNumber}</p>}
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Net Outstanding</p>
                             <h4 className={cn("text-4xl font-black italic tabular-nums tracking-tighter", selectedParty.balance >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                ₹{selectedParty.balance.toLocaleString()}
                             </h4>
                        </div>
                    </div>
                    <div className="flex gap-4 border-t border-slate-100 pt-8">
                         <div className="flex-1 bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
                             <TrendingUp className="text-emerald-500 w-5 h-5" />
                             <div>
                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Total Credit</p>
                                <p className="font-black text-slate-900 italic">₹{transactions.filter(t => t.type === 'credit').reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
                             </div>
                         </div>
                         <div className="flex-1 bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
                             <TrendingDown className="text-rose-500 w-5 h-5" />
                             <div>
                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Total Debit</p>
                                <p className="font-black text-slate-900 italic">₹{transactions.filter(t => t.type === 'debit').reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
                             </div>
                         </div>
                         <button 
                            onClick={() => setIsTxModalOpen(true)}
                            className="bg-indigo-600 text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-3 shadow-lg shadow-indigo-600/20"
                         >
                             <Plus className="w-4 h-4" />
                             Record Entry
                         </button>
                    </div>
                </div>

                <div className="card !p-0 border-slate-200 shadow-sm overflow-hidden bg-white">
                     <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-black text-slate-900 uppercase tracking-tight italic">Transaction Ledger</h3>
                        <History className="w-4 h-4 text-slate-300" />
                     </div>
                     <div className="overflow-x-auto">
                         <table className="w-full text-left">
                             <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest h-12">
                                 <tr>
                                     <th className="px-6 py-4">Ref Date</th>
                                     <th className="px-6 py-4">Narration / Remarks</th>
                                     <th className="px-6 py-4">Inflow (+)</th>
                                     <th className="px-6 py-4">Outflow (-)</th>
                                     <th className="px-6 py-4 text-right">Status</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100 font-outfit">
                                 {transactions.map(t => (
                                     <tr key={t._id} className="hover:bg-slate-50/50 transition-all">
                                         <td className="px-6 py-4 text-slate-900 font-bold">{new Date(t.date).toLocaleDateString()}</td>
                                         <td className="px-6 py-4 text-slate-500 font-medium italic">{t.description || "General reconciliation entry"}</td>
                                         <td className="px-6 py-4 font-black italic text-emerald-600">{t.type === 'credit' ? `₹${t.amount.toLocaleString()}` : '-'}</td>
                                         <td className="px-6 py-4 font-black italic text-rose-600">{t.type === 'debit' ? `₹${t.amount.toLocaleString()}` : '-'}</td>
                                         <td className="px-6 py-4 text-right">
                                             <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest">Recorded</span>
                                         </td>
                                     </tr>
                                 ))}
                                 {!transactions.length && <tr><td colSpan={5} className="p-12 text-center text-slate-400 italic font-bold uppercase tracking-widest text-xs">No historical entries found for this party</td></tr>}
                             </tbody>
                         </table>
                     </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                 <div className="p-8 bg-slate-50 rounded-full mb-6">
                    <ArrowLeftRight className="w-12 h-12 text-slate-200" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase mb-2">Account Reconciliation</h3>
                 <p className="text-xs font-bold uppercase tracking-[0.2em] max-w-sm">Select a counterparty from the directory to review historical ledger logs and reconcile outstanding balances.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal for adding Party */}
        {isPartyModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in" onClick={() => setIsPartyModalOpen(false)}></div>
                <div className="card w-full max-w-md z-[110] relative bg-white border-indigo-100 shadow-2xl">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic lowercase">party_init()</h2>
                        <button onClick={() => setIsPartyModalOpen(false)}><XCircle className="w-6 h-6 text-slate-300" /></button>
                    </div>
                    <form onSubmit={handleAddParty} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity Name</label>
                            <input type="text" required className="input-field" placeholder="M/S Business Corp" value={partyForm.name} onChange={e => setPartyForm({...partyForm, name: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Interface</label>
                                <select className="input-field" value={partyForm.type} onChange={e => setPartyForm({...partyForm, type: e.target.value})}>
                                    <option value="customer">Customer (Sales)</option>
                                    <option value="supplier">Supplier (Vendor)</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contact</label>
                                <input type="text" className="input-field" placeholder="+91 ..." value={partyForm.phone} onChange={e => setPartyForm({...partyForm, phone: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location Matrix</label>
                            <textarea className="input-field min-h-[80px]" placeholder="Address details..." value={partyForm.address} onChange={e => setPartyForm({...partyForm, address: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GST Registered?</label>
                                <select className="input-field" value={partyForm.gstRegistered ? 'yes' : 'no'} onChange={e => setPartyForm({...partyForm, gstRegistered: e.target.value === 'yes'})}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                            {partyForm.gstRegistered && (
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GST Number</label>
                                    <input type="text" className="input-field uppercase" placeholder="22AAAAA0000A1Z5" value={partyForm.gstNumber} onChange={e => setPartyForm({...partyForm, gstNumber: e.target.value.toUpperCase()})} />
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Opening Balance</label>
                                <input type="number" className="input-field" placeholder="₹ 0" value={partyForm.openingBalanceAmount} onChange={e => setPartyForm({...partyForm, openingBalanceAmount: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Balance Type</label>
                                <select className="input-field" value={partyForm.openingBalanceType} onChange={e => setPartyForm({...partyForm, openingBalanceType: e.target.value})}>
                                    <option value="receivable">They Owe Us (+)</option>
                                    <option value="payable">We Owe Them (-)</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary py-4 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3">
                            Define Account Protocol <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        )}

        {/* Modal for Journal Entry */}
        {isTxModalOpen && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setIsTxModalOpen(false)}></div>
                <div className="card w-full max-w-md z-[110] relative bg-white border-slate-200">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">LEDGER_ENTRY</h2>
                        <button onClick={() => setIsTxModalOpen(false)}><XCircle className="w-6 h-6 text-slate-300" /></button>
                    </div>
                    <form onSubmit={handleAddTx} className="space-y-5">
                         <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Active Participant</p>
                             <p className="text-xl font-black text-indigo-900 italic uppercase truncate">{selectedParty.name}</p>
                         </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1 col-span-2">
                                {txForm.paymentMode === 'Split' ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cash Amount (₹)</label>
                                            <input type="number" required className="input-field font-black italic text-lg" placeholder="0" value={txForm.paidCash} onChange={(e) => {
                                                const cash = e.target.value;
                                                const bank = txForm.paidBank;
                                                setTxForm({ ...txForm, paidCash: cash, amount: (Number(cash) + Number(bank)).toString() });
                                            }} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bank Amount (₹)</label>
                                            <input type="number" required className="input-field font-black italic text-lg" placeholder="0" value={txForm.paidBank} onChange={(e) => {
                                                const bank = e.target.value;
                                                const cash = txForm.paidCash;
                                                setTxForm({ ...txForm, paidBank: bank, amount: (Number(cash) + Number(bank)).toString() });
                                            }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Capital Amount (₹)</label>
                                        <input type="number" required className="input-field font-black italic text-lg" placeholder="0" value={txForm.amount} onChange={e => setTxForm({...txForm, amount: e.target.value})} />
                                    </div>
                                )}
                            </div>
                             <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Flow Type</label>
                                <select className="input-field" value={txForm.type} onChange={e => setTxForm({...txForm, type: e.target.value})}>
                                    <option value="credit">Credit (Inflow/Sale/Due)</option>
                                    <option value="debit">Debit (Payment/Outflow)</option>
                                </select>
                            </div>
                            <div className="space-y-1 col-span-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payment Method</label>
                                <select className="input-field" value={txForm.paymentMode} onChange={e => setTxForm({...txForm, paymentMode: e.target.value})}>
                                    <option value="Cash">Cash Only</option>
                                    <option value="UPI">UPI / Online Only</option>
                                    <option value="Split">Split (Cash + UPI)</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</label>
                            <input type="date" className="input-field" value={txForm.date} onChange={e => setTxForm({...txForm, date: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Narration</label>
                            <textarea className="input-field" placeholder="Payment ref, partial settlement, etc..." value={txForm.description} onChange={e => setTxForm({...txForm, description: e.target.value})} />
                        </div>
                        <button type="submit" className="w-full btn-primary py-4 font-black uppercase text-xs tracking-[0.2em]">Commit to Ledger</button>
                    </form>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default PartyLedger;
