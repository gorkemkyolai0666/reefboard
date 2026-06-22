'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const courseTypeLabels: Record<string, string> = { open_water: 'Open Water', advanced_open_water: 'Advanced OW', rescue_diver: 'Rescue Diver', divemaster: 'Divemaster', specialty_nitrox: 'Nitrox', specialty_deep: 'Derin Dalış', specialty_wreck: 'Batık Dalışı', specialty_night: 'Gece Dalışı', specialty_underwater_photo: 'Su Altı Fotoğraf', first_aid: 'İlk Yardım', try_dive: 'Deneme Dalışı' };
const statusLabels: Record<string, string> = { scheduled: 'Planlandı', in_progress: 'Devam Ediyor', completed: 'Tamamlandı', cancelled: 'İptal' };
const statusColors: Record<string, string> = { scheduled: 'bg-ocean-100 dark:bg-ocean-800 text-ocean-600 dark:text-ocean-300', in_progress: 'bg-reef-100 dark:bg-reef-900/30 text-reef-600 dark:text-reef-400', completed: 'bg-sand-100 dark:bg-sand-900/30 text-sand-600 dark:text-sand-400', cancelled: 'bg-coral-100 dark:bg-coral-900/30 text-coral-600 dark:text-coral-400' };

export default function CoursesPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!authLoading && !token) { router.push('/login'); return; }
    if (token) {
      api.courses.list(token, filter ? { status: filter } : undefined)
        .then((res: any) => setData(res.data || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, authLoading, router, filter]);

  if (authLoading || !token) return null;

  const formatDate = (d: string) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-10 backdrop-blur-md border-b" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-reef-400 hover:text-reef-300 transition-colors flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              Panel
            </Link>
            <h1 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Kurslar</h1>
          </div>
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setLoading(true); }} className="input-field w-auto text-sm">
            <option value="">Tüm Durumlar</option>
            <option value="scheduled">Planlandı</option>
            <option value="in_progress">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
            <option value="cancelled">İptal</option>
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => <div key={i} className="glass-card p-5 animate-pulse"><div className="h-5 w-64 rounded bg-ocean-200/20 dark:bg-ocean-700/30 mb-2" /><div className="h-4 w-40 rounded bg-ocean-200/20 dark:bg-ocean-700/30" /></div>)}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-ocean-100 dark:bg-ocean-800 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ocean-400"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <h3 className="text-lg font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Kurs Bulunamadı</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Henüz kayıtlı kurs yok.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((c: any) => (
              <div key={c.id} className="glass-card p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[c.status] || ''}`}>
                        {statusLabels[c.status] || c.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <span>Tür: <strong style={{ color: 'var(--text-secondary)' }}>{courseTypeLabels[c.courseType] || c.courseType}</strong></span>
                      <span>Eğitmen: <strong style={{ color: 'var(--text-secondary)' }}>{c.instructorName}</strong></span>
                      <span>Katılımcı: <strong className="text-reef-400">{c._count?.enrollments || 0}/{c.maxParticipants}</strong></span>
                      {c.location && <span>Konum: <strong style={{ color: 'var(--text-secondary)' }}>{c.location}</strong></span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-lg font-bold text-reef-400">₺{(c.price || 0).toLocaleString('tr-TR')}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(c.startDate)} — {formatDate(c.endDate)}</p>
                  </div>
                </div>
                {c.notes && <p className="mt-3 text-sm italic" style={{ color: 'var(--text-muted)' }}>{c.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
