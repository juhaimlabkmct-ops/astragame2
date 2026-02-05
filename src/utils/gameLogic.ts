
export interface LinkData {
    id: string;
    url: string;
    isSafe: boolean;
    spawnTime: number;
}

const SAFE_LINKS = [
    "google.com", "amazon.in", "github.com", "kmct.edu.in", "astra-security.org",
    "stackoverflow.com", "microsoft.com", "wikipedia.org", "linkedin.com", "kerala.gov.in"
];

const FAKE_LINKS = [
    "amaz0n.in", "googIe-login.net", "insta-verify-now.ru", "freewifi-login.xyz",
    "paytm-kyc-update.com", "faceb00k.com", "netflix-subscribe-free.net",
    "apple-id-reset.tk", "sbi-bank-alert.co", "job-offer-usa.click"
];

export function generateLink(): LinkData {
    // 40% Chance of Safe (Target), 60% Fake
    const isSafe = Math.random() > 0.4;

    // Simple random pick
    const rawUrl = isSafe
        ? SAFE_LINKS[Math.floor(Math.random() * SAFE_LINKS.length)]
        : FAKE_LINKS[Math.floor(Math.random() * FAKE_LINKS.length)];

    return {
        id: Math.random().toString(36).substr(2, 9),
        url: rawUrl,
        isSafe,
        spawnTime: Date.now()
    };
}

export function getDifficulty(elapsedTimeMs: number) {
    // Speed increases every 10 seconds.
    const level = Math.floor(elapsedTimeMs / 10000);
    // Base spawn interval 2000ms, reduce by 200ms per level, min 500ms
    const spawnInterval = Math.max(500, 2000 - (level * 200));

    return { level, spawnInterval };
}

export function checkRank(score: number): { rank: string, emoji: string } {
    if (score <= 5) return { rank: "Clickbait Victim", emoji: "🤡" };
    if (score <= 15) return { rank: "Suspicious User", emoji: "👀" };
    return { rank: "Cyber Ninja", emoji: "🥷" };
}
