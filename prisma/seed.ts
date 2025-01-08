import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authors = [
  {
    id: "027b99be-c7af-476b-a819-92f92e79505c",
    description:
      "ハネス・フェルメール（Johannes Vermeer オランダ語: [joːˈɦɑnəs vərˈmeːr], 1632年10月31日? - 1675年12月15日?）は、ネーデルラント連邦共和国（オランダ）の画家で、バロック期を代表する画家の1人である。映像のような写実的な手法と綿密な空間構成そして光による巧みな質感表現を特徴とする。フェルメール（Vermeer）の通称で広く知られる。本名ヤン・ファン・デル・メール・ファン・デルフト (Jan van der Meer van Delft)。",
    name: "Johannes Vermeer",
    era: "Dutch Golden Age",
    birthplace: "Delft, Netherlands",
    keywords: ["Baroque", "Cityscape", "Vermeer"],
  },
  {
    id: "1f947cfc-6b6d-49e7-981e-bced8cf60665",
    description:
      "ミケランジェロ・メリージ・ダ・カラヴァッジオ（伊: Michelangelo Merisi da Caravaggio、1571年9月29日[1] - 1610年7月18日）は、バロック期のイタリア人画家。一般には単にカラヴァッジオ（カラヴァッジョ、カラバッジオ、カラバッジョとも）の名で呼ばれる。ルネサンス期の後に登場し、1593年から1610年にかけてローマ、ナポリ、マルタ、シチリアで活動した。あたかも映像のように人間の姿を写実的に描く手法と、光と陰の明暗を明確に分ける表現は、バロック絵画の形成に大きな影響を与えた[2]。",
    name: "Caravaggio",
    era: "Baroque",
    birthplace: "Milan, Italy",
    keywords: ["Baroque", "Chiaroscuro", "Caravaggio"],
  },
  {
    id: "2d3211d5-73e4-4d14-a516-be5e19acbdf8",
    description:
      "ピーテル・ブリューゲル（Pieter Bruegel(Brueghel) de Oude [ˈpitər ˈbrøːɣəl], 1525年から1530年頃 - 1569年9月9日）は、16世紀のブラバント公国（現在のオランダとベルギー）の画家。「ペーター」あるいは「ペーテル」と表記されることもある。同名の長男と区別するため「ブリューゲル（父、または老）」と表記されることが多い。",
    name: "Pieter Bruegel the Elder",
    era: "Renaissance",
    birthplace: "Breda, Netherlands",
    keywords: ["Renaissance", "Landscape", "Bruegel"],
  },
  {
    id: "31c6212b-cb20-40b2-a329-c96792620d84",
    description:
      "レオナルド・ダ・ヴィンチ（伊: Leonardo da Vinci、イタリア語発音: [leoˈnardo da ˈvintʃi] it-Leonardo di ser Piero da Vinci.ogg 発音[ヘルプ/ファイル]）1452年4月15日 - 1519年5月2日（ユリウス暦）[1]）は、フィレンツェ共和国（現在のイタリア）のルネサンス期を代表する芸術家。フルネームは、レオナルド・ディ・セル・ピエーロ・ダ・ヴィンチ（Leonardo di ser Piero da Vinci）。日本では「ダ・ヴィンチ」と称することが多いが、これは固有の姓というより、「ヴィンチ村出身」を意味しているため、個人名の略称としては「レオナルド」を用いるのが適切であり、欧米ではこちらを用いることの方が多い。ただし、レオナルド本人や知人が「ダ・ヴィンチ」あるいは「ヴィンチ」を苗字として記した例もあり、まったくの誤りとも言えない[2]。「万能の天才」と称されるレオナルドは、芸術家、画家でありながら博学者、科学者、占星術師としての一面も持ち、鏡文字、音楽、建築、料理、美学、数学、幾何学、会計学、生理学、組織学、解剖学、美術解剖学、人体解剖学、動物解剖学、植物解剖学、博物学、動物学、植物学、鉱物学、天文学、気象学、地質学、地理学、物理学、化学、光学、力学、工学、流体力学、水理学、空気力学、飛行力学、飛行機の安定、航空力学、航空工学、自動車工学、材料工学、土木工学、軍事工学、潜水服などの分野に顕著な業績と手稿を残したとされる。完全に解明されていない作品もあり、21世紀になっても幻と言われる作品も存在している[3]。",
    name: "Leonardo da Vinci",
    era: "Renaissance",
    birthplace: "Vinci, Italy",
    keywords: ["Renaissance", "Portrait", "Da Vinci"],
  },
  {
    id: "4133e03c-716c-4015-851f-1214bd008d37",
    description:
      "サンドロ・ボッティチェッリ（イタリア語: Sandro Botticelli, 1445年3月1日[1444年とも]- 1510年5月17日[1]）は、ルネサンス期のイタリアのフィレンツェ生まれの画家で、本名はアレッサンドロ・ディ・マリアーノ・フィリペーピ (Alessandro di Mariano Filipepi) といい、ボッティチェッリは兄が太っていたことから付いた「小さな樽」という意味のあだ名である[2]。ボッティチェルリ、ボッティチェリ、ボティチェリ、ボティチェッリ、ボッチチェリ、ボッチチェルリなどと表記されることもある。",
    name: "Sandro Botticelli",
    era: "Renaissance",
    birthplace: "Florence, Italy",
    keywords: ["Renaissance", "Mythology", "Botticelli"],
  },
  {
    id: "4c2f6565-62a5-47ee-a746-4f1ccf128b24",
    description:
      "ヤン・ファン・エイク（蘭: Jan van Eyck、1395年頃 - 1441年7月9日）は、初期フランドル派のフランドル人画家。日本語文献ではヴァン・エイク、ファン・アイクなどとカナ表記される場合もある。主にブルッヘで活動し、15世紀の北ヨーロッパ[1] でもっとも重要な画家の一人と見なされている。わずかに残る記録から、ファン・エイクは1390年ごろの生まれで、おそらくマースエイク出身だと考えられている。ファン・エイクの幼少期についてはほとんど伝承不明であるが、ブルゴーニュ公フィリップ3世（フィリップ善良公）の宮廷に迎えられた1425年ごろからの記録は比較的整理され残存する。フィリップ3世の宮廷に出仕する以前は、エノー、ホラント、ゼーラントを支配していたバイエルン公ヨハン3世に仕えていた。当時のファン・エイクはすでに自身の工房を経営しており、ハーグのビネンホフ城の再装飾の仕事に従事。1425年ごろにブルッヘへと移住したファン・エイクはフィリップ3世に認められ、宮廷画家、外交官としてその宮廷に仕えるようになった。その後、トゥルネーの画家ギルドの上級メンバーに迎えられ、ロベルト・カンピンやロヒール・ファン・デル・ウェイデンといった、初期フランドル派を代表する画家たちと親交を持った。",
    name: "Jan van Eyck",
    era: "Northern Renaissance",
    birthplace: "Maaseik, Belgium",
    keywords: ["Northern Renaissance", "Portrait", "Van Eyck"],
  },
  {
    id: "5057db28-ae0d-44bd-be48-edbf8603d5d6",
    description:
      "ティツィアーノ・ヴェチェッリオ（伊: Tiziano Vecellio、1490年頃[1] - 1576年8月27日[2]）は、盛期ルネサンスのイタリア人画家。ヴェネツィア派で最も重要な画家の一人である。ヴェネツィア共和国ベッルーノ近郊のピエーヴェ・ディ・カドーレ出身で、生誕地の名を採って「ダ・カドーレ（da Cadore）」とも呼ばれた。一方、日本では、チシアンとも表記されていた。ティツィアーノは同時代の人々からダンテ・アリギエーリの著作『神曲』からの引用である『星々を従える太陽』と呼ばれていた。肖像、風景、古代神話、宗教などあらゆる絵画分野に秀で、ヴェネツィア派でもっとも重要なイタリア人画家の一人となっている。ティツィアーノの絵画技法は筆使いと色彩感覚に特徴があり、イタリアルネサンスの芸術家だけではなく、次世代以降の西洋絵画にも大きな影響を与えた[3]。ティツィアーノは長命な画家で、その作風は年代とともに大きく変化しているが[4]、その生涯を通じて独特の色彩感覚は変わることがなかった。円熟期のティツィアーノの絵画は色鮮やかとはいえないものもあるが、初期の作品の色調は明るく、奔放な筆使いと繊細で多様な色使いは、それまでの西洋絵画に前例のない革新的なものだった。",
    name: "Titian",
    era: "Renaissance",
    birthplace: "Pieve di Cadore, Italy",
    keywords: ["Renaissance", "Mythology", "Titian"],
  },
  {
    id: "56b70795-1f86-4c17-9457-bc6eddad9eab",
    description:
      "エドゥアール・マネ（フランス語: Édouard Manet, 1832年1月23日 - 1883年4月30日）は、19世紀のフランスの画家。近代化するパリの情景や人物を、伝統的な絵画の約束事にとらわれずに描き出し、絵画の革新の担い手となった。特に1860年代に発表した代表作『草上の昼食』と『オランピア』は、絵画界にスキャンダルを巻き起こした。印象派の画家にも影響を与えたことから、印象派の指導者あるいは先駆者として位置付けられる。",
    name: "Édouard Manet",
    era: "Impressionism",
    birthplace: "Paris, France",
    keywords: ["Impressionism", "Manet", "Modern Art"],
  },
  {
    id: "027b99be-c7af-476b-a819-92f92e79505c",
    description:
      "ラファエロ・サンティ（伊: Raffaello Santi[注釈 1]、 1483年4月6日 - 1520年4月6日[2]）は、盛期ルネサンスを代表するイタリアの画家、建築家。一般的には単にラファエロと呼ばれ、日本ではラファエッロ、ラファエルロ、ラファエルなどという表記のゆれが見られる。イギリスではラファエルと呼ばれるのが一般的である。ラファエロの作品はその明確さと分かりやすい構成とともに、雄大な人間性を謳う新プラトン主義を美術作品に昇華したとして高く評価されており、レオナルド・ダ・ヴィンチ、ミケランジェロとともに、盛期ルネサンスの三大巨匠といわれている[3]。ラファエロは異例なほどに大規模な工房を経営しており、短い生涯に多数の作品を制作した。多くの作品がヴァチカン市国のヴァチカン宮殿に残されており、とくに「ラファエロの間」と総称される4部屋のフレスコ画は、ラファエロの最盛期作品における最大のコレクションとなっており、もっとも有名な作品の一つの『アテナイの学堂』も「ラファエロの間」のうち「署名の間」と呼ばれる部屋のフレスコ壁画である。ローマでの活動時代初期に描かれた作品の多くは、デザインこそラファエロのものだが、下絵以外の大部分は工房の職人が手がけたもので、ラファエロが最後まで自身で手がけたものよりも品質の面で劣るといわれている。ラファエロは存命時から高い評価を受けた影響力の高い芸術家だったが、ローマ以外の地ではラファエロの絵画やドローイングをもとにした版画でよく知られていた。ラファエロの死後、年長だが長命を保ったミケランジェロの作品が18世紀から19世紀にいたるまで西洋絵画界により大きな影響を与え続けたが、ラファエロの穏やかで調和に満ちた作品も非常に優れた模範的作風であると評価されていた。マニエリスム期の画家、伝記作家ヴァザーリの著作『画家・彫刻家・建築家列伝』の記述を嚆矢として、ラファエロのキャリアは3期に大別されることが多い。ウルビーノで活動していたキャリア初期、フィレンツェの伝統的絵画の影響が見られる1504年から1508年にかけての4年間、そして死去するまでの二人のローマ教皇とその側近に緊密な後援を受けていたローマでの輝ける12年間である[4]。",
    name: "Raphael",
    era: "High Renaissance",
    birthplace: "Urbino, Italy",
    keywords: ["High Renaissance", "Fresco", "Raphael"],
  },
  {
    id: "5b59518a-3131-4d2e-975a-b980562dbe49",
    description:
      "ジョルジュ・スーラ（スラ）（Georges Seurat 発音例, 1859年12月2日 - 1891年3月29日）は、新印象派に分類される19世紀のフランスの画家。スーラは、印象派の画家たちの用いた「筆触分割」の技法をさらに押し進め、光学的理論を取り入れた結果、点描という技法にたどりついた。完成作を仕上げるまでに多数の素描や下絵を制作して、入念に構想を練った。 また補色を近くにおくことで、目では加法混色と認識され、よりリアルな光を再現している。 しかし、写実的な絵はこの時代に開発されたカメラがあるため、様々な批判が寄せられたといわれている。",
    name: "Georges Seurat",
    era: "Post-Impressionism",
    birthplace: "Paris, France",
    keywords: ["Post-Impressionism", "Pointillism", "Seurat"],
  },
  {
    id: "6eb11191-f34b-42be-af03-d96a57c267f7",
    description:
      "ピーテル・パウル・ルーベンス[注 1]（蘭: Peter Paul Rubens, Pieter Pauwel Rubens, Petrus Paulus Rubens オランダ語: [ˈrybə(n)s]、1577年6月28日 - 1640年5月30日）は、バロック期のフランドルの画家、外交官。祭壇画、肖像画、風景画、神話画や寓意画も含む歴史画など、様々なジャンルの絵画作品を残した。日本語ではペーテル・パウル・リュベンス[1]、ピーテル・パウル・リュベンス[2]などと表記する場合もある。ルーベンスはアントウェルペンで大規模な工房を経営し、生み出された作品はヨーロッパ中の貴族階級や収集家間でも高く評価されていた。またルーベンスは画家としてだけではなく、古典的知識を持つ人文主義学者、美術品収集家でもあり、さらに七ヶ国語を話し、外交官としても活躍してスペイン王フェリペ4世とイングランド王チャールズ1世からナイト爵位を受けている。",
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
        update: {
          id: author.id,
          description: author.description,
          name: author.name,
          era: author.era,
          birthplace: author.birthplace,
          keywords: author.keywords,
        },
        create: {
          id: author.id,
          description: author.description,
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
