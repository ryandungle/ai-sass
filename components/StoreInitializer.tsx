"use client";

import {
  FreeCounterStore,
  ProModalStore,
  useFreeCounterStore,
  useProModalStore,
} from "@/hooks/store";
import { useEffect, useRef } from "react";

function StoreInitializer({
  freeCounterStore,
  proModalStore,
}: {
  freeCounterStore: FreeCounterStore;
  proModalStore: ProModalStore;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useFreeCounterStore.setState(freeCounterStore);
    useProModalStore.setState(proModalStore);
    initialized.current = true;
  }
  useEffect(() => {
    useFreeCounterStore.setState(freeCounterStore);
  }, [freeCounterStore]);
  return null;
}

export default StoreInitializer;
