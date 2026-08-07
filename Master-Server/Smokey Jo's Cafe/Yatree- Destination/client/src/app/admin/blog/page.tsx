"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Plus, 
  Search, 
  FileText, 
  Edit, 
  Trash2, 
  Eye, 
  Globe, 
  Lock,
  Loader2,
  Image as ImageIcon,
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
  featuredImage: string;
}

export default function BlogCMSPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/blogs`);
      const data = await response.json();
      if (data.status === "success") {
        setBlogs(data.data.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Blog CMS</h1>
            <p className="text-white/60">Create and manage SEO-optimized travel guides and news.</p>
          </div>
          <Button className="bg-gold-600 hover:bg-gold-700 text-white h-12 px-6">
            <Plus className="w-5 h-5 mr-2" /> Write New Post
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input 
            placeholder="Search blogs by title or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-navy-900 border-white/5 text-white pl-12 h-14 rounded-2xl"
          />
        </div>

        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-gold-500 mx-auto mb-4" />
            <p className="text-white/60">Loading blog posts...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center bg-navy-900 border border-white/5 rounded-3xl">
            <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Posts Yet</h3>
            <p className="text-white/60">Start sharing your travel expertise with the world.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog._id} 
                className="group bg-navy-900 border border-white/5 rounded-3xl overflow-hidden hover:border-gold-600/30 transition-all duration-300"
              >
                <div className="relative h-48 bg-white/5">
                  <div className="absolute inset-0 flex items-center justify-center text-white/10">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-navy-950/80 backdrop-blur-md rounded-xl text-white/60 hover:text-white transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-500/10 backdrop-blur-md rounded-xl text-red-400 hover:bg-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className={blog.isPublished ? "bg-green-500 text-white" : "bg-gold-600 text-white"}>
                      {blog.isPublished ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                      {blog.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-gold-600/10 text-gold-500 border-gold-600/20">
                      {blog.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-gold-500 transition-colors">
                      {blog.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10 p-0 h-auto">
                      View Details <Eye className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
