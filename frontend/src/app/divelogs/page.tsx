'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const visibilityLabels: Record<string, string> = { poor: 'Zayıf', fair: 'Orta', good: 'İyi', excellent: 'Mükemmel' };
const visibilityColors: Record<string, string> = { poor: 'text-coral-400', fair: 'text-sand-400', good: 'text-ocean-400', excellent: 'text-reef-400' };

export default function DiveLogsPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !token) { router.push('/login'); return; }
    if (token) {
      api.divelogs.list(token)
        .then((res: any) => setData(res.data || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, authLoading, router]);

  if (authLoading || !token) return null;

  const formatDate = (d: string) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-10 backdrop-blur-md border-b" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-reef-400 hover:text-reef-300 transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Panel
          </Link>
          <h1 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Dalış Günlüğü</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => <div key={i} className="glass-card p-5 animate-pulse"><div className="h-5 w-40 rounded bg-ocean-200/20 dark:bg-ocean-700/30 mb-3" /><div className="h-4 w-56 rounded bg-ocean-200/20 dark:bg-ocean-700/30" /></div>)}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-ocean-100 dark:bg-ocean-800 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ocean-400"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            </div>
            <h3 className="text-lg font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Dalış Kaydı Bulunamadı</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Henüz dalış günlüğü kaydı yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.map((d: any) => (
              <div key={d.id} className="glass-card p-5 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ocean-900 dark:bg-ocean-200 text-white dark:text-ocean-900 text-xs font-bold">#{d.diveNumber}</span>
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{d.diveSite}</h3>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.student?.firstName} {d.student?.lastName} — {formatDate(d.diveDate)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Derinlik</p>
                    <p className="text-sm font-bold text-coral-400">{d.maxDepth}m</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Süre</p>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{d.duration} dk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sıcaklık</p>
                    <p className="text-sm font-bold text-reef-400">{d.waterTemp != null ? `${d.waterTemp}°C` : '-'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Görüş</p>
                    <p className={`text-sm font-bold ${visibilityColors[d.visibility] || ''}`}>{visibilityLabels[d.visibility] || d.visibility}</p>
                  </div>
                </div>

                {d.buddy && (
                  <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>Buddy: <span style={{ color: 'var(--text-secondary)' }}>{d.buddy}</span></p>
                )}
                {d.notes && (
                  <p className="mt-2 text-xs italic" style={{ color: 'var(--text-muted)' }}>{d.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
