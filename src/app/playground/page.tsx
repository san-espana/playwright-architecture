"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

// SVG icon placeholders (copied from page.tsx)
const Play = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><polygon points="5,3 19,12 5,21" fill="currentColor" /></svg>
);
const ExternalLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const FileText = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/></svg>
);
const Settings = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg>
);
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/></svg>
);
const Database = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/><path d="M21 5v6c0 1.657-4.03 3-9 3s-9-1.343-9-3V5" stroke="currentColor" strokeWidth="2"/><path d="M21 11v6c0 1.657-4.03 3-9 3s-9-1.343-9-3v-6" stroke="currentColor" strokeWidth="2"/></svg>
);
const Zap = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
);

// New icons
const Eye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOff = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.06 18.06 0 0 1 4.77-5.36M2 2l20 20M9.91 9.91a3 3 0 1 0 4.24 4.24"/></svg>
);
const Clipboard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
);
// Edit icon
const Edit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
// Trash icon
const Trash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

// Utility function for className merging (copied from page.tsx)
function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Button component (copied from page.tsx)
function Button({ className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-green-500 text-black font-semibold text-lg py-4 shadow-lg",
        "hover:scale-105 hover:shadow-2xl hover:shadow-green-400/40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Card components (copied from page.tsx)
function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border bg-gray-900/80 text-card-foreground shadow-sm border-gray-700 transition-all duration-300 group", className)} {...props} />;
}
function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}
function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />;
}
function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

// Define the API Key interface to match your Supabase table
interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  type: string;
  usage: number;
  showKey: boolean;
  isEditing: boolean;
  editedName: string;
  editedType: string;
}

export default function PlaygroundPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyType, setNewKeyType] = useState("dev");
  const [keyToDeleteId, setKeyToDeleteId] = useState<string | null>(null);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "update">("success");

  // Helper function to map short type to full word
  const mapTypeToFullWord = (shortType: string) => {
    switch (shortType.toLowerCase()) {
      case "dev": return "Development";
      case "prod": return "Production";
      case "test": return "Testing";
      case "inactive": return "Inactive";
      default: return shortType; // Fallback
    }
  };

  // Helper function to map full word to short type
  const mapFullWordToType = (fullWord: string) => {
    switch (fullWord.toLowerCase()) {
      case "development": return "dev";
      case "production": return "prod";
      case "testing": return "test";
      case "inactive": return "inactive";
      default: return fullWord; // Fallback
    }
  };

  // Helper function to check if a key is inactive
  const isKeyInactive = (key: ApiKey) => key.usage >= 1000 || key.type === "inactive";

  // Sort API keys: active keys first (newest to oldest), then inactive keys
  const sortedApiKeys = [...apiKeys].sort((a, b) => {
    const aInactive = isKeyInactive(a);
    const bInactive = isKeyInactive(b);
    
    if (aInactive && !bInactive) return 1;
    if (!aInactive && bInactive) return -1;
    
    // For active keys, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const showToastNotification = (message: string, type: "success" | "error" | "update" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch API keys from Supabase on component mount
  useEffect(() => {
    const fetchKeys = async () => {
      const { data, error } = await supabase.from('api_keys').select('*');
      if (error) {
        console.error("Error fetching API keys:", error);
        showToastNotification("Failed to fetch API keys.", "error");
      } else {
        setApiKeys(data.map((key: any) => {
          const usage = key.usage || 0;
          const isInactive = usage >= 1000;
          return {
            id: key.id,
            name: key.name,
            key: key.key,
            createdAt: key.created_at,
            type: isInactive ? "inactive" : mapFullWordToType(key.type),
            usage: usage,
            showKey: false,
            isEditing: false,
            editedName: key.name,
            editedType: isInactive ? "inactive" : mapFullWordToType(key.type),
          };
        }));
      }
    };
    fetchKeys();
  }, []);

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(prevKeys =>
      prevKeys.map(key =>
        key.id === id ? { ...key, showKey: !key.showKey } : key
      )
    );
  };

  const copyKeyToClipboard = (keyToCopy: string) => {
    navigator.clipboard.writeText(keyToCopy);
    showToastNotification("API Key copied to clipboard!");
  };

  const generateDummyKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'JBK-Key-'; // Standardized prefix
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleCreateNewKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      showToastNotification("Key Name cannot be empty.", "error");
      return;
    }

    const newKey = {
      name: newKeyName,
      type: mapTypeToFullWord(newKeyType), // Convert selected type to full word for DB
      key: generateDummyKey(),
      created_at: new Date().toISOString(),
      usage: 0,
    };
    const { data, error } = await supabase.from('api_keys').insert([newKey]).select();
    if (error) {
      console.error("Error creating new API key:", error);
      showToastNotification("Failed to create API key.", "error");
    } else if (data) {
      setApiKeys(prevKeys => [...prevKeys, {
        id: data[0].id,
        name: data[0].name,
        key: data[0].key,
        createdAt: data[0].created_at,
        type: mapFullWordToType(data[0].type), // Convert full word from DB to short type
        usage: data[0].usage,
        showKey: false,
        isEditing: false,
        editedName: data[0].name,
        editedType: mapFullWordToType(data[0].type), // Convert full word from DB to short type
      }]);
      setNewKeyName("");
      setNewKeyType("dev");
      setShowCreateModal(false);
      showToastNotification("API Key created successfully!");
    }
  };

  const handleEditClick = (id: string) => {
    const key = apiKeys.find(k => k.id === id);
    if (key && !isKeyInactive(key)) {
      setApiKeys(prevKeys =>
        prevKeys.map(key =>
          key.id === id ? { ...key, isEditing: true, editedName: key.name, editedType: key.type } : key
        )
      );
    }
  };

  const handleNameChange = (id: string, newName: string) => {
    setApiKeys(prevKeys =>
      prevKeys.map(key =>
        key.id === id ? { ...key, editedName: newName } : key
      )
    );
  };

  const handleTypeChange = (id: string, newType: string) => {
    setApiKeys(prevKeys =>
      prevKeys.map(key =>
        key.id === id ? { ...key, editedType: newType } : key
      )
    );
  };

  const handleKeyDown = async (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      const keyToUpdate = apiKeys.find(key => key.id === id);
      if (keyToUpdate) {
        const { error } = await supabase.from('api_keys').update({ name: keyToUpdate.editedName, type: mapTypeToFullWord(keyToUpdate.editedType) }).eq('id', id);
        if (error) {
          console.error("Error updating API key:", error);
          showToastNotification("Failed to update API key.", "error");
        } else {
          setApiKeys(prevKeys =>
            prevKeys.map(key =>
              key.id === id ? { ...key, name: key.editedName, type: key.editedType, isEditing: false } : key
            )
          );
          showToastNotification("API Key updated successfully!", "update");
        }
      }
    } else if (e.key === "Escape") {
      setApiKeys(prevKeys =>
        prevKeys.map(key =>
          key.id === id ? { ...key, isEditing: false } : key
        )
      );
      showToastNotification("Edit cancelled.", "update");
    }
  };

  const handleDeleteClick = (id: string) => {
    const key = apiKeys.find(k => k.id === id);
    if (key && !isKeyInactive(key)) {
      setKeyToDeleteId(id);
      setShowDeleteConfirmModal(true);
    }
  };

  const confirmDelete = async () => {
    if (keyToDeleteId) {
      const key = apiKeys.find(k => k.id === keyToDeleteId);
      if (key && !isKeyInactive(key)) {
        const { error } = await supabase.from('api_keys').delete().eq('id', keyToDeleteId);
        if (error) {
          console.error("Error deleting API key:", error);
          showToastNotification("Failed to delete API key.", "error");
        } else {
          setApiKeys(prevKeys => prevKeys.filter(key => key.id !== keyToDeleteId));
          setShowDeleteConfirmModal(false);
          setKeyToDeleteId(null);
          showToastNotification("API Key deleted successfully!", "error");
        }
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setKeyToDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12">
      <header className="flex items-center space-x-4 mb-8">
        <Database className="h-8 w-8 text-playwright-green" />
        <h1 className="text-3xl font-bold">API Keys</h1>
      </header>

      <p className="text-gray-400 mb-8">
        Manage your API keys to authenticate requests to the JBK API. Keep your keys secure and never share them publicly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-800/80 border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-playwright-green" />
              <CardTitle className="text-lg">Total Keys</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{apiKeys.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/80 border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-playwright-green" />
              <CardTitle className="text-lg">Total Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{apiKeys.reduce((sum, key) => sum + key.usage, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/80 border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-playwright-green" />
              <CardTitle className="text-lg">Active Keys</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{apiKeys.filter(key => !isKeyInactive(key)).length}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
        Your API Keys
        <Button onClick={() => setShowCreateModal(true)} className="bg-playwright-green hover:bg-playwright-green/90 text-black font-semibold text-base px-4 py-2 rounded-lg">
          + Create New Key
        </Button>
      </h2>

      <div className="overflow-x-auto bg-gray-800/80 rounded-lg border border-gray-700">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="px-4 py-3 font-semibold text-gray-300">Name</th>
              <th className="px-4 py-3 font-semibold text-gray-300">Type</th>
              <th className="px-4 py-3 font-semibold text-gray-300">Usage</th>
              <th className="px-4 py-3 font-semibold text-gray-300">Key</th>
              <th className="px-4 py-3 font-semibold text-gray-300">Last Used</th>
              <th className="px-4 py-3 font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedApiKeys.map((key) => {
              const inactive = isKeyInactive(key);
              return (
                <tr 
                  key={key.id} 
                  className={cn(
                    "border-t border-gray-700 hover:bg-gray-700/30",
                    inactive && "opacity-60"
                  )}
                >
                  <td className="px-4 py-3">
                    {key.isEditing ? (
                      <input
                        type="text"
                        value={key.editedName}
                        onChange={(e) => handleNameChange(key.id, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, key.id)}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white placeholder-gray-500 focus:outline-none focus:border-playwright-green"
                      />
                    ) : (
                      key.name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {key.isEditing ? (
                      <select
                        value={key.editedType}
                        onChange={(e) => handleTypeChange(key.id, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, key.id)}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:outline-none focus:border-playwright-green"
                      >
                        <option value="dev">Development</option>
                        <option value="prod">Production</option>
                        <option value="test">Testing</option>
                      </select>
                    ) : (
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-semibold",
                        key.type === "dev" && "bg-green-800/30 text-green-300",
                        key.type === "prod" && "bg-red-800/30 text-red-300",
                        key.type === "test" && "bg-yellow-800/30 text-yellow-300",
                        key.type === "inactive" && "bg-gray-800/30 text-gray-300"
                      )}>
                        {key.type.charAt(0).toUpperCase() + key.type.slice(1)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-semibold",
                      inactive && "text-gray-400"
                    )}>
                      {key.usage}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-300">
                    {key.showKey ? key.key : key.key.substring(0, 10) + '************************'}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{key.createdAt.split('T')[0]}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button onClick={() => toggleKeyVisibility(key.id)} className="text-gray-400 hover:text-playwright-green cursor-pointer" title="Show/Hide Key">
                      {key.showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button onClick={() => copyKeyToClipboard(key.key)} className="text-gray-400 hover:text-playwright-green cursor-pointer" title="Copy Key"><Clipboard className="h-4 w-4" /></button>
                    {!inactive && (
                      <>
                        <button onClick={() => handleEditClick(key.id)} className="text-gray-400 hover:text-playwright-green cursor-pointer" title="Edit Key">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteClick(key.id)} className="text-gray-400 hover:text-playwright-green cursor-pointer" title="Delete Key">
                          <Trash className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="text-center text-gray-500 text-sm mt-8">
        Keep your API keys secure. Never share them in client-side code or public repositories.
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <div className={cn(
          "fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white z-50 transform transition-transform duration-300 ease-out",
          toastType === "success" && "bg-green-600",
          toastType === "error" && "bg-red-600",
          toastType === "update" && "bg-blue-600"
        )}>
          {toastMessage}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative border border-gray-700">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-4">Create New API Key</h3>
            <p className="text-gray-400 mb-6">Create a new API key for your application. Choose a descriptive name and environment type.</p>
            <form onSubmit={handleCreateNewKey}>
              <div className="mb-4">
                <label htmlFor="keyName" className="block text-gray-300 text-sm font-semibold mb-2">Key Name</label>
                <input
                  type="text"
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-playwright-green"
                  placeholder="Enter the key name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="environment" className="block text-gray-300 text-sm font-semibold mb-2">Environment</label>
                <select
                  id="environment"
                  value={newKeyType}
                  onChange={(e) => setNewKeyType(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-playwright-green"
                >
                  <option value="dev">Development</option>
                  <option value="prod">Production</option>
                  <option value="test">Testing</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-playwright-green hover:bg-playwright-green/90 text-black font-semibold py-2 rounded-lg">
                Create API Key
              </Button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative border border-gray-700">
            <button onClick={cancelDelete} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this API key? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-lg text-gray-400 border border-gray-600 hover:bg-gray-700">
                Cancel
              </button>
              <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 