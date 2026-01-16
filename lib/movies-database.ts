// Comprehensive movie database with 2000 movies for production
export interface Movie {
  id: string
  title: string
  description: string
  category:
    | "sports"
    | "movies"
    | "anime"
    | "music"
    | "comedy"
    | "live"
    | "documentary"
    | "thriller"
    | "romance"
    | "action"
    | "horror"
    | "family"
  genre: string
  thumbnail: string
  videoUrl: string
  duration: string
  rating: number
  releaseYear: number
  featured: boolean
  requiredPlan: "basic" | "premium" | "family"
  director?: string
  cast?: string[]
  isLive?: boolean
  liveViewers?: number
}

export interface LiveSport {
  id: string
  title: string
  league: string
  teams: { home: string; away: string; homeScore?: number; awayScore?: number }
  thumbnail: string
  videoUrl: string
  startTime: string
  isLive: boolean
  viewers: number
  category:
    | "football"
    | "basketball"
    | "tennis"
    | "soccer"
    | "mma"
    | "boxing"
    | "racing"
    | "baseball"
    | "hockey"
    | "golf"
    | "cricket"
    | "rugby"
}

// Video sources for movies
const VIDEO_SOURCES = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
]

// Movie titles by category
const MOVIE_TITLES = {
  action: [
    "The Last Stand",
    "Fury Road",
    "Thunder Strike",
    "Iron Fist",
    "Shadow Warrior",
    "Night Hawk",
    "Storm Chaser",
    "Dark Phoenix",
    "Steel Battalion",
    "Crimson Tide",
    "Eagle Eye",
    "Black Ops",
    "Rapid Fire",
    "Hard Target",
    "Dead Zone",
    "Final Mission",
    "Code Red",
    "Danger Zone",
    "First Blood",
    "Critical Mass",
    "Point Break",
    "Heat Wave",
    "Lethal Force",
    "Maximum Impact",
    "Total Recall",
    "Rampage",
    "Assault",
    "Extreme Measures",
    "Collateral Damage",
    "Terminal Velocity",
    "Sudden Death",
    "Under Siege",
    "Executive Decision",
    "Air Force One",
    "Eraser",
    "The Rock",
    "Con Air",
    "Face/Off",
    "Bad Boys",
    "The Marine",
    "Commando",
    "Predator",
    "Aliens",
    "Die Hard",
    "Speed",
    "True Lies",
    "Mission Impossible",
    "The Bourne Identity",
    "Casino Royale",
    "Skyfall",
  ],
  thriller: [
    "Gone Girl",
    "Shutter Island",
    "Black Swan",
    "Prisoners",
    "Zodiac",
    "Se7en",
    "The Silence",
    "Nightcrawler",
    "The Girl on the Train",
    "A Quiet Place",
    "Don't Breathe",
    "Split",
    "Get Out",
    "Us",
    "The Invisible Man",
    "Parasite",
    "Old Boy",
    "Memento",
    "The Sixth Sense",
    "Unbreakable",
    "Signs",
    "The Others",
    "Identity",
    "Secret Window",
    "The Number 23",
    "The Game",
    "Panic Room",
    "Phone Booth",
    "Collateral",
    "No Country for Old Men",
    "There Will Be Blood",
    "The Departed",
    "Mystic River",
    "Gone Baby Gone",
    "The Town",
    "Argo",
    "The Accountant",
    "Wind River",
    "Sicario",
    "Hell or High Water",
    "Nocturnal Animals",
    "Enemy",
    "Arrival",
    "Annihilation",
    "Ex Machina",
    "The Machinist",
    "Requiem for a Dream",
    "Pi",
    "Black Mirror",
    "Dark",
    "Mindhunter",
  ],
  romance: [
    "The Notebook",
    "Titanic",
    "A Star Is Born",
    "La La Land",
    "Pride and Prejudice",
    "Casablanca",
    "Roman Holiday",
    "When Harry Met Sally",
    "Pretty Woman",
    "Notting Hill",
    "Love Actually",
    "The Proposal",
    "Crazy Rich Asians",
    "To All the Boys I've Loved Before",
    "The Fault in Our Stars",
    "Me Before You",
    "P.S. I Love You",
    "Dear John",
    "The Vow",
    "Safe Haven",
    "The Lucky One",
    "Endless Love",
    "A Walk to Remember",
    "Sweet Home Alabama",
    "How to Lose a Guy in 10 Days",
    "27 Dresses",
    "The Wedding Planner",
    "Maid in Manhattan",
    "Two Weeks Notice",
    "Serendipity",
    "Kate & Leopold",
    "You've Got Mail",
    "Sleepless in Seattle",
    "The Holiday",
    "Valentine's Day",
    "New Year's Eve",
    "What Happens in Vegas",
    "Just Go with It",
    "The Ugly Truth",
    "Leap Year",
    "Letters to Juliet",
    "Monte Carlo",
    "The Tourist",
    "Midnight in Paris",
    "Before Sunrise",
    "Before Sunset",
    "Before Midnight",
    "Eternal Sunshine",
    "500 Days of Summer",
    "Silver Linings",
  ],
  horror: [
    "The Conjuring",
    "Insidious",
    "Annabelle",
    "The Nun",
    "It",
    "The Shining",
    "Hereditary",
    "Midsommar",
    "The Witch",
    "The Lighthouse",
    "Suspiria",
    "Candyman",
    "Halloween",
    "Scream",
    "A Nightmare on Elm Street",
    "Friday the 13th",
    "The Texas Chainsaw Massacre",
    "Saw",
    "Hostel",
    "The Hills Have Eyes",
    "Wrong Turn",
    "The Descent",
    "The Orphanage",
    "The Ring",
    "The Grudge",
    "Dark Water",
    "Sinister",
    "The Babadook",
    "It Follows",
    "The Invitation",
    "Green Room",
    "Ready or Not",
    "Happy Death Day",
    "Truth or Dare",
    "Ouija",
    "Lights Out",
    "Don't Knock Twice",
    "The Boy",
    "Malignant",
    "Old",
    "The Forever Purge",
    "A Quiet Place Part II",
    "Army of the Dead",
    "Fear Street",
    "Black Phone",
    "Nope",
    "Smile",
    "Barbarian",
    "Pearl",
    "X",
    "Terrifier",
  ],
  comedy: [
    "Superbad",
    "The Hangover",
    "Bridesmaids",
    "21 Jump Street",
    "Step Brothers",
    "Anchorman",
    "Talladega Nights",
    "Blades of Glory",
    "Napoleon Dynamite",
    "Zoolander",
    "Tropic Thunder",
    "This Is The End",
    "Pineapple Express",
    "Knocked Up",
    "The 40-Year-Old Virgin",
    "Forgetting Sarah Marshall",
    "I Love You Man",
    "Role Models",
    "Hot Tub Time Machine",
    "Due Date",
    "The Other Guys",
    "Horrible Bosses",
    "We're the Millers",
    "Central Intelligence",
    "Ride Along",
    "Get Hard",
    "Ted",
    "Ted 2",
    "A Million Ways to Die in the West",
    "Movie 43",
    "The Interview",
    "Neighbors",
    "Bad Neighbors 2",
    "Mike and Dave Need Wedding Dates",
    "Blockers",
    "Game Night",
    "Tag",
    "Good Boys",
    "Booksmart",
    "The Hustle",
    "Long Shot",
    "Isn't It Romantic",
    "Palm Springs",
    "Bill & Ted Face the Music",
    "Free Guy",
    "The Suicide Squad",
    "Barb and Star",
    "Jackass Forever",
  ],
  family: [
    "Finding Nemo",
    "Frozen",
    "Toy Story",
    "The Incredibles",
    "Moana",
    "Coco",
    "Inside Out",
    "Up",
    "WALL-E",
    "Ratatouille",
    "Monsters Inc",
    "Cars",
    "A Bug's Life",
    "Brave",
    "Tangled",
    "Big Hero 6",
    "Zootopia",
    "Wreck-It Ralph",
    "The Lion King",
    "Aladdin",
    "Beauty and the Beast",
    "The Little Mermaid",
    "Pocahontas",
    "Mulan",
    "Tarzan",
    "The Emperor's New Groove",
    "Lilo & Stitch",
    "Brother Bear",
    "Meet the Robinsons",
    "Bolt",
    "The Princess and the Frog",
    "Enchanted",
    "Shrek",
    "Shrek 2",
    "Kung Fu Panda",
    "How to Train Your Dragon",
    "Madagascar",
    "Despicable Me",
    "Minions",
    "The Secret Life of Pets",
    "Sing",
    "Trolls",
    "The Boss Baby",
    "Ferdinand",
    "The Grinch",
    "Abominable",
    "Onward",
    "Soul",
    "Luca",
    "Encanto",
    "Turning Red",
    "Elemental",
  ],
  documentary: [
    "Planet Earth",
    "Blue Planet",
    "Our Planet",
    "March of the Penguins",
    "An Inconvenient Truth",
    "Blackfish",
    "The Cove",
    "Free Solo",
    "Won't You Be My Neighbor",
    "RBG",
    "Apollo 11",
    "Icarus",
    "Wild Wild Country",
    "Making a Murderer",
    "The Social Dilemma",
    "13th",
    "I Am Not Your Negro",
    "Citizenfour",
    "The Act of Killing",
    "Grizzly Man",
    "Exit Through the Gift Shop",
    "Bowling for Columbine",
    "Super Size Me",
    "Food Inc",
    "The True Cost",
    "Before the Flood",
    "Chasing Ice",
    "Racing Extinction",
    "Cowspiracy",
    "What the Health",
    "The Game Changers",
    "Seaspiracy",
    "My Octopus Teacher",
    "American Factory",
    "Time",
    "Crip Camp",
    "Boys State",
    "Dick Johnson Is Dead",
    "Collective",
    "All In: The Fight for Democracy",
    "MLK/FBI",
    "Roadrunner",
    "Summer of Soul",
    "Flee",
    "Navalny",
  ],
  anime: [
    "Spirited Away",
    "Princess Mononoke",
    "My Neighbor Totoro",
    "Howl's Moving Castle",
    "Ponyo",
    "Kiki's Delivery Service",
    "Castle in the Sky",
    "Nausicaa",
    "The Wind Rises",
    "Porco Rosso",
    "Akira",
    "Ghost in the Shell",
    "Perfect Blue",
    "Paprika",
    "Your Name",
    "Weathering with You",
    "A Silent Voice",
    "The Garden of Words",
    "5 Centimeters Per Second",
    "Wolf Children",
    "Summer Wars",
    "The Girl Who Leapt Through Time",
    "Belle",
    "Mirai",
    "Promare",
    "Dragon Ball Super",
    "One Piece Film Red",
    "Jujutsu Kaisen 0",
    "Demon Slayer Mugen Train",
    "My Hero Academia: Heroes Rising",
    "Evangelion 3.0+1.0",
    "Sword Art Online Progressive",
    "Fate/Stay Night Heaven's Feel",
    "Made in Abyss",
    "Violet Evergarden",
    "The Promised Neverland",
    "Attack on Titan Final",
    "Spy x Family",
    "Chainsaw Man",
    "Bocchi the Rock",
    "Cyberpunk Edgerunners",
    "Mob Psycho 100",
    "One Punch Man",
    "Tokyo Ghoul",
    "Death Note",
    "Fullmetal Alchemist",
    "Hunter x Hunter",
    "Naruto",
    "Bleach",
    "Black Clover",
  ],
  music: [
    "Bohemian Rhapsody",
    "Rocketman",
    "A Star Is Born",
    "8 Mile",
    "Straight Outta Compton",
    "Walk the Line",
    "Ray",
    "Get On Up",
    "Jersey Boys",
    "Mamma Mia",
    "La La Land",
    "Sing Street",
    "Baby Driver",
    "Whiplash",
    "Pitch Perfect",
    "High School Musical",
    "Footloose",
    "Dirty Dancing",
    "Grease",
    "Saturday Night Fever",
    "The Blues Brothers",
    "Purple Rain",
    "This Is It",
    "Amy",
    "Whitney",
    "Billie Eilish Documentary",
    "Taylor Swift: The Eras Tour",
    "Beyonce Homecoming",
    "BTS: Yet to Come",
    "Blackpink: The Movie",
    "Coldplay: Music of the Spheres",
    "Ed Sheeran: The Sum of It All",
    "Bruno Mars: 24K Magic Live",
    "Adele: One Night Only",
    "Ariana Grande: Excuse Me I Love You",
    "Lady Gaga: Five Foot Two",
    "Katy Perry: Witness",
    "Justin Bieber: Never Say Never",
    "One Direction: This Is Us",
    "Woodstock 99",
    "Coachella Documentary",
    "Glastonbury Festival",
    "Lollapalooza",
    "MTV Unplugged",
    "VH1 Storytellers",
    "Austin City Limits",
    "Tiny Desk Concerts",
    "NPR Music",
    "BBC Radio 1 Live Lounge",
  ],
  live: [
    "Broadway: Hamilton Live",
    "Les Miserables 25th Anniversary",
    "Phantom of the Opera",
    "Cats: The Musical",
    "The Lion King Musical",
    "Wicked Live",
    "Dear Evan Hansen",
    "Rent Live",
    "Jesus Christ Superstar Live",
    "Grease Live",
    "Hairspray Live",
    "The Sound of Music Live",
    "Peter Pan Live",
    "The Wiz Live",
    "A Christmas Story Live",
    "Annie Live",
    "Chicago Live",
    "Cabaret",
    "Company",
    "Hadestown",
    "Moulin Rouge",
    "Six: The Musical",
    "Come From Away",
    "The Prom",
    "Beetlejuice",
    "Mean Girls",
    "Frozen: The Musical",
    "Aladdin: The Musical",
    "The Book of Mormon",
    "Avenue Q",
    "Kinky Boots",
    "Newsies",
    "Mary Poppins",
    "Matilda",
    "Miss Saigon",
    "Evita",
    "Sweeney Todd",
    "Into the Woods",
    "Sunday in the Park with George",
    "A Little Night Music",
    "Follies",
    "Merrily We Roll Along",
    "Assassins",
    "Pacific Overtures",
    "Passion",
    "Company 2022",
    "West Side Story Revival",
    "Oklahoma Revival",
    "Carousel Revival",
  ],
}

const DIRECTORS = [
  "Christopher Nolan",
  "Steven Spielberg",
  "Martin Scorsese",
  "Quentin Tarantino",
  "Denis Villeneuve",
  "Ridley Scott",
  "David Fincher",
  "James Cameron",
  "Peter Jackson",
  "Guillermo del Toro",
  "Alfonso Cuarón",
  "Alejandro González Iñárritu",
  "The Coen Brothers",
  "Wes Anderson",
  "Paul Thomas Anderson",
  "Darren Aronofsky",
  "Damien Chazelle",
  "Jordan Peele",
  "Ari Aster",
  "Robert Eggers",
  "Greta Gerwig",
  "Chloe Zhao",
  "Barry Jenkins",
  "Bong Joon-ho",
  "Park Chan-wook",
  "Hayao Miyazaki",
  "Makoto Shinkai",
  "Satoshi Kon",
  "Mamoru Hosoda",
  "Isao Takahata",
]

const ACTORS = [
  "Leonardo DiCaprio",
  "Brad Pitt",
  "Tom Hanks",
  "Denzel Washington",
  "Robert Downey Jr.",
  "Christian Bale",
  "Joaquin Phoenix",
  "Cillian Murphy",
  "Ryan Gosling",
  "Oscar Isaac",
  "Timothée Chalamet",
  "Austin Butler",
  "Florence Pugh",
  "Zendaya",
  "Ana de Armas",
  "Margot Robbie",
  "Scarlett Johansson",
  "Jennifer Lawrence",
  "Emma Stone",
  "Saoirse Ronan",
  "Meryl Streep",
  "Cate Blanchett",
  "Viola Davis",
  "Lupita Nyong'o",
  "Michelle Yeoh",
  "Sandra Bullock",
  "Julia Roberts",
  "Anne Hathaway",
  "Natalie Portman",
  "Charlize Theron",
]

const GENRES = {
  action: ["Action", "Action/Adventure", "Action/Sci-Fi", "Action/Thriller", "Action/Comedy"],
  thriller: ["Thriller", "Psychological Thriller", "Crime Thriller", "Mystery/Thriller", "Tech Thriller"],
  romance: ["Romance", "Romantic Comedy", "Romantic Drama", "Period Romance", "Contemporary Romance"],
  horror: ["Horror", "Supernatural Horror", "Slasher", "Psychological Horror", "Found Footage"],
  comedy: ["Comedy", "Romantic Comedy", "Dark Comedy", "Satire", "Parody"],
  family: ["Family", "Animation", "Adventure/Family", "Fantasy/Family", "Musical/Family"],
  documentary: ["Documentary", "Nature Documentary", "True Crime", "Biography", "Social Documentary"],
  anime: ["Anime", "Anime/Action", "Anime/Romance", "Anime/Fantasy", "Anime/Sci-Fi"],
  music: ["Musical", "Music Documentary", "Concert Film", "Biopic/Music", "Dance"],
  live: ["Live Theatre", "Musical Theatre", "Opera", "Dance Performance", "Stand-up Comedy"],
  sports: ["Sports", "Sports Documentary", "Live Sports", "Motorsports", "Combat Sports"],
}

// Generate 2000 movies
function generateMovies(): Movie[] {
  const movies: Movie[] = []
  const categories = Object.keys(MOVIE_TITLES) as Array<keyof typeof MOVIE_TITLES>

  let movieId = 1

  // Generate movies for each category
  categories.forEach((category) => {
    const titles = MOVIE_TITLES[category]
    const genreList = GENRES[category] || ["General"]

    // Generate multiple variations per title to reach 2000
    for (let variation = 0; variation < 4; variation++) {
      titles.forEach((title, index) => {
        const adjustedTitle =
          variation === 0
            ? title
            : variation === 1
              ? `${title} 2`
              : variation === 2
                ? `${title}: Reloaded`
                : `${title}: The Final Chapter`

        const releaseYear = 2020 + Math.floor(Math.random() * 5)
        const rating = 3.5 + Math.random() * 1.5
        const duration = `${Math.floor(90 + Math.random() * 90)}m`
        const videoIndex = movieId % VIDEO_SOURCES.length
        const directorIndex = movieId % DIRECTORS.length
        const genreIndex = movieId % genreList.length

        const cast = [
          ACTORS[movieId % ACTORS.length],
          ACTORS[(movieId + 1) % ACTORS.length],
          ACTORS[(movieId + 2) % ACTORS.length],
        ]

        const movie: Movie = {
          id: `movie-${movieId}`,
          title: adjustedTitle,
          description: `${adjustedTitle} - A ${genreList[genreIndex].toLowerCase()} masterpiece that will keep you on the edge of your seat. Experience the thrilling journey of unforgettable characters in this ${releaseYear} blockbuster.`,
          category:
            category === "action" ||
            category === "thriller" ||
            category === "romance" ||
            category === "horror" ||
            category === "family" ||
            category === "documentary"
              ? "movies"
              : (category as Movie["category"]),
          genre: genreList[genreIndex],
          thumbnail: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(adjustedTitle + " movie poster")}`,
          videoUrl: VIDEO_SOURCES[videoIndex],
          duration,
          rating: Number(rating.toFixed(1)),
          releaseYear,
          featured: movieId <= 50 || Math.random() > 0.9,
          requiredPlan: movieId % 3 === 0 ? "premium" : movieId % 5 === 0 ? "family" : "basic",
          director: DIRECTORS[directorIndex],
          cast,
        }

        movies.push(movie)
        movieId++

        if (movieId > 2000) return
      })
      if (movieId > 2000) return
    }
  })

  return movies.slice(0, 2000)
}

// Generate live sports events
function generateLiveSports(): LiveSport[] {
  const sports: LiveSport[] = []

  const sportsData = {
    soccer: {
      leagues: [
        "Premier League",
        "La Liga",
        "Serie A",
        "Bundesliga",
        "Ligue 1",
        "Champions League",
        "MLS",
        "World Cup",
      ],
      teams: [
        ["Manchester United", "Liverpool"],
        ["Real Madrid", "Barcelona"],
        ["AC Milan", "Inter Milan"],
        ["Bayern Munich", "Borussia Dortmund"],
        ["PSG", "Lyon"],
        ["Manchester City", "Arsenal"],
        ["Chelsea", "Tottenham"],
        ["Juventus", "Napoli"],
        ["Atletico Madrid", "Sevilla"],
        ["Ajax", "PSV"],
        ["Benfica", "Porto"],
        ["LA Galaxy", "LAFC"],
        ["Atlanta United", "NYC FC"],
        ["Brazil", "Argentina"],
        ["France", "England"],
        ["Germany", "Spain"],
        ["Portugal", "Netherlands"],
      ],
    },
    basketball: {
      leagues: ["NBA", "EuroLeague", "March Madness", "WNBA", "Olympics"],
      teams: [
        ["Lakers", "Celtics"],
        ["Warriors", "Cavaliers"],
        ["Heat", "Spurs"],
        ["Bulls", "Pistons"],
        ["Bucks", "Nets"],
        ["Suns", "Nuggets"],
        ["76ers", "Raptors"],
        ["Mavericks", "Rockets"],
        ["Clippers", "Thunder"],
        ["Grizzlies", "Pelicans"],
        ["Jazz", "Timberwolves"],
        ["Hawks", "Hornets"],
        ["Duke", "UNC"],
        ["Kentucky", "Kansas"],
        ["UCLA", "Gonzaga"],
        ["USA", "Spain"],
      ],
    },
    football: {
      leagues: ["NFL", "College Football", "XFL", "Canadian Football"],
      teams: [
        ["Chiefs", "49ers"],
        ["Patriots", "Cowboys"],
        ["Packers", "Bears"],
        ["Steelers", "Ravens"],
        ["Eagles", "Giants"],
        ["Seahawks", "Rams"],
        ["Bills", "Dolphins"],
        ["Broncos", "Raiders"],
        ["Alabama", "Georgia"],
        ["Ohio State", "Michigan"],
        ["Clemson", "LSU"],
        ["Texas", "Oklahoma"],
        ["USC", "Notre Dame"],
        ["Florida State", "Miami"],
        ["Penn State", "Wisconsin"],
      ],
    },
    tennis: {
      leagues: ["ATP Tour", "WTA Tour", "Grand Slam", "Davis Cup"],
      teams: [
        ["Djokovic", "Alcaraz"],
        ["Sinner", "Medvedev"],
        ["Nadal", "Federer"],
        ["Zverev", "Tsitsipas"],
        ["Swiatek", "Sabalenka"],
        ["Gauff", "Rybakina"],
        ["USA", "Spain"],
        ["Serbia", "Italy"],
        ["Ruud", "Rublev"],
        ["Tiafoe", "Fritz"],
        ["Pegula", "Osaka"],
        ["Australia", "France"],
      ],
    },
    mma: {
      leagues: ["UFC", "Bellator", "ONE Championship", "PFL"],
      teams: [
        ["Jones", "Aspinall"],
        ["Makhachev", "Oliveira"],
        ["Adesanya", "Pereira"],
        ["Edwards", "Usman"],
        ["Volkanovski", "Topuria"],
        ["O'Malley", "Merab"],
        ["Pantoja", "Moreno"],
        ["Grasso", "Shevchenko"],
        ["Ngannou", "Fury"],
        ["McGregor", "Chandler"],
        ["Poirier", "Gaethje"],
        ["Yan", "Sterling"],
      ],
    },
    boxing: {
      leagues: ["WBC", "WBA", "IBF", "WBO", "Heavyweight", "Pound for Pound"],
      teams: [
        ["Usyk", "Fury"],
        ["Canelo", "Benavidez"],
        ["Crawford", "Spence"],
        ["Tank Davis", "Ryan Garcia"],
        ["Inoue", "Nery"],
        ["Beterbiev", "Bivol"],
        ["Haney", "Lomachenko"],
        ["Joshua", "Wilder"],
        ["Stevenson", "Valdez"],
        ["Fundora", "Charlo"],
        ["Berlanga", "Benavidez Jr"],
        ["Ennis", "Ortiz"],
      ],
    },
    racing: {
      leagues: ["Formula 1", "NASCAR", "IndyCar", "MotoGP", "WRC"],
      teams: [
        ["Verstappen", "Hamilton"],
        ["Norris", "Leclerc"],
        ["Sainz", "Russell"],
        ["Piastri", "Perez"],
        ["Larson", "Elliott"],
        ["Busch", "Hamlin"],
        ["Logano", "Blaney"],
        ["Palou", "Power"],
        ["Bagnaia", "Martin"],
        ["Marquez", "Quartararo"],
        ["Rovanpera", "Neuville"],
        ["Ogier", "Tanak"],
      ],
    },
    baseball: {
      leagues: ["MLB", "World Series", "All-Star Game", "Playoffs"],
      teams: [
        ["Yankees", "Red Sox"],
        ["Dodgers", "Giants"],
        ["Cubs", "Cardinals"],
        ["Braves", "Mets"],
        ["Astros", "Rangers"],
        ["Phillies", "Padres"],
        ["Mariners", "Angels"],
        ["Blue Jays", "Rays"],
        ["Orioles", "Guardians"],
        ["Twins", "Tigers"],
        ["Brewers", "Reds"],
        ["Rockies", "Diamondbacks"],
      ],
    },
    hockey: {
      leagues: ["NHL", "Stanley Cup", "Olympics", "World Championship"],
      teams: [
        ["Oilers", "Panthers"],
        ["Rangers", "Devils"],
        ["Bruins", "Maple Leafs"],
        ["Avalanche", "Stars"],
        ["Golden Knights", "Kings"],
        ["Hurricanes", "Lightning"],
        ["Wild", "Jets"],
        ["Capitals", "Penguins"],
        ["Canada", "USA"],
        ["Sweden", "Finland"],
        ["Russia", "Czech Republic"],
        ["Blackhawks", "Red Wings"],
      ],
    },
    golf: {
      leagues: ["PGA Tour", "LIV Golf", "Ryder Cup", "Masters"],
      teams: [
        ["Scheffler", "McIlroy"],
        ["Rahm", "Koepka"],
        ["Hovland", "Morikawa"],
        ["Thomas", "Spieth"],
        ["USA", "Europe"],
        ["DeChambeau", "Johnson"],
        ["Woods", "Mickelson"],
        ["Finau", "Cantlay"],
      ],
    },
    cricket: {
      leagues: ["IPL", "T20 World Cup", "Test Match", "ODI World Cup", "The Ashes"],
      teams: [
        ["India", "Australia"],
        ["England", "Pakistan"],
        ["New Zealand", "South Africa"],
        ["West Indies", "Sri Lanka"],
        ["Mumbai Indians", "Chennai Super Kings"],
        ["Royal Challengers", "Kolkata Knight Riders"],
        ["Delhi Capitals", "Punjab Kings"],
        ["Rajasthan Royals", "Sunrisers Hyderabad"],
      ],
    },
    rugby: {
      leagues: ["Six Nations", "Rugby World Cup", "Super Rugby", "Premiership"],
      teams: [
        ["New Zealand", "South Africa"],
        ["England", "France"],
        ["Ireland", "Wales"],
        ["Australia", "Argentina"],
        ["Crusaders", "Blues"],
        ["Leinster", "Toulouse"],
        ["Saracens", "Harlequins"],
        ["Scotland", "Italy"],
      ],
    },
  }

  let sportId = 1

  Object.entries(sportsData).forEach(([category, data]) => {
    data.leagues.forEach((league) => {
      data.teams.forEach(([home, away]) => {
        const isLive = Math.random() > 0.3 // 70% chance of being live
        const viewers = Math.floor(10000 + Math.random() * 990000)
        const homeScore = isLive ? Math.floor(Math.random() * 5) : undefined
        const awayScore = isLive ? Math.floor(Math.random() * 5) : undefined

        // Generate start time within next 24 hours
        const now = new Date()
        const startOffset = Math.floor(Math.random() * 24 * 60) - 120 // -2 hours to +22 hours
        const startTime = new Date(now.getTime() + startOffset * 60 * 1000)

        const sport: LiveSport = {
          id: `live-sport-${sportId}`,
          title: `${home} vs ${away}`,
          league,
          teams: { home, away, homeScore, awayScore },
          thumbnail: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${home} vs ${away} ${category}`)}`,
          videoUrl: VIDEO_SOURCES[sportId % VIDEO_SOURCES.length],
          startTime: startTime.toISOString(),
          isLive,
          viewers,
          category: category as LiveSport["category"],
        }

        sports.push(sport)
        sportId++
      })
    })
  })

  return sports
}

// Generate all content
export const MOVIES_DATABASE: Movie[] = generateMovies()
export const LIVE_SPORTS_DATABASE: LiveSport[] = generateLiveSports()

// Helper functions
export function getAllMovies(): Movie[] {
  return MOVIES_DATABASE
}

export function getMovieById(id: string): Movie | undefined {
  return MOVIES_DATABASE.find((movie) => movie.id === id)
}

export function getMoviesByCategory(category: Movie["category"]): Movie[] {
  return MOVIES_DATABASE.filter((movie) => movie.category === category)
}

export function getFeaturedMovies(): Movie[] {
  return MOVIES_DATABASE.filter((movie) => movie.featured)
}

export function searchMovies(query: string): Movie[] {
  const lowerQuery = query.toLowerCase()
  return MOVIES_DATABASE.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.genre.toLowerCase().includes(lowerQuery) ||
      movie.description.toLowerCase().includes(lowerQuery) ||
      movie.director?.toLowerCase().includes(lowerQuery) ||
      movie.cast?.some((actor) => actor.toLowerCase().includes(lowerQuery)),
  )
}

export function getMoviesByGenre(genre: string): Movie[] {
  return MOVIES_DATABASE.filter((movie) => movie.genre.toLowerCase().includes(genre.toLowerCase()))
}

export function getLatestMovies(limit = 50): Movie[] {
  return [...MOVIES_DATABASE].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, limit)
}

export function getTopRatedMovies(limit = 50): Movie[] {
  return [...MOVIES_DATABASE].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

// Live sports helpers
import { LIVE_SPORTS_STREAMS } from "./live-sports-streams"

export function getAllLiveSports(): LiveSport[] {
  return LIVE_SPORTS_STREAMS
}

export function getLiveSportById(id: string): LiveSport | undefined {
  return LIVE_SPORTS_STREAMS.find((sport) => sport.id === id)
}

export function getLiveSportsNow(): LiveSport[] {
  return LIVE_SPORTS_STREAMS.filter((sport) => sport.isLive)
}

export function getUpcomingSports(): LiveSport[] {
  const now = new Date()
  const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000)

  return LIVE_SPORTS_STREAMS.filter((sport) => {
    const startTime = new Date(sport.startTime)
    return startTime > now && startTime <= in48Hours && !sport.isLive
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
}

export function getLiveSportsByCategory(category: string): LiveSport[] {
  return LIVE_SPORTS_STREAMS.filter((sport) => sport.category === category)
}
