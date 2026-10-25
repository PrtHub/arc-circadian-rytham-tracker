import { mgRemaining, hoursToClear, SLEEP_SAFE_MG } from "./caffeine";

export interface CaffeineDrink {
  slug: string;
  aliases?: string[];
  name: string;
  amount: number; // in mg
  servingSize: string;
  category: "Energy" | "Coffee" | "Tea" | "Soda";
  description: string;
  cutoffRecommendation: string;
  faqs: { q: string; a: string }[];
}

export const CAFFEINE_DRINKS: CaffeineDrink[] = [
  {
    slug: "celsius-200mg",
    aliases: ["celsius-energy-drink", "celsius"],
    name: "Celsius Energy Drink",
    amount: 200,
    servingSize: "12 fl oz can (355ml)",
    category: "Energy",
    description: "Celsius Energy Drink contains 200mg of caffeine extracted from green tea and guarana, along with taurine, ginger extract, and B-vitamins. Because of its 200mg dose, it takes an average metaboliser roughly 8.5 to 9 hours to clear below the 50mg sleep-safe threshold.",
    cutoffRecommendation: "For an 11:00 PM bedtime, drink your last sip of Celsius by 1:30 PM to ensure circulating caffeine drops below 50mg before sleep.",
    faqs: [
      {
        q: "How long does a Celsius stay in your system?",
        a: "With a standard human caffeine half-life of 5.5 hours, 200mg of caffeine decays to 100mg after 5.5 hours, 50mg after 11 hours, and roughly 25mg after 16.5 hours. Fast metabolisers clear it in about 8 hours, while slow metabolisers can feel effects for over 14 hours.",
      },
      {
        q: "Can I drink a Celsius at 2:00 PM and still sleep at 11:00 PM?",
        a: "At 11:00 PM (9 hours after drinking), an average metaboliser still has approximately 64mg of caffeine active in their bloodstream—above the 50mg sleep disruption threshold. It may delay sleep onset and reduce restorative deep slow-wave sleep.",
      },
      {
        q: "Why does Celsius feel stronger than regular coffee with the same caffeine?",
        a: "Celsius combines 200mg of anhydrous caffeine with guarana extract (which naturally releases caffeine), green tea catechins, glucuronolactone, and 100% daily values of B-vitamins, creating an amplified stimulatory effect on heart rate and sympathetic tone.",
      },
    ],
  },
  {
    slug: "starbucks-cold-brew",
    aliases: ["starbucks-cold-brew-grande"],
    name: "Starbucks Cold Brew (Grande)",
    amount: 205,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Coffee",
    description: "Starbucks Grande Cold Brew is steeped slowly in cold water for 20 hours, yielding a concentrated, smooth beverage packed with 205mg of caffeine. With virtually no acidity, it drinks quickly but lingers in the bloodstream for up to 10 hours.",
    cutoffRecommendation: "Finish your Grande Cold Brew before 1:30 PM if you plan to sleep by 11:00 PM.",
    faqs: [
      {
        q: "How much caffeine is in a Starbucks Grande Cold Brew?",
        a: "A 16 fl oz Grande Starbucks Cold Brew contains 205mg of caffeine. A Trenta (30 fl oz) contains up to 360mg, making it one of the most potent retail coffee beverages.",
      },
      {
        q: "Why does cold brew keep me awake longer than iced coffee?",
        a: "Cold brew has higher caffeine density (about 12.8mg per fl oz) and is low in tannins and acidity, allowing faster gastric emptying and rapid intestinal absorption compared to bitter hot-brewed coffee.",
      },
    ],
  },
  {
    slug: "starbucks-blonde-espresso",
    aliases: ["starbucks-double-espresso"],
    name: "Starbucks Double Espresso / Blonde Roast",
    amount: 150,
    servingSize: "2 shots (1.5 fl oz)",
    category: "Coffee",
    description: "Two shots of Starbucks Blonde Espresso deliver 150mg of caffeine. Blonde roasts retain slightly more caffeine density per bean than dark roasts and produce a crisp, citrus-forward espresso with rapid absorption.",
    cutoffRecommendation: "Cut off your afternoon double espresso by 2:30 PM to keep bedtime residual under 50mg.",
    faqs: [
      {
        q: "Does Starbucks Blonde Espresso have more caffeine than regular espresso?",
        a: "Yes. Starbucks Blonde Roast espresso contains roughly 85mg of caffeine per single shot (170mg in a Doppio), compared to about 75mg per shot of Signature Dark Roast espresso (150mg in a Doppio).",
      },
      {
        q: "How long does a Starbucks espresso shot stay in your blood?",
        a: "Espresso is absorbed within 20 to 45 minutes. A 150mg double shot decays to 75mg after 5.5 hours, and reaches the sleep-safe 50mg mark around 7.5 to 8 hours later.",
      },
    ],
  },
  {
    slug: "monster-energy",
    aliases: ["monster-energy-drink"],
    name: "Monster Energy",
    amount: 160,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "Monster Energy Original contains 160mg of caffeine in a 16 fl oz can, combined with 54g of carbohydrates/sugar, ginseng extract, L-carnitine, and taurine. The combination of high glycemic sugars and caffeine creates a rapid spike followed by delayed clearance.",
    cutoffRecommendation: "Stop drinking Monster Energy at least 8.5 to 9 hours before your target bedtime.",
    faqs: [
      {
        q: "How many hours before bed can I drink a Monster Energy?",
        a: "To have less than 50mg circulating when your head hits the pillow at 11:00 PM, drink your last sip of Monster Energy no later than 2:00 PM.",
      },
      {
        q: "How much caffeine is left 6 hours after drinking a Monster?",
        a: "At 6 hours, approximately 75mg of caffeine remains active in your bloodstream for an average metaboliser, and up to 88mg for slow metabolisers.",
      },
    ],
  },
  {
    slug: "red-bull",
    aliases: ["red-bull-energy-drink"],
    name: "Red Bull",
    amount: 80,
    servingSize: "8.4 fl oz can (250ml)",
    category: "Energy",
    description: "An 8.4 fl oz can of classic Red Bull contains 80mg of caffeine, roughly equivalent to a standard 8oz home-brewed cup of coffee. It features taurine and glucuronolactone with 27g of sugars.",
    cutoffRecommendation: "A single Red Bull finished by 4:00 PM will easily clear under 50mg for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "How long does Red Bull stay in your system?",
        a: "With an 80mg starting dose, caffeine decays to 40mg in 5.5 hours and 20mg in 11 hours. A single small can is below the 50mg sleep threshold within approximately 4 hours.",
      },
      {
        q: "Is Red Bull safer for evening sleep than Monster or Celsius?",
        a: "Yes. Because Red Bull has 80mg compared to 160mg (Monster) or 200mg (Celsius), your liver requires 3 to 4 fewer hours to bring circulating caffeine below sleep-inhibiting levels.",
      },
    ],
  },
  {
    slug: "dunkin-iced-coffee",
    aliases: ["dunkin-iced-coffee-medium"],
    name: "Dunkin' Iced Coffee (Medium)",
    amount: 297,
    servingSize: "24 fl oz Medium (710ml)",
    category: "Coffee",
    description: "Dunkin's Medium Iced Coffee packs an astounding 297mg of caffeine in 24 fl oz—nearly triple a standard cup of coffee and higher than almost all commercial energy drinks.",
    cutoffRecommendation: "Never drink Dunkin' Medium Iced Coffee past 12:00 PM noon if you want restorative deep sleep tonight.",
    faqs: [
      {
        q: "Why is Dunkin' Iced Coffee so high in caffeine?",
        a: "Dunkin' double-brews their iced coffee hot using twice the amount of coffee grounds so that melting ice does not dilute the flavor, resulting in 297mg of dissolved caffeine per medium cup.",
      },
      {
        q: "How long does 297mg of Dunkin' caffeine take to clear?",
        a: "It takes nearly 14 hours for 297mg to decay down to 50mg in an average metaboliser. If consumed at 1:00 PM, you will still have over 80mg circulating at midnight.",
      },
    ],
  },
  {
    slug: "matcha",
    aliases: ["matcha-green-tea"],
    name: "Matcha Green Tea",
    amount: 70,
    servingSize: "8 fl oz cup (240ml)",
    category: "Tea",
    description: "Traditional matcha contains 70mg of caffeine per teaspoon of shade-grown green tea powder. Because matcha is made from ground whole leaves, it delivers high concentrations of L-theanine and EGCG catechins that smooth out the stimulant curve.",
    cutoffRecommendation: "Safe to consume up until 4:30 PM for an 11:00 PM bedtime for average metabolisers.",
    faqs: [
      {
        q: "Why does matcha feel calmer than coffee?",
        a: "Matcha contains L-theanine (approx. 20–30mg per bowl), an amino acid that crosses the blood-brain barrier to stimulate GABA production and alpha brain waves, preventing jitters and heart palpitations.",
      },
      {
        q: "Can matcha disrupt sleep?",
        a: "Yes, if consumed within 4 hours of bedtime. Although calmer, its 70mg of caffeine still blocks adenosine receptors and can fragment REM sleep if circulating above 50mg.",
      },
    ],
  },
  {
    slug: "celsius-heat",
    name: "Celsius Heat",
    amount: 300,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "Celsius Heat is a high-stimulant performance energy drink with 300mg of caffeine and 2,000mg of L-citrulline. At 300mg, it takes nearly 15 hours to clear from the bloodstream.",
    cutoffRecommendation: "Strict cutoff before 11:00 AM. Any Celsius Heat consumed after noon will ruin sleep architecture.",
    faqs: [
      {
        q: "How long does Celsius Heat stay in your system?",
        a: "At 300mg, you still have 150mg circulating after 5.5 hours, 75mg after 11 hours, and 37mg after 16.5 hours. It takes over 14 hours to reach the 50mg sleep threshold.",
      },
    ],
  },
  {
    slug: "rockstar-energy",
    name: "Rockstar Energy",
    amount: 160,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "A 16 fl oz can of Rockstar Energy delivers 160mg of caffeine, taurine, guarana, and ginseng. It takes roughly 8.5 hours to clear below 50mg.",
    cutoffRecommendation: "Stop drinking Rockstar Energy by 2:00 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "How much caffeine remains 8 hours after a Rockstar?",
        a: "After 8 hours, approximately 58mg of caffeine remains active in your system—still enough to suppress slow-wave sleep in sensitive adults.",
      },
    ],
  },
  {
    slug: "red-bull-sugarfree",
    name: "Red Bull Sugarfree",
    amount: 80,
    servingSize: "8.4 fl oz can (250ml)",
    category: "Energy",
    description: "Contains 80mg of caffeine identical to the original Red Bull recipe, sweetened with acesulfame K and aspartame. Clears at identical hepatic clearance rates.",
    cutoffRecommendation: "Safe to consume up until 4:00 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "Does sugar-free Red Bull clear faster than regular?",
        a: "No. The liver's CYP1A2 enzyme metabolizes caffeine independently of glucose levels. The 5.5-hour half-life remains identical.",
      },
    ],
  },
  {
    slug: "starbucks-brewed-coffee",
    aliases: ["starbucks-brewed-grande"],
    name: "Starbucks Brewed Coffee (Grande Pike Place)",
    amount: 310,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Coffee",
    description: "A Grande drip coffee from Starbucks contains an astonishing 310mg of caffeine—more than two Celsius energy drinks and four cans of Red Bull. It is one of the most potent caffeine doses available at commercial drive-thrus.",
    cutoffRecommendation: "Drink only before 11:00 AM. 310mg requires a full 14.5 hours to drop below 50mg.",
    faqs: [
      {
        q: "Why does Starbucks drip coffee have so much caffeine?",
        a: "Starbucks uses high brewing water temperatures and a high ratio of ground coffee to water, maximizing solvent extraction of methylxanthines.",
      },
    ],
  },
  {
    slug: "starbucks-latte",
    aliases: ["starbucks-latte-grande"],
    name: "Starbucks Caffe Latte (Grande)",
    amount: 150,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Coffee",
    description: "Contains 150mg of caffeine from two espresso shots mixed with steamed milk. Whole milk fats slightly slow stomach emptying, creating a mild delay in peak bloodstream concentration.",
    cutoffRecommendation: "Enjoy your last Starbucks latte before 2:30 PM to protect tonight's sleep.",
    faqs: [
      {
        q: "Does milk in a latte slow down caffeine?",
        a: "Yes, proteins and fats in milk slow gastric emptying by 15–20 minutes, blunting the sudden caffeine peak compared to black Americano.",
      },
    ],
  },
  {
    slug: "dunkin-brewed-coffee",
    aliases: ["dunkin-brewed-medium"],
    name: "Dunkin' Brewed Coffee (Medium)",
    amount: 210,
    servingSize: "14 fl oz Medium (414ml)",
    category: "Coffee",
    description: "A standard Medium hot drip coffee from Dunkin' contains 210mg of caffeine, slightly higher than a Celsius energy drink.",
    cutoffRecommendation: "Cut off by 1:30 PM for an 11:00 PM sleep target.",
    faqs: [
      {
        q: "How many hours does Dunkin' hot coffee take to clear?",
        a: "With 210mg, it takes approximately 11.5 hours to clear down to 50mg in an average human body.",
      },
    ],
  },
  {
    slug: "nespresso-capsule",
    name: "Nespresso Original Capsule",
    amount: 65,
    servingSize: "1.35 fl oz Espresso shot",
    category: "Coffee",
    description: "A standard Nespresso Original Line capsule (such as Ristretto, Arpeggio, or Volluto) contains 60 to 65mg of caffeine extracted under 19 bars of pressure.",
    cutoffRecommendation: "Safe up until 5:00 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "How many Nespresso pods equal one Starbucks coffee?",
        a: "It takes nearly 5 Nespresso capsules (300mg) to match a single Grande Starbucks drip coffee (310mg).",
      },
    ],
  },
  {
    slug: "yerba-mate",
    name: "Yerba Mate (8 oz Brewed)",
    amount: 85,
    servingSize: "8 fl oz cup (240ml)",
    category: "Tea",
    description: "Brewed South American Ilex paraguariensis leaves yield 85mg of caffeine plus trace theobromine and saponins for steady, non-jittery cognitive energy.",
    cutoffRecommendation: "Consume before 4:00 PM for standard 11:00 PM bedtime.",
    faqs: [
      {
        q: "Does Yerba Mate clear faster than coffee?",
        a: "The caffeine compound (1,3,7-trimethylxanthine) is biochemically identical and clears at the same 5.5-hour half-life rate.",
      },
    ],
  },
  {
    slug: "black-tea",
    name: "Black Tea (8 oz)",
    amount: 50,
    servingSize: "8 fl oz cup (240ml)",
    category: "Tea",
    description: "Brewed black tea (English Breakfast, Earl Grey, Assam) contains 45–50mg of caffeine per 8oz cup, already sitting right at the sleep-safe threshold.",
    cutoffRecommendation: "Can safely be consumed until 5:30 PM without exceeding bedtime thresholds.",
    faqs: [
      {
        q: "Will an afternoon cup of black tea affect sleep?",
        a: "Because an entire cup is only 50mg, by bedtime (5 hours later) only about 26mg remains, which is well below the sleep-disruption threshold for most adults.",
      },
    ],
  },
  {
    slug: "green-tea",
    name: "Green Tea (8 oz)",
    amount: 35,
    servingSize: "8 fl oz cup (240ml)",
    category: "Tea",
    description: "Standard steeped green tea (Sencha, Dragonwell) contains just 35mg of caffeine alongside relaxing theanine amino acids.",
    cutoffRecommendation: "Safe to consume up until 6:00 PM.",
    faqs: [
      {
        q: "Can I drink green tea in the evening?",
        a: "Yes, for average metabolisers an 8oz green tea at 6:00 PM will leave less than 18mg circulating by 11:00 PM.",
      },
    ],
  },
  {
    slug: "coca-cola",
    name: "Coca-Cola (12 oz Can)",
    amount: 34,
    servingSize: "12 fl oz can (355ml)",
    category: "Soda",
    description: "A standard 12oz can of regular Coke contains 34mg of caffeine. The main sleep-disrupting factor is often the 39g of high fructose corn syrup rather than the caffeine.",
    cutoffRecommendation: "Safe until 6:00 PM in terms of caffeine decay.",
    faqs: [
      {
        q: "How much caffeine is in a can of Coke compared to coffee?",
        a: "A can of Coke (34mg) has about one-third the caffeine of an 8oz home coffee (95mg) and one-ninth of a Starbucks Grande drip (310mg).",
      },
    ],
  },
  {
    slug: "diet-coke",
    name: "Diet Coke (12 oz Can)",
    amount: 46,
    servingSize: "12 fl oz can (355ml)",
    category: "Soda",
    description: "Diet Coke contains 46mg of caffeine in 12 fl oz—35% more caffeine than regular Coca-Cola, with zero sugar or calories.",
    cutoffRecommendation: "Enjoy before 5:30 PM for undisturbed 11:00 PM sleep.",
    faqs: [
      {
        q: "Why does Diet Coke have more caffeine than regular Coke?",
        a: "The beverage formulation was designed with a slightly crisper, more stimulating flavor profile to compensate for the absence of sugar syrup.",
      },
    ],
  },
  {
    slug: "mountain-dew",
    name: "Mountain Dew (12 oz Can)",
    amount: 54,
    servingSize: "12 fl oz can (355ml)",
    category: "Soda",
    description: "Mountain Dew has 54mg of caffeine in a 12 fl oz can, making it the most caffeinated mass-market non-energy soda in North America.",
    cutoffRecommendation: "Finish by 5:00 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "Does Mountain Dew have more caffeine than Coke or Pepsi?",
        a: "Yes. Mountain Dew has 54mg compared to 34mg in Coke and 38mg in regular Pepsi.",
      },
    ],
  },
  {
    slug: "dr-pepper",
    name: "Dr Pepper (12 oz Can)",
    amount: 41,
    servingSize: "12 fl oz can (355ml)",
    category: "Soda",
    description: "A 12 fl oz can of Dr Pepper contains 41mg of caffeine, slightly higher than Coca-Cola and Pepsi.",
    cutoffRecommendation: "Finish by 5:30 PM for an 11:00 PM sleep schedule.",
    faqs: [
      {
        q: "How long does Dr Pepper caffeine stay in your system?",
        a: "With 41mg, after 5.5 hours only 20.5mg remains, falling well under any sleep-disruptive biological threshold.",
      },
    ],
  },
  {
    slug: "espresso",
    aliases: ["double-espresso", "double-shot-espresso"],
    name: "Double Shot Espresso (2 oz)",
    amount: 128,
    servingSize: "2 fl oz Doppio (60ml)",
    category: "Coffee",
    description: "A standard two-ounce double shot of espresso (Doppio) extracted at 9 bars of pressure yields approximately 120 to 135mg of caffeine. With virtually no liquid volume or milk fats to delay gastric transit, dissolved caffeine enters the bloodstream in under 15 minutes.",
    cutoffRecommendation: "Finish your afternoon espresso by 3:00 PM to ensure active caffeine drops below 50mg before an 11:00 PM bedtime.",
    faqs: [
      {
        q: "How long does a double shot of espresso stay in your body?",
        a: "A 128mg double espresso decays to 64mg after 5.5 hours, and reaches the sleep-safe 50mg mark around 7.5 to 8 hours later. For fast metabolisers it clears in about 6 hours, while slow metabolisers feel it for over 10 hours.",
      },
      {
        q: "Does espresso have more caffeine than drip coffee?",
        a: "Ounce for ounce, yes: espresso has about 64mg per fl oz vs. 15mg per fl oz for drip coffee. But because a cup of drip coffee is 8 to 16 ounces (95–310mg total), a full mug of drip coffee usually contains significantly more total caffeine than a double espresso.",
      },
    ],
  },
  {
    slug: "pre-workout",
    aliases: ["pre-workout-supplement", "c4-pre-workout", "preworkout"],
    name: "Pre-Workout Supplement",
    amount: 250,
    servingSize: "1 scoop in 10 fl oz water (300ml)",
    category: "Energy",
    description: "Standard pre-workout powders pack between 200mg and 350mg of caffeine anhydrous per scoop. Because it is anhydrous (pure waterless caffeine) paired with vasodilator ingredients like L-citrulline and beta-alanine, absorption is fast while liver clearance takes up to 13 hours.",
    cutoffRecommendation: "Take your pre-workout at least 9 to 10 hours before sleep. If working out after 5:30 PM, switch to a non-stimulant pump formula to prevent severe sleep onset delay.",
    faqs: [
      {
        q: "Can I take pre-workout at 6:00 PM and sleep at 11:00 PM?",
        a: "No. At 11:00 PM (just 5 hours after intake), roughly 133mg of active caffeine remains circulating in your bloodstream—nearly triple the 50mg sleep threshold. It will delay sleep onset by 40–90 minutes and suppress deep stage-3 slow-wave sleep.",
      },
      {
        q: "How long does 250mg of pre-workout caffeine take to clear?",
        a: "It takes roughly 12 to 13 hours for a 250mg dose to drop below the 50mg threshold in an average metaboliser. For slow metabolisers (homozygous for the CYP1A2*1F allele), it can take over 16 hours.",
      },
      {
        q: "Why does pre-workout keep me awake longer than coffee?",
        a: "Pre-workout uses caffeine anhydrous, which is absorbed faster than natural coffee bean caffeine. Many formulas also contain synephrine, tyrosine, and yohimbine, which amplify central nervous system stimulation and elevate heart rate long after training ends.",
      },
    ],
  },
  {
    slug: "ghost-energy",
    aliases: ["ghost-energy-drink", "ghost"],
    name: "Ghost Energy Drink",
    amount: 200,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "Ghost Energy packs 200mg of natural caffeine extracted from coffee beans, combined with 1,000mg of Carnipure L-carnitine, 1,000mg of taurine, 100mg of NeuroFactor coffee fruit extract, and 150mg of Alpha-GPC. Because of its nootropic blend, cognitive stimulation remains elevated even as caffeine starts to clear.",
    cutoffRecommendation: "Cut off your Ghost Energy by 1:30 PM for an 11:00 PM bedtime to drop below 50mg of circulating caffeine.",
    faqs: [
      {
        q: "How long does a Ghost energy drink stay in your system?",
        a: "With a 5.5-hour half-life, 200mg decays to 100mg in 5.5 hours, 50mg in 11 hours, and 25mg in 16.5 hours. Fast metabolisers clear it in about 8.5 hours; slow metabolisers take over 14 hours.",
      },
      {
        q: "Can I drink a Ghost at 3:00 PM and still sleep at 11:00 PM?",
        a: "At 11:00 PM (8 hours post-consumption), you will still have approximately 73mg of active caffeine circulating—well above the 50mg sleep threshold. It is likely to delay sleep onset and suppress slow-wave deep sleep.",
      },
    ],
  },
  {
    slug: "alani-nu",
    aliases: ["alani-nu-energy", "alani-nu-energy-drink"],
    name: "Alani Nu Energy Drink",
    amount: 200,
    servingSize: "12 fl oz can (355ml)",
    category: "Energy",
    description: "Alani Nu delivers 200mg of caffeine in a slim 12 fl oz can, accompanied by 200mg of L-theanine, biotin, panax ginseng, and guarana seed extract. The high caffeine concentration (16.7mg per fl oz) makes it one of the most caffeine-dense canned beverages on the market.",
    cutoffRecommendation: "Finish your Alani Nu before 1:30 PM if you plan to be asleep by 11:00 PM.",
    faqs: [
      {
        q: "How long does Alani Nu take to wear off?",
        a: "While subjective alertness peaks at 45 to 60 minutes and declines after 3 to 4 hours, biological caffeine clearance takes 11 hours to reach the sleep-safe 50mg mark.",
      },
      {
        q: "Does the L-theanine in Alani Nu help with sleep later?",
        a: "L-theanine has a short half-life of 1 to 2 hours. By bedtime (8 to 10 hours later), the calming effects of L-theanine have cleared while 60–75mg of stimulating caffeine remains active.",
      },
    ],
  },
  {
    slug: "c4-energy",
    aliases: ["c4-original-energy", "c4-energy-drink"],
    name: "C4 Original Energy Drink",
    amount: 200,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "C4 Original Energy contains 200mg of caffeine anhydrous alongside CarnoSyn beta-alanine, BetaPower betaine, and N-acetyl-L-tyrosine. The tingling sensation from beta-alanine dissipates in 60 minutes, but the 200mg caffeine dose persists in the liver for up to 12 hours.",
    cutoffRecommendation: "Drink your last sip of C4 Energy before 1:30 PM for standard 11:00 PM bedtime protection.",
    faqs: [
      {
        q: "How long does C4 Energy stay in your system?",
        a: "C4's 200mg caffeine dose requires roughly 11 hours to drop to 50mg. Consuming C4 after 2:00 PM guarantees elevated bedtime heart rate and delayed sleep onset.",
      },
    ],
  },
  {
    slug: "c4-smart-energy",
    aliases: ["c4-smart-energy-drink"],
    name: "C4 Smart Energy",
    amount: 200,
    servingSize: "12 fl oz can (355ml)",
    category: "Energy",
    description: "Formulated with 200mg of InnovaTea natural caffeine derived from fermented tea leaves, paired with Cognizin citicoline for cognitive focus without beta-alanine tingles.",
    cutoffRecommendation: "Safe cutoff is 1:30 PM for standard 11:00 PM sleep schedules.",
    faqs: [
      {
        q: "Does C4 Smart Energy clear faster than regular C4?",
        a: "No. Natural caffeine and synthetic caffeine have identical molecular structures (1,3,7-trimethylxanthine) and are cleared by hepatic CYP1A2 enzymes at the exact same rate.",
      },
    ],
  },
  {
    slug: "reign-energy",
    aliases: ["reign-total-body-fuel", "reign"],
    name: "Reign Total Body Fuel",
    amount: 300,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "Reign Total Body Fuel contains an intense 300mg dose of natural caffeine, along with branched-chain amino acids (BCAAs), CoQ10, and electrolytes. At 300mg, it requires nearly 15 hours to clear down to sleep-safe levels.",
    cutoffRecommendation: "Strict cutoff before 11:00 AM. Ingesting 300mg past noon will severely disrupt slow-wave deep sleep.",
    faqs: [
      {
        q: "How many hours before bed can you drink a Reign?",
        a: "You need a full 14 to 15 hours between drinking a Reign and your target bedtime to ensure circulating caffeine drops under 50mg. For an 11:00 PM bedtime, your cutoff is 10:30 AM to 11:00 AM.",
      },
      {
        q: "How much caffeine remains 8 hours after a Reign?",
        a: "At 8 hours, approximately 109mg of caffeine remains active in your bloodstream—more than an entire freshly brewed cup of coffee.",
      },
    ],
  },
  {
    slug: "bang-energy",
    aliases: ["bang-energy-drink", "bang"],
    name: "Bang Energy",
    amount: 300,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "Bang Energy features 300mg of caffeine anhydrous per 16 fl oz can, combined with EAAs (essential amino acids) and CoQ10. This heavy stimulant dose places significant metabolic strain on hepatic clearance pathways.",
    cutoffRecommendation: "Finish before 11:00 AM. Drinking a Bang Energy in the afternoon will ruin restorative sleep tonight.",
    faqs: [
      {
        q: "How long does a Bang Energy stay in your system?",
        a: "A 300mg can takes roughly 5.5 hours to drop to 150mg, 11 hours to drop to 75mg, and over 14.5 hours to reach the 50mg sleep-safe threshold.",
      },
    ],
  },
  {
    slug: "prime-energy",
    aliases: ["prime-energy-drink", "prime-can"],
    name: "Prime Energy Drink",
    amount: 200,
    servingSize: "12 fl oz can (355ml)",
    category: "Energy",
    description: "Prime Energy contains 200mg of caffeine per 12 fl oz can, with 300mg of electrolytes and zero sugar. Its rapid drinkability and sweet flavor profile make it easy to consume quickly, leading to rapid blood concentration spikes.",
    cutoffRecommendation: "Drink only before 1:30 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "How long does Prime Energy stay in your system?",
        a: "With 200mg, Prime Energy takes roughly 11 hours to decay below 50mg in an average metaboliser.",
      },
      {
        q: "Can a Prime Energy keep you awake all night?",
        a: "Yes. If consumed at 5:00 PM or 6:00 PM, over 100mg of caffeine will still be active at midnight, blocking adenosine receptors and causing severe insomnia.",
      },
    ],
  },
  {
    slug: "starbucks-nitro-cold-brew",
    aliases: ["starbucks-nitro", "nitro-cold-brew"],
    name: "Starbucks Nitro Cold Brew (Grande)",
    amount: 280,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Coffee",
    description: "Starbucks Nitro Cold Brew is infused with nitrogen gas micro-bubbles straight from the tap, creating a velvety crema and silky mouthfeel. It packs an intense 280mg of caffeine in a 16oz cup, served without ice so the drink remains undiluted.",
    cutoffRecommendation: "Finish your Nitro Cold Brew before 12:00 PM noon. 280mg requires nearly 14 hours to reach 50mg.",
    faqs: [
      {
        q: "Why is Nitro Cold Brew so high in caffeine?",
        a: "Nitro cold brew is served without ice, meaning you receive a full 16 ounces of undiluted slow-steeped coffee concentrate, providing 280mg compared to 205mg in a regular iced cold brew.",
      },
      {
        q: "Does nitro cold brew absorb faster?",
        a: "The nitrogen micro-bubbles and lower acidity accelerate gastric transit, causing blood plasma caffeine levels to peak approximately 10 to 15 minutes faster than regular hot coffee.",
      },
    ],
  },
  {
    slug: "starbucks-iced-shaken-espresso",
    aliases: ["starbucks-shaken-espresso", "shaken-espresso"],
    name: "Starbucks Iced Shaken Espresso (Grande)",
    amount: 225,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Coffee",
    description: "A standard Grande Iced Shaken Espresso from Starbucks is built with three shots of espresso (225mg caffeine) shaken vigorously with classic syrup and ice, topped with a splash of milk.",
    cutoffRecommendation: "Cut off before 1:00 PM for an 11:00 PM sleep target.",
    faqs: [
      {
        q: "How much caffeine is in an Iced Shaken Espresso?",
        a: "A Grande contains 3 shots of espresso for 225mg of caffeine. A Venti contains 4 shots delivering 300mg of caffeine.",
      },
    ],
  },
  {
    slug: "panera-charged-lemonade",
    aliases: ["panera-charged-splash", "panera-caffeine"],
    name: "Panera Charged Lemonade / Splash",
    amount: 237,
    servingSize: "20 fl oz Regular (591ml)",
    category: "Energy",
    description: "Panera's Charged Lemonades combined green coffee extract and guarana extract in a sweet, highly drinkable fruit beverage. A regular 20 fl oz cup delivered 237mg of caffeine, while a large 30 fl oz contained an astonishing 390mg.",
    cutoffRecommendation: "Requires 12.5 to 13 hours to clear below 50mg. Do not consume past 11:30 AM.",
    faqs: [
      {
        q: "Why did Panera Charged Lemonade have so much caffeine?",
        a: "It was formulated using high-dose guarana seed and green coffee extract disguised in a refreshing fountain lemonade, matching or exceeding the caffeine of commercial energy drinks.",
      },
    ],
  },
  {
    slug: "dutch-bros-rebel",
    aliases: ["dutch-bros-energy", "blue-rebel"],
    name: "Dutch Bros Blue Rebel Energy Drink",
    amount: 160,
    servingSize: "24 fl oz Medium (710ml)",
    category: "Energy",
    description: "Dutch Bros exclusive Blue Rebel energy drink contains 160mg of caffeine in a 24 fl oz iced medium beverage, formulated with taurine, glucuronolactone, and B-vitamins.",
    cutoffRecommendation: "Stop drinking your Dutch Bros Rebel by 2:00 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "How much caffeine is in a Dutch Bros Rebel?",
        a: "A Small (16oz) contains roughly 80mg, a Medium (24oz) contains 160mg, and a Large (32oz) contains 240mg.",
      },
    ],
  },
  {
    slug: "g-fuel",
    aliases: ["gfuel-energy", "g-fuel-can"],
    name: "G Fuel Energy Can / Powder",
    amount: 140,
    servingSize: "16 fl oz can (473ml) or 1 scoop",
    category: "Energy",
    description: "G Fuel Energy Drink Cans contain 140mg of caffeine (with older legacy cans carrying 300mg), fortified with an antioxidant complex and focus amino acids like L-tyrosine and choline bitartrate.",
    cutoffRecommendation: "Safe to consume up until 2:30 PM for an 11:00 PM sleep target.",
    faqs: [
      {
        q: "How long does G Fuel stay in your system?",
        a: "A 140mg G Fuel can requires about 8 hours to drop below the 50mg sleep threshold. If consumed at 3:00 PM, roughly 51mg remains at 11:00 PM.",
      },
    ],
  },
  {
    slug: "monster-ultra-zero",
    aliases: ["monster-white", "monster-energy-ultra"],
    name: "Monster Energy Ultra Zero (White)",
    amount: 160,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "The zero-sugar white Monster Energy Ultra delivers 160mg of caffeine, sweetened with erythritol and sucralose, with a blend of taurine, panax ginseng, and L-carnitine. Its crisp citrus profile is popular among gamers and desk workers.",
    cutoffRecommendation: "Finish your White Monster by 2:00 PM for an 11:00 PM sleep schedule.",
    faqs: [
      {
        q: "Does Monster Ultra Zero have less caffeine than regular Monster?",
        a: "No. Both Monster Original (black can) and Monster Ultra (white can) contain exactly 160mg of caffeine per 16 fl oz can.",
      },
    ],
  },
  {
    slug: "rockstar-pure-zero",
    aliases: ["rockstar-zero"],
    name: "Rockstar Pure Zero Energy Drink",
    amount: 240,
    servingSize: "16 fl oz can (473ml)",
    category: "Energy",
    description: "Rockstar Pure Zero delivers a heavy 240mg of caffeine per 16 fl oz can—50% more caffeine than standard Monster or Red Bull—with zero grams of sugar and zero calories.",
    cutoffRecommendation: "Cut off before 12:30 PM. 240mg requires over 12.5 hours to drop below 50mg.",
    faqs: [
      {
        q: "How long does Rockstar Pure Zero stay active in your blood?",
        a: "At 240mg, after 5.5 hours you still have 120mg in your bloodstream, and after 11 hours you still have 60mg. It requires nearly 13 hours to become sleep-safe.",
      },
    ],
  },
  {
    slug: "5-hour-energy",
    aliases: ["5-hour-energy-shot", "five-hour-energy"],
    name: "5-Hour Energy Shot (Regular)",
    amount: 200,
    servingSize: "1.93 fl oz shot (57ml)",
    category: "Energy",
    description: "A 1.93 fl oz 5-Hour Energy Shot concentrates 200mg of caffeine with 2,000% daily value of Vitamin B6 and 8,333% of Vitamin B12, along with taurine, glucuronolactone, and malic acid.",
    cutoffRecommendation: "Take your last shot before 1:30 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "Why is 5-Hour Energy called 5-Hour if caffeine lasts longer?",
        a: "The marketing refers to the perceived period of acute alertness. Biochemically, the 200mg of caffeine remains active in your liver and bloodstream for 11+ hours.",
      },
      {
        q: "How much caffeine is in 5-Hour Energy Extra Strength?",
        a: "Extra Strength 5-Hour Energy contains approximately 230mg of caffeine compared to 200mg in the regular version.",
      },
    ],
  },
  {
    slug: "yerba-mate-guayaki",
    aliases: ["guayaki-yerba-mate", "guayaki-can"],
    name: "Guayakí Yerba Mate Can (15.5 oz)",
    amount: 150,
    servingSize: "15.5 fl oz can (458ml)",
    category: "Tea",
    description: "A 15.5 fl oz can of ready-to-drink Guayakí Yerba Mate contains 150mg of naturally occurring caffeine brewed from organic yerba mate leaves, providing a smoother cognitive boost with theobromine and polyphenols.",
    cutoffRecommendation: "Cut off by 2:30 PM for an 11:00 PM sleep schedule.",
    faqs: [
      {
        q: "Is Yerba Mate caffeine different from coffee caffeine?",
        a: "The active molecule is identical (caffeine), but yerba mate also contains theobromine and theophylline, which dilate bronchial vessels and provide a milder cardiovascular sensation.",
      },
    ],
  },
  {
    slug: "starbucks-chai-tea-latte",
    aliases: ["starbucks-chai-latte", "chai-latte"],
    name: "Starbucks Chai Tea Latte (Grande)",
    amount: 95,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Tea",
    description: "Starbucks Grande Chai Tea Latte is prepared with black tea concentrate infused with cinnamon, cardamom, black pepper, ginger, and cloves, combined with steamed milk. It contains 95mg of caffeine—identical to an 8oz drip coffee.",
    cutoffRecommendation: "Finish your Chai Latte by 3:30 PM for standard 11:00 PM sleep.",
    faqs: [
      {
        q: "Does a Chai Tea Latte have as much caffeine as coffee?",
        a: "Yes. At 95mg, a Grande Chai Latte has as much caffeine as an 8oz cup of regular brewed coffee and more than a standard Red Bull (80mg).",
      },
    ],
  },
  {
    slug: "keurig-k-cup",
    aliases: ["k-cup-coffee", "keurig-coffee"],
    name: "Keurig K-Cup Brewed Coffee",
    amount: 120,
    servingSize: "8 fl oz cup (237ml)",
    category: "Coffee",
    description: "A standard medium-roast Keurig K-Cup pod brewed at the 8oz setting yields between 100mg and 140mg of caffeine (average 120mg). High-pressure needle injection ensures rapid extraction in under 60 seconds.",
    cutoffRecommendation: "Cut off before 3:00 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "Does brewing a 10oz K-Cup give more caffeine than an 8oz?",
        a: "Barely. Almost all available caffeine is dissolved within the first 4 to 6 ounces of water passage; running 10oz mostly dilutes the brew without adding significant milligrams.",
      },
    ],
  },
  {
    slug: "french-press-coffee",
    aliases: ["french-press", "plunger-coffee"],
    name: "French Press Coffee (12 oz)",
    amount: 180,
    servingSize: "12 fl oz cup (355ml)",
    category: "Coffee",
    description: "French press uses a coarse grind with a 4-minute full immersion steep in hot water. Because the stainless steel mesh allows fine coffee oils and suspended micro-grounds through, a 12oz cup delivers roughly 180mg of caffeine.",
    cutoffRecommendation: "Enjoy your last French press coffee before 1:45 PM for an 11:00 PM bedtime.",
    faqs: [
      {
        q: "Why is French press coffee so strong?",
        a: "Full water-ground contact time over 4 to 5 minutes extracts a higher percentage of total dissolved solids and caffeine compared to fast paper-filtered pour-over methods.",
      },
    ],
  },
  {
    slug: "decaf-coffee",
    aliases: ["decaffeinated-coffee", "decaf-drip"],
    name: "Decaffeinated Drip Coffee (8 oz)",
    amount: 7,
    servingSize: "8 fl oz cup (237ml)",
    category: "Coffee",
    description: "Decaffeinated coffee is legally required to have 97% of its caffeine removed, leaving an average of 3mg to 12mg (typical 7mg) of residual caffeine per 8oz cup. While minimal, 3 to 4 evening cups can accumulate 25–30mg.",
    cutoffRecommendation: "Safe to drink in the evening up to 8:30 PM for typical individuals.",
    faqs: [
      {
        q: "Can decaf coffee keep you awake?",
        a: "For 95% of people, 7mg of caffeine will not affect sleep. However, extreme slow metabolisers or those who drink multiple large decaf mugs late at night can accumulate 25–30mg, which is enough to delay sleep onset in sensitive people.",
      },
    ],
  },
  {
    slug: "starbucks-refresher",
    aliases: ["starbucks-strawberry-acai", "strawberry-acai-refresher"],
    name: "Starbucks Strawberry Açaí Refresher (Grande)",
    amount: 45,
    servingSize: "16 fl oz Grande (473ml)",
    category: "Coffee",
    description: "Starbucks Refreshers are fruit-forward iced drinks lightly caffeinated with unroasted green coffee extract. A Grande contains 45mg of caffeine—about half a cup of coffee.",
    cutoffRecommendation: "Safe to consume up until 5:30 PM for an 11:00 PM sleep target.",
    faqs: [
      {
        q: "Do Starbucks Refreshers have caffeine?",
        a: "Yes! Many customers don't realize that all Starbucks Refreshers contain 45mg to 50mg of caffeine from green coffee bean extract.",
      },
    ],
  },
];

export function getDrinkBySlug(slug: string): CaffeineDrink | undefined {
  const clean = slug.toLowerCase().trim();
  return CAFFEINE_DRINKS.find(
    (d) => d.slug === clean || d.aliases?.includes(clean)
  );
}

export interface DecayRow {
  intakeTimeLabel: string;
  intakeHour: number; // e.g. 8, 12, 14, 16
  plus2h: number;
  plus4h: number;
  plus6h: number;
  plus8h: number;
  plus10h: number;
  plus12h: number;
  atBedtime11PM: number;
  isSafeByBedtime: boolean;
}

export function calculateDecayTable(amountMg: number, halfLife = 5.5): DecayRow[] {
  const times = [
    { label: "08:00 AM", hour: 8 },
    { label: "12:00 PM (Noon)", hour: 12 },
    { label: "02:00 PM", hour: 14 },
    { label: "04:00 PM", hour: 16 },
  ];

  return times.map(({ label, hour }) => {
    const calc = (h: number) => Math.round(mgRemaining(amountMg, h, halfLife));
    const hoursTo11PM = Math.max(0, 23 - hour);
    const atBed = calc(hoursTo11PM);
    return {
      intakeTimeLabel: label,
      intakeHour: hour,
      plus2h: calc(2),
      plus4h: calc(4),
      plus6h: calc(6),
      plus8h: calc(8),
      plus10h: calc(10),
      plus12h: calc(12),
      atBedtime11PM: atBed,
      isSafeByBedtime: atBed <= SLEEP_SAFE_MG,
    };
  });
}
