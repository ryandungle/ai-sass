"use client";
import React from "react";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/ProModal";

export const UpgradeButton = () => {
  const { openModal } = useProModal();
  return (
    <Button onClick={openModal} variant="premium" className="w-full">
      Upgrade
      <Zap className="w-4 h-4 ml-2 fill-white" />
    </Button>
  );
};
