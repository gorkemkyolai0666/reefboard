'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', centerName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg gradient-ocean flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12c2-3 6-5 10-5s8 2 10 5"/>
              <path d="M2 17c2-3 6-5 10-5s8 2 10 5"/>
              <circle cx="12" cy="7" r="3"/>
            </svg>
          </div>
          <span className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>ReefBoard</span>
        </div>

        <h1 className="text-3xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Merkez Kaydı</h1>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Dalış merkezinizi kayıt edin ve yönetmeye başlayın</p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-coral-50 dark:bg-coral-900/20 border border-coral-200 dark:border-coral-800">
            <p className="text-sm text-coral-600 dark:text-coral-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Ad</label>
              <input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Deniz" required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Soyad</label>
              <input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Dalgıç" required className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Merkez Adı</label>
            <input type="text" value={form.centerName} onChange={(e) => update('centerName', e.target.value)} placeholder="Akdeniz Dalış Merkezi" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>E-posta</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="ornek@dalismerkezi.com" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Şifre</label>
            <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="En az 6 karakter" required className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-50">
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="font-medium text-reef-400 hover:text-reef-300 transition-colors">Giriş Yapın</Link>
        </p>
      </div>
    </div>
  );
}
