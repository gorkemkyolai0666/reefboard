'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { api } from '@/lib/api';

interface Stats {
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  activeCourses: number;
  totalDiveLogs: number;
  totalEquipment: number;
  equipmentNeedsService: number;
  totalRevenue: number;
  recentDives: any[];
  upcomingCourses: any[];
}

const navItems = [
  { href: '/dashboard', label: 'Panel', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/students', label: 'Öğrenciler', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { href: '/courses', label: 'Kurslar', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { href: '/divelogs', label: 'Dalış Günlüğü', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3' },
  { href: '/equipment', label: 'Ekipman', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { href: '/center', label: 'Merkez Profili', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
];

function NavSidebar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const router = useRouter();

  return (
    <aside className="w-64 min-h-screen flex flex-col gradient-ocean border-r border-ocean-700/30">
      <div className="p-6 border-b border-ocean-700/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12c2-3 6-5 10-5s8 2 10 5"/>
              <path d="M2 17c2-3 6-5 10-5s8 2 10 5"/>
              <circle cx="12" cy="7" r="3"/>
            </svg>
          </div>
          <span className="text-lg font-display font-bold text-white">ReefBoard</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-ocean-200 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-ocean-700/30">
        <button onClick={toggle} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-ocean-200 hover:text-white hover:bg-white/10 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {theme === 'dark' ? <><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></> : <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>}
          </svg>
          {theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
        </button>

        <div className="mt-2 px-4 py-2 text-xs text-ocean-400">
          {user?.firstName} {user?.lastName}
        </div>

        <button onClick={() => { logout(); router.push('/login'); }} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-coral-300 hover:text-coral-200 hover:bg-coral-500/10 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9"/>
          </svg>
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  const colorMap: Record<string, string> = {
    coral: 'from-coral-400 to-coral-600',
    reef: 'from-reef-400 to-reef-600',
    ocean: 'from-ocean-400 to-ocean-600',
    sand: 'from-sand-400 to-sand-600',
  };

  return (
    <div className="glass-card p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color] || colorMap.ocean} flex items-center justify-center flex-shrink-0`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !token) { router.push('/login'); return; }
    if (token) {
      api.dashboard.stats(token)
        .then((data: any) => setStats(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, authLoading, router]);

  if (authLoading || !token) return null;

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <NavSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Panel</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Dalış merkezi operasyon özeti</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse">
                  <div className="h-4 w-24 rounded bg-ocean-200/20 dark:bg-ocean-700/30 mb-3" />
                  <div className="h-7 w-16 rounded bg-ocean-200/20 dark:bg-ocean-700/30" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard label="Aktif Öğrenci" value={stats.activeStudents} icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" color="reef" />
                <StatCard label="Aktif Kurs" value={stats.activeCourses} icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" color="ocean" />
                <StatCard label="Toplam Dalış" value={stats.totalDiveLogs} icon="M19 14l-7 7m0 0l-7-7m7 7V3" color="coral" />
                <StatCard label="Toplam Gelir" value={`₺${(stats.totalRevenue || 0).toLocaleString('tr-TR')}`} icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" color="sand" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard label="Toplam Öğrenci" value={stats.totalStudents} icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" color="ocean" />
                <StatCard label="Toplam Kurs" value={stats.totalCourses} icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" color="reef" />
                <StatCard label="Toplam Ekipman" value={stats.totalEquipment} icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" color="sand" />
                <StatCard label="Bakım Gereken" value={stats.equipmentNeedsService} icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" color="coral" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Son Dalışlar</h3>
                  {stats.recentDives.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-ocean-100 dark:bg-ocean-800 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ocean-400"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Henüz dalış kaydı yok</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.recentDives.map((dive: any) => (
                        <div key={dive.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-ocean-50/50 dark:hover:bg-ocean-800/30 transition-colors" style={{ borderBottom: '1px solid var(--border)' }}>
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{dive.diveSite}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{dive.student?.firstName} {dive.student?.lastName} — #{dive.diveNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-reef-400">{dive.maxDepth}m</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{dive.duration} dk</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Yaklaşan Kurslar</h3>
                  {stats.upcomingCourses.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-ocean-100 dark:bg-ocean-800 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ocean-400"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Yaklaşan kurs yok</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.upcomingCourses.map((course: any) => (
                        <div key={course.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-ocean-50/50 dark:hover:bg-ocean-800/30 transition-colors" style={{ borderBottom: '1px solid var(--border)' }}>
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{course.title}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{course.instructorName} — {course._count?.enrollments || 0}/{course.maxParticipants} katılımcı</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${course.status === 'in_progress' ? 'bg-reef-100 dark:bg-reef-900/30 text-reef-600 dark:text-reef-400' : 'bg-ocean-100 dark:bg-ocean-800 text-ocean-600 dark:text-ocean-300'}`}>
                              {course.status === 'in_progress' ? 'Devam Ediyor' : 'Planlandı'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p style={{ color: 'var(--text-muted)' }}>Veri yüklenemedi</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
