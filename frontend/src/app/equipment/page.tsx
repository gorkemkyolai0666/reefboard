'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const typeLabels: Record<string, string> = { bcd: 'BCD', regulator: 'Regülatör', wetsuit: 'Wetsuit', drysuit: 'Drysuit', mask: 'Maske', fins: 'Palet', tank: 'Tüp', computer: 'Bilgisayar', torch: 'Fener', camera: 'Kamera', weight_belt: 'Ağırlık', snorkel: 'Şnorkel' };
const conditionLabels: Record<string, string> = { excellent: 'Mükemmel', good: 'İyi', fair: 'Orta', needs_service: 'Bakım Gerekli', out_of_service: 'Kullanım Dışı' };
const conditionColors: Record<string, string> = { excellent: 'bg-reef-100 dark:bg-reef-900/30 text-reef-600 dark:text-reef-400', good: 'bg-ocean-100 dark:bg-ocean-800 text-ocean-600 dark:text-ocean-300', fair: 'bg-sand-100 dark:bg-sand-900/30 text-sand-600 dark:text-sand-400', needs_service: 'bg-coral-100 dark:bg-coral-900/30 text-coral-600 dark:text-coral-400', out_of_service: 'bg-coral-200 dark:bg-coral-900/50 text-coral-700 dark:text-coral-300' };

export default function EquipmentPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!authLoading && !token) { router.push('/login'); return; }
    if (token) {
      api.equipment.list(token, filter ? { condition: filter } : undefined)
        .then((res: any) => setData(res.data || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, authLoading, router, filter]);

  if (authLoading || !token) return null;

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-10 backdrop-blur-md border-b" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-reef-400 hover:text-reef-300 transition-colors flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              Panel
            </Link>
            <h1 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Ekipman Envanteri</h1>
          </div>
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setLoading(true); }} className="input-field w-auto text-sm">
            <option value="">Tüm Durumlar</option>
            <option value="excellent">Mükemmel</option>
            <option value="good">İyi</option>
            <option value="fair">Orta</option>
            <option value="needs_service">Bakım Gerekli</option>
            <option value="out_of_service">Kullanım Dışı</option>
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="glass-card p-5 animate-pulse"><div className="h-5 w-40 rounded bg-ocean-200/20 dark:bg-ocean-700/30 mb-3" /><div className="h-4 w-32 rounded bg-ocean-200/20 dark:bg-ocean-700/30" /></div>)}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-ocean-100 dark:bg-ocean-800 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ocean-400"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3 className="text-lg font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Ekipman Bulunamadı</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Envanterde kayıtlı ekipman yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((eq: any) => (
              <div key={eq.id} className="glass-card p-5 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{typeLabels[eq.equipmentType] || eq.equipmentType}{eq.brand ? ` — ${eq.brand}` : ''}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${conditionColors[eq.condition] || ''}`}>
                    {conditionLabels[eq.condition] || eq.condition}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  {eq.serialNumber && (
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Seri No</p>
                      <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{eq.serialNumber}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Kiralık</p>
                    <p className="text-sm font-medium">{eq.isRental ? <span className="text-reef-400">Evet — ₺{eq.dailyRate}/gün</span> : <span style={{ color: 'var(--text-secondary)' }}>Hayır</span>}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Son Bakım</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formatDate(eq.lastServiceDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sonraki Bakım</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formatDate(eq.nextServiceDate)}</p>
                  </div>
                </div>

                {eq.notes && <p className="mt-3 text-xs italic" style={{ color: 'var(--text-muted)' }}>{eq.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
