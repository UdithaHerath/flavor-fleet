import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, MapPin } from "lucide-react";

interface Address {
  id: string;
  label: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("user_id", user!.id)
      .single();
    if (data) {
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
    }
  };

  const fetchAddresses = async () => {
    const { data } = await supabase
      .from("delivery_addresses")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    if (data) setAddresses(data);
  };

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("user_id", user!.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile saved" });
    }
  };

  const addAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("delivery_addresses").insert({
      user_id: user!.id,
      ...addressForm,
      is_default: addresses.length === 0,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setShowAddressForm(false);
      setAddressForm({ label: "Home", address_line1: "", address_line2: "", city: "", state: "", zip_code: "" });
      fetchAddresses();
      toast({ title: "Address added" });
    }
  };

  const deleteAddress = async (id: string) => {
    await supabase.from("delivery_addresses").delete().eq("id", id);
    fetchAddresses();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-display font-bold mb-8">My Profile</h1>

        {/* Profile Info */}
        <section className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-display font-bold mb-4">Personal Info</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </section>

        {/* Addresses */}
        <section className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold">Delivery Addresses</h2>
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>

          {showAddressForm && (
            <form onSubmit={addAddress} className="space-y-3 mb-4 p-4 bg-muted rounded-xl">
              <input
                placeholder="Label (Home, Work...)"
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <input
                placeholder="Address line 1"
                value={addressForm.address_line1}
                onChange={(e) => setAddressForm({ ...addressForm, address_line1: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <input
                placeholder="Address line 2 (optional)"
                value={addressForm.address_line2}
                onChange={(e) => setAddressForm({ ...addressForm, address_line2: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  placeholder="City"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  placeholder="State"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  placeholder="ZIP"
                  value={addressForm.zip_code}
                  onChange={(e) => setAddressForm({ ...addressForm, zip_code: e.target.value })}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90"
              >
                Save Address
              </button>
            </form>
          )}

          {addresses.length === 0 && !showAddressForm && (
            <p className="text-sm text-muted-foreground">No saved addresses yet.</p>
          )}

          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-start gap-3 p-3 bg-muted rounded-xl">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{addr.label}</span>
                    {addr.is_default && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {addr.address_line1}
                    {addr.address_line2 && `, ${addr.address_line2}`}
                    , {addr.city}, {addr.state} {addr.zip_code}
                  </p>
                </div>
                <button onClick={() => deleteAddress(addr.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
