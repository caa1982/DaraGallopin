export interface Artwork {
  title: string;
  image: string;
  description: string;
  isFeatured?: boolean;
  year?: string;
  width?: number;
  height?: number;
}

export const artworks: Artwork[] = [
  {
    title: "Untitled (Triptych 1 of 3)",
    image: "/panel_1.jpg",
    description: "195 x 467 - Oil on Canvas",
    width: 4,
    height: 2,
    year: "2020"
  },
  {
    title: "Untitled (Triptych 1 of 3)",
    image: "/panel_2.jpg",
    width: 4,
    height: 2,
    description: "195 x 467 - oil on canvas",
    year: "2020"
  },
  {
    title: "Untitled (Triptych 1 of 3)",
    image: "/panel_3.jpg",
    width: 4,
    height: 2,
    description: "195 x 467 - oil on canvas",
    year: "2023"
  },
  {
    title: "Untitled (DIPTYCH)",
    image: "/Diptych.jpg",
    width: 3,
    height: 2,
    description: "270 x 360 cm - oil on canvas",
    year: "2020"
  },
  {
    title: "Second Chance",
    image: "/Second_Chance_2.jpg",
    width: 468,
    height: 195,
    description: "195 x 468 - oil on canvas",
    year: "2018"
  },
  {
    title: "The Scream",
    image: "/Scream.png",
    width: 8,
    height: 10,
    description: "100 x 80 cm - Oil on Canvas",
    isFeatured: true,
    year: "2020",
  },
  {
    title: "Submarine",
    image: "/Submarine.png",
    width: 16,
    height: 10,
    description: "100 x 160 cm - Oil on Canvas",
    year: "2019",
  },
  {
    title: "Gopnik Shoe",
    image: "/Gopnik_Shoe.png",
    width: 6,
    height: 9,
    description: "90 x 60 cm - Oil on Canvas",
    isFeatured: true,
    year: "2017",
  },
  {
    title: "Gopnik Knife",
    image: "/Gopnik_knife.png",
    width: 6,
    height: 9,
    description: "90 x 60 cm - oil on canvas",
    year: "2018"
  },
  {
    title: "Gopnik",
    image: "/Gopnik_Girl.jpg",
    width: 2,
    height: 1,
    description: "105 x 210 cm - oil on canvas",
    year: "2018"
  },
  {
    title: "Girl with Knife",
    image: "/Girl_Knife.png",
    width: 60,
    height: 90,
    description: "90 x 60 cm - oil and Gold Leaf on Wonden Box",
    year: "2018"
  },
  {
    title: "Robin Williams",
    image: "/Robin.png",
    width: 60,
    height: 75,
    description: "60 x 75 cm - Oil on Canvas",
    isFeatured: true,
    year: "2018"
  },
  {
    title: "Second Chance",
    image: "/Second_chance.jpg",
    description: "150 x 250 cm - Colored Pencils on Paper",
    year: "2007",
    width: 250,
    height: 150,
  },
  {
    title: "Girl in Tutu 1",
    image: "/Tutu_1.jpg",
    description: "90 x 60 cm - Oil and Gold Leaf on Wooden Box",
    year: "2018",
    width: 80,
    height: 90,
  },
  {
    title: "Girl in Tutu 2",
    image: "/Tutu_2.jpg",
    description: "90 x 60 cm - Oil and Gold Leaf on Wooden Box",
    year: "2018",
    width: 80,
    height: 90,
  },
  {
    title: "Witches & Bitches",
    image: "/Witches_Bitches.jpg",
    description: "220 x 136 cm - Oil and Gold Leaf on Wooden Cross",
    year: "2018",
    width: 160,
    height: 200,
  },
  {
    title: "Untilted",
    image: "/Untilted_1.jpg",
    description: "150 x 250 cm - Colored Pencils on Paper",
    year: "2008",
    width: 250,
    height: 150,
  },
  {
    title: "Untilted",
    image: "/Untilted_3.jpg",
    description: "50 x 83 cm - Colored Pencils on Paper",
    year: "2014",
    width: 83,
    height: 50,
  },
  {
    title: "Untilted",
    image: "/Untilted_4.jpg",
    description: "50 x 83 cm - Colored Pencils on Paper",
    year: "2013",
    width: 83,
    height: 50,
  },
  {
    title: "Emerge",
    image: "/Emerge.jpg",
    description: "150 x 240 cm - Colored Pencils on Paper",
    year: "2008",
    width: 240,
    height: 150,
  },
  {
    title: "Untilted",
    image: "/Untitled_5.jpg",
    description: "150 x 240 cm - Colored Pencils on Paper",
    year: "2009",
    width: 250,
    height: 150,
  },
  {
    title: "Untilted",
    image: "/Untitled_6.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2010",
    width: 150,
    height: 150,
  },
  {
    title: "Untilted",
    image: "/Untitled_7.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2010",
    width: 150,
    height: 150,
  },
  {
    title: "Untilted",
    image: "/Untitled_8.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2010",
    width: 150,
    height: 150,
  },
  {
    title: "Untilted",
    image: "/Untitled_9.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2015",
    width: 150,
    height: 170,
  },
  {
    title: "Untilted",
    image: "/Untitled_10.jpg",
    description: "148 x 223 cm - Colored Pencils on Paper",
    year: "2008",
    width: 223,
    height: 148,
  },
  {
    title: "Untilted",
    image: "/Untitled_11.jpg",
    description: "148 x 223 cm - Colored Pencils on Paper",
    year: "2008",
    width: 223,
    height: 148,
  },
  {
    title: "Untilted",
    image: "/Untitled_12.jpg",
    description: "250 x 250 cm - Colored Pencils on Paper",
    year: "2007",
    width: 250,
    height: 250,
  },
  {
    title: "Holy V",
    image: "/Holy_V_1.jpg",
    description: "150 x 220 cm - Colored Pencils on Paper",
    year: "2013",
    width: 220,
    height: 150,
  },
  {
    title: "Holy V",
    image: "/Holy_V_2.jpg",
    description: "150 x 220 cm - Colored Pencils on Paper",
    year: "2013",
    width: 220,
    height: 150,
  },
  {
    title: "Untitled",
    image: "/Untitled_13.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2015",
    width: 150,
    height: 150,
  },
  {
    title: "Untitled",
    image: "/Untitled_14.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2009",
    width: 150,
    height: 150,
  },
  {
    title: "Untitled",
    image: "/Untitled_15.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2009",
    width: 150,
    height: 150,
  },
  {
    title: "Untitled",
    image: "/Untitled_16.jpg",
    description: "150 x 150 cm - Colored Pencils on Paper",
    year: "2009",
    width: 150,
    height: 150,
  },
  {
    title: "Tree of Life",
    image: "/Tree.png",
    description: "Oil on Canvas",
    year: "180 x 130 cm - 2019",
    width: 130,
    height: 180,
  },
  {
    title: "Kiev",
    image: "/Kiev.jpg",
    description: "33 x 48 cm - Ink on Paper",
    year: "2016",
    width: 48,
    height: 33,
  },
  {
    title: "Beverly Hills",
    image: "/Beverly_Hills.jpg",
    description: "33 x 32 cm - Ink on Paper",
    year: "2014",
    width: 32,
    height: 33,
  },
  {
    title: "New York",
    image: "/New_York.jpg",
    description: "33 x 48 cm - Ink on Paper",
    year: "2014",
    width: 48,
    height: 33,
  },
  {
    title: "Signagi",
    image: "/Signagi.jpg",
    description: "33 x 48 cm - Ink on Paper",
    year: "2015",
    width: 48,
    height: 33,
  },
  {
    title: "Krka",
    image: "/Krka.jpg",
    description: "33 x 48 cm - Ink on Paper",
    year: "2004",
    width: 48,
    height: 33,
  },
  {
    title: "Rome",
    image: "/Rome.jpg",
    description: "33 x 48 cm - Ink on Paper",
    year: "2005",
    width: 48,
    height: 33,
  },
  {
    title: "Rome",
    image: "/Rome_2.jpg",
    description: "33 x 48 cm - Ink on Paper",
    year: "2005",
    width: 48,
    height: 33,
  },
  {
    title: "Roadkill",
    image: "/Roadkill.jpg",
    description: "40 x 90 x 25 cm - SKATEBOARD, FOX SKIN AND ACRYLIC SPRAY",
    year: "2011",
    width: 90,
    height: 60,
  },
  {
    title: "Never Give Up",
    image: "/Never_Give_Up.jpg",
    description: "120 x 100 x 70 cm - Taxidermy And Mixed Media",
    year: "2011",
    width: 90,
    height: 130,
  },
  {
    title: "Time Machine",
    image: "/Time_Machine.jpg",
    description: "80 x 160 x 160 cm - Bronze, Fiber Glasss and Chrome",
    year: "2010",
    width: 160,
    height: 100,
  },
  {
    title: "Hoverboard",
    image: "/Hoverboard.jpg",
    description: "107 x 70 x 35 cm - Bronze, Fiber Glasss and Chrome",
    year: "2009",
    width: 100,
    height: 130,
  },
  {
    title: "Untitled (Triptych)",
    image: "/Untitled_17.jpg",
    description: "585 x 467 cm - Bronze, Fiber Glasss and Chrome",
    year: "2020",
    width: 467,
    height: 585,
  }
]

export function getArtworks(): Artwork[] {
  return [...artworks].sort((a, b) => {
    if (!a.year || !b.year) return 0
    return b.year.localeCompare(a.year)
  }).map(artwork => ({
    ...artwork,
    description: artwork.description.toUpperCase()
  }))
}

export function getRecentArtworks(limit: number = 2): Artwork[] {
  return [...artworks].sort((a, b) => {
    if (!a.year || !b.year) return 0
    return b.year.localeCompare(a.year)
  }).slice(0, limit).map(artwork => ({
    ...artwork,
    description: artwork.description.toUpperCase()
  }))
}