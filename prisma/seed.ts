import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authors = [
  {
    id: "027b99be-c7af-476b-a819-92f92e79505c",
    name: "Johannes Vermeer",
    era: "Dutch Golden Age",
    birthplace: "Delft, Netherlands",
    keywords: ["Baroque", "Cityscape", "Vermeer"],
  },
  {
    id: "1f947cfc-6b6d-49e7-981e-bced8cf60665",
    name: "Caravaggio",
    era: "Baroque",
    birthplace: "Milan, Italy",
    keywords: ["Baroque", "Chiaroscuro", "Caravaggio"],
  },
  {
    id: "2d3211d5-73e4-4d14-a516-be5e19acbdf8",
    name: "Pieter Bruegel the Elder",
    era: "Renaissance",
    birthplace: "Breda, Netherlands",
    keywords: ["Renaissance", "Landscape", "Bruegel"],
  },
  {
    id: "31c6212b-cb20-40b2-a329-c96792620d84",
    name: "Leonardo da Vinci",
    era: "Renaissance",
    birthplace: "Vinci, Italy",
    keywords: ["Renaissance", "Portrait", "Da Vinci"],
  },
  {
    id: "4133e03c-716c-4015-851f-1214bd008d37",
    name: "Sandro Botticelli",
    era: "Renaissance",
    birthplace: "Florence, Italy",
    keywords: ["Renaissance", "Mythology", "Botticelli"],
  },
  {
    id: "4c2f6565-62a5-47ee-a746-4f1ccf128b24",
    name: "Jan van Eyck",
    era: "Northern Renaissance",
    birthplace: "Maaseik, Belgium",
    keywords: ["Northern Renaissance", "Portrait", "Van Eyck"],
  },
  {
    id: "5057db28-ae0d-44bd-be48-edbf8603d5d6",
    name: "Titian",
    era: "Renaissance",
    birthplace: "Pieve di Cadore, Italy",
    keywords: ["Renaissance", "Mythology", "Titian"],
  },
  {
    id: "56b70795-1f86-4c17-9457-bc6eddad9eab",
    name: "Édouard Manet",
    era: "Impressionism",
    birthplace: "Paris, France",
    keywords: ["Impressionism", "Manet", "Modern Art"],
  },
  {
    id: "027b99be-c7af-476b-a819-92f92e79505c",
    name: "Raphael",
    era: "High Renaissance",
    birthplace: "Urbino, Italy",
    keywords: ["High Renaissance", "Fresco", "Raphael"],
  },
  {
    id: "5b59518a-3131-4d2e-975a-b980562dbe49",
    name: "Georges Seurat",
    era: "Post-Impressionism",
    birthplace: "Paris, France",
    keywords: ["Post-Impressionism", "Pointillism", "Seurat"],
  },
  {
    id: "6eb11191-f34b-42be-af03-d96a57c267f7",
    name: "Peter Paul Rubens",
    era: "Baroque",
    birthplace: "Siegen, Germany",
    keywords: ["Baroque", "Rubens", "Religious Art"],
  },
];

const works = [
  {
    id: "3465022109372121088",
    title: "View of Delft",
    description: "A cityscape painting of Delft by Johannes Vermeer.",
    authorId: authors[0].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/3465022109372121088.jpg",
  },
  {
    id: "7447330079874482176",
    title: "The Entombment of Christ",
    description: "A dramatic depiction of Christ's entombment by Caravaggio.",
    authorId: authors[1].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/7447330079874482176.jpg",
  },
  {
    id: "8843445964359335936",
    title: "The Tower of Babel",
    description:
      "A detailed depiction of the Tower of Babel by Pieter Bruegel.",
    authorId: authors[2].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/8843445964359335936.jpg",
  },
  {
    id: "9183925133062963200",
    title: "Mona Lisa",
    description: "A world-famous portrait by Leonardo da Vinci.",
    authorId: authors[3].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/9183925133062963200.jpg",
  },
  {
    id: "7095943755823316992",
    title: "The Birth of Venus",
    description: "A mythological painting by Sandro Botticelli.",
    authorId: authors[4].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/7095943755823316992.jpg",
  },
  {
    id: "3820700926818123776",
    title: "Arnolfini Portrait",
    description: "A detailed portrait by Jan van Eyck.",
    authorId: authors[5].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/3820700926818123776.jpg",
  },
  {
    id: "6782380631767646208",
    title: "Venus and Adonis",
    description: "A romantic mythological painting by Titian.",
    authorId: authors[6].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/6782380631767646208.jpg",
  },
  {
    id: "8453216093522100224",
    title: "Olympia",
    description: "A provocative painting by Édouard Manet.",
    authorId: authors[7].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/8453216093522100224.jpg",
  },
  {
    id: "8356951651487055872",
    title: "The School of Athens",
    description: "A monumental fresco by Raphael.",
    authorId: authors[8].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/8356951651487055872.jpg",
  },
  {
    id: "8903576056259149824",
    title: "A Sunday Afternoon on the Island of La Grande Jatte",
    description: "A famous pointillist painting by Georges Seurat.",
    authorId: authors[9].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/8903576056259149824.jpg",
  },
  {
    id: "3006675294170906624",
    title: "Samson and Delilah",
    description: "A dramatic depiction by Peter Paul Rubens.",
    authorId: authors[10].id,
    imageUrl:
      "https://czitzyatrihzzwvcfjul.supabase.co/storage/v1/object/public/work_images/images/3006675294170906624.jpg",
  },
];

async function seed() {
  try {
    console.log("Seeding authors and works...");

    for (const author of authors) {
      await prisma.author.upsert({
        where: { id: author.id },
        update: {},
        create: {
          id: author.id,
          name: author.name,
          era: author.era,
          birthplace: author.birthplace,
          keywords: author.keywords,
        },
      });
    }

    for (const work of works) {
      await prisma.work.upsert({
        where: { id: work.id },
        update: {
          title: work.title,
          description: work.description,
          authorId: work.authorId,
          imageUrl: work.imageUrl,
        },
        create: {
          id: work.id,
          title: work.title,
          description: work.description,
          authorId: work.authorId,
          imageUrl: work.imageUrl,
        },
      });
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
