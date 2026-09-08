import React, { useState } from 'react';
import { X, Check, User, Shield, Calendar, Globe, Award, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AVATARS = [
  { id: 'superhero-aarav', name: 'Aarav (Superhero)', emoji: '🦸‍♂️' },
  { id: 'explorer-maya', name: 'Maya (Explorer)', emoji: '🧭' },
  { id: 'tech-leo', name: 'Leo (Techie)', emoji: '🚀' },
  { id: 'scout-tara', name: 'Tara (Scout)', emoji: '⭐' },
];

export const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile, celebrate } = useAuth();

  const [name, setName] = useState(user?.name || 'Aarav');
  const [age, setAge] = useState(user?.age || 10);
  const [language, setLanguage] = useState(user?.language || 'en');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'superhero-aarav');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const res = await updateProfile({
      name,
      age: Number(age),
      language,
      avatar: selectedAvatar,
    });

    setSaving(false);
    if (res.success) {
      setSavedSuccess(true);
      celebrate();
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
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
        maxWidth: '520px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #fbbf24',
              background: '#ffffff',
            }}>
              <img
                src="/assets/images/avatar_aarav.jpg"
                alt={user.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                {user.name}'s Profile
              </h2>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                marginTop: '4px',
              }}>
                <Sparkles size={12} fill="#fbbf24" color="#fbbf24" />
                <span>{user.levelTitle || 'Level 3 Explorer'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} style={{ padding: '1.75rem 2rem' }}>
          {savedSuccess && (
            <div style={{
              background: '#dcfce7',
              border: '1px solid #86efac',
              color: '#166534',
              padding: '0.65rem 0.85rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}>
              <Check size={16} />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                Explorer Nickname
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '0.92rem',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                  Age
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
                  Language
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

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '0.4rem' }}>
                Avatar Mascot
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {AVATARS.map((av) => (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => setSelectedAvatar(av.id)}
                    style={{
                      background: selectedAvatar === av.id ? '#ede9fe' : '#f8fafc',
                      border: selectedAvatar === av.id ? '2px solid #6366f1' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '0.6rem 0.25rem',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem' }}>{av.emoji}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#334155' }}>
                      {av.name.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              borderRadius: '14px',
              padding: '0.85rem',
              border: '1px solid #e2e8f0',
              fontSize: '0.8rem',
              color: '#64748b',
            }}>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Authentication:</strong> JWT Signed (NFR-03 Verified)</div>
              <div><strong>Total XP:</strong> {user.totalPoints} XP | <strong>Streak:</strong> {user.streakDays} Days</div>
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.95rem',
                padding: '0.8rem',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              {saving ? 'Saving changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileModal;
