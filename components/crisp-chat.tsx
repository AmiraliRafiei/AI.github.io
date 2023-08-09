"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("01886522-72f6-496f-975a-aa30b7fd15d2");
  }, []);

  return null;
}