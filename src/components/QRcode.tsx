"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useQRDataStore } from "@/store/qrData";
import { motion } from "framer-motion";

type qrData = {
  manufacturerName: string;
  source: string;
  time: string;
  date: Date;
  destination: string;
  batchNumber: number;
  batchInfo: string;
};

type Props = {};

function QRcode({}: Props) {
  const [src, setSrc] = useState<string>("");

  const qrData = useQRDataStore((state) => state.qrData);
  const isGenerated = useQRDataStore((state) => state.generated);

  useEffect(() => {
    const generateQr = async (data: qrData) => {
      try {
        const qrData = JSON.stringify(data); // Convert form data to JSON
        const qrImage = await QRCode.toDataURL(qrData); // Generate QR code image
        setSrc(qrImage);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQr(qrData);
  }, [qrData]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isGenerated && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.5,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            type: "fade",
          }}
          className="p-2 border-4 border-dashed border-indigo-400"
        >
          <img src={src} alt="qr code" />
        </motion.div>
      )}
    </div>
  );
}

export default QRcode;
