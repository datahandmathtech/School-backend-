'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Trash2, 
  PencilLine,
  XCircle,
  Package,
  Calendar,
  User,
  Store,
  Wallet,
  ArrowRight,
  ChevronDown,
  ArrowUpDown,
  Search,
  Download
} from 'lucide-react';
import MonthYearFilter from '@/components/MonthYearFilter';

import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const Sales = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [globalLedger, setGlobalLedger] = useState<any[]>([]);
  const [parties, setParties] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [activeMainTab, setActiveMainTab] = useState('ledger');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  
  const router = useRouter();
  const [searchCustomer, setSearchCustomer] = useState('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedProfileCustomer, setSelectedProfileCustomer] = useState<any>(null);
  const [customerForm, setCustomerForm] = useState({ _id: '', name: '', phone: '', email: '', address: '', hasGST: 'No', gstNo: '', type: 'customer', openingBalance: '' });

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...customerForm,
        gstRegistered: customerForm.hasGST === 'Yes',
        gstNumber: customerForm.gstNo
      };
      
      if (customerForm._id) {
        await api.put(`/parties/${customerForm._id}`, payload);
        // toast.success('Customer updated successfully');
      } else {
        const { _id, ...postPayload } = payload;
        await api.post('/parties', postPayload);
        // toast.success('Customer added successfully');
      }
      setIsCustomerModalOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save customer');
    }
  };

  const deleteCustomer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/parties/${id}`);
        // toast.success('Customer deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete customer');
      }
    }
  };

  const generateInvoice = (order: any) => {
    import('jspdf').then(({ default: jsPDF }) => {
        import('jspdf-autotable').then(({ default: autoTable }) => {
            const doc = new jsPDF();
            const party = parties.find(p => p._id === (order.partyId?._id || order.partyId)) || {};
            
            const renderPdf = (imgUrl: string | null) => {
                const primaryColor: [number, number, number] = [138, 28, 28]; // Emjay Logo Maroon/Red
                const secondaryColor: [number, number, number] = [107, 114, 128]; // Gray 500
                const lightBg: [number, number, number] = [249, 250, 251]; // Gray 50

                // 1. Top Centered "TAX INVOICE"
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('TAX INVOICE', 105, 15, { align: 'center' });

                // 2. Left Side (Logo & Company Details)
                let currentY = 25;
                if (imgUrl) {
                    try {
                        doc.addImage(imgUrl, 'JPEG', 14, currentY, 20, 20); // Smaller, neat logo
                        currentY += 25;
                    } catch (e) {
                        // ignore
                    }
                }
                
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Emjay Brewery', 14, currentY);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                doc.text('86, Bhil Basti, Hawala Khurd', 14, currentY + 5);
                doc.text('Badi, Udaipur', 14, currentY + 10);
                doc.text('GSTIN/UIN: 08ATJPC9542M1Z7', 14, currentY + 15);
                doc.text('State Name : Rajasthan, Code : 08', 14, currentY + 20);
                doc.text('E-Mail : emjaybrewery@gmail.com', 14, currentY + 25);

                // 3. Right Side (Invoice Details)
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text('Invoice No:', 140, currentY);
                doc.setFont('helvetica', 'normal');
                doc.text(order.invoiceNo || 'PENDING', 196, currentY, { align: 'right' });

                doc.setFont('helvetica', 'bold');
                doc.text('Date:', 140, currentY + 7);
                doc.setFont('helvetica', 'normal');
                doc.text(new Date(order.date).toLocaleDateString('en-GB'), 196, currentY + 7, { align: 'right' });

                doc.setFont('helvetica', 'bold');
                doc.text('Payment Mode:', 140, currentY + 14);
                doc.setFont('helvetica', 'normal');
                doc.text(order.paymentMode || 'Cash', 196, currentY + 14, { align: 'right' });

                // 4. Line Separator
                currentY += 32;
                doc.setDrawColor(200, 200, 200);
                doc.line(14, currentY, 196, currentY);

                // 5. Bill To Section
                currentY += 8;
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text('BILLED TO:', 14, currentY);
                
                currentY += 6;
                doc.setFontSize(10);
                doc.text(order.customerName || party.name || 'Walk-in Customer', 14, currentY);
                doc.setFont('helvetica', 'normal');
                if (party.address) {
                    currentY += 5;
                    doc.text(party.address, 14, currentY);
                }
                if (party.phone) {
                    currentY += 5;
                    doc.text(`Phone: ${party.phone}`, 14, currentY);
                }
                if (party.gstNumber) {
                    currentY += 5;
                    doc.text(`GSTIN: ${party.gstNumber}`, 14, currentY);
                }

                currentY += 12;

                // 4. Table Section
                const tableColumn = ["Item Description", "Qty", "Rate (Rs)", "Amount (Rs)"];
                const tableRows: any[] = [];
                
                if (order.items && order.items.length > 0) {
                    order.items.forEach((item: any) => {
                        const juiceName = item.juiceType?.name || item.juiceType || 'Product';
                        const itemData = [
                            juiceName,
                            item.quantity.toString(),
                            item.price.toLocaleString(),
                            (item.quantity * item.price).toLocaleString()
                        ];
                        tableRows.push(itemData);
                    });
                }
                
                // @ts-ignore
                autoTable(doc, {
                    startY: currentY,
                    head: [tableColumn],
                    body: tableRows,
                    theme: 'grid',
                    headStyles: { 
                        fillColor: primaryColor, 
                        textColor: 255, 
                        fontStyle: 'bold',
                        halign: 'center'
                    },
                    styles: { 
                        fontSize: 10, 
                        cellPadding: 6,
                        textColor: [40, 40, 40],
                        lineColor: [220, 220, 220]
                    },
                    columnStyles: {
                        0: { cellWidth: 90, halign: 'left' },
                        1: { cellWidth: 25, halign: 'center' },
                        2: { cellWidth: 30, halign: 'right' },
                        3: { cellWidth: 35, halign: 'right' }
                    },
                    alternateRowStyles: { fillColor: lightBg }
                });
                
                // @ts-ignore
                const finalY = doc.lastAutoTable?.finalY || currentY + 20;
                
                // 5. Total Section
                doc.setFontSize(10);
                const rightColX = 145;
                const valX = 194;
                
                let sumY = finalY + 10;
                const subtotal = order.totalAmount || 0;
                const gst = order.gst || 0;
                const discount = order.discount || 0;
                const grandTotal = subtotal + gst - discount;

                doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                doc.text('Subtotal:', rightColX, sumY);
                doc.setTextColor(0, 0, 0);
                doc.text(`Rs. ${subtotal.toLocaleString()}`, valX, sumY, { align: 'right' });
                sumY += 7;
                
                if (gst > 0) {
                    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                    doc.text('GST:', rightColX, sumY);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`+ Rs. ${gst.toLocaleString()}`, valX, sumY, { align: 'right' });
                    sumY += 7;
                }
                
                if (discount > 0) {
                    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                    doc.text('Discount:', rightColX, sumY);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`- Rs. ${discount.toLocaleString()}`, valX, sumY, { align: 'right' });
                    sumY += 7;
                }
                
                // Grand Total Banner
                doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
                doc.rect(rightColX - 5, sumY - 4, 60, 10, 'F');
                
                doc.setFont('helvetica', 'bold');
                doc.text('Grand Total:', rightColX, sumY + 3);
                doc.text(`Rs. ${grandTotal.toLocaleString()}`, valX, sumY + 3, { align: 'right' });
                sumY += 15;
                
                // Payment Status
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                doc.text('Paid Amount:', rightColX, sumY);
                doc.setTextColor(0, 0, 0);
                doc.text(`Rs. ${(order.paidAmount || 0).toLocaleString()}`, valX, sumY, { align: 'right' });
                sumY += 7;
                
                const due = grandTotal - (order.paidAmount || 0);
                if (due > 0) {
                    doc.setTextColor(220, 38, 38);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Amount Due:', rightColX, sumY);
                    doc.text(`Rs. ${due.toLocaleString()}`, valX, sumY, { align: 'right' });
                } else {
                    doc.setTextColor(22, 163, 74);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Status:', rightColX, sumY);
                    doc.text(`Fully Paid`, valX, sumY, { align: 'right' });
                }
                
                // 6. Footer Note
                doc.setTextColor(150, 150, 150);
                doc.setFont('helvetica', 'italic');
                doc.text('Thank you for your business! For any queries, please contact us.', 105, 280, { align: 'center' });

                const safeName = (party.name || order.customerName || 'Customer').replace(/[^a-z0-9]/gi, '_');
                doc.save(`Invoice_${safeName}_${order.invoiceNo ? order.invoiceNo.replace(/\//g, '-') : new Date(order.date).toISOString().split('T')[0]}.pdf`);
            };

            const img = new Image();
            img.src = '/Logo.jpg';
            img.onload = () => renderPdf(img.src);
            img.onerror = () => renderPdf(null);
        });
    });
  };

  const [orderItems, setOrderItems] = useState([{
    juiceType: '',
    quantity: '',
    pricePerUnit: ''
  }]);

  const [form, setForm] = useState({
    customerName: '',
    partyId: '',
    type: '',
    paidAmount: '',
    paidCash: '',
    paidOnline: '',
    sourceBranchId: '',
    gst: '',
    discount: '',
    paymentMode: 'Cash',
    date: new Date().toISOString().split('T')[0]
  });

  const addItem = () => {
    setOrderItems([{ juiceType: '', quantity: '', pricePerUnit: '' }, ...orderItems]);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (index: number, field: string, value: any) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'juiceType') {
        const p = products.find(pr => pr._id === value);
        newItems[index].pricePerUnit = p?.pricePerUnit.toString() || '';
    }
    setOrderItems(newItems);
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.pricePerUnit)), 0);
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + Number(form.gst || 0) - Number(form.discount || 0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'customers') {
        setActiveMainTab('customers');
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const [nextInvoiceNo, setNextInvoiceNo] = useState('');

  useEffect(() => {
    if (isModalOpen && !editingOrder) {
      api.get('/orders/next-invoice', { params: { date: form.date } })
        .then(res => setNextInvoiceNo(res.data.invoiceNo))
        .catch(console.error);
    }
  }, [isModalOpen, editingOrder, form.date]);

  const [productions, setProductions] = useState<any[]>([]);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const [orderRes, productRes, prodRes, ledgerRes, partiesRes, txRes] = await Promise.all([
        api.get('/orders', { params: { month: selectedMonth, year: selectedYear } }),
        api.get('/products'),
        api.get('/production', { params: { month: selectedMonth, year: selectedYear } }),
        api.get('/reports/global-stock', { params: { month: selectedMonth, year: selectedYear } }),
        api.get('/parties'),
        api.get('/parties/all/transactions', { params: { month: selectedMonth, year: selectedYear } })
      ]);
      setOrders(orderRes.data);
      setProducts(productRes.data);
      setProductions(prodRes.data);
      setGlobalLedger(ledgerRes.data);
      setAllTransactions(txRes.data);
      const allCustomers = partiesRes.data.filter((p: any) => p.type?.toLowerCase() === 'customer');
      setParties(allCustomers);
      setBranches(allCustomers.filter((p: any) => p.isBranch || p.name.toLowerCase().includes('branch')));
    } catch (error) {
      toast.error('Data loading failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const grandTotal = subtotal + (Number(form.gst) || 0) - (Number(form.discount) || 0);
    let totalPaid = 0;
    if (form.paymentMode === 'Split') {
        totalPaid = (Number(form.paidCash) || 0) + (Number(form.paidOnline) || 0);
    } else if (form.paymentMode !== 'Due') {
        totalPaid = Number(form.paidAmount) || 0;
    }
    
    const orderData = {
      ...form,
      partyId: form.partyId || null,
      items: orderItems.map(item => ({
          juiceType: item.juiceType,
          quantity: Number(item.quantity),
          price: Number(item.pricePerUnit)
      })),
      totalAmount: subtotal,
      gst: Number(form.gst) || 0,
      discount: Number(form.discount) || 0,
      paidAmount: totalPaid,
      paidCash: Number(form.paidCash) || 0,
      paidOnline: Number(form.paidOnline) || 0,
      sourceBranchId: form.sourceBranchId === 'production' ? null : (form.sourceBranchId || null),
      dueAmount: grandTotal - totalPaid
    };

    try {
      if (editingOrder) {
        await api.put(`/orders/${editingOrder._id}`, orderData);
        toast.success('Sale Updated');
      } else {
        await api.post('/orders', orderData);
        toast.success('Sale Saved');
      }
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setOrderItems(order.items.map((i: any) => ({
        juiceType: i.juiceType?._id || i.juiceType,
        quantity: i.quantity.toString(),
        pricePerUnit: i.price.toString()
    })));
    setForm({
      customerName: order.customerName,
      partyId: order.partyId?._id || order.partyId || '',
      type: order.type,
      paidAmount: (order.paidAmount || 0).toString(),
      paidCash: (order.paidCash || 0).toString(),
      paidOnline: (order.paidOnline || 0).toString(),
      sourceBranchId: order.sourceBranchId || '',
      gst: (order.gst || 0).toString(),
      discount: (order.discount || 0).toString(),
      paymentMode: order.paymentMode || 'Cash',
      date: new Date(order.date).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingOrder(null);
    setOrderItems([{ juiceType: '', quantity: '', pricePerUnit: '' }]);
    setForm({ 
        customerName: '', 
        partyId: '',
        type: '', 
        paidAmount: '', 
        paidCash: '',
        paidOnline: '',
        sourceBranchId: user?.role === 'branch_admin' ? user.branchId : '',
        gst: '', 
        discount: '', 
        paymentMode: 'Cash', 
        date: new Date().toISOString().split('T')[0] 
    });
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Wholesale') return o.type === 'B2B';
    return o.type === 'B2C' || o.type === 'Customer';
  }).sort((a, b) => {
      const d1 = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (d1 === 0 && b.createdAt && a.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return d1;
  });

  if (loading) return <div className="flex h-screen bg-white items-center justify-center font-bold text-gray-400">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 pt-20 lg:p-6 lg:pt-6">
        
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
           <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Sales Record</h1>
              <p className="text-gray-500 text-xs md:text-sm">Daily sales and customer tracking</p>
           </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                <MonthYearFilter 
                    selectedMonth={selectedMonth} 
                    selectedYear={selectedYear} 
                    onFilterChange={(m, y) => { setSelectedMonth(m); setSelectedYear(y); }} 
                />
                <button 
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Sale
                </button>
            </div>
        </div>

        {/* Totals & Filters Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {activeMainTab === 'ledger' ? (
                <>
                    <div 
                        onClick={() => { setActiveMainTab('ledger'); setActiveTab('All'); }}
                        className={cn(
                            "cursor-pointer p-6 rounded-xl border shadow-sm transition-all",
                            activeTab === 'All' ? "border-blue-600 ring-2 ring-blue-600 bg-blue-50/50" : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                        )}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">All Sales</p>
                            {activeTab === 'All' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">₹{orders.reduce((a, b) => a + (b.grandTotal || b.totalAmount), 0).toLocaleString()}</h3>
                        <p className="text-xs text-gray-400 mt-2">Click to view all records</p>
                    </div>
                    
                    <div 
                        onClick={() => { setActiveMainTab('ledger'); setActiveTab('Wholesale'); }}
                        className={cn(
                            "cursor-pointer p-6 rounded-xl border shadow-sm transition-all",
                            activeTab === 'Wholesale' ? "border-blue-600 ring-2 ring-blue-600 bg-blue-50/50" : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                        )}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Wholesale (B2B)</p>
                            {activeTab === 'Wholesale' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">₹{orders.filter(o => o.type === 'B2B').reduce((a, b) => a + (b.grandTotal || b.totalAmount), 0).toLocaleString()}</h3>
                        <p className="text-xs text-gray-400 mt-2">Click to view wholesale</p>
                    </div>
                    
                    <div 
                        onClick={() => { setActiveMainTab('ledger'); setActiveTab('Retail'); }}
                        className={cn(
                            "cursor-pointer p-6 rounded-xl border shadow-sm transition-all",
                            activeTab === 'Retail' ? "border-blue-600 ring-2 ring-blue-600 bg-blue-50/50" : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                        )}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Retail (B2C)</p>
                            {activeTab === 'Retail' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">₹{orders.filter(o => o.type === 'B2C' || o.type === 'Customer').reduce((a, b) => a + (b.grandTotal || b.totalAmount), 0).toLocaleString()}</h3>
                        <p className="text-xs text-gray-400 mt-2">Click to view retail</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Overall Net Balance</p>
                        <h3 className={cn("text-2xl font-bold", parties.reduce((a, p) => a + (p.balance || 0), 0) >= 0 ? "text-gray-900" : "text-emerald-600")}>
                            ₹{Math.abs(parties.reduce((a, p) => a + (p.balance || 0), 0)).toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2">Combined balance of all customers</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Collected</p>
                        <h3 className="text-2xl font-bold text-emerald-600">
                            ₹{(orders.reduce((a, b) => a + (b.paidAmount || 0), 0) + allTransactions.filter(t => t.partyId?.type === 'customer' && t.type === 'debit').reduce((a, b) => a + (b.amount || 0), 0)).toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2">Amount received in selected period</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Due (To Receive)</p>
                        <h3 className="text-2xl font-bold text-rose-600">
                            ₹{parties.reduce((a, p) => a + ((p.balance && p.balance > 0) ? p.balance : 0), 0).toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2">Money pending from customers</p>
                    </div>
                </>
            )}
        </div>

        {/* Main Tab System */}
        <div className="flex flex-col sm:flex-row bg-gray-200/50 p-1.5 rounded-2xl w-full sm:w-fit mb-8 shadow-inner gap-1">
            <button 
                onClick={() => setActiveMainTab('ledger')}
                className={cn(
                    "px-4 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all w-full sm:w-auto",
                    activeMainTab === 'ledger' ? "bg-white text-blue-600 shadow-xl scale-[1.02]" : "text-gray-500 hover:text-gray-900"
                )}
            >Sales Ledger</button>
            <button 
                onClick={() => setActiveMainTab('customers')}
                className={cn(
                    "px-4 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all w-full sm:w-auto",
                    activeMainTab === 'customers' ? "bg-white text-blue-600 shadow-xl scale-[1.02]" : "text-gray-500 hover:text-gray-900"
                )}
            >Customers / Buyers</button>
        </div>

        {activeMainTab === 'ledger' ? (
          <>
            {/* Sales Ledger Content */}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice No</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Party / Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product(s)</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Qty</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Bill Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 italic-none">
                            {filteredOrders.length > 0 ? filteredOrders.map((o, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-600 whitespace-nowrap">
                                        {new Date(o.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-blue-600 whitespace-nowrap">
                                        {o.invoiceNo || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="font-bold text-gray-800 leading-tight">{o.customerName}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">{o.paymentMode || 'Cash'}</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-gray-700 whitespace-nowrap">
                                        {o.items.map((item: any, idx: number) => (
                                            <div key={idx}>{item.juiceType?.name} ({item.quantity})</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                                        {o.items.reduce((acc: number, item: any) => acc + item.quantity, 0)} Pcs
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-sm font-bold text-gray-800">₹{(o.grandTotal || o.totalAmount || 0).toLocaleString()}</p>
                                        <p className={cn(
                                            "text-[10px] font-bold uppercase",
                                            (o.paidAmount >= (o.grandTotal || o.totalAmount)) ? "text-green-500" : "text-red-500"
                                        )}>
                                            {o.paidAmount >= (o.grandTotal || o.totalAmount) ? 'Fully Paid' : `Due: ₹${(o.grandTotal || o.totalAmount) - o.paidAmount}`}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); generateInvoice(o); }} 
                                                className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                                                title="Download Invoice"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleEdit(o)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><PencilLine className="w-5 h-5" /></button>
                                            <button 
                                                onClick={async () => {
                                                    if(confirm('Delete record?')) {
                                                        await api.delete(`/orders/${o._id}`);
                                                        fetchData();
                                                    }
                                                }} 
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={6} className="p-10 text-center text-gray-400 font-bold">No Records Found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
          </>
        ) : (
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-96 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={searchCustomer}
                  onChange={e => setSearchCustomer(e.target.value)}
                />
              </div>
              <button 
                onClick={() => {
                  setCustomerForm({ _id: '', name: '', phone: '', email: '', address: '', hasGST: 'No', gstNo: '', type: 'customer', openingBalance: '' });
                  setIsCustomerModalOpen(true);
                }} 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 w-full md:w-auto"
              >
                <div className="bg-white/20 rounded-lg p-1">
                  <Plus className="w-4 h-4" />
                </div>
                Enlist New Customer
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-8 py-5">Customer Details</th>
                      <th className="px-8 py-5">Last Sale</th>
                      <th className="px-8 py-5">Contact</th>
                      <th className="px-8 py-5 text-right">Net Balance</th>
                      <th className="px-8 py-5 text-center">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {parties.filter(p => p.name.toLowerCase().includes(searchCustomer.toLowerCase())).map(p => (
                      <tr 
                        key={p._id} 
                        onClick={() => router.push(`/customers?id=${p._id}`)}
                        className="group hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProfileCustomer(p);
                              }}
                              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50 hover:scale-110 hover:rotate-3 hover:shadow-blue-200 transition-all duration-300 cursor-pointer"
                              title="View Customer Profile"
                            >
                              <User className="w-5 h-5" />
                            </button>
                            <div>
                                <h4 className="font-black text-slate-900 text-sm tracking-tight group-hover:text-blue-700 transition-colors">
                                  {p.name}
                                </h4>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Buyer / Customer</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            {p.lastTransactionDate ? (
                              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 w-max px-3 py-1.5 rounded-lg border border-slate-100">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-xs font-bold">{new Date(p.lastTransactionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-slate-300">-</span>
                            )}
                          </td>
                          <td className="px-8 py-5 space-y-2">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 shadow-sm">
                            {p.phone || 'No Contact Info'}
                          </div>
                          <div>
                            {p.gstRegistered ? (
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase tracking-wider border border-blue-100">GST: {p.gstNumber}</span>
                            ) : (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold uppercase tracking-wider">Unregistered</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <p className={cn(
                              "text-xl font-black tracking-tighter",
                              (p.balance || 0) >= 0 ? "text-emerald-500" : "text-rose-500"
                          )}>₹{Math.abs(p.balance || 0).toLocaleString()}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            {(p.balance || 0) >= 0 ? ((p.balance || 0) === 0 ? 'Settled' : 'To Receive') : 'Advance Paid'}
                          </p>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border transition-all",
                            (p.balance || 0) >= 0 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/20" 
                                : "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/20"
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", (p.balance || 0) >= 0 ? "bg-emerald-500" : "bg-rose-500")} />
                            {(p.balance || 0) >= 0 ? 'Account Clear' : 'Action Required'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteCustomer(p._id); }}
                              className="p-2 text-rose-400 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-lg shadow-sm border border-slate-100 transition-colors"
                              title="Delete Customer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!parties.length && <tr><td colSpan={5} className="p-16 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 mb-6 shadow-inner">
                        <User className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="font-black text-slate-900 text-lg">No Customers Found</h3>
                      <p className="text-slate-500 text-sm mt-2 font-medium">Add a party to automatically track customers.</p>
                    </td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal - Simple and Clean */}
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsModalOpen(false)} />
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="bg-white rounded-lg w-full max-w-2xl z-50 relative shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{editingOrder ? 'Edit Sale' : 'New Sale Entry'}</h2>
                                {!editingOrder && nextInvoiceNo && (
                                    <p className="text-sm font-bold text-blue-600 mt-1">Invoice No: {nextInvoiceNo}</p>
                                )}
                                {editingOrder && editingOrder.invoiceNo && (
                                    <p className="text-sm font-bold text-blue-600 mt-1">Invoice No: {editingOrder.invoiceNo}</p>
                                )}
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">Sale Type</label>
                                    <select required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800" value={form.type} onChange={e => {
                                        setForm({...form, type: e.target.value});
                                    }}>
                                        <option value="">-- Select Sale Type --</option>
                                        <option value="Customer">Retail</option>
                                        <option value="B2B">Wholesaler</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">{form.type === 'B2B' ? 'Select Wholesaler (Registered)' : 'Customer Name'}</label>
                                    {form.type === 'B2B' ? (
                                        <select 
                                            required={!editingOrder || (editingOrder && !!editingOrder.partyId)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" 
                                            value={form.partyId || (editingOrder && !editingOrder.partyId ? 'unregistered' : '')}
                                            onChange={e => {
                                                if (e.target.value === 'unregistered') {
                                                    setForm({...form, partyId: '', customerName: editingOrder?.customerName || ''});
                                                    return;
                                                }
                                                const party = parties.find(p => p._id === e.target.value);
                                                setForm({...form, partyId: e.target.value, customerName: party ? party.name : ''});
                                            }}
                                        >
                                            <option value="" disabled={!editingOrder || !!editingOrder.partyId}>-- Select Wholesaler --</option>
                                            {editingOrder && !editingOrder.partyId && form.type === 'B2B' && (
                                                <option value="unregistered">{form.customerName} (Unregistered Old Bill)</option>
                                            )}
                                            {parties.filter(p => p.type?.toLowerCase() === 'customer' && !p.isBranch).map(p => (
                                                <option key={p._id} value={p._id}>{p.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input 
                                            type="text"
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" 
                                            value={form.customerName} 
                                            onChange={e => setForm({...form, customerName: e.target.value, partyId: ''})}
                                            placeholder="Walk-in Customer"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">Stock Location (Source)</label>
                                    <select 
                                        required
                                        className={cn("w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold outline-none", user?.role === 'branch_admin' ? "text-gray-500 cursor-not-allowed opacity-70" : "text-gray-800 focus:border-blue-500")}
                                        value={user?.role === 'branch_admin' ? user?.branchId : form.sourceBranchId} 
                                        onChange={e => setForm({...form, sourceBranchId: e.target.value})}
                                        disabled={user?.role === 'branch_admin'}
                                    >
                                        {user?.role !== 'branch_admin' && <option value="" disabled>-- Select Source --</option>}
                                        {user?.role !== 'branch_admin' && <option value="production">Main Production</option>}
                                        {parties.filter(p => {
                                            if (user?.role === 'branch_admin') return p._id === user?.branchId;
                                            return p.isBranch || (p.type?.toLowerCase() === 'customer' && p.name.toLowerCase().includes('branch'));
                                        }).map(b => (
                                            <option key={b._id} value={b._id}>{b.name} Stock</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">Date</label>
                                    <input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Juice Variants</h3>
                                    <button type="button" onClick={addItem} className="text-blue-600 text-[10px] font-black uppercase flex items-center gap-1 hover:underline">
                                        <Plus className="w-4 h-4" /> Add Product
                                    </button>
                                </div>
                                {orderItems.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-12 gap-3 items-end bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <div className="col-span-5 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Product</label>
                                            <select 
                                                required 
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold" 
                                                value={item.juiceType} 
                                                onChange={e => updateOrderItem(idx, 'juiceType', e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-span-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Qty</label>
                                            <input type="number" required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold" value={item.quantity} onChange={e => updateOrderItem(idx, 'quantity', e.target.value)} />
                                        </div>
                                        <div className="col-span-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Rate</label>
                                            <input type="number" required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold" value={item.pricePerUnit} onChange={e => updateOrderItem(idx, 'pricePerUnit', e.target.value)} />
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            {orderItems.length > 1 && (
                                                <button type="button" onClick={() => removeItem(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-right font-black text-slate-800 text-lg mt-6 mb-6">
                                Total Bill: ₹{calculateSubtotal().toLocaleString()}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">GST (₹)</label>
                                    <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" value={form.gst} onChange={e => setForm({...form, gst: e.target.value})} placeholder="0" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">Discount (₹)</label>
                                    <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} placeholder="0" />
                                </div>
                            </div>

                            <div className="space-y-1 mt-4">
                                <label className="text-[11px] font-bold text-gray-500 uppercase">Payment Mode</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" value={form.paymentMode} onChange={e => setForm({...form, paymentMode: e.target.value})}>
                                    <option value="Cash">Cash Only</option>
                                    <option value="UPI">UPI / Online Only</option>
                                    <option value="Split">Split (Cash + UPI)</option>
                                    <option value="Due">Due / Unpaid</option>
                                </select>
                            </div>


                            {form.paymentMode === 'Split' && (
                                <div className="grid grid-cols-3 gap-4 border border-indigo-100 bg-indigo-50/50 p-4 rounded-xl mt-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-600">Cash Received</label>
                                        <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" placeholder="₹0" value={form.paidCash} onChange={e => setForm({...form, paidCash: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-600">UPI / Online</label>
                                        <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-blue-500" placeholder="₹0" value={form.paidOnline} onChange={e => setForm({...form, paidOnline: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-600">Due Amount</label>
                                        <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-500 flex items-center">
                                            ₹{Math.max(0, calculateGrandTotal() - (Number(form.paidCash) || 0) - (Number(form.paidOnline) || 0)).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {form.paymentMode !== 'Split' && form.paymentMode !== 'Due' && (
                                <div className="space-y-1 mt-4">
                                    <label className="text-xs font-bold text-gray-600">Received Amount</label>
                                    <input type="number" required className="w-1/2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm font-bold text-green-800 outline-none focus:border-green-500" value={form.paidAmount} onChange={e => setForm({...form, paidAmount: e.target.value})} placeholder="0" />
                                </div>
                            )}

                            <div className="flex items-center justify-between bg-blue-50 p-6 rounded-2xl mt-6">
                                <div>
                                    <p className="text-[10px] font-black text-blue-400 uppercase">Grand Total</p>
                                    <p className="text-3xl font-black text-blue-600 tracking-tight">₹{calculateGrandTotal().toLocaleString()}</p>
                                </div>
                                <button type="submit" className="bg-blue-600 text-white py-4 px-10 rounded-xl text-sm font-bold uppercase transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-[0.98]">
                                    {editingOrder ? 'Update Sale' : 'Confirm Sale'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Customer Modals */}
        {selectedProfileCustomer && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProfileCustomer(null)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm z-[121] relative shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 flex flex-col items-center justify-center relative border-b border-indigo-100/50">
                <button onClick={() => setSelectedProfileCustomer(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white/50 rounded-full hover:bg-white transition-all shadow-sm">
                  <XCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setCustomerForm({ 
                      _id: selectedProfileCustomer._id, 
                      name: selectedProfileCustomer.name || '', 
                      phone: selectedProfileCustomer.phone || '', 
                      email: selectedProfileCustomer.email || '', 
                      address: selectedProfileCustomer.address || '', 
                      hasGST: selectedProfileCustomer.gstRegistered ? 'Yes' : 'No', 
                      gstNo: selectedProfileCustomer.gstNumber || '', 
                      type: 'customer',
                      openingBalance: selectedProfileCustomer.openingBalance?.toString() || '0'
                    });
                    setSelectedProfileCustomer(null);
                    setIsCustomerModalOpen(true);
                  }}
                  className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white/50 rounded-xl hover:bg-white transition-all shadow-sm border border-indigo-100 flex items-center gap-1.5"
                >
                  <PencilLine className="w-3.5 h-3.5" />
                  Edit
                </button>
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 mb-4 rotate-3">
                  <User className="w-8 h-8 -rotate-3" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight text-center">{selectedProfileCustomer.name}</h2>
                <span className="mt-1 px-3 py-1 bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">Buyer / Customer</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                    <p className="text-sm font-bold text-slate-700">{selectedProfileCustomer.phone || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">GST NO.</p>
                    <p className="text-sm font-bold text-slate-700">{selectedProfileCustomer.gstNumber || 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Address</p>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{selectedProfileCustomer.address || 'No address provided'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {isCustomerModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsCustomerModalOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl w-full max-w-md z-[101] relative shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h2 className="text-xl font-black tracking-tight">{customerForm._id ? 'Edit Customer' : 'Enlist New Customer'}</h2>
                    <p className="text-blue-100 text-xs font-medium mt-1 opacity-90">Add buyer details for sales tracking</p>
                  </div>
                  <button onClick={() => setIsCustomerModalOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all text-white">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleCustomerSubmit} className="p-6 space-y-5 bg-slate-50/50">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Customer Name</label>
                  <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="e.g. Acme Inc." value={customerForm.name} onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Contact No.</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="+91..." value={customerForm.phone} onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">GST Registration</label>
                    <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner gap-1">
                        <button type="button" onClick={() => setCustomerForm({...customerForm, hasGST: 'Yes'})} className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all ${customerForm.hasGST === 'Yes' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Yes</button>
                        <button type="button" onClick={() => setCustomerForm({...customerForm, hasGST: 'No'})} className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all ${customerForm.hasGST === 'No' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>No</button>
                    </div>
                  </div>
                </div>
                {customerForm.hasGST === 'Yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-blue-600">GST / TAX ID Number</label>
                    <input type="text" required className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-inner uppercase" placeholder="22AAAAA0000A1Z5" value={customerForm.gstNo} onChange={e => setCustomerForm({ ...customerForm, gstNo: e.target.value })} />
                  </motion.div>
                )}
                {!customerForm._id && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Opening Balance / Purana Baki (₹)</label>
                    <input type="number" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="e.g. 5000 (Amount they owe)" value={customerForm.openingBalance} onChange={e => setCustomerForm({ ...customerForm, openingBalance: e.target.value })} />
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Leave 0 if no old dues</p>
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Address (Optional)</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="Full address" value={customerForm.address} onChange={e => setCustomerForm({ ...customerForm, address: e.target.value })} />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    Save Customer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Sales;
