export type Activity = {
  id: string
  name: { en: string; zh: string }
  description: { en: string; zh: string }
  type: "main" | "food" | "hidden-gem"
  icon: string // lucide icon name
  link?: string
}

export type CustomSpot = {
  id: string
  name: string
  url: string
  lat?: number
  lng?: number
  addedAt: number
}

export type DayData = {
  day: number
  date: string
  weekday: { en: string; zh: string }
  title: { en: string; zh: string }
  location: { en: string; zh: string }
  accommodation: { en: string; zh: string }
  region: "hokkaido" | "kansai"
  heroImage: string
  cardImage: string
  activities: Activity[]
}

export const itineraryData: DayData[] = [
  {
    day: 1,
    date: "2/27",
    weekday: { en: "Fri", zh: "周五" },
    title: { en: "Arrival in Sapporo", zh: "抵达札幌" },
    location: { en: "Sapporo", zh: "札幌" },
    accommodation: { en: "JR Inn Sapporo", zh: "JR Inn 札幌" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-sapporo.jpg",
    activities: [
      {
        id: "d1-1",
        name: { en: "New Chitose Airport Arrival", zh: "抵达新千岁机场" },
        description: {
          en: "Land at New Chitose Airport and take the JR train to Sapporo (37 min).",
          zh: "抵达新千岁机场，乘坐JR快速列车前往札幌（37分钟）。",
        },
        type: "main",
        icon: "Plane",
      },
      {
        id: "d1-2",
        name: { en: "Odori Park & TV Tower", zh: "大通公园 & 电视塔" },
        description: {
          en: "Stroll through the park and capture the iconic TV Tower lit up at night.",
          zh: "漫步大通公园，拍摄夜晚亮灯的电视塔。",
        },
        type: "main",
        icon: "Camera",
      },
      {
        id: "d1-3",
        name: { en: "Soup Curry at Garaku", zh: "Garaku汤咖喱" },
        description: {
          en: "Try Sapporo's famous soup curry at Garaku in Susukino. Rich, aromatic, warming.",
          zh: "在薄野区的Garaku品尝札幌著名的汤咖喱，浓郁芳香、暖身暖心。",
        },
        type: "food",
        icon: "Soup",
      },
      {
        id: "d1-4",
        name: {
          en: "Hidden Gem: Bar Yamazaki",
          zh: "隐藏推荐：Bar Yamazaki",
        },
        description: {
          en: "A tiny whisky bar in Susukino run by a master bartender. Perfect nightcap in a cozy setting.",
          zh: "薄野一家迷你威士忌酒吧，由调酒大师经营，适合睡前来一杯。",
        },
        type: "hidden-gem",
        icon: "Wine",
      },
    ],
  },
  {
    day: 2,
    date: "2/28",
    weekday: { en: "Sat", zh: "周六" },
    title: { en: "Asahikawa Zoo & Drive to Biei", zh: "旭川动物园 & 前往美瑛" },
    location: { en: "Asahikawa → Biei", zh: "旭川 → 美瑛" },
    accommodation: { en: "Chill Village Biei", zh: "Chill Village 美瑛" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-biei.jpg",
    activities: [
      {
        id: "d2-1",
        name: { en: "Pick Up Rental Car in Sapporo", zh: "札幌取车" },
        description: {
          en: "Get your rental car and start the scenic 2.5hr drive north to Asahikawa.",
          zh: "取车后开始北上旭川，约2.5小时车程，沿途风景如画。",
        },
        type: "main",
        icon: "Car",
      },
      {
        id: "d2-2",
        name: {
          en: "Asahiyama Zoo - Penguin Walk",
          zh: "旭山动物园 - 企鹅散步",
        },
        description: {
          en: "Watch the famous penguin parade! Winter-only event, usually morning & afternoon sessions.",
          zh: "观看超人气冬季限定企鹅散步！通常上午和下午各一场。",
        },
        type: "main",
        icon: "Snowflake",
      },
      {
        id: "d2-3",
        name: { en: "Asahikawa Ramen Village", zh: "旭川拉面村" },
        description: {
          en: "Warm up with a bowl of Asahikawa-style soy sauce ramen. Rich and soul-warming.",
          zh: "来一碗正宗旭川酱油拉面暖暖身子，浓郁鲜美。",
        },
        type: "food",
        icon: "Soup",
      },
      {
        id: "d2-4",
        name: {
          en: "Hidden Gem: Ueno Farm (off-season charm)",
          zh: "隐藏推荐：上野农场冬日风情",
        },
        description: {
          en: "Even in winter, the snow-covered garden structures make for ethereal photos on the drive.",
          zh: "即使在冬天，被白雪覆盖的花园建筑也能拍出仙境般的照片。",
        },
        type: "hidden-gem",
        icon: "Flower2",
      },
    ],
  },
  {
    day: 3,
    date: "3/1",
    weekday: { en: "Sun", zh: "周日" },
    title: { en: "Biei Snow Day", zh: "美瑛雪景日" },
    location: { en: "Biei", zh: "美瑛" },
    accommodation: { en: "Chill Village Biei", zh: "Chill Village 美瑛" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-biei.jpg",
    activities: [
      {
        id: "d3-1",
        name: { en: "Shirogane Blue Pond", zh: "白金青池" },
        description: {
          en: "The famous blue pond draped in snow and dead trees. Winter illumination at night is magical.",
          zh: "被白雪和枯树点缀的著名青池，冬夜灯光秀更加梦幻。",
        },
        type: "main",
        icon: "Droplets",
      },
      {
        id: "d3-2",
        name: { en: "Shirohige Waterfall", zh: "白须瀑布" },
        description: {
          en: "Just minutes from Blue Pond, this waterfall flows over volcanic rock into a blue river.",
          zh: "距青池数分钟车程，瀑布从火山岩上倾泻而下，汇入蓝色河流。",
        },
        type: "main",
        icon: "Waves",
      },
      {
        id: "d3-3",
        name: {
          en: "Patchwork Road & Christmas Tree",
          zh: "拼布之路 & 圣诞树之木",
        },
        description: {
          en: "Drive the iconic snow-covered patchwork road and find the lone \"Christmas Tree\" standing in white fields.",
          zh: "驰骋在白雪覆盖的拼布之路上，寻找那棵伫立在白色雪原中的孤独圣诞树。",
        },
        type: "main",
        icon: "TreePine",
      },
      {
        id: "d3-4",
        name: {
          en: "Hidden Gem: Bi.ble Cafe",
          zh: "隐藏推荐：Bi.ble 咖啡馆",
        },
        description: {
          en: "A tiny local cafe in Biei serving incredible fresh milk soft-serve and local pastries. Ask for the \"Biei Milk\" latte.",
          zh: "美瑛当地一家小咖啡馆，提供超赞的新鲜牛奶冰淇淋和当地点心。记得点「美瑛牛奶」拿铁。",
        },
        type: "hidden-gem",
        icon: "Coffee",
      },
    ],
  },
  {
    day: 4,
    date: "3/2",
    weekday: { en: "Mon", zh: "周一" },
    title: { en: "Furano Ski Day", zh: "富良野滑雪日" },
    location: { en: "Furano", zh: "富良野" },
    accommodation: { en: "La Vista Furano Hills", zh: "La Vista 富良野" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-furano.jpg",
    activities: [
      {
        id: "d4-1",
        name: { en: "Furano Ski Resort", zh: "富良野滑雪场" },
        description: {
          en: "World-class powder snow! Hit the slopes for a full day of skiing or snowboarding.",
          zh: "世界级粉雪！享受一整天的滑雪或单板滑雪。",
        },
        type: "main",
        icon: "Mountain",
      },
      {
        id: "d4-2",
        name: {
          en: "Ningle Terrace (Fairy Forest)",
          zh: "森林精灵露台",
        },
        description: {
          en: "Enchanted forest of handcraft cabins glowing warmly in the snow at dusk. Pure fairy tale.",
          zh: "傍晚天刚黑时必去！积雪中木屋亮起暖黄灯光，纯粹的童话场景。",
        },
        type: "main",
        icon: "Sparkles",
      },
      {
        id: "d4-3",
        name: {
          en: "Furano Cheese Factory",
          zh: "富良野奶酪工坊",
        },
        description: {
          en: "Sample locally made cheese, butter, and ice cream. Try the cheese fondue set.",
          zh: "品尝当地制作的奶酪、黄油和冰淇淋，推荐芝士火锅套餐。",
        },
        type: "food",
        icon: "IceCreamCone",
      },
      {
        id: "d4-4",
        name: {
          en: "Hidden Gem: Furano Wine House",
          zh: "隐藏推荐：富良野红酒馆",
        },
        description: {
          en: "Sip local Hokkaido wines with stunning valley views. The grape juice here is unreal even if you don't drink.",
          zh: "品尝北海道当地葡萄酒，坐享山谷美景。即使不喝酒，这里的葡萄汁也令人惊艳。",
        },
        type: "hidden-gem",
        icon: "Wine",
      },
    ],
  },
  {
    day: 5,
    date: "3/3",
    weekday: { en: "Tue", zh: "周二" },
    title: { en: "Drive to Otaru", zh: "前往小樽" },
    location: { en: "Furano → Otaru", zh: "富良野 → 小樽" },
    accommodation: { en: "GRIDS Premium Hotel Otaru", zh: "GRIDS 小樽" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-otaru.jpg",
    activities: [
      {
        id: "d5-1",
        name: { en: "Scenic Drive to Otaru", zh: "风景公路前往小樽" },
        description: {
          en: "A beautiful 3hr drive through Hokkaido's interior to the coastal gem of Otaru.",
          zh: "穿越北海道内陆约3小时的美丽车程，前往海滨小城小樽。",
        },
        type: "main",
        icon: "Car",
      },
      {
        id: "d5-2",
        name: { en: "Sankaku (Triangle) Market", zh: "三角市场" },
        description: {
          en: "First stop: massive fresh seafood bowls at this local market. Get the uni & ikura don.",
          zh: "第一站：在这里吃海鲜盖饭，推荐海胆三文鱼子盖饭，鲜到爆！",
        },
        type: "food",
        icon: "Fish",
      },
      {
        id: "d5-3",
        name: { en: "Otaru Canal at Dusk", zh: "小樽运河黄昏漫步" },
        description: {
          en: "Watch the gas lamps flicker on along the stone warehouse-lined canal. Peak romance.",
          zh: "傍晚煤气灯亮起时最浪漫，沿着石仓库运河漫步。",
        },
        type: "main",
        icon: "Lamp",
      },
      {
        id: "d5-4",
        name: {
          en: "Hidden Gem: Naruto Fried Chicken",
          zh: "隐藏推荐：なると炸鸡",
        },
        description: {
          en: "A legendary local fried chicken shop near the canal. Crispy, juicy, and only known to locals.",
          zh: "运河附近一家传奇炸鸡店，外酥里嫩，只有当地人知道。",
        },
        type: "hidden-gem",
        icon: "Drumstick",
      },
    ],
  },
  {
    day: 6,
    date: "3/4",
    weekday: { en: "Wed", zh: "周三" },
    title: { en: "Otaru Deep Dive", zh: "小樽深度游" },
    location: { en: "Otaru", zh: "小樽" },
    accommodation: { en: "GRIDS Premium Hotel Otaru", zh: "GRIDS 小樽" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-otaru.jpg",
    activities: [
      {
        id: "d6-1",
        name: { en: "Sakaimachi Street Shopping", zh: "堺町通商店街" },
        description: {
          en: "Browse glass workshops, music boxes, and the famous LeTAO cheesecake shop.",
          zh: "逛玻璃工坊、音乐盒店，买LeTAO双层芝士蛋糕。",
        },
        type: "main",
        icon: "ShoppingBag",
      },
      {
        id: "d6-2",
        name: { en: "Otaru Music Box Museum", zh: "小樽音乐盒堂" },
        description: {
          en: "A mesmerizing museum with thousands of music boxes. The steam clock outside chimes every 15 min.",
          zh: "数千个音乐盒的梦幻博物馆，门外蒸汽钟每15分钟报时。",
        },
        type: "main",
        icon: "Music",
      },
      {
        id: "d6-3",
        name: {
          en: "Mount Tengu Ropeway",
          zh: "天狗山缆车",
        },
        description: {
          en: "Cable car ride up for panoramic views of Otaru harbor and the sea. A filming location for the movie \"Love Letter\".",
          zh: "乘缆车俯瞰小樽港全景（电影《情书》取景地）。",
        },
        type: "main",
        icon: "CableCar",
      },
      {
        id: "d6-4",
        name: {
          en: "Hidden Gem: Denuki Alley",
          zh: "隐藏推荐：出抜小路",
        },
        description: {
          en: "A tiny retro alley with izakayas and small bars. Try the local sake tasting set.",
          zh: "一条复古小巷，有居酒屋和小酒吧。推荐当地清酒品鉴套装。",
        },
        type: "hidden-gem",
        icon: "Beer",
      },
    ],
  },
  {
    day: 7,
    date: "3/5",
    weekday: { en: "Thu", zh: "周四" },
    title: { en: "Head Buddha & Back to Sapporo", zh: "头大佛 & 返回札幌" },
    location: { en: "Otaru → Sapporo", zh: "小樽 → 札幌" },
    accommodation: { en: "Via Inn Prime Sapporo", zh: "Via Inn Prime 札幌" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-sapporo.jpg",
    activities: [
      {
        id: "d7-1",
        name: {
          en: "Hill of the Buddha (Atama Daibutsu)",
          zh: "真的内的野陵园（头大佛）",
        },
        description: {
          en: "Ando Tadao's masterpiece: a giant Buddha head emerging from a lavender-covered hill. In winter, pure snow-white zen.",
          zh: "安藤忠雄杰作：大佛只露出一个头，冬天白雪覆盖，极简禅意与震撼。",
        },
        type: "main",
        icon: "Landmark",
      },
      {
        id: "d7-2",
        name: { en: "Shiroi Koibito Park", zh: "白色恋人公园" },
        description: {
          en: "A European castle-like chocolate factory. Great for photos and picking up Hokkaido's most famous souvenir.",
          zh: "像欧洲城堡一样的巧克力工厂，适合拍照和购买北海道最著名伴手礼。",
        },
        type: "main",
        icon: "Castle",
      },
      {
        id: "d7-3",
        name: {
          en: "Genghis Khan BBQ (Sapporo Beer Garden)",
          zh: "成吉思汗烤肉（札幌啤酒园）",
        },
        description: {
          en: "Hokkaido's signature lamb BBQ in the historic Sapporo Beer Museum building. A must-do experience.",
          zh: "在札幌啤酒博物馆历史建筑中享用北海道招牌成吉思汗烤肉。",
        },
        type: "food",
        icon: "Flame",
      },
      {
        id: "d7-4",
        name: {
          en: "Hidden Gem: Maruyama Coffee",
          zh: "隐藏推荐：丸山咖啡",
        },
        description: {
          en: "Award-winning specialty coffee roastery. Their pour-over is exceptional. Quiet, local vibe.",
          zh: "获奖精品咖啡烘焙坊，手冲咖啡一绝，安静的当地氛围。",
        },
        type: "hidden-gem",
        icon: "Coffee",
      },
    ],
  },
  {
    day: 8,
    date: "3/6",
    weekday: { en: "Fri", zh: "周五" },
    title: { en: "Sapporo City & Shopping", zh: "札幌市区 / 购物" },
    location: { en: "Sapporo", zh: "札幌" },
    accommodation: { en: "Via Inn Prime Sapporo", zh: "Via Inn Prime 札幌" },
    region: "hokkaido",
    heroImage: "/images/hokkaido-hero.jpg",
    cardImage: "/images/day-sapporo.jpg",
    activities: [
      {
        id: "d8-1",
        name: {
          en: "Tanukikoji Shopping Street",
          zh: "狸小路商店街",
        },
        description: {
          en: "Covered shopping arcade for souvenirs, cosmetics, and last-minute Hokkaido goodies.",
          zh: "购买伴手礼、药妆，把回国需要带的东西一次性扫齐。",
        },
        type: "main",
        icon: "ShoppingBag",
      },
      {
        id: "d8-2",
        name: {
          en: "Nijo Market - Fresh Seafood",
          zh: "二条市场 - 新鲜海鲜",
        },
        description: {
          en: "A bustling morning market perfect for fresh crab legs, scallops on the half shell, and melon.",
          zh: "热闹的早市，新鲜蟹腿、半壳扇贝和哈密瓜。",
        },
        type: "food",
        icon: "Fish",
      },
      {
        id: "d8-3",
        name: {
          en: "Return Rental Car",
          zh: "还车",
        },
        description: {
          en: "Drop off the rental car and enjoy the rest of the day on foot.",
          zh: "归还租车，享受步行游览的悠闲时光。",
        },
        type: "main",
        icon: "Car",
      },
      {
        id: "d8-4",
        name: {
          en: "Hidden Gem: Suage Soup Curry",
          zh: "隐藏推荐：Suage汤咖喱",
        },
        description: {
          en: "Another legendary soup curry spot with crispy fried chicken on top. Many locals prefer it over Garaku.",
          zh: "另一家传奇汤咖喱店，配炸鸡，很多本地人更喜欢这家。",
        },
        type: "hidden-gem",
        icon: "Soup",
      },
    ],
  },
  {
    day: 9,
    date: "3/7",
    weekday: { en: "Sat", zh: "周六" },
    title: { en: "Fly to Osaka!", zh: "飞往大阪！" },
    location: { en: "Sapporo → Osaka", zh: "札幌 → 大阪" },
    accommodation: { en: "Hotel Nikko Osaka", zh: "日航酒店 大阪" },
    region: "kansai",
    heroImage: "/images/kansai-hero.jpg",
    cardImage: "/images/day-osaka.jpg",
    activities: [
      {
        id: "d9-1",
        name: { en: "Flight to Osaka (Kansai)", zh: "飞往大阪关西" },
        description: {
          en: "Say goodbye to snow, hello to neon! Flight from Chitose to Kansai/Itami Airport.",
          zh: "告别白雪，拥抱霓虹！从新千岁飞往关西/伊丹机场。",
        },
        type: "main",
        icon: "Plane",
      },
      {
        id: "d9-2",
        name: { en: "Dotonbori Night Walk", zh: "道顿堀夜游" },
        description: {
          en: "The iconic Glico Running Man sign, canal reflections, and a street food crawl you won't forget.",
          zh: "经典格力高跑男广告牌、运河倒影，难忘的街头美食之旅。",
        },
        type: "main",
        icon: "Sparkles",
      },
      {
        id: "d9-3",
        name: { en: "Takoyaki & Okonomiyaki", zh: "章鱼烧 & 大阪烧" },
        description: {
          en: "Hit up the best street stalls for piping hot takoyaki and fluffy okonomiyaki. Osaka is the kitchen of Japan.",
          zh: "吃热腾腾的章鱼烧和松软的大阪烧。大阪是日本的厨房。",
        },
        type: "food",
        icon: "UtensilsCrossed",
      },
      {
        id: "d9-4",
        name: {
          en: "Hidden Gem: Hozenji Yokocho Alley",
          zh: "隐藏推荐：法善寺横丁",
        },
        description: {
          en: "A stone-paved alley right behind Dotonbori with atmospheric lantern-lit izakayas. Feels like time travel.",
          zh: "道顿堀后面的石板小巷，灯笼照亮的居酒屋氛围感满满，仿佛穿越时空。",
        },
        type: "hidden-gem",
        icon: "Lamp",
      },
    ],
  },
  {
    day: 10,
    date: "3/8",
    weekday: { en: "Sun", zh: "周日" },
    title: { en: "Osaka City Explorer", zh: "大阪市区探索" },
    location: { en: "Osaka", zh: "大阪" },
    accommodation: { en: "Hotel Nikko Osaka", zh: "日航酒店 大阪" },
    region: "kansai",
    heroImage: "/images/kansai-hero.jpg",
    cardImage: "/images/day-osaka.jpg",
    activities: [
      {
        id: "d10-1",
        name: { en: "Kuromon Market (Morning)", zh: "黑门市场（早市）" },
        description: {
          en: "Fresh grilled seafood, Kobe beef skewers, tamagoyaki, and the freshest sashimi you'll ever taste.",
          zh: "新鲜烤海鲜、神户牛肉串、玉子烧、最鲜的刺身。",
        },
        type: "food",
        icon: "Fish",
      },
      {
        id: "d10-2",
        name: { en: "Shinsaibashi Shopping", zh: "心斋桥购物" },
        description: {
          en: "Osaka's premier shopping district right by your hotel. Fashion, cosmetics, and local brands.",
          zh: "大阪首屈一指的购物区，就在酒店旁。时尚、化妆品、当地品牌。",
        },
        type: "main",
        icon: "ShoppingBag",
      },
      {
        id: "d10-3",
        name: {
          en: "Umeda Sky Building (Sunset)",
          zh: "梅田空中庭园（日落）",
        },
        description: {
          en: "The floating garden observatory with 360-degree views. Watch Osaka transform from golden hour to neon city.",
          zh: "360度空中花园展望台，看大阪从金色黄昏变为霓虹之城。",
        },
        type: "main",
        icon: "Building",
      },
      {
        id: "d10-4",
        name: {
          en: "Hidden Gem: Shinsekai & Tsutenkaku",
          zh: "隐藏推荐：新世界 & 通天阁",
        },
        description: {
          en: "A retro neon neighborhood with Osaka's best kushikatsu (deep fried skewers) and a buzzing old-school vibe.",
          zh: "复古霓虹街区，大阪最好的串炸和热闹的老派氛围。",
        },
        type: "hidden-gem",
        icon: "Zap",
      },
    ],
  },
  {
    day: 11,
    date: "3/9",
    weekday: { en: "Mon", zh: "周一" },
    title: { en: "Kyoto Day Trip", zh: "京都一日游" },
    location: { en: "Kyoto", zh: "京都" },
    accommodation: { en: "Hotel Nikko Osaka", zh: "日航酒店 大阪" },
    region: "kansai",
    heroImage: "/images/kansai-hero.jpg",
    cardImage: "/images/day-kyoto.jpg",
    activities: [
      {
        id: "d11-1",
        name: { en: "Fushimi Inari Shrine", zh: "伏见稻荷大社" },
        description: {
          en: "The iconic thousand vermillion torii gates. Go early morning for the best photos without crowds.",
          zh: "标志性的千本的居。早上早去越容易拍到没人的空镜。",
        },
        type: "main",
        icon: "Landmark",
      },
      {
        id: "d11-2",
        name: { en: "Kiyomizu-dera Temple", zh: "清水寺" },
        description: {
          en: "The grand wooden stage overlooking Kyoto. A UNESCO World Heritage treasure.",
          zh: "从清水舞台俯瞰京都全景，联合国教科文组织世界遗产。",
        },
        type: "main",
        icon: "Landmark",
      },
      {
        id: "d11-3",
        name: {
          en: "Ninenzaka → Sannenzaka → Gion",
          zh: "二年坂 → 三年坂 → 祇园",
        },
        description: {
          en: "Walk the atmospheric old streets, then end in Gion to spot geisha in the evening lantern-light.",
          zh: "漫步古色古香的街道，傍晚到祇园花见小路感受艺伎风情。",
        },
        type: "main",
        icon: "Footprints",
      },
      {
        id: "d11-4",
        name: {
          en: "Hidden Gem: Arabica Kyoto Coffee",
          zh: "隐藏推荐：% Arabica 京都",
        },
        description: {
          en: "World-famous coffee brand that started in Kyoto. The Higashiyama branch has stunning temple views.",
          zh: "起源于京都的世界著名咖啡品牌，东山分店可以看到绝美寺庙景色。",
        },
        type: "hidden-gem",
        icon: "Coffee",
      },
    ],
  },
  {
    day: 12,
    date: "3/10",
    weekday: { en: "Tue", zh: "周二" },
    title: { en: "Universal Studios Japan!", zh: "日本环球影城！" },
    location: { en: "USJ, Osaka", zh: "大阪环球影城" },
    accommodation: { en: "Hotel Nikko Osaka", zh: "日航酒店 大阪" },
    region: "kansai",
    heroImage: "/images/kansai-hero.jpg",
    cardImage: "/images/day-usj.jpg",
    activities: [
      {
        id: "d12-1",
        name: {
          en: "Super Nintendo World",
          zh: "超级任天堂世界",
        },
        description: {
          en: "Step into Mario's world! Get there at park opening for shortest waits. Power-up bands are a must.",
          zh: "走进马里奥的世界！开园就去排队等候最短。能量手环必买。",
        },
        type: "main",
        icon: "Gamepad2",
      },
      {
        id: "d12-2",
        name: { en: "Wizarding World of Harry Potter", zh: "哈利波特魔法世界" },
        description: {
          en: "Butterbeer, Hogwarts castle, and the Forbidden Journey ride. Magic in every corner.",
          zh: "黄油啤酒、霍格沃茨城堡、禁忌之旅过山车。处处是魔法。",
        },
        type: "main",
        icon: "Wand",
      },
      {
        id: "d12-3",
        name: { en: "Theme Park Food Crawl", zh: "主题公园美食探索" },
        description: {
          en: "Try the Mario Star popcorn bucket, Butterbeer, and the special Minion-themed treats.",
          zh: "必尝马里奥星星爆米花桶、黄油啤酒和小黄人主题甜点。",
        },
        type: "food",
        icon: "Popcorn",
      },
      {
        id: "d12-4",
        name: {
          en: "Hidden Gem: USJ Night Parade",
          zh: "隐藏推荐：USJ夜间花车巡游",
        },
        description: {
          en: "Stay for the spectacular evening light parade if available. Most day-trippers miss this.",
          zh: "如有演出一定要留下看夜间灯光花车巡游，大部分一日游客都会错过。",
        },
        type: "hidden-gem",
        icon: "Star",
      },
    ],
  },
  {
    day: 13,
    date: "3/11",
    weekday: { en: "Wed", zh: "周三" },
    title: { en: "Heading Home", zh: "回国" },
    location: { en: "Osaka → Home", zh: "大阪 → 回国" },
    accommodation: { en: "---", zh: "---" },
    region: "kansai",
    heroImage: "/images/kansai-hero.jpg",
    cardImage: "/images/day-osaka.jpg",
    activities: [
      {
        id: "d13-1",
        name: { en: "Last Morning in Osaka", zh: "在大阪的最后一个早晨" },
        description: {
          en: "Sleep in, do a final convenience store run (onigiri + matcha latte for the road).",
          zh: "睡个懒觉，最后去便利店买个饭团和抹茶拿铁上路。",
        },
        type: "main",
        icon: "Coffee",
      },
      {
        id: "d13-2",
        name: { en: "Airport Transfer", zh: "前往机场" },
        description: {
          en: "Head to Kansai International Airport. Safe travels and see you next time, Japan!",
          zh: "前往关西国际机场。一路平安，日本我们下次再见！",
        },
        type: "main",
        icon: "Plane",
      },
      {
        id: "d13-3",
        name: {
          en: "Hidden Gem: Airport Ramen Street",
          zh: "隐藏推荐：机场拉面街",
        },
        description: {
          en: "KIX has a ramen street after security. Get one last bowl before you fly!",
          zh: "关西机场安检后有拉面街。登机前再来最后一碗！",
        },
        type: "hidden-gem",
        icon: "Soup",
      },
    ],
  },
]
