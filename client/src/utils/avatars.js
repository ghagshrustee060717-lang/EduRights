export const AVATARS = [
  { id: 'superhero-aarav', name: 'Aarav (Superhero)', emoji: '🦸‍♂️', bg: '#fef3c7', border: '#fbbf24' },
  { id: 'explorer-maya', name: 'Maya (Explorer)', emoji: '🧭', bg: '#e0f2fe', border: '#38bdf8' },
  { id: 'tech-leo', name: 'Leo (Techie)', emoji: '🚀', bg: '#ede9fe', border: '#a855f7' },
  { id: 'scout-tara', name: 'Tara (Scout)', emoji: '⭐', bg: '#fef9c3', border: '#eab308' },
];

export const getAvatarData = (avatarId) => {
  const found = AVATARS.find((a) => a.id === avatarId);
  return found || AVATARS[0];
};

export default AVATARS;
