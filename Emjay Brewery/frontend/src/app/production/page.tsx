'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import {
    Plus,
    Trash2,
    History,
    FlaskConical,
    Package,
    XCircle,
    ClipboardList,
    ArrowUpRight,
    ArrowDownLeft,
    ChevronDown,
    Database,
    AlertCircle,
    Search,
    Edit,
    Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import MonthYearFilter from '@/components/MonthYearFilter';

const Production = () => {
    const [currentTab, setCurrentTab] = useState<'ledger' | 'inventory'>('ledger');

    const [products, setProducts] = useState<any[]>([]);
    const [productions, setProductions] = useState<any[]>([]);
    const [bottleStock, setBottleStock] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedDateFilter, setSelectedDateFilter] = useState('');

    // Production Ledger State
    const [isProductionModalOpen, setIsProductionModalOpen] = useState(false);
    const [ledgerData, setLedgerData] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [productSearch, setProductSearch] = useState('');
    const [ledgerLoading, setLedgerLoading] = useState(false);
    const [editingProductionId, setEditingProductionId] = useState<string | null>(null);
    const [productionForm, setProductionForm] = useState({
        date: new Date().toISOString().split('T')[0],
        juiceType: '',
        quantityProduced: '',
        nameOfVerk: '',
        openingBalance: '0',
        bottleType: 'New'
    });

    // Inventory Management State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productForm, setProductForm] = useState({
        name: '',
        size: '',
        pricePerUnit: '',
        currentStock: '0',
        minStock: '10'
    });

    // Transfer to Branch State
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [branches, setBranches] = useState<any[]>([]);
    const [transferForm, setTransferForm] = useState({
        partyId: '',
        juiceType: '',
        quantity: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [itemRes, bottleRes, prodRes, partyRes] = await Promise.all([
                api.get('/products', { params: { month: selectedMonth, year: selectedYear, date: selectedDateFilter || undefined } }),
                api.get('/bottles/stock', { params: { month: selectedMonth, year: selectedYear } }),
                api.get('/production', { params: { month: selectedMonth, year: selectedYear } }),
                api.get('/parties')
            ]);
            setProducts(itemRes.data);
            setBottleStock(bottleRes.data);
            setProductions(prodRes.data);
            setBranches(partyRes.data.filter((p: any) => p.isBranch === true || (p.type?.toLowerCase() === 'customer' && p.name.toLowerCase().includes('branch'))));

            if (itemRes.data.length > 0 && !selectedProduct) {
                setSelectedProduct(itemRes.data[0]._id);
            }
        } catch (error) {
            toast.error('Could not load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [selectedMonth, selectedYear, selectedDateFilter]);

    const fetchLedger = async (productId: string) => {
        if (!productId) return;
        setLedgerLoading(true);
        try {
            const res = await api.get('/reports/production-stock', {
                params: { productId, month: selectedMonth, year: selectedYear }
            });
            const sorted = res.data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setLedgerData(sorted);
        } catch (error) {
            toast.error('Failed to load stock report');
        } finally {
            setLedgerLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProduct && currentTab === 'ledger') {
            fetchLedger(selectedProduct);
        }
    }, [selectedProduct, currentTab, selectedMonth, selectedYear]);

    const handleProductionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProductionId) {
                await api.put(`/production/${editingProductionId}`, productionForm);
                toast.success('Production entry updated');
            } else {
                await api.post('/production', productionForm);
                toast.success('Production entry added');
            }
            setIsProductionModalOpen(false);
            setEditingProductionId(null);
            setProductionForm({ date: new Date().toISOString().split('T')[0], juiceType: '', quantityProduced: '', nameOfVerk: '', openingBalance: '0', bottleType: 'New' });
            fetchInitialData();
            if (productionForm.juiceType === selectedProduct) fetchLedger(selectedProduct);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to save entry');
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/products', productForm);
            toast.success('Product added successfully');
            setIsProductModalOpen(false);
            setProductForm({ name: '', size: '', pricePerUnit: '', currentStock: '0', minStock: '10' });
            fetchInitialData();
        } catch (error) {
            toast.error('Failed to add product');
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm('Are you sure? This will remove the product and all its inventory records.')) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success('Product removed');
            fetchInitialData();
        } catch (error) {
            toast.error('Failed to remove product');
        }
    };

    const syncStock = async () => {
        try {
            const loadingToast = toast.loading('Synchronizing stock...');
            await api.post('/products/sync');
            toast.dismiss(loadingToast);
            toast.success('Stock synchronized');
            fetchInitialData();
        } catch (error) {
            toast.error('Sync failed');
        }
    };

    const deleteProductionEntry = async (id: string) => {
        if (!confirm('Delete this production entry? Bottles will be restored.')) return;
        try {
            await api.delete(`/production/${id}`);
            toast.success('Record deleted');
            fetchInitialData();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!transferForm.partyId) {
            toast.error('Please select a target branch');
            return;
        }

        try {
            await api.post('/branch-stock/transfer-in', {
                partyId: transferForm.partyId,
                juiceType: transferForm.juiceType,
                quantity: Number(transferForm.quantity),
                rate: 0,
                date: transferForm.date,
                description: 'Transfer from Production'
            });
            toast.success('Stock transferred to branch successfully!');
            setIsTransferModalOpen(false);
            setTransferForm({ partyId: '', juiceType: '', quantity: '', date: new Date().toISOString().split('T')[0] });
            fetchInitialData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Transfer failed');
        }
    };

    const openEditProduction = (p: any) => {
        setEditingProductionId(p._id);
        setProductionForm({
            date: new Date(p.date).toISOString().split('T')[0],
            juiceType: typeof p.juiceType === 'object' ? p.juiceType._id : p.juiceType,
            quantityProduced: p.quantityProduced.toString(),
            nameOfVerk: p.nameOfVerk || '',
            openingBalance: (p.openingBalance || 0).toString(),
            bottleType: p.bottleType || 'New'
        });
        setIsProductionModalOpen(true);
    };

    if (loading) return <div className="flex h-screen bg-white items-center justify-center font-bold text-gray-400">Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-6 md:p-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Production & Inventory</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage daily production and stock levels</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <MonthYearFilter
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            onFilterChange={(m, y) => { setSelectedMonth(m); setSelectedYear(y); setSelectedDateFilter(''); }}
                            selectedDate={selectedDateFilter}
                            onDateSelect={setSelectedDateFilter}
                        />
                        <div className="flex gap-3">
                            {currentTab === 'ledger' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTransferForm(prev => ({...prev, juiceType: selectedProduct}));
                                            setIsTransferModalOpen(true);
                                        }}
                                        className="bg-purple-50 text-purple-600 border border-purple-100 px-4 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-100 transition-all text-sm"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                        Transfer to Branch
                                    </button>
                                    <button
                                        onClick={() => setIsProductionModalOpen(true)}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95 text-sm"
                                    >
                                        <Plus className="w-5 h-5" />
                                        New Production
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={syncStock}
                                        className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-100 transition-all text-sm border border-emerald-100"
                                    >
                                        Sync Stock
                                    </button>
                                    <button
                                        onClick={() => setIsProductModalOpen(true)}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95 text-sm"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Product
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Level Tabs */}
                <div className="flex bg-white p-1 rounded-xl border border-gray-200 w-fit mb-10 shadow-sm">
                    <button
                        onClick={() => setCurrentTab('ledger')}
                        className={cn(
                            "px-8 py-2.5 rounded-lg text-xs font-semibold transition-all",
                            currentTab === 'ledger' ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Production Ledger
                    </button>
                    <button
                        onClick={() => setCurrentTab('inventory')}
                        className={cn(
                            "px-8 py-2.5 rounded-lg text-xs font-semibold transition-all",
                            currentTab === 'inventory' ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Stock Inventory
                    </button>
                </div>

                {currentTab === 'ledger' ? (
                    <>
                        <div className="flex flex-col lg:flex-row gap-6 mb-10 items-start">

                            {/* Compact Total Production Card */}
                            <div className="w-full lg:w-48 shrink-0 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Stock in Hand</p>
                                <h3 className={cn("text-2xl font-bold leading-none", products.reduce((acc, p) => acc + (p.currentStock || 0), 0) < 0 ? "text-red-600" : "text-emerald-600")}>
                                    {products.reduce((acc, p) => acc + (p.currentStock || 0), 0)}
                                    <span className="text-[10px] font-normal text-gray-400 ml-1">Units</span>
                                </h3>
                            </div>

                            {/* Product Selector Scroll */}
                            <div className="flex-1 w-full overflow-hidden">
                                <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
                                    {products
                                        .filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()))
                                        .map(p => (
                                            <button
                                                key={p._id}
                                                onClick={() => setSelectedProduct(p._id)}
                                                className={cn(
                                                    "shrink-0 w-32 p-3 rounded-xl border flex flex-col justify-between transition-all",
                                                    selectedProduct === p._id ? "bg-white border-blue-600 shadow-md ring-1 ring-blue-600" : "bg-white border-gray-200 hover:border-blue-300"
                                                )}
                                            >
                                                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1 truncate text-left">{p.name}</p>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-bold text-gray-900 leading-none">{p.currentStock || 0}</h3>
                                                    <FlaskConical className={cn(
                                                        "w-3 h-3",
                                                        selectedProduct === p._id ? "text-blue-600" : "text-gray-300"
                                                    )} />
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Ledger Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Database className="w-5 h-5" /></div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">
                                            {products.find(p => p._id === selectedProduct)?.name} Ledger
                                        </h3>
                                        <p className="text-xs text-gray-400 font-medium">Production history & sales impact</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider h-12 border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-3">Date</th>
                                            <th className="px-8 py-3">Details / Batch</th>
                                            <th className="px-8 py-3 text-center text-blue-600">IN (+)</th>
                                            <th className="px-8 py-3 text-center text-red-600">OUT (-)</th>
                                            <th className="px-8 py-3 text-center text-gray-900">Closing</th>
                                            <th className="px-8 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {ledgerLoading ? (
                                            <tr><td colSpan={6} className="p-16 text-center text-gray-400 font-medium animate-pulse">Loading Ledger...</td></tr>
                                        ) : (
                                            <>
                                                {/* Combine Production and Sales into a unified transaction list for the view */}
                                                {(() => {
                                                    const combined: any[] = [];
                                                    let runningStock = 0;

                                                    // We need to calculate running balance from all time to show correct closing
                                                    // but the report controller already gives us daily aggregated blocks.
                                                    // To keep it simple and satisfy "Actions" request, we will map 
                                                    // production entries and daily sales into the ledger rows.
                                                    
                                                    ledgerData.forEach((day: any) => {
                                                        // 1. Show Production Entries for this day
                                                        const dayProductions = productions.filter(p => {
                                                            const pDate = new Date(p.date).toISOString().split('T')[0];
                                                            const lDate = day.date;
                                                            const pId = typeof p.juiceType === 'object' ? p.juiceType?._id : p.juiceType;
                                                            return pDate === lDate && pId === selectedProduct;
                                                        });

                                                        dayProductions.forEach(p => {
                                                            combined.push({
                                                                _id: p._id,
                                                                date: p.date,
                                                                createdAt: p.createdAt || p.date,
                                                                details: p.nameOfVerk || 'Production Entry',
                                                                in: p.quantityProduced,
                                                                out: 0,
                                                                closing: '...', // Calculated below
                                                                type: 'production'
                                                            });
                                                        });

                                                        // 2. Show Sales for this day (Aggregate)
                                                        if (day.sales > 0) {
                                                            combined.push({
                                                                date: day.date,
                                                                createdAt: day.date,
                                                                details: 'Daily Sales',
                                                                in: 0,
                                                                out: day.sales,
                                                                closing: '...',
                                                                type: 'sales'
                                                            });
                                                        }
                                                        // 3. Show Transfers for this day (Aggregate)
                                                        if (day.transfers > 0) {
                                                            combined.push({
                                                                date: day.date,
                                                                createdAt: day.date,
                                                                details: 'Branch Transfer',
                                                                in: 0,
                                                                out: day.transfers,
                                                                closing: '...',
                                                                type: 'transfer'
                                                            });
                                                        }
                                                    });

                                                    // Re-calculate running balance for the display items based on ledgerData opening
                                                    // Actually, ledgerData is already sorted.
                                                    let currentBal = ledgerData.length > 0 ? ledgerData[0].openingStock : 0;
                                                    
                                                    // Calculate closing balances forward first by exact time
                                                    const combinedSortedForward = combined.sort((a,b) => {
                                                        const d1 = new Date(a.date).getTime() - new Date(b.date).getTime();
                                                        if (d1 === 0 && a.createdAt && b.createdAt) {
                                                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                                                        }
                                                        return d1;
                                                    });
                                                    const rowsWithClosing = combinedSortedForward.map(item => {
                                                        currentBal = currentBal + item.in - item.out;
                                                        return { ...item, closing: currentBal };
                                                    });

                                                    let displayRows = rowsWithClosing.reverse();
                                                    if (selectedDateFilter) {
                                                        displayRows = displayRows.filter(item => item.date.startsWith(selectedDateFilter));
                                                    }

                                                    // Then return descending for UI display (newest first)
                                                    const finalRows = displayRows.map((item, idx) => {
                                                        const row = (
                                                            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                                                <td className="px-8 py-4">
                                                                    <p className="font-semibold text-gray-700 text-sm">
                                                                        {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                    </p>
                                                                </td>
                                                                <td className="px-8 py-4">
                                                                    <span className={cn(
                                                                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2",
                                                                        item.type === 'production' ? "bg-blue-50 text-blue-600" : 
                                                                        item.type === 'transfer' ? "bg-purple-50 text-purple-600" : "bg-gray-100 text-gray-500"
                                                                    )}>{item.type}</span>
                                                                    <span className="text-xs text-gray-500 font-medium">{item.details}</span>
                                                                </td>
                                                                <td className="px-8 py-4 text-center">
                                                                    {item.in > 0 ? <span className="text-blue-600 font-bold text-sm">+{item.in}</span> : '-'}
                                                                </td>
                                                                <td className="px-8 py-4 text-center">
                                                                    {item.out > 0 ? <span className="text-red-600 font-bold text-sm">-{item.out}</span> : '-'}
                                                                </td>
                                                                <td className="px-8 py-4 text-center font-bold text-gray-900 text-sm">
                                                                    {item.closing}
                                                                </td>
                                                                <td className="px-8 py-4 text-right">
                                                                    {item.type === 'production' && (
                                                                        <div className="flex justify-end gap-2">
                                                                            <button 
                                                                                onClick={() => openEditProduction(productions.find(p => p._id === item._id))}
                                                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-blue-500 transition-all"
                                                                            >
                                                                                <Edit className="w-4 h-4" />
                                                                            </button>
                                                                            <button 
                                                                                onClick={() => deleteProductionEntry(item._id)}
                                                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                        return row;
                                                    });
                                                    
                                                    if (selectedDateFilter) {
                                                        const targetDate = new Date(selectedDateFilter).getTime();
                                                        let dayData = ledgerData.find((d: any) => d.date.startsWith(selectedDateFilter));
                                                        let opening = 0;
                                                        
                                                        if (dayData) {
                                                            opening = dayData.openingStock;
                                                        } else {
                                                            const beforeRecords = ledgerData.filter((d: any) => new Date(d.date).getTime() < targetDate);
                                                            if (beforeRecords.length > 0) {
                                                                opening = beforeRecords[beforeRecords.length - 1].closingStock;
                                                            } else if (ledgerData.length > 0) {
                                                                opening = ledgerData[0].openingStock;
                                                            }
                                                        }
                                                        
                                                        if (displayRows.length === 0) {
                                                            finalRows.push(
                                                                <tr key="closing-balance" className="bg-green-50/50 border-t border-b border-green-100">
                                                                    <td className="px-8 py-4">
                                                                        <p className="font-semibold text-gray-700 text-sm">
                                                                            {new Date(selectedDateFilter).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                        </p>
                                                                    </td>
                                                                    <td className="px-8 py-4">
                                                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2 bg-green-100 text-green-700">CLOSING</span>
                                                                        <span className="text-xs text-gray-500 font-medium">Closing Balance</span>
                                                                    </td>
                                                                    <td className="px-8 py-4 text-center">-</td>
                                                                    <td className="px-8 py-4 text-center">-</td>
                                                                    <td className="px-8 py-4 text-center font-bold text-gray-900 text-sm">{opening}</td>
                                                                    <td className="px-8 py-4 text-right"></td>
                                                                </tr>
                                                            );
                                                        }

                                                        finalRows.push(
                                                            <tr key="opening-balance" className="bg-amber-50/50 border-t border-b border-amber-100">
                                                                <td className="px-8 py-4">
                                                                    <p className="font-semibold text-gray-700 text-sm">
                                                                        {new Date(selectedDateFilter).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                    </p>
                                                                </td>
                                                                <td className="px-8 py-4">
                                                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2 bg-amber-100 text-amber-700">OPENING</span>
                                                                    <span className="text-xs text-gray-500 font-medium">Opening Balance</span>
                                                                </td>
                                                                <td className="px-8 py-4 text-center">-</td>
                                                                <td className="px-8 py-4 text-center">-</td>
                                                                <td className="px-8 py-4 text-center font-bold text-gray-900 text-sm">{opening}</td>
                                                                <td className="px-8 py-4 text-right"></td>
                                                            </tr>
                                                        );
                                                    } else if (ledgerData.length > 0) {
                                                        const firstRow = ledgerData[0];
                                                        finalRows.push(
                                                            <tr key="opening-balance" className="bg-amber-50/50 border-t border-b border-amber-100">
                                                                <td className="px-8 py-4">
                                                                    <p className="font-semibold text-gray-700 text-sm">
                                                                        {new Date(firstRow.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                    </p>
                                                                </td>
                                                                <td className="px-8 py-4">
                                                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2 bg-amber-100 text-amber-700">OPENING</span>
                                                                    <span className="text-xs text-gray-500 font-medium">Opening Balance</span>
                                                                </td>
                                                                <td className="px-8 py-4 text-center">-</td>
                                                                <td className="px-8 py-4 text-center">-</td>
                                                                <td className="px-8 py-4 text-center font-bold text-gray-900 text-sm">{firstRow.openingStock}</td>
                                                                <td className="px-8 py-4 text-right"></td>
                                                            </tr>
                                                        );
                                                    }
                                                    
                                                    return finalRows;
                                                })()}
                                                {ledgerData.length === 0 && (
                                                    <tr><td colSpan={6} className="p-16 text-center text-gray-400">No records found for this period.</td></tr>
                                                )}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-8">

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {products.map(p => (
                                    <div key={p._id} className="group bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                                <FlaskConical className="w-4 h-4" />
                                            </div>
                                            <div className="text-right flex items-center gap-2">
                                                <div>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Stock</p>
                                                    <p className={cn(
                                                        "text-lg font-bold leading-none",
                                                        p.currentStock <= p.minStock ? "text-red-500" : "text-gray-900"
                                                    )}>{p.currentStock}</p>
                                                </div>
                                                <button 
                                                    onClick={() => deleteProduct(p._id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 truncate" title={p.name}>{p.name}</h3>
                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                            <p className="text-[10px] font-bold text-gray-900">₹{p.pricePerUnit}</p>
                                            {p.currentStock <= p.minStock && (
                                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Low Stock" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Modals */}
                <AnimatePresence>
                    {isProductionModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsProductionModalOpen(false)} />
                            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-lg z-50 relative shadow-xl overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900">{editingProductionId ? 'Edit Production' : 'New Production Entry'}</h2>
                                    <button onClick={() => { setIsProductionModalOpen(false); setEditingProductionId(null); }} className="text-gray-400 hover:text-gray-600 transition-colors"><XCircle className="w-6 h-6" /></button>
                                </div>

                                <form onSubmit={handleProductionSubmit} className="p-6 space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center border border-blue-100 mb-2">
                                        <div className="text-center flex-1 border-r border-blue-100">
                                            <p className="text-[10px] font-bold text-blue-400 uppercase">Avail. Bottles</p>
                                            <p className="text-lg font-black text-blue-600">{bottleStock?.availableEmptyBottles || 0}</p>
                                        </div>
                                        <div className="text-center flex-1">
                                            <p className="text-[10px] font-bold text-blue-400 uppercase">Avail. Caps</p>
                                            <p className="text-lg font-black text-blue-600">{bottleStock?.availableCaps || 0}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">Date</label>
                                            <input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" value={productionForm.date} onChange={e => setProductionForm({ ...productionForm, date: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">Product</label>
                                            <select required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" value={productionForm.juiceType} onChange={e => setProductionForm({ ...productionForm, juiceType: e.target.value })}>
                                                <option value="">Select...</option>
                                                {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">Bottle Type</label>
                                            <select required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" value={productionForm.bottleType || 'New'} onChange={e => setProductionForm({ ...productionForm, bottleType: e.target.value })}>
                                                <option value="New">New Bottles</option>
                                                <option value="Old">Old Bottles</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">Quantity (Units)</label>
                                            <input type="number" required className="w-full bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-lg font-bold text-blue-600 outline-none focus:border-blue-500" placeholder="0" value={productionForm.quantityProduced} onChange={e => setProductionForm({ ...productionForm, quantityProduced: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500">Batch Name</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" placeholder="Batch A" value={productionForm.nameOfVerk} onChange={e => setProductionForm({ ...productionForm, nameOfVerk: e.target.value })} />
                                    </div>

                                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                                        Save Record
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}

                    {isProductModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)} />
                            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-lg z-50 relative shadow-xl overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                                    <button type="button" onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><XCircle className="w-6 h-6" /></button>
                                </div>

                                <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500">Product Name</label>
                                        <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" placeholder="Classic Juice" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">Size (ml)</label>
                                            <input type="number" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" placeholder="500" value={productForm.size} onChange={e => setProductForm({ ...productForm, size: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">MRP (₹)</label>
                                            <input type="number" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold outline-none focus:border-blue-500" placeholder="0" value={productForm.pricePerUnit} onChange={e => setProductForm({ ...productForm, pricePerUnit: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500">Initial Stock</label>
                                            <input type="number" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold" value={productForm.currentStock} onChange={e => setProductForm({ ...productForm, currentStock: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-red-500">Low Stock Alert at</label>
                                            <input type="number" required className="w-full bg-red-50 border border-red-100 rounded-lg px-4 py-2 text-sm font-bold text-red-600 outline-none" value={productForm.minStock} onChange={e => setProductForm({ ...productForm, minStock: e.target.value })} />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">Create Product</button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            {/* Transfer to Branch Modal */}
            {isTransferModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsTransferModalOpen(false)} />
                    <div className="bg-white rounded-2xl w-full max-w-md z-50 relative shadow-xl overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <ArrowUpRight className="w-5 h-5 text-purple-600" />
                                Transfer to Branch
                            </h2>
                            <button onClick={() => setIsTransferModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleTransfer} className="p-6 space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600 uppercase">Target Branch</label>
                                <select 
                                    className="input-field w-full border border-gray-300 rounded-lg p-2.5" 
                                    required 
                                    value={transferForm.partyId} 
                                    onChange={e => setTransferForm({...transferForm, partyId: e.target.value})}
                                >
                                    <option value="" disabled>Select Branch</option>
                                    {branches.map(b => (
                                        <option key={b._id} value={b._id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600 uppercase">Product</label>
                                <select 
                                    className="input-field w-full border border-gray-300 rounded-lg p-2.5" 
                                    required 
                                    value={transferForm.juiceType} 
                                    onChange={e => setTransferForm({...transferForm, juiceType: e.target.value})}
                                >
                                    <option value="" disabled>Select Product</option>
                                    {products.map(p => (
                                        <option key={p._id} value={p._id}>{p.name} (Available: {p.currentStock})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600 uppercase">Quantity (Units)</label>
                                <input 
                                    type="number" 
                                    required 
                                    min="1"
                                    className="input-field w-full border border-gray-300 rounded-lg p-2.5" 
                                    value={transferForm.quantity} 
                                    onChange={e => setTransferForm({...transferForm, quantity: e.target.value})} 
                                    placeholder="Enter quantity to transfer"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600 uppercase">Transfer Date</label>
                                <input 
                                    type="date" 
                                    required 
                                    className="input-field w-full border border-gray-300 rounded-lg p-2.5" 
                                    value={transferForm.date} 
                                    onChange={e => setTransferForm({...transferForm, date: e.target.value})} 
                                />
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-all active:scale-[0.98]">
                                    Confirm Transfer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            </main>
        </div>
    );
};

export default Production;
