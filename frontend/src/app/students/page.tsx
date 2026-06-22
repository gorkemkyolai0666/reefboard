'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const certLevelLabels: Record<string, string> = { none: 'Yok', open_water: 'Open Water', advanced_open_water: 'Advanced OW', rescue_diver: 'Rescue Diver', divemaster: 'Divemaster', instructor: 'Eğitmen' };
const statusLabels: Record<string, string> = { active: 'Aktif', graduated: 'Mezun', inactive: 'Pasif', suspended: 'Askıda' };
const statusColors: Record<string, string> = { active: 'bg-reef-100 dark:bg-reef-900/30 text-reef-600 dark:text-reef-400', graduated: 'bg-ocean-100 dark:bg-ocean-800 text-ocean-600 dark:text-ocean-300', inactive: 'bg-sand-100 dark:bg-sand-900/30 text-sand-600 dark:text-sand-400', suspended: 'bg-coral-100 dark:bg-coral-900/30 text-coral-600 dark:text-coral-400' };

export default function StudentsPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!authLoading && !token) { router.push('/login'); return; }
    if (token) {
      api.students.list(token, filter ? { status: filter } : undefined)
        .then((res: any) => setData(res.data || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, authLoading, router, filter]);

  if (authLoading || !token) return null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-10 backdrop-blur-md border-b" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-reef-400 hover:text-reef-300 transition-colors flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              Panel
            </Link>
            <h1 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Öğrenciler</h1>
          </div>
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setLoading(true); }} className="input-field w-auto text-sm">
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="graduated">Mezun</option>
            <option value="inactive">Pasif</option>
            <option value="suspended">Askıda</option>
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-5 animate-pulse">
                <div className="h-5 w-32 rounded bg-ocean-200/20 dark:bg-ocean-700/30 mb-3" />
                <div className="h-4 w-48 rounded bg-ocean-200/20 dark:bg-ocean-700/30 mb-2" />
                <div className="h-4 w-24 rounded bg-ocean-200/20 dark:bg-ocean-700/30" />
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-ocean-100 dark:bg-ocean-800 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ocean-400"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 className="text-lg font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Öğrenci Bulunamadı</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Henüz kayıtlı öğrenci yok veya filtreyle eşleşen sonuç yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((s: any) => (
              <div key={s.id} className="glass-card p-5 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-ocean flex items-center justify-center text-white text-sm font-bold">
                      {s.firstName?.[0]}{s.lastName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{s.firstName} {s.lastName}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.email}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[s.status] || ''}`}>
                    {statusLabels[s.status] || s.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sertifika</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{certLevelLabels[s.certLevel] || s.certLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Toplam Dalış</p>
                    <p className="text-sm font-medium text-reef-400">{s.totalDives}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sağlık Onayı</p>
                    <p className="text-sm font-medium">{s.healthClearance ? <span className="text-reef-400">Onaylı</span> : <span className="text-coral-400">Bekliyor</span>}</p>
                  </div>
                  {s.phone && (
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Telefon</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{s.phone}</p>
                    </div>
                  )}
                </div>
                {s.notes && (
                  <p className="mt-3 text-xs italic" style={{ color: 'var(--text-muted)' }}>{s.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
