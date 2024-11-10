
    import React, { useEffect, useState } from "react";
    import { Html5QrcodeScanner } from "html5-qrcode";
    
    export default function QRCode(props) {
      return (
        <div className="w-[50vh] flex items-center justify-center shadow-2xl shadow-zinc-500 border-zinc-500 border-2 bg-white p-8 shadow-2xl rounded-lg">
          <div className="text-4xl text-gray-500">QR</div>
        </div>
      )
    }