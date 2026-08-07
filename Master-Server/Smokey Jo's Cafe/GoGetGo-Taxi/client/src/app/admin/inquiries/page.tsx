"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  MessageSquare, 
  Search, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  Trash2, 
  User, 
  Mail, 
  Phone,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/inquiries`);
      const data = await response.json();
      if (data.status === "success") {
        setInquiries(data.data.inquiries);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Inquiry Management</h1>
          <p className="text-white/60">Respond to customer questions, callback requests, and feedback.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input 
            placeholder="Search inquiries by customer name or subject..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-navy-900 border-white/5 text-white pl-12 h-14 rounded-2xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-gold-500 mx-auto mb-4" />
              <p className="text-white/60">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-20 text-center bg-navy-900 border border-white/5 rounded-3xl">
              <MessageSquare className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Inquiries Found</h3>
              <p className="text-white/60">All caught up! No new messages at the moment.</p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div 
                key={inquiry._id} 
                className="group bg-navy-900 border border-white/5 rounded-2xl p-6 hover:border-gold-600/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500 font-bold">
                          {inquiry.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{inquiry.name}</h3>
                          <p className="text-xs text-white/40 uppercase tracking-widest">{inquiry.subject}</p>
                        </div>
                      </div>
                      <Badge className={
                        inquiry.status === "New" ? "bg-gold-600 text-white" :
                        inquiry.status === "In Progress" ? "bg-blue-500 text-white" :
                        "bg-green-500 text-white"
                      }>
                        {inquiry.status}
                      </Badge>
                    </div>

                    <p className="text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl italic">
                      "{inquiry.message}"
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Mail className="w-4 h-4 text-gold-500" /> {inquiry.email || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Phone className="w-4 h-4 text-gold-500" /> {inquiry.phone}
                      </div>
                      <div className="flex items-center gap-2 text-white/40">
                        <Clock className="w-4 h-4" /> {new Date(inquiry.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2 justify-end">
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-gold-600 hover:text-white">
                      <CheckCircle className="w-4 h-4 mr-2" /> Mark Resolved
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="bg-white/5 border-white/10 text-white/60">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-red-500/10 border-white/10 text-red-400 hover:bg-red-500 hover:text-white">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
