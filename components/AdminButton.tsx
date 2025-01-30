"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { useState } from "react";

export function AdminButton() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm"
        onClick={() => setShowAdmin(true)}
      >
        <Settings className="h-4 w-4 text-amber-100" />
      </Button>
      <AdminPanel open={showAdmin} onOpenChange={setShowAdmin} />
    </>
  );
}