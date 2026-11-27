import type { VaultItemDetail } from "../types/vault";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.now();

function item(
  id: string,
  title: string,
  username: string,
  password: string,
  website: string,
  notes = "",
  opts: { fav?: boolean; daysAgo?: number; deletedDaysAgo?: number } = {},
): VaultItemDetail {
  const days = opts.daysAgo ?? 5;
  return {
    id,
    title,
    username,
    password,
    website,
    notes,
    isFavorite: opts.fav ?? false,
    isReused: false,
    isWeak: false,
    createdAt: NOW - days * 3 * DAY,
    updatedAt: NOW - days * DAY,
    deletedAt: opts.deletedDaysAgo ? NOW - opts.deletedDaysAgo * DAY : null,
  };
}

export const INITIAL_MOCK_VAULT: VaultItemDetail[] = [
  item(
    "1",
    "Google Account",
    "robert.lewandowski@gmail.com",
    "k9#mP2$vL8@qR4!xW7",
    "https://accounts.google.com",
    "Primary personal email & recovery keys",
    { fav: true, daysAgo: 2 },
  ),
  item(
    "2",
    "Apple ID",
    "r.lewandowski@icloud.com",
    "nT5!zQ9#bX3@wF6&jH",
    "https://appleid.apple.com",
    "iPhone & MacBook Air sync",
    { fav: true, daysAgo: 4 },
  ),
  item(
    "3",
    "Chicago Fire Player Portal",
    "r.lewandowski@chicagofirefc.com",
    "cF9#mK4!pL2@vN8$zQ",
    "https://portal.chicagofirefc.com",
    "MLS schedule, recovery & medical telemetry",
    { fav: true, daysAgo: 1 },
  ),
  item(
    "4",
    "mBank Polska",
    "48291044",
    "pW7@xM3#qB9!kD5$rT",
    "https://online.mbank.pl",
    "Hardware token + biometric approval enabled",
    { fav: true, daysAgo: 6 },
  ),
  item(
    "5",
    "GitHub",
    "rl9-dev",
    "vR4$tG8#nK2!mY6@wP",
    "https://github.com",
    "YubiKey 5C NFC 2FA required",
    { fav: false, daysAgo: 9 },
  ),
  item(
    "6",
    "Instagram",
    "@_rl9",
    "hJ6!qW2#zP9@cM4$xL",
    "https://www.instagram.com",
    "Managed with media agency",
    { fav: true, daysAgo: 3 },
  ),
  item(
    "7",
    "Netflix",
    "robert.lewandowski@gmail.com",
    "Lewy1988!", // weak + reused
    "https://www.netflix.com",
    "Family Ultra HD plan",
    { fav: false, daysAgo: 14 },
  ),
  item(
    "8",
    "Spotify",
    "robert.lewandowski@gmail.com",
    "Lewy1988!", // weak + reused
    "https://accounts.spotify.com",
    "Matchday warmup playlists",
    { fav: false, daysAgo: 18 },
  ),
  item(
    "9",
    "Allegro",
    "robert.lewandowski@gmail.com",
    "Lewy1988!", // weak + reused
    "https://allegro.pl",
    "Smart! annual subscription",
    { fav: false, daysAgo: 25 },
  ),
  item(
    "10",
    "Strava",
    "robert.lewandowski@gmail.com",
    "fN3@kL7#pQ2!vX9$mB",
    "https://www.strava.com",
    "Off-season cycling & Zone 2 runs",
    { fav: false, daysAgo: 7 },
  ),
  item(
    "11",
    "PZPN Łączy Nas Piłka",
    "r.lewandowski@pzpn.pl",
    "bZ8$wR3#tM6!qK4@pN",
    "https://www.laczynaspilka.pl",
    "National team call-ups & logistics",
    { fav: false, daysAgo: 11 },
  ),
  item(
    "12",
    "Amazon",
    "robert.lewandowski@gmail.com",
    "gX2#nV5!mQ8@kR4$wT",
    "https://www.amazon.com",
    "US shipping address for Chicago",
    { fav: false, daysAgo: 8 },
  ),
  item(
    "13",
    "Steam",
    "lewy_striker9",
    "barca2022", // weak
    "https://store.steampowered.com",
    "Old gaming account",
    { fav: false, daysAgo: 40 },
  ),
  item(
    "14",
    "FC Barcelona Socios Portal",
    "r.lewandowski@fcbarcelona.cat",
    "qM7!zL4#wP9@xK2$vN",
    "https://socios.fcbarcelona.com",
    "Archived after summer 2026 transfer",
    { fav: false, daysAgo: 60, deletedDaysAgo: 12 },
  ),
  item(
    "15",
    "UEFA Players Hub",
    "robert.lewandowski@gmail.com",
    "12345678", // weak + deleted
    "https://www.uefa.com",
    "Old tournament accreditation login",
    { fav: false, daysAgo: 90, deletedDaysAgo: 4 },
  ),
];
