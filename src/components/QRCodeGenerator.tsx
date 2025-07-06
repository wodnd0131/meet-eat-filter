
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode.js';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      const qr = new QRCode({
        content: value,
        padding: 4,
        width: size,
        height: size,
        color: "#000000",
        background: "#ffffff",
        ecl: "M"
      });
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // QR 코드를 캔버스에 그리기
        const svg = qr.svg();
        const img = new Image();
        const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);
          URL.revokeObjectURL(url);
        };
        
        img.src = url;
      }
    }
  }, [value, size]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="border border-gray-200 rounded-lg"
      />
      <p className="text-xs text-gray-500 text-center max-w-[200px]">
        QR 코드를 스캔하여 참여하세요
      </p>
    </div>
  );
};

export default QRCodeGenerator;
