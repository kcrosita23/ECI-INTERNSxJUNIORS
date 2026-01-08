import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/* ================= SUPABASE SETUP ================= */
const SUPABASE_URL = "https://htoeodzdxgtkizfxtlwd.supabase.co"; // replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b2VvZHpkeGd0a2l6Znh0bHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDcxMDAsImV4cCI6MjA4MzM4MzEwMH0.ljZepHH7ohU83FZRfmbqULMJBEfyMOoSUaHbT3ADxv4"; // replace with your anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Contact {
  id: number;
  full_name: string;
  phone: string;
  country_iso: string;
  email: string;
  message: string;
  created_at: string;
}

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<Contact>("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
    } else if (data) {
      setContacts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();

    // Optional: auto-refresh every 10 seconds
    const interval = setInterval(fetchContacts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-semibold text-white mb-6">
        Contacts Submissions
      </h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-white">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-white border-collapse border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="px-4 py-2 border border-slate-700">ID</th>
                <th className="px-4 py-2 border border-slate-700">Name</th>
                <th className="px-4 py-2 border border-slate-700">Phone</th>
                <th className="px-4 py-2 border border-slate-700">Country</th>
                <th className="px-4 py-2 border border-slate-700">Email</th>
                <th className="px-4 py-2 border border-slate-700">Message</th>
                <th className="px-4 py-2 border border-slate-700">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800">
                  <td className="px-4 py-2 border border-slate-700">{c.id}</td>
                  <td className="px-4 py-2 border border-slate-700">{c.full_name}</td>
                  <td className="px-4 py-2 border border-slate-700">{c.phone}</td>
                  <td className="px-4 py-2 border border-slate-700">{c.country_iso}</td>
                  <td className="px-4 py-2 border border-slate-700">{c.email}</td>
                  <td className="px-4 py-2 border border-slate-700">{c.message}</td>
                  <td className="px-4 py-2 border border-slate-700">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
