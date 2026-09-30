import React, { useState, useEffect } from 'react';
import { X, Check, User, Shield, Calendar, Globe, Award, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AVATARS, getAvatarData } from '../utils/avatars';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile, celebrate } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState(10);
  const [language, setLanguage] = useState('en');
  const [selectedAvatar, setSelectedAvatar] = useState('superhero-aarav');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state whenever user or modal opens
  useEffect(() => {
    if (user && isOpen) {
      setName(user.name || '');
      setAge(user.age || 10);
      setLanguage(user.language || 'en');
      setSelectedAvatar(user.avatar || 'superhero-aarav');
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const currentAvatarData = getAvatarData(selectedAvatar);

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
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
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
              border: `3px solid ${currentAvatarData.border}`,
              background: currentAvatarData.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: `0 4px 14px ${currentAvatarData.border}60`,
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}>
              <span>{currentAvatarData.emoji}</span>
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
                {name || user.name}'s Profile
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
                <span>{currentAvatarData.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '1.75rem 2rem' }}>
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

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                Choose Your Avatar Mascot
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
                {AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av.id;
                  return (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setSelectedAvatar(av.id)}
                      style={{
                        background: isSelected ? av.bg : '#f8fafc',
                        border: isSelected ? `2.5px solid ${av.border}` : '1.5px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '0.75rem 0.35rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                        boxShadow: isSelected ? `0 4px 12px ${av.border}50` : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{av.emoji}</div>
                      <div style={{ fontSize: '0.74rem', fontWeight: '800', color: isSelected ? '#1e1b4b' : '#64748b' }}>
                        {av.name.split(' ')[0]}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: isSelected ? av.border : '#94a3b8', fontWeight: '700' }}>
                        {av.name.split(' ')[1]?.replace(/[()]/g, '') || ''}
                      </div>
                    </button>
                  );
                })}
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
              <div><strong>Rank:</strong> Level {user.currentLevel || 1} • {user.totalPoints ?? 0} XP</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 2,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                }}
              >
                {saving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
