"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Globe, 
  Search, 
  LineChart, 
  Settings, 
  FileCheck, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Target,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const seoPages = [
  { path: "/", score: 98, status: "Healthy", keyword: "Taxi Booking Udaipur" },
  { path: "/about", score: 92, status: "Needs Meta", keyword: "Best Travel Agency Rajasthan" },
  { path: "/udaipur-to-jaipur-taxi", score: 95, status: "Healthy", keyword: "Udaipur to Jaipur Cab" },
  { path: "/jodhpur-sightseeing-tour", score: 88, status: "Low Content", keyword: "Jodhpur Tour Package" },
];

export default function SEOManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">SEO Management</h1>
          <p className="text-white/60">Monitor and optimize your platform's search engine visibility.</p>
        </div>

        {/* SEO Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-900 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-white/40 text-sm">Avg. SEO Score</p>
                <h3 className="text-2xl font-bold text-white">94%</h3>
              </div>
            </div>
          </div>
          <div className="bg-navy-900 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gold-500/10 rounded-xl">
                <Target className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <p className="text-white/40 text-sm">Targeted Keywords</p>
                <h3 className="text-2xl font-bold text-white">124</h3>
              </div>
            </div>
          </div>
          <div className="bg-navy-900 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-white/40 text-sm">Indexed Pages</p>
                <h3 className="text-2xl font-bold text-white">86</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Programmatic SEO List */}
        <div className="bg-navy-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Active SEO Pages</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                <FileCheck className="w-4 h-4 mr-2" /> Generate Sitemap
              </Button>
              <Button size="sm" className="bg-gold-600 hover:bg-gold-700 text-white">
                Add SEO Route
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 text-xs uppercase tracking-widest bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 font-semibold">Page Path</th>
                  <th className="px-6 py-4 font-semibold">Target Keyword</th>
                  <th className="px-6 py-4 font-semibold">SEO Score</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {seoPages.map((page, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white font-medium">
                        {page.path}
                        <ExternalLink className="w-3 h-3 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">{page.keyword}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              page.score > 90 ? "bg-green-500" : "bg-gold-500"
                            }`} 
                            style={{ width: `${page.score}%` }} 
                          />
                        </div>
                        <span className="text-white text-sm font-bold">{page.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={
                        page.status === "Healthy" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                        "bg-gold-500/10 text-gold-500 border-gold-500/20"
                      }>
                        {page.status === "Healthy" ? <FileCheck className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                        {page.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Tools Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-navy-900 border border-white/5 p-8 rounded-3xl group hover:border-gold-600/30 transition-all">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Globe className="text-gold-500" /> Domain Health
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Your robots.txt and sitemap.xml are correctly configured and reachable by search engine crawlers.
            </p>
            <div className="flex gap-3">
              <Badge className="bg-green-500 text-white">SSL: Active</Badge>
              <Badge className="bg-green-500 text-white">Sitemap: Valid</Badge>
              <Badge className="bg-green-500 text-white">Canonical: Set</Badge>
            </div>
          </div>
          <div className="bg-navy-900 border border-white/5 p-8 rounded-3xl group hover:border-gold-600/30 transition-all">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <LineChart className="text-gold-500" /> Search Console
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Connect your Google Search Console to track real-time impressions and keyword rankings.
            </p>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 h-12 px-6 rounded-xl">
              Connect GSC <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
