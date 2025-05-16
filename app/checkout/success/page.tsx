'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik olarak ana sayfaya yönlendir
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Siparişiniz Başarıyla Alındı!
        </h1>
        <p className="text-gray-600 mb-6">
          Siparişiniz için teşekkür ederiz. Siparişiniz en kısa sürede hazırlanıp
          kargoya verilecektir.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <p className="text-sm text-gray-500">
            5 saniye içinde ana sayfaya yönlendirileceksiniz...
          </p>
        </div>
      </div>
    </div>
  );
} 