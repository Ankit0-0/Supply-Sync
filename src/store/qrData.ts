"use client";
import { create } from "zustand";
import { produce } from "immer";

type qrData = {
  manufacturerName: string;
  source: string;
  time: string;
  date: Date;
  destination: string;
  batchNumber: number;
  batchInfo: string;
};

type QRDataStore = {
  qrData: qrData;
  setQRData: (data: qrData) => void;
  generated: boolean;
};

const initialState = {
  qrData: {
    manufacturerName: "",
    source: "",
    time: "",
    date: new Date(),
    destination: "",
    batchNumber: 0,
    batchInfo: "",
  },
  generated: false
};

export const useQRDataStore = create<QRDataStore>((set) => ({
  ...initialState,
  setQRData: (data: qrData) => {
    set((state) => ({
      qrData: data,
      generated: true
    }));
  },
}));
