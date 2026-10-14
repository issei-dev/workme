// File: assets/content.js

/*
 * 記事・企業・広告の内容を管理するファイルです。
 *
 * 各HTMLの data-page と、下記 pages のキーを対応させます。
 * 新しいページを追加する場合:
 * 1. 個別HTMLを作成
 * 2. 記事などのデータを追加
 * 3. pages にページ設定を追加
 *
 * 画像は assets/images/ に配置してください。
 * 未配置の場合は app.js が代替ビジュアルを表示します。
 */

window.WORK_ME_CONTENT = {
  site: {
    name: "WORK & ME",
    tagline: "働く私に、次のきっかけを。",
    copyright: "デモサイト。記事・企業情報はサンプルです。"
  },

  categories: {
    people: {
      title: "人を知る",
      english: "PEOPLE",
      description: "働く女性の選択と、その先にあるストーリー。",
      href: "people.html"
    },
    work: {
      title: "働き方を知る",
      english: "WORK STYLE",
      description: "対談、チーム、部活。職場の日常から見えてくること。",
      href: "work.html"
    },
    companies: {
      title: "会社を知る",
      english: "COMPANIES",
      description: "想い、仕事、働く人から、自分に合う会社を考える。",
      href: "companies.html"
    },
    lifestyle: {
      title: "自分を楽しむ",
      english: "LIFESTYLE",
      description: "美容、運動、暮らし。自分のための選択を。",
      href: "lifestyle.html"
    }
  },

  stories: [
    {
      id: "career",
      href: "story-career.html",
      category: "people",
      title: "誰かの正解より、私が納得できる働き方を。",
      description: "企画職のキャリアの転機と、迷ったときに大切にしていること。",
      label: "社員インタビュー",
      source: "GREEN NOTE / 企画",
      companyId: "green",
      image: "assets/images/career.jpg",
      tags: ["企画", "キャリア", "転職"],
      publishedAt: "",
      updatedAt: "",
      sections: [
        {
          title: "仕事の面白さは、対話の中にある",
          text: "企画は、アイデアを出して終わりではありません。相手が何に困っているのかを聞き、チームで実現できる形を考える。その過程に面白さを感じています。"
        },
        {
          title: "迷ったときは、小さく試してみる",
          text: "新しい役割に挑戦するとき、最初から自信があったわけではありません。まず一つ取り組み、振り返り、相談する。その繰り返しが、自分なりの判断につながりました。"
        },
        {
          title: "これからの自分へ",
          text: "役職や肩書だけでなく、どんな仕事に関わりたいかを大切にしたい。今の経験を生かしながら、新しい領域にも少しずつ挑戦したいと考えています。"
        }
      ]
    },

    {
      id: "engineer",
      href: "story-engineer.html",
      category: "people",
      title: "つくることが好き。その気持ちを、仕事の軸に。",
      description: "専門性を育てながら、チームで働くエンジニアの一日。",
      label: "仕事の一日",
      source: "FLOW LAB / エンジニア",
      companyId: "flow",
      image: "assets/images/engineer.jpg",
      tags: ["エンジニア", "専門職", "仕事の一日"],
      publishedAt: "",
      updatedAt: "",
      sections: [
        {
          title: "午前は、集中する時間",
          text: "今日の優先順位をチームで確認し、開発に取り組みます。分からないことはメモし、相談する時間も確保しています。"
        },
        {
          title: "午後は、レビューと共有",
          text: "仕様確認やレビューを通じて、別の視点に触れます。一人で考える時間と、チームで話す時間の両方を大切にしています。"
        },
        {
          title: "学びを積み重ねる",
          text: "知らないことを無理に隠さず、調べたことを共有する。小さな学びを積み重ねながら、専門性を育てています。"
        }
      ]
    },

    {
      id: "dialogue",
      href: "story-dialogue.html",
      category: "work",
      title: "「ちょっと相談」が言えるチームって、どうつくる？",
      description: "先輩と後輩が語る、日々のコミュニケーション。",
      label: "社員対談",
      source: "GREEN NOTE / チームストーリー",
      companyId: "green",
      image: "assets/images/dialogue.jpg",
      tags: ["対談", "チーム", "育成"],
      publishedAt: "",
      updatedAt: "",
      sections: [
        {
          title: "相談に、完成した答えはいらない",
          text: "まだ考えがまとまっていなくても相談できる。そんな関係をつくるために、普段から短い会話や進捗の共有を大切にしています。"
        },
        {
          title: "違う立場だから、気づけること",
          text: "先輩にも後輩にも、それぞれの視点があります。互いの話を聞くことが、仕事の進めやすさにつながっています。"
        }
      ]
    },

    {
      id: "club",
      href: "story-club.html",
      category: "work",
      title: "部署を越えて、無理なくつながる。社内ランニング部。",
      description: "走る速さより、自分のペース。任意参加の部活動を紹介。",
      label: "社内部活",
      source: "FLOW LAB / 社内活動",
      companyId: "flow",
      image: "assets/images/club.jpg",
      tags: ["部活", "交流", "職場の雰囲気"],
      publishedAt: "",
      updatedAt: "",
      sections: [
        {
          title: "活動の基本情報",
          text: "月1回、勤務時間外に開催する任意参加の活動を想定しています。初心者も参加でき、距離やペースは各自の体調に合わせます。"
        },
        {
          title: "費用と参加について",
          text: "基本の参加費は無料、交通費や大会参加費は各自負担というサンプル設定です。不参加が業務評価に影響しないことも明確にします。"
        }
      ]
    },

    {
      id: "rest",
      href: "story-rest.html",
      category: "lifestyle",
      title: "何もしない時間も、予定に入れてみる。",
      description: "忙しい日の、小さな休息のヒント。",
      label: "セルフケア",
      source: "WORK & ME 編集部",
      companyId: "",
      image: "assets/images/rest.jpg",
      tags: ["休息", "暮らし", "セルフケア"],
      publishedAt: "",
      updatedAt: "",
      sections: [
        {
          title: "自分に合う、ひと息のつき方",
          text: "休憩の取り方にも、ひとつの正解はありません。短い散歩、飲み物を楽しむ時間、予定を入れない時間。無理なく選べることから試してみましょう。"
        },
        {
          title: "頑張らない日も、自分のペースで",
          text: "いつも同じように動けなくても大丈夫。自分の調子を確かめながら、予定や過ごし方を見直すことも選択肢のひとつです。"
        }
      ]
    }
  ],

  companies: [
    {
      id: "green",
      href: "company-green.html",
      name: "GREEN NOTE",
      initials: "GN",
      title: "対話から、新しい仕事をつくる。",
      description: "ブランド企画とデザインに取り組むチーム。",
      image: "assets/images/green.jpg",
      industry: "企画・デザイン",
      location: "所在地未設定",
      mission: "対話を通じて課題を見つけ、伝わる企画とデザインをつくる。",
      culture: "役割を越えてアイデアを共有し、小さく試して振り返ることを大切にする企業として設定しています。",
      environment: "勤務形態、育成制度、評価制度は本番掲載時に確認し、制度の利用体験と分けて紹介します。",
      recruitmentUrl: "",
      updatedAt: ""
    },
    {
      id: "flow",
      href: "company-flow.html",
      name: "FLOW LAB",
      initials: "FL",
      title: "専門性を育て、チームで前へ。",
      description: "デジタルサービス開発と、学びを大切にするチーム。",
      image: "assets/images/flow.jpg",
      industry: "IT・サービス開発",
      location: "所在地未設定",
      mission: "技術と対話で、使う人の毎日を少し便利にする。",
      culture: "レビューや勉強会を通じて知識を共有し、チームで成長する企業として設定しています。",
      environment: "実際の労働条件、勤務場所、福利厚生は本番で確認・掲載します。",
      recruitmentUrl: "",
      updatedAt: ""
    }
  ],

  brands: [
    {
      id: "lumiere",
      href: "lumiere.html",
      name: "Lumière Hair Tokyo",
      category: "美容室",
      headline: "髪を整えて、私らしい一歩を。",
      lead: "仕事の日も、休日も。毎日の自分にフィットするヘアスタイルを。",
      introTitle: "働く毎日に寄り添う、ヘアサロン",
      intro: [
        "Lumière Hair Tokyoは、20〜30代の働く女性に向けた美容室として紹介する掲載案です。",
        "転職や新生活をきっかけに印象を変えたいときも、いつものスタイルを整えたいときも。希望と日々の過ごし方を相談しながら、自分らしいヘアスタイルを考えます。"
      ],
      features: [
        {
          title: "丁寧なカウンセリング",
          text: "なりたい印象や、普段のスタイリングの悩みを相談できる紹介構成です。"
        },
        {
          title: "日常になじむスタイル",
          text: "仕事と休日、どちらにも合わせやすいヘアスタイルを提案する想定です。"
        },
        {
          title: "ホームケアの相談",
          text: "自宅での乾かし方や、お手入れ方法を紹介する想定です。"
        },
        {
          title: "来店前に情報を確認",
          text: "メニュー、料金、営業時間、所在地を本番掲載時に明示します。"
        }
      ],
      recommendations: [
        "新しい仕事や新生活に向けて髪型を整えたい",
        "毎朝のスタイリングを見直したい",
        "自分に合うヘアスタイルを相談したい",
        "仕事にも休日にも合う髪型を選びたい"
      ],
      products: [],
      voices: [],
      details: [
        {
          title: "所在地",
          text: "未設定。正式な店舗情報を掲載してください。"
        },
        {
          title: "営業時間",
          text: "未確認。予約受付時間と定休日を掲載してください。"
        },
        {
          title: "料金",
          text: "未確認。税込料金と追加料金を掲載してください。"
        },
        {
          title: "予約条件",
          text: "予約変更・キャンセル条件を公開前に確認してください。"
        }
      ],
      ctaTitle: "次のヘアスタイルを、相談から。",
      ctaText: "希望や日々の過ごし方に合わせて、自分らしいスタイルを。",
      ctaLabel: "公式予約ページへ",
      ctaUrl: "",
      ctaNotice: "予約先は未設定です。このデモでは予約を受け付けていません。",
      note: "美容室の紹介内容は仮案です。実際の提供サービスを確認してから公開してください。",
      thumbnail: "assets/images/lumiere-thumbnail.jpg",
      hero: "assets/images/lumiere-hero.jpg",
      ad: "assets/images/lumiere-ad.jpg",
      accent: "#77675d",
      background: "#f6f2ee",
      adCaption: "髪を整えて、私らしい一歩を。",
      english: "HAIR & YOUR EVERYDAY"
    },

    {
      id: "purefit",
      href: "purefit.html",
      name: "PureFit Wellness",
      category: "女性専用オンラインフィットネス",
      headline: "忙しい毎日でも、理想の身体へ。",
      lead: "自宅で始める、自分に合った運動習慣。仕事も暮らしも大切にしたいあなたへ。",
      introTitle: "オンラインだから続く",
      intro: [
        "PureFit Wellnessは、働く女性のために設計された女性専用オンラインパーソナルトレーニングサービスです。",
        "仕事が忙しくてジムに通えない。残業や在宅勤務で運動不足になりがち。",
        "そんな悩みを抱える20〜30代女性に向けて、経験豊富な女性トレーナーがあなた専属でサポートします。"
      ],
      features: [
        {
          title: "完全オンライン",
          text: "自宅からスマホやPCで参加可能。移動の時間をかけずにトレーニングできます。"
        },
        {
          title: "女性トレーナー多数在籍",
          text: "女性ならではの悩みに寄り添った指導を目指します。"
        },
        {
          title: "一人ひとりに最適化",
          text: "体力・目標・生活スタイルに合わせたプログラムを提案します。"
        },
        {
          title: "食事アドバイス付き",
          text: "無理な制限ではなく、続けられる習慣づくりをサポートします。"
        }
      ],
      recommendations: [
        "転職活動をきっかけに、自分の健康習慣を見直したい",
        "デスクワーク中心で運動不足が気になる",
        "健康的な体づくりに取り組みたい",
        "忙しくても運動習慣を身につけたい"
      ],
      products: [],
      voices: [
        "週2回のトレーニングで体力がつき、仕事にも前向きに取り組めるようになりました。",
        "ジムに通う時間がなくても続けられて助かっています。"
      ],
      details: [
        {
          title: "利用方法",
          text: "スマートフォンまたはPCから参加するオンライン形式。"
        },
        {
          title: "料金・所要時間",
          text: "未確認。各プランの税込料金とセッション時間を掲載してください。"
        },
        {
          title: "利用条件",
          text: "対象者、必要機材、予約変更・解約条件は公開前に確認してください。"
        },
        {
          title: "安全について",
          text: "持病・けが・妊娠などがある場合は、参加前に医師と運営へ相談してください。"
        }
      ],
      ctaTitle: "まずは無料カウンセリングから",
      ctaText: "あなたの理想のライフスタイルを一緒に考えませんか？",
      ctaLabel: "無料カウンセリングを申し込む",
      ctaUrl: "",
      ctaNotice: "無料の対象範囲・所要時間・申込条件は未確認です。申込先も未設定です。",
      note: "サービス内容は提供原稿に基づく掲載案です。体づくりや運動による変化には個人差があり、結果を保証するものではありません。",
      thumbnail: "assets/images/purefit-thumbnail.jpg",
      hero: "assets/images/ad/purefit-hero.PNG",
      ad: "assets/images/ad/purefit-ad.PNG",
      accent: "#52695c",
      background: "#f1f5ef",
      adCaption: "自宅から始める、私の運動習慣。",
      english: "FITNESS FOR YOUR LIFE"
    },

    {
      id: "casa",
      href: "casa.html",
      name: "Casa Style Interior",
      category: "インテリア・家具EC",
      headline: "新しいキャリア、新しい暮らし。",
      lead: "心地よい部屋が、毎日の私を支えてくれる。",
      introTitle: "理想の住まいづくりをサポート",
      intro: [
        "転職や引越しは、新しい人生のスタート。",
        "Casa Style Interiorは、一人暮らしや二人暮らしを始める女性のためのインテリア・家具ECブランドです。",
        "居心地の良い空間づくりを通じて、毎日の暮らしを豊かにします。"
      ],
      features: [
        {
          title: "トレンド家具を厳選",
          text: "北欧風・ナチュラル・モダンスタイルを中心にラインナップ。"
        },
        {
          title: "暮らしに合わせたコーディネート",
          text: "限られたスペースでも美しく快適に。生活動線や使いやすさも大切にします。"
        },
        {
          title: "オンライン完結",
          text: "自宅にいながら家具を比較し、部屋づくりを考えられます。"
        },
        {
          title: "引越し応援セット",
          text: "新生活に必要な家具をまとめて選べるセットを紹介します。"
        }
      ],
      recommendations: [
        "転職を機に引越しを考えている",
        "一人暮らしを始めたい",
        "部屋をおしゃれに整えたい",
        "在宅ワーク環境を整えたい"
      ],
      products: [
        {
          title: "Natural Sofa Series",
          text: "柔らかな色合いで、さまざまな部屋になじむソファ。"
        },
        {
          title: "Urban Desk Collection",
          text: "在宅ワークにも取り入れやすいコンパクトデスク。"
        },
        {
          title: "Green Living Package",
          text: "観葉植物と家具を組み合わせたセット。"
        }
      ],
      voices: [
        "引越し後の部屋づくりがとても楽しくなりました。",
        "家具の統一感が出て、毎日帰るのが楽しみです。"
      ],
      details: [
        {
          title: "商品情報",
          text: "価格、サイズ、素材、在庫は各商品ページで明示してください。"
        },
        {
          title: "配送・組み立て",
          text: "送料、配送地域、納期、組み立てサービスの条件は未確認です。"
        },
        {
          title: "返品・交換",
          text: "返品可能期間と対象条件を公開前に確認してください。"
        },
        {
          title: "キャンペーン",
          text: "実施状況、期間、対象商品、割引条件は未確認です。"
        }
      ],
      ctaTitle: "理想の住まいづくりを、ここから。",
      ctaText: "新生活に必要な家具と、心地よい空間を考えてみませんか？",
      ctaLabel: "家具・新生活セットを見る",
      ctaUrl: "",
      ctaNotice: "ショップへのリンクは未設定です。キャンペーン実施中の表示は、条件確認後に掲載してください。",
      note: "商品名・サービス内容は提供原稿に基づく掲載案です。販売状況と商品仕様を確認してから公開してください。",
      thumbnail: "assets/images/casa-thumbnail.jpg",
      hero: "assets/images/casa-hero.jpg",
      ad: "assets/images/casa-ad.jpg",
      accent: "#826a50",
      background: "#f6f2ec",
      adCaption: "新しいキャリア、新しい暮らし。",
      english: "A HOME FOR YOUR NEXT CHAPTER"
    }
  ],

  pages: {
    home: {
      type: "home"
    },
    people: {
      type: "listing",
      category: "people"
    },
    work: {
      type: "listing",
      category: "work"
    },
    companies: {
      type: "listing",
      category: "companies"
    },
    lifestyle: {
      type: "listing",
      category: "lifestyle"
    },
    "story-career": {
      type: "story",
      id: "career"
    },
    "story-engineer": {
      type: "story",
      id: "engineer"
    },
    "story-dialogue": {
      type: "story",
      id: "dialogue"
    },
    "story-club": {
      type: "story",
      id: "club"
    },
    "story-rest": {
      type: "story",
      id: "rest"
    },
    "company-green": {
      type: "company",
      id: "green"
    },
    "company-flow": {
      type: "company",
      id: "flow"
    },
    lumiere: {
      type: "brand",
      id: "lumiere"
    },
    purefit: {
      type: "brand",
      id: "purefit"
    },
    casa: {
      type: "brand",
      id: "casa"
    },
    about: {
      type: "static",
      id: "about"
    },
    editorial: {
      type: "static",
      id: "editorial"
    },
    contact: {
      type: "static",
      id: "contact"
    },
    privacy: {
      type: "static",
      id: "privacy"
    }
  }
};