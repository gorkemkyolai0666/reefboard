'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      <div className="hidden lg:flex lg:w-1/2 gradient-ocean relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-reef-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-sand-400 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c2-3 6-5 10-5s8 2 10 5"/>
                <path d="M2 17c2-3 6-5 10-5s8 2 10 5"/>
                <circle cx="12" cy="7" r="3"/>
              </svg>
            </div>
            <span className="text-3xl font-display font-bold text-white">ReefBoard</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Dalış Merkezinizi<br />Dijitale Taşıyın
          </h2>
          <p className="text-ocean-200 text-lg leading-relaxed mb-8">
            Öğrenci kayıtları, kurs planlaması, dalış günlükleri ve ekipman envanteri — hepsi tek platformda.
          </p>
          <div className="space-y-4">
            {['PADI/SSI sertifika takibi', 'Dijital dalış günlüğü', 'Ekipman bakım yönetimi'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-reef-400/20 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <span className="text-ocean-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg gradient-ocean flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c2-3 6-5 10-5s8 2 10 5"/>
                <path d="M2 17c2-3 6-5 10-5s8 2 10 5"/>
                <circle cx="12" cy="7" r="3"/>
              </svg>
            </div>
            <span className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>ReefBoard</span>
          </div>

          <h1 className="text-3xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Hoş Geldiniz</h1>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Dalış merkezi panelinize giriş yapın</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-coral-50 dark:bg-coral-900/20 border border-coral-200 dark:border-coral-800">
              <p className="text-sm text-coral-600 dark:text-coral-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>E-posta</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@dalismerkezi.com" required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Şifre</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifrenizi girin" required className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-50">
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            Hesabınız yok mu?{' '}
            <Link href="/register" className="font-medium text-reef-400 hover:text-reef-300 transition-colors">Kayıt Olun</Link>
          </p>

          <div className="mt-8 p-4 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Demo Hesap</p>
            <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>demo@akdenizdalismerkezi.com.tr</p>
            <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>demo123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
