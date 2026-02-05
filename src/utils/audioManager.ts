
class AudioManager {
    private audioCtx: AudioContext | null = null;
    private muted: boolean = false;

    constructor() {
        // AudioContext must be initialized after user interaction usually, 
        // but we can prepare the class.
    }

    private getContext() {
        if (this.muted) return null;
        if (!this.audioCtx) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
            if (Ctx) this.audioCtx = new Ctx();
        }
        return this.audioCtx;
    }

    play(name: 'success' | 'failure' | 'click' | 'crash' | 'alarm' | 'bgm') {
        const ctx = this.getContext();
        if (!ctx) return;

        // Resume if suspended (common browser policy)
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (name) {
            case 'success':
                // High pitch beep
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;

            case 'click':
                // Short tick
                osc.type = 'square';
                osc.frequency.setValueAtTime(800, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;

            case 'failure':
            case 'alarm':
                // Glitchy saw wave
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                // Modulate
                gain.gain.setValueAtTime(0.5, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;

            case 'crash':
                // White noiseish
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(50, now);
                gain.gain.setValueAtTime(0.8, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
                osc.start(now);
                osc.stop(now + 1.0);
                break;

            case 'bgm':
                // Just a startup hum
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(400, now + 0.5);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 1.5);
                osc.start(now);
                osc.stop(now + 1.5);
                break;
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted && this.audioCtx) {
            this.audioCtx.suspend();
        } else if (!this.muted && this.audioCtx) {
            this.audioCtx.resume();
        }
        return this.muted;
    }
}

export const audioManager = new AudioManager();
