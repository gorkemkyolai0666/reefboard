'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

function InfoRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value || '-'}</span>
    </div>
  );
}

export default function CenterPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !token) { router.push('/login'); return; }
    if (token) {
      api.center.get(token)
        .then((data: any) => setCenter(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, authLoading, router]);

  if (authLoading || !token) return null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-10 backdrop-blur-md border-b" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-reef-400 hover:text-reef-300 transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Panel
          </Link>
          <h1 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Merkez Profili</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        {loading ? (
          <div className="glass-card p-8 animate-pulse space-y-4">
            {[...Array(8)].map((_, i) => <div key={i} className="h-5 w-full rounded bg-ocean-200/20 dark:bg-ocean-700/30" />)}
          </div>
        ) : center ? (
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="w-16 h-16 rounded-xl gradient-ocean flex items-center justify-center text-white text-xl font-bold">
                {center.name?.[0] || 'R'}
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>{center.name}</h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{center.city}, {center.district}</p>
              </div>
            </div>
            <InfoRow label="Telefon" value={center.phone} />
            <InfoRow label="Adres" value={center.address} />
            <InfoRow label="Şehir" value={center.city} />
            <InfoRow label="İlçe" value={center.district} />
            <InfoRow label="Maks. Derinlik" value={center.maxDepth ? `${center.maxDepth}m` : null} />
            <InfoRow label="Sertifika Kuruluşu" value={center.certBody} />
            <InfoRow label="Enlem" value={center.latitude} />
            <InfoRow label="Boylam" value={center.longitude} />
            <InfoRow label="Saat Dilimi" value={center.timezone} />
          </div>
        ) : (
          <div className="text-center py-16">
            <p style={{ color: 'var(--text-muted)' }}>Merkez bilgisi yüklenemedi</p>
          </div>
        )}
      </main>
    </div>
  );
}
