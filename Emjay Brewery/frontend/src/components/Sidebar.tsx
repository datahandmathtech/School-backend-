'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FlaskConical, 
  ShoppingCart, 
  FileText, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  User,
  Monitor,
  Wine,
  ShoppingBag,
  CreditCard,
  Wallet,
  ShieldCheck,
  ClipboardList,
  Landmark
} from 'lucide-react';

import { cn } from '@/utils/cn';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Board', path: '/live-board', icon: Monitor },
    { name: 'Bottles', path: '/bottles', icon: Wine },
    { name: 'Production', path: '/production', icon: FlaskConical },
    { name: 'Purchases', path: '/purchases', icon: ShoppingBag },
    { name: 'Branch Stock', path: '/branch-stock', icon: Package },
    { name: 'Sales', path: '/sales', icon: ShoppingCart },
    { name: 'Cash Book', path: '/cash-book', icon: Wallet },
    { name: 'Bank Book', path: '/bank-book', icon: Landmark },
    { name: 'Party Ledgers', path: '/party-ledgers', icon: CreditCard },
    { name: 'Staff', path: '/staff', icon: ShieldCheck },
    { name: 'Manage Admins', path: '/manage-admin', icon: ShieldCheck },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (user?.role === 'branch_admin') {
      return ['/branch-stock', '/sales', '/cash-book'].includes(item.path);
    }
    return true; // Admin and others see all
  });

  const getMenuName = (item: any) => {
    if (user?.role === 'branch_admin' && item.path === '/branch-stock') {
      return user?.branchName || 'My Branch';
    }
    return item.name;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Toggle (Mobile) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside 
        className={cn(
          "fixed top-0 left-0 h-full z-40 bg-white border-r border-gray-200 transition-all duration-300 lg:flex flex-col shadow-sm",
          isCollapsed ? "w-20" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-white">
              <img src="/Logo.jpg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-none">Emjay</span>
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mt-1">Brewery</span>
              </div>
            )}
          </div>
        </div>

        {/* User */}
        {!isCollapsed && (
          <div className="p-4 m-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Admin'}</p>
              <p className="text-[9px] text-gray-500 font-medium uppercase">{user?.role || 'Manager'}</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto pb-4 custom-scrollbar">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                pathname === item.path 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap">{getMenuName(item)}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50/30">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-white transition-all"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!isCollapsed && <span className="text-xs font-semibold">Collapse</span>}
          </button>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all font-semibold"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="text-xs">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
