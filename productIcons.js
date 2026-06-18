// Normalize text (IMPORTANT)
export const normalizeText = (text) => {
  return text.toLowerCase().trim();
};

// Complete Product Catalog Mapping
const productMap = {
  // Dairy Products
  milk: { icon: "🥛", category: "dairy" },
  yogurt: { icon: "🥣", category: "dairy" },
  butter: { icon: "🧈", category: "dairy" },
  cheese: { icon: "🧀", category: "dairy" },
  eggs: { icon: "🥚", category: "dairy" },
  cream: { icon: "🥛", category: "dairy" },
  "ice cream": { icon: "🍦", category: "dairy" },
  paneer: { icon: "🧀", category: "dairy" },
  ghee: { icon: "🫙", category: "dairy" },
  buttermilk: { icon: "🥛", category: "dairy" },

  // Bakery Products
  bread: { icon: "🍞", category: "bakery" },
  cake: { icon: "🍰", category: "bakery" },
  croissant: { icon: "🥐", category: "bakery" },
  donut: { icon: "🍩", category: "bakery" },
  bagel: { icon: "🥯", category: "bakery" },
  muffin: { icon: "🧁", category: "bakery" },
  pancake: { icon: "🥞", category: "bakery" },
  waffle: { icon: "🧇", category: "bakery" },
  brownie: { icon: "🍫", category: "bakery" },
  cookie: { icon: "🍪", category: "bakery" },

  // Snacks
  biscuits: { icon: "🍪", category: "snacks" },
  cookies: { icon: "🍪", category: "snacks" },
  chips: { icon: "🥨", category: "snacks" },
  popcorn: { icon: "🍿", category: "snacks" },
  pretzel: { icon: "🥨", category: "snacks" },
  nachos: { icon: "🌮", category: "snacks" },
  crackers: { icon: "🍘", category: "snacks" },
  "granola bar": { icon: "🍫", category: "snacks" },
  nuts: { icon: "🥜", category: "snacks" },
  "trail mix": { icon: "🥜", category: "snacks" },
  chocolate: { icon: "🍫", category: "snacks" },
  candy: { icon: "🍬", category: "snacks" },
  gum: { icon: "🍬", category: "snacks" },
  mints: { icon: "🍬", category: "snacks" },

  // Grocery
  rice: { icon: "🍚", category: "grocery" },
  flour: { icon: "🌾", category: "grocery" },
  sugar: { icon: "🧂", category: "grocery" },
  salt: { icon: "🧂", category: "grocery" },
  oil: { icon: "🛢️", category: "grocery" },
  pasta: { icon: "🍝", category: "grocery" },
  noodles: { icon: "🍜", category: "grocery" },
  lentils: { icon: "🫘", category: "grocery" },
  beans: { icon: "🫘", category: "grocery" },
  cereal: { icon: "🥣", category: "grocery" },
  oatmeal: { icon: "🥣", category: "grocery" },
  spices: { icon: "🌶️", category: "grocery" },
  vinegar: { icon: "🧴", category: "grocery" },
  "soy sauce": { icon: "🧴", category: "grocery" },
  ketchup: { icon: "🍅", category: "grocery" },

  // Beverages
  tea: { icon: "☕", category: "beverage" },
  coffee: { icon: "☕", category: "beverage" },
  juice: { icon: "🧃", category: "beverage" },
  soda: { icon: "🥤", category: "beverage" },
  water: { icon: "💧", category: "beverage" },
  "energy drink": { icon: "⚡", category: "beverage" },
  smoothie: { icon: "🥤", category: "beverage" },
  milkshake: { icon: "🥛", category: "beverage" },
  "hot chocolate": { icon: "☕", category: "beverage" },
  lemonade: { icon: "🍋", category: "beverage" },

  // Fruits
  apple: { icon: "🍎", category: "fruit" },
  banana: { icon: "🍌", category: "fruit" },
  orange: { icon: "🍊", category: "fruit" },
  grapes: { icon: "🍇", category: "fruit" },
  strawberry: { icon: "🍓", category: "fruit" },
  watermelon: { icon: "🍉", category: "fruit" },
  pineapple: { icon: "🍍", category: "fruit" },
  mango: { icon: "🥭", category: "fruit" },
  peach: { icon: "🍑", category: "fruit" },
  cherry: { icon: "🍒", category: "fruit" },
  kiwi: { icon: "🥝", category: "fruit" },
  lemon: { icon: "🍋", category: "fruit" },
  pear: { icon: "🍐", category: "fruit" },
  plum: { icon: "🟣", category: "fruit" },
  blueberry: { icon: "🫐", category: "fruit" },

  // Vegetables
  potato: { icon: "🥔", category: "vegetable" },
  tomato: { icon: "🍅", category: "vegetable" },
  onion: { icon: "🧅", category: "vegetable" },
  carrot: { icon: "🥕", category: "vegetable" },
  broccoli: { icon: "🥦", category: "vegetable" },
  cucumber: { icon: "🥒", category: "vegetable" },
  pepper: { icon: "🫑", category: "vegetable" },
  corn: { icon: "🌽", category: "vegetable" },
  mushroom: { icon: "🍄", category: "vegetable" },
  spinach: { icon: "🥬", category: "vegetable" },
  lettuce: { icon: "🥬", category: "vegetable" },
  cabbage: { icon: "🥬", category: "vegetable" },
  cauliflower: { icon: "🥦", category: "vegetable" },
  pumpkin: { icon: "🎃", category: "vegetable" },
  radish: { icon: "🥕", category: "vegetable" },

  // Meat & Protein
  chicken: { icon: "🍗", category: "meat" },
  beef: { icon: "🥩", category: "meat" },
  pork: { icon: "🥩", category: "meat" },
  fish: { icon: "🐟", category: "seafood" },
  shrimp: { icon: "🦐", category: "seafood" },
  tofu: { icon: "🧈", category: "protein" },
  tempeh: { icon: "🍘", category: "protein" },

  // Sauces & Condiments
  mayonnaise: { icon: "🫙", category: "condiment" },
  mustard: { icon: "🫙", category: "condiment" },
  "hot sauce": { icon: "🌶️", category: "condiment" },
  "bbq sauce": { icon: "🍖", category: "condiment" },
  pesto: { icon: "🌿", category: "condiment" },
  hummus: { icon: "🫘", category: "condiment" },

  // Frozen Foods
  "frozen pizza": { icon: "🍕", category: "frozen" },
  "frozen vegetables": { icon: "🥦", category: "frozen" },
  "french fries": { icon: "🍟", category: "frozen" },

  // Household
  detergent: { icon: "🧴", category: "household" },
  soap: { icon: "🧼", category: "household" },
  "paper towel": { icon: "🧻", category: "household" },
  "trash bag": { icon: "🗑️", category: "household" },

  // Baby & Pet
  "baby food": { icon: "👶", category: "baby" },
  "dog food": { icon: "🐕", category: "pet" },
  "cat food": { icon: "🐈", category: "pet" }
};

// Get Icon
export const getProductIcon = (name) => {
  const key = normalizeText(name);
  return productMap[key]?.icon || "🛒";
};

// Get Category
export const getProductCategory = (name) => {
  const key = normalizeText(name);
  return productMap[key]?.category || "other";
};

// Get Full Meta
export const getProductMeta = (name) => {
  const key = normalizeText(name);
  return productMap[key] || { icon: "🛒", category: "other" };
};

// Get all categories (for filtering)
export const getAllCategories = () => {
  const categories = new Set();
  Object.values(productMap).forEach(item => {
    categories.add(item.category);
  });
  return Array.from(categories).sort();
};

// Get products by category
export const getProductsByCategory = (category) => {
  const products = [];
  Object.entries(productMap).forEach(([name, data]) => {
    if (data.category === category) {
      products.push({ name, ...data });
    }
  });
  return products;
};