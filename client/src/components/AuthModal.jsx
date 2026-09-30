import React, { useState } from 'react';
import { X, Sparkles, Shield, User, Mail, Lock, Globe, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { AVATARS } from '../utils/avatars';

export const AuthModal = ({ isOpen, initialMode = 'login', onClose, onSuccess }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(10);
  const [language, setLanguage] = useState('en');
  const [selectedAvatar, setSelectedAvatar] = useState('superhero-aarav');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, register, demoLogin } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          onClose();
          if (onSuccess) onSuccess();
        } else {
          setLocalError(res.message);
        }
      } else {
        const res = await register({
          name,
          email,
          password,
          age: Number(age),
          language,
          avatar: selectedAvatar,
          role: 'child',
        });
        if (res.success) {
          onClose();
          if (onSuccess) onSuccess();
        } else {
          setLocalError(res.message);
        }
      }
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = async () => {
    setSubmitting(true);
    setLocalError('');
    const res = await demoLogin();
    setSubmitting(false);
    if (res.success) {
      onClose();
      if (onSuccess) onSuccess();
    } else {
      setLocalError(res.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        width: '100%',
        maxWidth: '480px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        animation: 'float 0.3s ease-out',
      }}>
        {/* Modal Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
          padding: '1.75rem 2rem 1.25rem',
          color: '#ffffff',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <div style={{
              background: '#fbbf24',
              color: '#1e1b4b',
              borderRadius: '10px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={20} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              {mode === 'login' ? 'Welcome Back!' : 'Join EduRights!'}
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
            {mode === 'login'
              ? 'Sign in to continue unlocking your rights and powers.'
              : 'Create your explorer profile to embark on the legal rights quest!'}
          </p>

          {/* Mode Switch Tabs */}
          <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '9999px',
            padding: '4px',
            marginTop: '1.25rem',
          }}>
            <button
              onClick={() => { setMode('login'); setLocalError(''); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '9999px',
                background: mode === 'login' ? '#ffffff' : 'transparent',
                color: mode === 'login' ? '#1e1b4b' : '#cbd5e1',
                fontWeight: '700',
                fontSize: '0.88rem',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setLocalError(''); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '9999px',
                background: mode === 'register' ? '#ffffff' : 'transparent',
                color: mode === 'register' ? '#1e1b4b' : '#cbd5e1',
                fontWeight: '700',
                fontSize: '0.88rem',
              }}
            >
              New Explorer
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '1.75rem 2rem' }}>
          {/* Quick Demo Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={submitting}
            style={{
              width: '100%',
              background: '#fef3c7',
              border: '2px dashed #fbbf24',
              borderRadius: '16px',
              padding: '0.75rem 1rem',
              color: '#92400e',
              fontWeight: '800',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={18} color="#d97706" />
            <span>⚡ 1-Click Quick Demo (Login as Aarav)</span>
          </button>

          {localError && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #f87171',
              color: '#b91c1c',
              padding: '0.75rem 0.9rem',
              borderRadius: '14px',
              fontSize: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                <AlertCircle size={16} />
                <span>{localError}</span>
              </div>
              {mode === 'login' && (
                <div style={{ fontSize: '0.8rem', color: '#7f1d1d', marginTop: '2px' }}>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setLocalError('');
                      setMode('register');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#4338ca',
                      fontWeight: '800',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Click here to register as a New Explorer!
                  </button>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'register' && (
              <>
                {/* Child Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                    Explorer Name / Nickname
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya the Brave"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                        borderRadius: '12px',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>
                </div>

                {/* Age & Language Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                      Age (8–16)
                    </label>
                    <input
                      type="number"
                      min={6}
                      max={18}
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                      Preferred Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '0.92rem',
                        background: '#ffffff',
                      }}
                    >
                      <option value="en">English</option>
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>

                {/* Avatar Picker */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.4rem' }}>
                    Choose Your Hero Mascot
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
                    {AVATARS.map((av) => {
                      const isPicked = selectedAvatar === av.id;
                      return (
                        <button
                          type="button"
                          key={av.id}
                          onClick={() => setSelectedAvatar(av.id)}
                          style={{
                            background: isPicked ? av.bg : '#f8fafc',
                            border: isPicked ? `2.5px solid ${av.border}` : '1.5px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '0.65rem 0.25rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transform: isPicked ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: isPicked ? `0 4px 12px ${av.border}50` : 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ fontSize: '1.7rem' }}>{av.emoji}</div>
                          <div style={{ fontSize: '0.72rem', fontWeight: '800', color: isPicked ? '#1e1b4b' : '#334155', marginTop: '2px' }}>
                            {av.name.split(' ')[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  required
                  placeholder={mode === 'login' ? 'aarav@edurights.org' : 'you@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.92rem',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                Password {mode === 'register' && '(min 6 chars)'}
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.92rem',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '1rem',
                padding: '0.85rem',
                borderRadius: '14px',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(79, 70, 229, 0.35)',
              }}
            >
              <span>{submitting ? 'Please wait...' : mode === 'login' ? 'Sign In to Dashboard' : 'Launch My Adventure!'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
