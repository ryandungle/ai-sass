"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { MAX_FREE_COUNTS } from "@/lib/serverConstant";
import { Progress } from "../ui/progress";
import { UpgradeButton } from "./UpgradeButton";
import { getApiLimitCount } from "@/lib/api-limit";
import { useFreeCounterStore } from "@/hooks/store";

export const FreeCounter = () => {
  const apiLimitCount = useFreeCounterStore((state) => state.apiLimitCount);
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <UpgradeButton />
        </CardContent>
      </Card>
    </div>
  );
};
