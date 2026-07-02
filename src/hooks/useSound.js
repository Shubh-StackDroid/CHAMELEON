import { useCallback, useState } from 'react';
export function useSound() {
  const [muted, setMuted] = useState(() => localStorage.getItem('imposter.muted') === 'true');
  const toggle = () => setMuted(v => { localStorage.setItem('imposter.muted', String(!v)); return !v; });
  const play = useCallback((type = 'reveal') => {
    if (muted) return;
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.frequency.value = { reveal: 660, vote: 440, winner: 880, join: 520, start: 740 }[type] || 600;
    gain.gain.value = 0.045; osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.09);
  }, [muted]);
  return { muted, toggle, play };
}
