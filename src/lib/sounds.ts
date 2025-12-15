let audio: HTMLAudioElement | null = null;

export function playSound(src: string, volume: number) {
  if (typeof window === "undefined") return;

  if (!audio || audio.src !== src) {
    audio = new Audio(src);
  }

  audio.volume = volume;
  audio.currentTime = 0;

  // browsers may block autoplay → safe to ignore
  audio.play().catch(() => {});
}
