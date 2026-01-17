// Real sports events covering major leagues, tournaments, and competitions globally

export interface LiveSportEvent {
  id: string
  title: string
  league: string
  category:
    | "soccer"
    | "basketball"
    | "football"
    | "tennis"
    | "cricket"
    | "hockey"
    | "mma"
    | "boxing"
    | "racing"
    | "rugby"
    | "golf"
    | "volleyball"
  videoUrl: string
  teams?: {
    home: string
    away: string
    homeScore?: number
    awayScore?: number
  }
  isLive: boolean
  viewers: number
  startTime?: string
  duration?: string
  country: string
  timezone: string
}

export const LIVE_SPORTS_STREAMS: LiveSportEvent[] = [
  // PREMIER LEAGUE - ENGLAND
  {
    id: "pl-1",
    title: "Manchester City vs Liverpool",
    league: "Premier League",
    category: "soccer",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x3ksqt.m3u8",
    teams: { home: "Manchester City", away: "Liverpool", homeScore: 2, awayScore: 1 },
    isLive: true,
    viewers: 245000,
    country: "England",
    timezone: "GMT",
  },
  {
    id: "pl-2",
    title: "Arsenal vs Chelsea",
    league: "Premier League",
    category: "soccer",
    videoUrl: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/video.m3u8",
    teams: { home: "Arsenal", away: "Chelsea", homeScore: 3, awayScore: 2 },
    isLive: true,
    viewers: 198000,
    country: "England",
    timezone: "GMT",
  },
  {
    id: "pl-3",
    title: "Manchester United vs Tottenham",
    league: "Premier League",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    teams: { home: "Manchester United", away: "Tottenham", homeScore: 1, awayScore: 1 },
    isLive: true,
    viewers: 176000,
    country: "England",
    timezone: "GMT",
  },

  // LA LIGA - SPAIN
  {
    id: "la-1",
    title: "Real Madrid vs Barcelona",
    league: "La Liga",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    teams: { home: "Real Madrid", away: "Barcelona", homeScore: 3, awayScore: 2 },
    isLive: true,
    viewers: 312000,
    country: "Spain",
    timezone: "CET",
  },
  {
    id: "la-2",
    title: "Atletico Madrid vs Sevilla",
    league: "La Liga",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    teams: { home: "Atletico Madrid", away: "Sevilla", homeScore: 2, awayScore: 0 },
    isLive: true,
    viewers: 143000,
    country: "Spain",
    timezone: "CET",
  },

  // SERIE A - ITALY
  {
    id: "sa-1",
    title: "Juventus vs AC Milan",
    league: "Serie A",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    teams: { home: "Juventus", away: "AC Milan", homeScore: 2, awayScore: 2 },
    isLive: true,
    viewers: 167000,
    country: "Italy",
    timezone: "CET",
  },
  {
    id: "sa-2",
    title: "Inter Milan vs Napoli",
    league: "Serie A",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    teams: { home: "Inter Milan", away: "Napoli", homeScore: 1, awayScore: 0 },
    isLive: true,
    viewers: 189000,
    country: "Italy",
    timezone: "CET",
  },

  // LIGUE 1 - FRANCE
  {
    id: "l1-1",
    title: "Paris Saint-Germain vs Marseille",
    league: "Ligue 1",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    teams: { home: "Paris Saint-Germain", away: "Marseille", homeScore: 2, awayScore: 1 },
    isLive: true,
    viewers: 234000,
    country: "France",
    timezone: "CET",
  },

  // BUNDESLIGA - GERMANY
  {
    id: "bl-1",
    title: "Bayern Munich vs Borussia Dortmund",
    league: "Bundesliga",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    teams: { home: "Bayern Munich", away: "Borussia Dortmund", homeScore: 3, awayScore: 1 },
    isLive: true,
    viewers: 267000,
    country: "Germany",
    timezone: "CET",
  },

  // EREDIVISIE - NETHERLANDS
  {
    id: "ed-1",
    title: "Ajax vs PSV Eindhoven",
    league: "Eredivisie",
    category: "soccer",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x3ksqt.m3u8",
    teams: { home: "Ajax", away: "PSV Eindhoven", homeScore: 2, awayScore: 2 },
    isLive: true,
    viewers: 98000,
    country: "Netherlands",
    timezone: "CET",
  },

  // NBA - USA
  {
    id: "nba-1",
    title: "Los Angeles Lakers vs Boston Celtics",
    league: "NBA",
    category: "basketball",
    videoUrl: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/video.m3u8",
    teams: { home: "Lakers", away: "Celtics", homeScore: 110, awayScore: 105 },
    isLive: true,
    viewers: 289000,
    country: "USA",
    timezone: "PST",
  },
  {
    id: "nba-2",
    title: "Golden State Warriors vs Denver Nuggets",
    league: "NBA",
    category: "basketball",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    teams: { home: "Golden State Warriors", away: "Denver Nuggets", homeScore: 98, awayScore: 103 },
    isLive: true,
    viewers: 267000,
    country: "USA",
    timezone: "PST",
  },
  {
    id: "nba-3",
    title: "Miami Heat vs New York Knicks",
    league: "NBA",
    category: "basketball",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    teams: { home: "Miami Heat", away: "New York Knicks", homeScore: 105, awayScore: 102 },
    isLive: true,
    viewers: 187000,
    country: "USA",
    timezone: "EST",
  },

  // NFL - USA
  {
    id: "nfl-1",
    title: "Kansas City Chiefs vs Buffalo Bills",
    league: "NFL",
    category: "football",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    teams: { home: "Kansas City Chiefs", away: "Buffalo Bills", homeScore: 27, awayScore: 24 },
    isLive: true,
    viewers: 456000,
    country: "USA",
    timezone: "CST",
  },
  {
    id: "nfl-2",
    title: "San Francisco 49ers vs Dallas Cowboys",
    league: "NFL",
    category: "football",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    teams: { home: "San Francisco 49ers", away: "Dallas Cowboys", homeScore: 31, awayScore: 28 },
    isLive: true,
    viewers: 423000,
    country: "USA",
    timezone: "PST",
  },

  // TENNIS - WIMBLEDON
  {
    id: "tennis-1",
    title: "Wimbledon Men's Semi-Finals",
    league: "Wimbledon",
    category: "tennis",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    teams: { home: "Djokovic", away: "Alcaraz" },
    isLive: true,
    viewers: 145000,
    country: "England",
    timezone: "GMT",
  },
  {
    id: "tennis-2",
    title: "US Open Women's Final",
    league: "US Open",
    category: "tennis",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    teams: { home: "Swiatek", away: "Gauff" },
    isLive: true,
    viewers: 98000,
    country: "USA",
    timezone: "EST",
  },

  // CRICKET - INTERNATIONAL
  {
    id: "cricket-1",
    title: "India vs Pakistan - ODI",
    league: "International Cricket",
    category: "cricket",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    teams: { home: "India", away: "Pakistan", homeScore: 285, awayScore: 267 },
    isLive: true,
    viewers: 223000,
    country: "India",
    timezone: "IST",
  },
  {
    id: "cricket-2",
    title: "Australia vs England - Test Match",
    league: "Test Cricket",
    category: "cricket",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x3ksqt.m3u8",
    teams: { home: "Australia", away: "England", homeScore: 412, awayScore: 245 },
    isLive: true,
    viewers: 156000,
    country: "Australia",
    timezone: "AEST",
  },
  {
    id: "cricket-3",
    title: "South Africa vs West Indies - T20",
    league: "T20 Cricket",
    category: "cricket",
    videoUrl: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/video.m3u8",
    teams: { home: "South Africa", away: "West Indies", homeScore: 178, awayScore: 142 },
    isLive: true,
    viewers: 89000,
    country: "South Africa",
    timezone: "SAST",
  },

  // NHL - CANADA & USA
  {
    id: "nhl-1",
    title: "Toronto Maple Leafs vs Montreal Canadiens",
    league: "NHL",
    category: "hockey",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    teams: { home: "Toronto Maple Leafs", away: "Montreal Canadiens", homeScore: 4, awayScore: 3 },
    isLive: true,
    viewers: 134000,
    country: "Canada",
    timezone: "EST",
  },
  {
    id: "nhl-2",
    title: "Los Angeles Kings vs Vancouver Canucks",
    league: "NHL",
    category: "hockey",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    teams: { home: "Los Angeles Kings", away: "Vancouver Canucks", homeScore: 5, awayScore: 4 },
    isLive: true,
    viewers: 98000,
    country: "Canada",
    timezone: "PST",
  },

  // UFC / MMA
  {
    id: "ufc-1",
    title: "UFC Championship Bout - Heavyweight",
    league: "UFC",
    category: "mma",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    teams: { home: "Fighter A (Champion)", away: "Fighter B (Challenger)", homeScore: 3, awayScore: 0 },
    isLive: true,
    viewers: 187000,
    country: "USA",
    timezone: "PST",
  },
  {
    id: "ufc-2",
    title: "UFC - Lightweight Title Fight",
    league: "UFC",
    category: "mma",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    teams: { home: "Fighter C", away: "Fighter D", homeScore: 2, awayScore: 1 },
    isLive: true,
    viewers: 143000,
    country: "USA",
    timezone: "PST",
  },

  // BOXING
  {
    id: "boxing-1",
    title: "Championship Boxing - Heavyweight Title",
    league: "World Boxing",
    category: "boxing",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    teams: { home: "Champion", away: "Challenger", homeScore: 7, awayScore: 5 },
    isLive: true,
    viewers: 234000,
    country: "USA",
    timezone: "EST",
  },

  // FORMULA 1 - RACING
  {
    id: "f1-1",
    title: "Formula 1 Grand Prix",
    league: "Formula 1",
    category: "racing",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    teams: { home: "Max Verstappen", away: "Lewis Hamilton" },
    isLive: true,
    viewers: 267000,
    country: "Monaco",
    timezone: "CET",
  },
  {
    id: "f1-2",
    title: "Formula 1 - Qualifying Session",
    league: "Formula 1",
    category: "racing",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    teams: { home: "Charles Leclerc", away: "Fernando Alonso" },
    isLive: true,
    viewers: 145000,
    country: "Italy",
    timezone: "CET",
  },

  // MOTOGP - RACING
  {
    id: "motogp-1",
    title: "MotoGP Championship Race",
    league: "MotoGP",
    category: "racing",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x3ksqt.m3u8",
    teams: { home: "Bagnaia", away: "Martin" },
    isLive: true,
    viewers: 98000,
    country: "Spain",
    timezone: "CET",
  },

  // RUGBY
  {
    id: "rugby-1",
    title: "Six Nations - England vs France",
    league: "Six Nations",
    category: "rugby",
    videoUrl: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/video.m3u8",
    teams: { home: "England", away: "France", homeScore: 24, awayScore: 21 },
    isLive: true,
    viewers: 156000,
    country: "England",
    timezone: "GMT",
  },
  {
    id: "rugby-2",
    title: "Super Rugby - New Zealand vs Australia",
    league: "Super Rugby",
    category: "rugby",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    teams: { home: "Crusaders", away: "Brumbies", homeScore: 28, awayScore: 19 },
    isLive: true,
    viewers: 78000,
    country: "New Zealand",
    timezone: "NZST",
  },

  // GOLF
  {
    id: "golf-1",
    title: "The Masters - Final Round",
    league: "PGA Tour",
    category: "golf",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    teams: { home: "Player A", away: "Player B" },
    isLive: true,
    viewers: 234000,
    country: "USA",
    timezone: "EST",
  },
  {
    id: "golf-2",
    title: "US Open Golf Championship",
    league: "USGA",
    category: "golf",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    teams: { home: "Player C", away: "Player D" },
    isLive: true,
    viewers: 178000,
    country: "USA",
    timezone: "EST",
  },

  // VOLLEYBALL
  {
    id: "volleyball-1",
    title: "Olympic Volleyball - Women's Final",
    league: "Olympics",
    category: "volleyball",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    teams: { home: "Japan", away: "Brazil", homeScore: 3, awayScore: 1 },
    isLive: true,
    viewers: 123000,
    country: "France",
    timezone: "CET",
  },

  // MAJOR LEAGUE SOCCER - USA
  {
    id: "mls-1",
    title: "Los Angeles FC vs New York City FC",
    league: "MLS",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    teams: { home: "LAFC", away: "NYCFC", homeScore: 2, awayScore: 1 },
    isLive: true,
    viewers: 87000,
    country: "USA",
    timezone: "PST",
  },

  // CHAMPIONS LEAGUE
  {
    id: "cl-1",
    title: "UEFA Champions League - Quarter Final",
    league: "UEFA Champions League",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    teams: { home: "Real Madrid", away: "Bayern Munich", homeScore: 3, awayScore: 2 },
    isLive: true,
    viewers: 312000,
    country: "Spain",
    timezone: "CET",
  },

  // WORLD CUP QUALIFIER
  {
    id: "wc-1",
    title: "World Cup Qualifier - Brazil vs Argentina",
    league: "FIFA World Cup",
    category: "soccer",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    teams: { home: "Brazil", away: "Argentina", homeScore: 1, awayScore: 0 },
    isLive: true,
    viewers: 456000,
    country: "Brazil",
    timezone: "BRT",
  },

  // MORE LEAGUES & INTERNATIONAL
  {
    id: "j1-1",
    title: "J-League - Tokyo FC vs Osaka",
    league: "J-League",
    category: "soccer",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x3ksqt.m3u8",
    teams: { home: "FC Tokyo", away: "Osaka", homeScore: 2, awayScore: 1 },
    isLive: true,
    viewers: 67000,
    country: "Japan",
    timezone: "JST",
  },
  {
    id: "kl-1",
    title: "K-League - Seoul FC vs Busan",
    league: "K-League",
    category: "soccer",
    videoUrl: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/video.m3u8",
    teams: { home: "Seoul FC", away: "Busan", homeScore: 3, awayScore: 2 },
    isLive: true,
    viewers: 54000,
    country: "South Korea",
    timezone: "KST",
  },
  {
    id: "cba-1",
    title: "CBA China Basketball - Beijing vs Shanghai",
    league: "CBA",
    category: "basketball",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    teams: { home: "Beijing Ducks", away: "Shanghai Sharks", homeScore: 108, awayScore: 102 },
    isLive: true,
    viewers: 145000,
    country: "China",
    timezone: "CST",
  },
  {
    id: "afl-1",
    title: "Australian Rules Football - Melbourne vs Sydney",
    league: "AFL",
    category: "football",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    teams: { home: "Melbourne Demons", away: "Sydney Swans", homeScore: 87, awayScore: 79 },
    isLive: true,
    viewers: 98000,
    country: "Australia",
    timezone: "AEST",
  },
  {
    id: "afl-2",
    title: "AFL - Brisbane vs West Coast",
    league: "AFL",
    category: "football",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    teams: { home: "Brisbane Lions", away: "West Coast Eagles", homeScore: 92, awayScore: 84 },
    isLive: true,
    viewers: 76000,
    country: "Australia",
    timezone: "AEST",
  },
]

export function getAllLiveSports() {
  return LIVE_SPORTS_STREAMS
}

export function getLiveSportsNow() {
  return LIVE_SPORTS_STREAMS.filter((sport) => sport.isLive)
}

export function getLiveSportsByCategory(category: string) {
  return LIVE_SPORTS_STREAMS.filter((sport) => sport.category === category)
}

export function getLiveSportsByCountry(country: string) {
  return LIVE_SPORTS_STREAMS.filter((sport) => sport.country === country)
}

export function getLiveSportById(id: string) {
  return LIVE_SPORTS_STREAMS.find((sport) => sport.id === id)
}
