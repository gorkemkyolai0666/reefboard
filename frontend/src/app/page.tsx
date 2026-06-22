'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (token) router.replace('/dashboard');
      else router.replace('/login');
    }
  }, [token, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-ocean flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12c2-3 6-5 10-5s8 2 10 5"/>
              <path d="M2 17c2-3 6-5 10-5s8 2 10 5"/>
              <circle cx="12" cy="7" r="3"/>
            </svg>
          </div>
          <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
            ReefBoard
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</p>
      </div>
    </div>
  );
}
