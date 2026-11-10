export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  allergensLabel?: string;
  intoleranceLabel?: string;
  group?: string | null;
  available?: boolean;
}

export interface MenuCategory {
  id: string;
  filterLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  sortOrder: number;
  dishes: Dish[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    "id": "signature-maki",
    "filterLabel": "Maki",
    "title": "Signature Maki",
    "subtitle": "Chef's Signature Creations",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 1,
    "dishes": [
      {
        "id": "signature-maki-akanami-roll-0",
        "name": "Akanami Roll",
        "description": "Scallop, tobiko, ikura, mayo",
        "price": "AED 80",
        "allergensLabel": "(G) (F) (MOL) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "signature-maki-sakamura-roll-1",
        "name": "Sakamura Roll",
        "description": "Shrimp, unagi, cooked salmon, spicy mayo",
        "price": "AED 85",
        "allergensLabel": "(SF) (G) (F) (SOY) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "signature-maki-kamikaze-roll-2",
        "name": "Kamikaze Roll",
        "description": "Cooked salmon, Philadelphia cheese, Kamikaze sauce",
        "price": "AED 75",
        "allergensLabel": "(G) (F) (SES) (D) (E) (N)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "signature-maki-yakiniku-roll-3",
        "name": "Yakiniku Roll",
        "description": "9+ striploin, caviar, gold leaf, sweet chili soy",
        "price": "AED 110",
        "allergensLabel": "(G) (F) (SES) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "signature-maki-ebi-maki-roll-4",
        "name": "Ebi Maki Roll",
        "description": "Shrimp tempura, tobiko, bonito flakes, spicy mayo",
        "price": "AED 85",
        "allergensLabel": "(G) (SF) (F) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "signature-maki-sunshine-roll-5",
        "name": "Sunshine Roll",
        "description": "Tempura soft-shell crab, salmon, tuna, sea bass, spicy mayo",
        "price": "AED 110",
        "allergensLabel": "(G) (F) (SF) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "signature-maki-oshizushi-6",
        "name": "Oshizushi",
        "description": "Bluefin tuna, Oscietra caviar, brine sauce",
        "price": "AED 120",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "sashimi",
    "filterLabel": "Sashimi",
    "title": "Sashimi",
    "subtitle": "Masterfully Sliced Fish",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 2,
    "dishes": [
      {
        "id": "sashimi-akami-0",
        "name": "Akami",
        "description": "3 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sashimi-o-toro-1",
        "name": "O-Toro",
        "description": "3 pieces",
        "price": "AED 105",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sashimi-hamachi-2",
        "name": "Hamachi",
        "description": "3 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sashimi-salmon-3",
        "name": "Salmon",
        "description": "3 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sashimi-scallop-4",
        "name": "Scallop",
        "description": "3 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sashimi-sea-bass-5",
        "name": "Sea Bass",
        "description": "3 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sashimi-botan-ebi-6",
        "name": "Botan Ebi",
        "description": "3 pieces",
        "price": "AED 85",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "nigiri",
    "filterLabel": "Nigiri",
    "title": "Nigiri",
    "subtitle": "Hand-Pressed Sushi Selection",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 3,
    "dishes": [
      {
        "id": "nigiri-akami-0",
        "name": "Akami",
        "description": "2 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-o-toro-1",
        "name": "O-Toro",
        "description": "2 pieces",
        "price": "AED 105",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-hamachi-2",
        "name": "Hamachi",
        "description": "2 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-salmon-3",
        "name": "Salmon",
        "description": "2 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-scallop-4",
        "name": "Scallop",
        "description": "2 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-sea-bass-5",
        "name": "Sea Bass",
        "description": "2 pieces",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-botan-ebi-6",
        "name": "Botan Ebi",
        "description": "2 pieces",
        "price": "AED 100",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "nigiri-wagyu-7",
        "name": "Wagyu",
        "description": "2 pieces",
        "price": "AED 105",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "classic-makimono",
    "filterLabel": "Makimono",
    "title": "Classic Makimono",
    "subtitle": "Traditional Rolled Classics",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 4,
    "dishes": [
      {
        "id": "classic-makimono-kappa-maki-0",
        "name": "Kappa Maki",
        "description": "Cucumber",
        "price": "AED 40",
        "allergensLabel": "(V)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "classic-makimono-asparagus-maki-1",
        "name": "Asparagus Maki",
        "description": "Asparagus",
        "price": "AED 45",
        "allergensLabel": "(V)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "classic-makimono-unagi-maki-2",
        "name": "Unagi Maki",
        "description": "Freshwater eel, unagi sauce",
        "price": "AED 85",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "classic-makimono-salmon-maki-3",
        "name": "Salmon Maki",
        "description": "Fresh Atlantic salmon",
        "price": "AED 65",
        "allergensLabel": "(F)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "classic-makimono-philadelphia-maki-4",
        "name": "Philadelphia Maki",
        "description": "Aburi salmon, cream cheese, ikura, teriyaki sauce",
        "price": "AED 85",
        "allergensLabel": "(G) (F) (SOY) (D)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "classic-makimono-california-5",
        "name": "California",
        "description": "King crab, tobiko, yuzu kosho mayo",
        "price": "AED 85",
        "allergensLabel": "(G) (SF) (SOY) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "starters",
    "filterLabel": "Starters",
    "title": "Starters",
    "subtitle": "Refined Sharing Plates",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 5,
    "dishes": [
      {
        "id": "starters-steamed-edamame-0",
        "name": "Steamed Edamame",
        "description": "Shio Kombu salt",
        "price": "AED 30",
        "allergensLabel": "(G) (SOY)",
        "intoleranceLabel": "",
        "group": "Small Bites",
        "available": true
      },
      {
        "id": "starters-spicy-edamame-1",
        "name": "Spicy Edamame",
        "description": "Chili-garlic sauce",
        "price": "AED 34",
        "allergensLabel": "(SOY)",
        "intoleranceLabel": "",
        "group": "Small Bites",
        "available": true
      },
      {
        "id": "starters-miso-soup-2",
        "name": "Miso Soup",
        "description": "Wakame, spring onion, tofu",
        "price": "AED 34",
        "allergensLabel": "(SOY)",
        "intoleranceLabel": "",
        "group": "Small Bites",
        "available": true
      },
      {
        "id": "starters-salmon-usuzukuri-3",
        "name": "Salmon Usuzukuri",
        "description": "Ikura, orange ponzu",
        "price": "AED 65",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-hamachi-usuzukuri-4",
        "name": "Hamachi Usuzukuri",
        "description": "Fresh truffle, yuzu truffle ponzu",
        "price": "AED 75",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-tuna-tartare-5",
        "name": "Tuna Tartare",
        "description": "Oscietra caviar, aojiso truffle, nori chips",
        "price": "AED 115",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-wagyu-tartare-6",
        "name": "Wagyu Tartare",
        "description": "Truffle mayo, sweet chili soy, brioche bread",
        "price": "AED 120",
        "allergensLabel": "(G) (SOY) (E) (D) (SES)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-king-crab-salad-7",
        "name": "King Crab Salad",
        "description": "Fresh mizuna, creamy Wafu dressing",
        "price": "AED 115",
        "allergensLabel": "(G) (SF) (SOY) (SES)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-mizuna-horenzo-8",
        "name": "Mizuna Horenzo",
        "description": "Shiitake chips, avocado, goma dressing",
        "price": "AED 68",
        "allergensLabel": "(G) (SOY) (SES)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-corn-salad-9",
        "name": "Corn Salad",
        "description": "Avocado, edamame, capsicum, coriander dressing",
        "price": "AED 45",
        "allergensLabel": "(V)",
        "intoleranceLabel": "",
        "group": "Cold Starters",
        "available": true
      },
      {
        "id": "starters-rock-shrimp-10",
        "name": "Rock Shrimp",
        "description": "Spicy mayo",
        "price": "AED 80",
        "allergensLabel": "(G) (SF) (E) (SES)",
        "intoleranceLabel": "",
        "group": "Hot Starters",
        "available": true
      },
      {
        "id": "starters-baby-squid-11",
        "name": "Baby Squid",
        "description": "Wasabi mayo",
        "price": "AED 70",
        "allergensLabel": "(G) (MOL) (E) (SES)",
        "intoleranceLabel": "",
        "group": "Hot Starters",
        "available": true
      },
      {
        "id": "starters-potato-crab-mochi-12",
        "name": "Potato Crab Mochi",
        "description": "King crab, cream cheese, shiso jalapeño mayo",
        "price": "AED 64",
        "allergensLabel": "(G) (SF) (SOY) (E) (D)",
        "intoleranceLabel": "",
        "group": "Hot Starters",
        "available": true
      },
      {
        "id": "starters-wagyu-gyoza-13",
        "name": "Wagyu Gyoza",
        "description": "Truffle, truffle Parmesan sauce",
        "price": "AED 99",
        "allergensLabel": "(G) (D) (SOY)",
        "intoleranceLabel": "",
        "group": "Hot Starters",
        "available": true
      },
      {
        "id": "starters-ebi-gyoza-14",
        "name": "Ebi Gyoza",
        "description": "Shrimp bisque sauce",
        "price": "AED 85",
        "allergensLabel": "(G) (SF) (D)",
        "intoleranceLabel": "",
        "group": "Hot Starters",
        "available": true
      }
    ]
  },
  {
    "id": "main-course",
    "filterLabel": "Mains",
    "title": "Main Course",
    "subtitle": "Signature Culinary Mains",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 6,
    "dishes": [
      {
        "id": "main-course-wagyu-short-ribs-0",
        "name": "Wagyu Short Ribs",
        "description": "Wasabi shallot relish, short rib sauce",
        "price": "AED 275",
        "allergensLabel": "(G) (SOY) (SF)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-wagyu-tenderloin-1",
        "name": "Wagyu Tenderloin",
        "description": "9+ Wagyu, yuzu pepper sauce",
        "price": "AED 320",
        "allergensLabel": "(G) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-wagyu-striploin-2",
        "name": "Wagyu Striploin",
        "description": "9+ Wagyu, sweet chili sauce, wasabi chimichurri",
        "price": "AED 250",
        "allergensLabel": "(G) (SES) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-wagyu-sando-3",
        "name": "Wagyu Sando",
        "description": "Japanese mustard, fresh truffle, brioche bread",
        "price": "AED 180",
        "allergensLabel": "(G) (D) (SOY) (MUS) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-black-cod-4",
        "name": "Black Cod",
        "description": "Miso-marinated black cod, pickled daikon",
        "price": "AED 220",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-salmon-teriyaki-5",
        "name": "Salmon Teriyaki",
        "description": "Teriyaki sauce, pickled cucumber",
        "price": "AED 140",
        "allergensLabel": "(G) (F) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-baby-chicken-6",
        "name": "Baby Chicken",
        "description": "Miso-marinated chicken, capsicum",
        "price": "AED 160",
        "allergensLabel": "(G) (SES) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "main-course-lamb-chops-7",
        "name": "Lamb Chops",
        "description": "Pan-seared lamb, spicy teriyaki, wasabi chimichurri, daikon",
        "price": "AED 220",
        "allergensLabel": "(G)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "sides",
    "filterLabel": "Sides",
    "title": "Sides",
    "subtitle": "Artisanal Side Dishes",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 7,
    "dishes": [
      {
        "id": "sides-yasai-tempura-0",
        "name": "Yasai Tempura",
        "description": "Seasonal vegetable tempura",
        "price": "AED 45",
        "allergensLabel": "(G) (E)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sides-seasonal-vegetables-1",
        "name": "Seasonal Vegetables",
        "description": "Steamed vegetables",
        "price": "AED 35",
        "allergensLabel": "(V)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sides-truffle-cha-han-2",
        "name": "Truffle Cha-Han",
        "description": "Truffle, butter, onion",
        "price": "AED 50",
        "allergensLabel": "(G) (D) (SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sides-yasai-cha-han-3",
        "name": "Yasai Cha-Han",
        "description": "Seasonal vegetables, garlic, onion, shimeji mushroom",
        "price": "AED 40",
        "allergensLabel": "(G)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sides-miso-nasu-4",
        "name": "Miso Nasu",
        "description": "Neri miso, crispy sweet potato",
        "price": "AED 35",
        "allergensLabel": "(SOY)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "sides-white-rice-5",
        "name": "White Rice",
        "description": "Steamed Japanese rice",
        "price": "AED 35",
        "allergensLabel": "(V)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "dessert",
    "filterLabel": "Dessert",
    "title": "Dessert",
    "subtitle": "Sweet Indulgent Creations",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 8,
    "dishes": [
      {
        "id": "dessert-aka-profiterole-0",
        "name": "AKA Profiterole",
        "description": "Miso pastry cream, dry white miso, vanilla ice cream, milk chocolate sauce",
        "price": "AED 50",
        "allergensLabel": "(D) (E) (SOY) (G)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "dessert-mango-usuzukuri-1",
        "name": "Mango Usuzukuri",
        "description": "Thinly sliced mango, mango marmalade, coconut mousse, lime zest, Kiku flower",
        "price": "AED 45",
        "allergensLabel": "(D)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "dessert-deconstructed-yuzu-cheesecake-2",
        "name": "Deconstructed Yuzu Cheesecake",
        "description": "Crumble, strawberry sauce, yuzu cheesecake, fresh strawberries, edible flower",
        "price": "AED 45",
        "allergensLabel": "(D) (G)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "dessert-chocolate-peru-3",
        "name": "Chocolate Peru",
        "description": "Crumble, Pocky sticks, vanilla ice cream",
        "price": "AED 50",
        "allergensLabel": "(D) (G) (N)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      },
      {
        "id": "dessert-mochi-selection-4",
        "name": "Mochi Selection",
        "description": "Salted caramel • Melon • Lychee • Red bean • Coconut",
        "price": "AED 25",
        "allergensLabel": "(D)",
        "intoleranceLabel": "",
        "group": null,
        "available": true
      }
    ]
  },
  {
    "id": "beverages",
    "filterLabel": "Drinks",
    "title": "Beverages",
    "subtitle": "Curated Drinks & Spirits",
    "imageSrc": "/images/menu-page.webp",
    "imageAlt": "AKA Restaurant and Lounge menu",
    "sortOrder": 9,
    "dishes": [
      {
        "id": "beverages-himawari-sunflower-0",
        "name": "Himawari (Sunflower)",
        "description": "Hibiscus tea, shiso cordial, Calpis",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Mocktails",
        "available": true
      },
      {
        "id": "beverages-sumire-violet-1",
        "name": "Sumire (Violet)",
        "description": "Rose tea, yuzu & lychee cordial",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Mocktails",
        "available": true
      },
      {
        "id": "beverages-suzuran-lily-of-the-valley-2",
        "name": "Suzuran (Lily of the Valley)",
        "description": "Calamansi foam, Crossip Fresh Citrus, ginger ale",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Mocktails",
        "available": true
      },
      {
        "id": "beverages-english-breakfast-tea-3",
        "name": "English Breakfast Tea",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-majestic-earl-grey-tea-4",
        "name": "Majestic Earl Grey Tea",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-jasmine-mao-jian-tea-5",
        "name": "Jasmine Mao Jian Tea",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-japanese-sencha-6",
        "name": "Japanese Sencha",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-organic-chamomile-blossoms-tea-7",
        "name": "Organic Chamomile Blossoms Tea",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-rush-hour-berry-8",
        "name": "Rush Hour Berry",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-milk-oolong-9",
        "name": "Milk Oolong",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Tea",
        "available": true
      },
      {
        "id": "beverages-coca-cola-10",
        "name": "Coca-Cola",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Soft Drinks",
        "available": true
      },
      {
        "id": "beverages-diet-coke-11",
        "name": "Diet Coke",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Soft Drinks",
        "available": true
      },
      {
        "id": "beverages-sprite-12",
        "name": "Sprite",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Soft Drinks",
        "available": true
      },
      {
        "id": "beverages-red-bull-13",
        "name": "Red Bull",
        "description": "",
        "price": "AED 45",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Soft Drinks",
        "available": true
      },
      {
        "id": "beverages-uludag-still-14",
        "name": "Uludag Still",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Water",
        "available": true
      },
      {
        "id": "beverages-uludag-sparkling-15",
        "name": "Uludag Sparkling",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Water",
        "available": true
      },
      {
        "id": "beverages-apple-16",
        "name": "Apple",
        "description": "",
        "price": "AED 40",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Juices",
        "available": true
      },
      {
        "id": "beverages-cranberry-17",
        "name": "Cranberry",
        "description": "",
        "price": "AED 40",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Juices",
        "available": true
      },
      {
        "id": "beverages-orange-18",
        "name": "Orange",
        "description": "",
        "price": "AED 40",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Juices",
        "available": true
      },
      {
        "id": "beverages-pineapple-19",
        "name": "Pineapple",
        "description": "",
        "price": "AED 40",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Juices",
        "available": true
      },
      {
        "id": "beverages-tonic-water-20",
        "name": "Tonic Water",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Franklin & Sons",
        "available": true
      },
      {
        "id": "beverages-light-tonic-water-21",
        "name": "Light Tonic Water",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Franklin & Sons",
        "available": true
      },
      {
        "id": "beverages-soda-water-22",
        "name": "Soda Water",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Franklin & Sons",
        "available": true
      },
      {
        "id": "beverages-ginger-ale-23",
        "name": "Ginger Ale",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Franklin & Sons",
        "available": true
      },
      {
        "id": "beverages-ginger-beer-24",
        "name": "Ginger Beer",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Franklin & Sons",
        "available": true
      },
      {
        "id": "beverages-grapefruit-soda-25",
        "name": "Grapefruit Soda",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Franklin & Sons",
        "available": true
      },
      {
        "id": "beverages-espresso-26",
        "name": "Espresso",
        "description": "",
        "price": "AED 24",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Coffee",
        "available": true
      },
      {
        "id": "beverages-americano-27",
        "name": "Americano",
        "description": "",
        "price": "AED 28",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Coffee",
        "available": true
      },
      {
        "id": "beverages-macchiato-28",
        "name": "Macchiato",
        "description": "",
        "price": "AED 30",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Coffee",
        "available": true
      },
      {
        "id": "beverages-cappuccino-29",
        "name": "Cappuccino",
        "description": "",
        "price": "AED 32",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Coffee",
        "available": true
      },
      {
        "id": "beverages-caf-latte-30",
        "name": "Café Latte",
        "description": "",
        "price": "AED 32",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Coffee",
        "available": true
      },
      {
        "id": "beverages-flat-white-31",
        "name": "Flat White",
        "description": "",
        "price": "AED 35",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Coffee",
        "available": true
      },
      {
        "id": "beverages-sakura-cherry-blossom-32",
        "name": "Sakura (Cherry Blossom)",
        "description": "Nikka Coffey Vodka, Sakura cordial, The Choya Single Ume Fruit, rose water",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Cocktails",
        "available": true
      },
      {
        "id": "beverages-kiku-chrysanthemum-33",
        "name": "Kiku (Chrysanthemum)",
        "description": "Nikka Coffey Gin, Giffard Lychee Liqueur, strawberry soju, Calpis",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Cocktails",
        "available": true
      },
      {
        "id": "beverages-tsubaki-camellia-japonica-34",
        "name": "Tsubaki (Camellia Japonica)",
        "description": "Tomato-infused El Jimador Reposado, mango & chamoy cordial, Ancho Reyes Verde",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Cocktails",
        "available": true
      },
      {
        "id": "beverages-fuji-wisteria-floribunda-35",
        "name": "Fuji (Wisteria Floribunda)",
        "description": "Havana Club 3 YO Rum, Giffard Ginger of the Indies, black sesame cordial, miso solution",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Cocktails",
        "available": true
      },
      {
        "id": "beverages-hasu-lotus-flower-36",
        "name": "Hasu (Lotus Flower)",
        "description": "Four Roses Bourbon, strawberry-infused Campari, wasabi vermouth",
        "price": "AED 85",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Cocktails",
        "available": true
      },
      {
        "id": "beverages-tito-s-handmade-texan-37",
        "name": "Tito’s Handmade Texan",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Vodka 30 ML",
        "available": true
      },
      {
        "id": "beverages-haku-vodka-38",
        "name": "Haku Vodka",
        "description": "",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Vodka 30 ML",
        "available": true
      },
      {
        "id": "beverages-beluga-noble-39",
        "name": "Beluga Noble",
        "description": "",
        "price": "AED 95",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Vodka 30 ML",
        "available": true
      },
      {
        "id": "beverages-beluga-gold-line-40",
        "name": "Beluga Gold Line",
        "description": "",
        "price": "AED 190",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Vodka 30 ML",
        "available": true
      },
      {
        "id": "beverages-belvedere-41",
        "name": "Belvedere",
        "description": "",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Vodka 30 ML",
        "available": true
      },
      {
        "id": "beverages-nikka-coffey-vodka-42",
        "name": "Nikka Coffey Vodka",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Vodka 30 ML",
        "available": true
      },
      {
        "id": "beverages-tanqueray-43",
        "name": "Tanqueray",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-tanqueray-no-ten-44",
        "name": "Tanqueray No. Ten",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-hendrick-s-gin-45",
        "name": "Hendrick’s Gin",
        "description": "",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-the-botanist-46",
        "name": "The Botanist",
        "description": "",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-roku-47",
        "name": "Roku",
        "description": "",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-ki-no-bi-kyoto-gin-48",
        "name": "Ki No Bi Kyoto Gin",
        "description": "",
        "price": "AED 95",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-monkey-47-49",
        "name": "Monkey 47",
        "description": "",
        "price": "AED 100",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-nikka-coffey-gin-50",
        "name": "Nikka Coffey Gin",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Gin 30 ML",
        "available": true
      },
      {
        "id": "beverages-hennessy-vs-51",
        "name": "Hennessy VS",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Brandy & Cognac 30 ML",
        "available": true
      },
      {
        "id": "beverages-hennessy-vsop-52",
        "name": "Hennessy VSOP",
        "description": "",
        "price": "AED 95",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Brandy & Cognac 30 ML",
        "available": true
      },
      {
        "id": "beverages-hennessy-xo-53",
        "name": "Hennessy XO",
        "description": "",
        "price": "AED 250",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Brandy & Cognac 30 ML",
        "available": true
      },
      {
        "id": "beverages-asahi-super-dry-japan-54",
        "name": "Asahi Super Dry (Japan)",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Bottled Beer",
        "available": true
      },
      {
        "id": "beverages-kirin-japan-55",
        "name": "Kirin (Japan)",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Bottled Beer",
        "available": true
      },
      {
        "id": "beverages-bi-re-des-amis-0-0-belgium-56",
        "name": "Bière des Amis 0.0% (Belgium)",
        "description": "",
        "price": "AED 60",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Bottled Beer",
        "available": true
      },
      {
        "id": "beverages-el-jimador-blanco-57",
        "name": "El Jimador Blanco",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-el-jimador-reposado-58",
        "name": "El Jimador Reposado",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-patr-n-silver-59",
        "name": "Patrón Silver",
        "description": "",
        "price": "AED 85",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-patr-n-reposado-60",
        "name": "Patrón Reposado",
        "description": "",
        "price": "AED 95",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-patr-n-a-ejo-61",
        "name": "Patrón Añejo",
        "description": "",
        "price": "AED 105",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-patr-n-el-cielo-62",
        "name": "Patrón El Cielo",
        "description": "",
        "price": "AED 220",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-clase-azul-r-63",
        "name": "Clase Azul R",
        "description": "",
        "price": "AED 295",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-don-julio-1942-64",
        "name": "Don Julio 1942",
        "description": "",
        "price": "AED 345",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Tequila 30 ML",
        "available": true
      },
      {
        "id": "beverages-havana-3-yo-65",
        "name": "Havana 3 YO",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Rum 30 ML",
        "available": true
      },
      {
        "id": "beverages-cacha-a-germana-soul-40-66",
        "name": "Cachaça Germana Soul 40",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Rum 30 ML",
        "available": true
      },
      {
        "id": "beverages-mount-gay-eclipse-rum-67",
        "name": "Mount Gay Eclipse Rum",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Rum 30 ML",
        "available": true
      },
      {
        "id": "beverages-germana-soul-40-68",
        "name": "Germana Soul 40",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Rum 30 ML",
        "available": true
      },
      {
        "id": "beverages-zacapa-23-69",
        "name": "Zacapa 23",
        "description": "",
        "price": "AED 110",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Rum 30 ML",
        "available": true
      },
      {
        "id": "beverages-zacapa-xo-70",
        "name": "Zacapa XO",
        "description": "",
        "price": "AED 180",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Rum 30 ML",
        "available": true
      },
      {
        "id": "beverages-toki-whisky-71",
        "name": "Toki Whisky",
        "description": "",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-the-chita-72",
        "name": "The Chita",
        "description": "",
        "price": "AED 100",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-yamazaki-12-73",
        "name": "Yamazaki 12",
        "description": "",
        "price": "AED 265",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-hibiki-harmony-74",
        "name": "Hibiki Harmony",
        "description": "",
        "price": "AED 130",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-miyagikyo-75",
        "name": "Miyagikyo",
        "description": "",
        "price": "AED 125",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-nikka-coffey-grain-76",
        "name": "Nikka Coffey Grain",
        "description": "",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-nikka-coffey-malt-77",
        "name": "Nikka Coffey Malt",
        "description": "",
        "price": "AED 85",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-nikka-from-the-barrel-78",
        "name": "Nikka From the Barrel",
        "description": "",
        "price": "AED 95",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Japanese Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-chivas-12-years-old-79",
        "name": "Chivas 12 Years Old",
        "description": "",
        "price": "AED 80",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Blended Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-chivas-18-years-old-80",
        "name": "Chivas 18 Years Old",
        "description": "",
        "price": "AED 135",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Blended Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-chivas-royal-salute-81",
        "name": "Chivas Royal Salute",
        "description": "",
        "price": "AED 195",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Blended Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-royal-salute-82",
        "name": "Royal Salute",
        "description": "",
        "price": "AED 300",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Blended Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-johnnie-walker-black-label-83",
        "name": "Johnnie Walker Black Label",
        "description": "",
        "price": "AED 70",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Blended Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-johnnie-walker-blue-label-84",
        "name": "Johnnie Walker Blue Label",
        "description": "",
        "price": "AED 290",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Blended Whisky 30 ML",
        "available": true
      },
      {
        "id": "beverages-the-glenlivet-15-year-old-french-oak-reserve-85",
        "name": "The Glenlivet 15 Year Old French Oak Reserve",
        "description": "",
        "price": "AED 100",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Speyside 30 ML",
        "available": true
      },
      {
        "id": "beverages-the-glenlivet-18-year-old-86",
        "name": "The Glenlivet 18 Year Old",
        "description": "",
        "price": "AED 140",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Speyside 30 ML",
        "available": true
      },
      {
        "id": "beverages-the-macallan-12-year-old-double-cask-87",
        "name": "The Macallan 12 Year Old Double Cask",
        "description": "",
        "price": "AED 110",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Speyside 30 ML",
        "available": true
      },
      {
        "id": "beverages-the-macallan-18-year-old-double-cask-88",
        "name": "The Macallan 18 Year Old Double Cask",
        "description": "",
        "price": "AED 370",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Speyside 30 ML",
        "available": true
      },
      {
        "id": "beverages-lagavulin-16-89",
        "name": "Lagavulin 16",
        "description": "",
        "price": "AED 170",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Islay 30 ML",
        "available": true
      },
      {
        "id": "beverages-jameson-90",
        "name": "Jameson",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "Irish",
        "available": true
      },
      {
        "id": "beverages-jack-daniel-s-single-barrel-select-91",
        "name": "Jack Daniel’s Single Barrel Select",
        "description": "",
        "price": "AED 90",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "American",
        "available": true
      },
      {
        "id": "beverages-four-roses-yellow-label-92",
        "name": "Four Roses Yellow Label",
        "description": "",
        "price": "AED 65",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "American",
        "available": true
      },
      {
        "id": "beverages-woodford-reserve-bourbon-93",
        "name": "Woodford Reserve Bourbon",
        "description": "",
        "price": "AED 75",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "American",
        "available": true
      },
      {
        "id": "beverages-woodford-reserve-rye-94",
        "name": "Woodford Reserve Rye",
        "description": "",
        "price": "AED 95",
        "allergensLabel": "",
        "intoleranceLabel": "",
        "group": "American",
        "available": true
      }
    ]
  }
];
