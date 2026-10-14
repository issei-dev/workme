// File: assets/app.js

(() => {
  "use strict";

  const content = window.WORK_ME_CONTENT;
  const root = document.getElementById("app");

  if (!content || !root) {
    return;
  }

  const pageKey = document.body.dataset.page;
  const page = content.pages[pageKey];

  const escapeHtml = value => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return String(value ?? "").replace(
      /[&<>"']/g,
      character => replacements[character]
    );
  };

  function safeExternalUrl(value) {
    if (!value) {
      return "";
    }

    try {
      const url = new URL(value);

      return ["https:", "http:"].includes(url.protocol)
        ? url.href
        : "";
    } catch {
      return "";
    }
  }

  function safeLocalUrl(value) {
    if (typeof value !== "string") {
      return "";
    }

    const pattern = /^[a-zA-Z0-9_-]+\.html(?:\?[^#]*)?(?:#.*)?$/;

    return pattern.test(value) ? value : "";
  }

  function localHref(value) {
    return escapeHtml(safeLocalUrl(value) || "index.html");
  }

  function searchHref(category, keyword) {
    const href = content.categories[category].href;

    return `${href}?q=${encodeURIComponent(keyword)}`;
  }

  function placeholder(options = {}) {
    const {
      title = "WORK & ME",
      subtitle = "STORIES & LIFESTYLE",
      background = "#eef3f4",
      accent = "#087d90",
      wide = false
    } = options;

    const width = wide ? 1200 : 600;
    const height = wide ? 675 : 600;
    const fontSize = wide ? 52 : 29;

    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
      >
        <rect
          width="${width}"
          height="${height}"
          fill="${background}"
        />
        <circle
          cx="${width * 0.86}"
          cy="${height * 0.22}"
          r="${height * 0.37}"
          fill="#ffffff"
          opacity="0.55"
        />
        <text
          x="40"
          y="70"
          font-family="sans-serif"
          font-size="15"
          letter-spacing="3"
          fill="${accent}"
        >WORK &amp; ME</text>
        <text
          x="40"
          y="${height * 0.48}"
          font-family="sans-serif"
          font-size="${fontSize}"
          font-weight="700"
          fill="#242b30"
        >${escapeHtml(title)}</text>
        <text
          x="40"
          y="${height * 0.58}"
          font-family="sans-serif"
          font-size="13"
          letter-spacing="1"
          fill="${accent}"
        >${escapeHtml(subtitle)}</text>
        <path
          d="M40 ${height * 0.77}H190"
          stroke="${accent}"
          stroke-width="3"
        />
        <text
          x="40"
          y="${height - 40}"
          font-family="sans-serif"
          font-size="13"
          fill="#737d83"
        >SAMPLE VISUAL</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function imageMarkup(source, className, options = {}) {
    const {
      eager = false,
      wide = false,
      brandId = "",
      alt = ""
    } = options;

    return `
      <img
        class="${className}"
        src="${escapeHtml(source)}"
        alt="${escapeHtml(alt)}"
        loading="${eager ? "eager" : "lazy"}"
        decoding="async"
        data-fallback
        data-wide="${wide}"
        data-brand="${escapeHtml(brandId)}"
      >
    `;
  }

  function installImageFallbacks() {
    root.querySelectorAll("img[data-fallback]").forEach(image => {
      const brand = content.brands.find(item =>
        item.id === image.dataset.brand
      );

      const replace = () => {
        image.onerror = null;
        image.src = placeholder({
          title: brand ? brand.name : "WORK & ME",
          subtitle: brand ? brand.english : "STORIES & LIFESTYLE",
          background: brand ? brand.background : "#eef3f4",
          accent: brand ? brand.accent : "#087d90",
          wide: image.dataset.wide === "true"
        });
      };

      image.onerror = replace;

      if (image.complete && image.naturalWidth === 0) {
        replace();
      }
    });
  }

  function headerMarkup(activeCategory) {
    const items = [
      ["people", "人を知る", "people.html"],
      ["work", "働き方を知る", "work.html"],
      ["companies", "会社を知る", "companies.html"],
      ["lifestyle", "自分を楽しむ", "lifestyle.html"],
      ["editorial", "編集部", "editorial.html"]
    ];

    return `
      <a class="skip-link" href="#main">本文へ移動</a>

      <header class="site-header">
        <div class="header-inner">
          <a class="logo" href="index.html">
            WORK <span>&</span> ME
          </a>

          <button
            class="menu-toggle"
            id="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="navigation"
          >
            メニュー
          </button>

          <nav
            class="navigation"
            id="navigation"
            aria-label="メインメニュー"
          >
            ${items.map(([key, label, href]) => `
              <a
                href="${href}"
                ${key === activeCategory
                  ? `aria-current="${page?.type === "listing" ||
                      pageKey === "editorial"
                      ? "page"
                      : "true"}"`
                  : ""
                }
              >
                ${label}
              </a>
            `).join("")}
          </nav>
        </div>
      </header>
    `;
  }

  function footerMarkup() {
    return `
      <footer class="site-footer">
        <div class="footer-inner">
          <div>
            <a class="logo" href="index.html">
              WORK <span>&</span> ME
            </a>
            <p class="copyright">
              ${escapeHtml(content.site.copyright)}
            </p>
          </div>

          <nav class="footer-links" aria-label="サイト情報">
            <a href="about.html">運営会社</a>
            <a href="editorial.html">編集部・編集方針</a>
            <a href="contact.html">掲載・広告のお問い合わせ</a>
            <a href="privacy.html">プライバシー</a>
          </nav>
        </div>
      </footer>
    `;
  }

  function adMarkup() {
    return `
      <aside class="ad-rail" aria-label="画像広告">
        <p class="ad-label">ADVERTISEMENT / 広告</p>

        <a class="ad-link" id="ad-link" href="lumiere.html">
          <img
            class="ad-image"
            id="ad-image"
            width="400"
            height="400"
            alt=""
          >
        </a>

        <p class="ad-caption" id="ad-caption"></p>

        <div class="ad-controls">
          <span id="ad-count"></span>
          <div class="ad-buttons">
            <button
              id="ad-next"
              type="button"
              aria-label="次の広告"
            >
              →
            </button>
            <button id="ad-toggle" type="button">
              停止
            </button>
          </div>
        </div>

        <div class="rail-about">
          <p>
            仕事も暮らしも、<br>
            自分らしく選ぶために。
          </p>
          <a href="editorial.html">私たちの編集方針 →</a>
        </div>
      </aside>
    `;
  }

  function storyCard(story) {
    return `
      <article class="card">
        <a class="card-link" href="${localHref(story.href)}">
          ${imageMarkup(story.image, "card-image")}
          <div class="card-meta">
            <span>${escapeHtml(story.label)}</span>
          </div>
          <h3>${escapeHtml(story.title)}</h3>
          <p class="card-description">
            ${escapeHtml(story.description)}
          </p>
          <p class="card-source">${escapeHtml(story.source)}</p>
        </a>
      </article>
    `;
  }

  function companyCard(company) {
    return `
      <article class="card">
        <a class="card-link" href="${localHref(company.href)}">
          ${imageMarkup(company.image, "card-image")}
          <div class="card-meta">
            <span class="pr">PR</span>
            <span>${escapeHtml(company.industry)}</span>
          </div>
          <h3>${escapeHtml(company.title)}</h3>
          <p class="card-description">
            ${escapeHtml(company.description)}
          </p>
          <p class="card-source">${escapeHtml(company.name)}</p>
        </a>
      </article>
    `;
  }

  function brandCard(brand) {
    return `
      <article class="card">
        <a class="card-link" href="${localHref(brand.href)}">
          ${imageMarkup(brand.thumbnail, "card-image", {
            brandId: brand.id
          })}
          <div class="card-meta">
            <span class="pr">PR</span>
            <span>${escapeHtml(brand.category)}</span>
          </div>
          <h3>${escapeHtml(brand.headline)}</h3>
          <p class="card-description">
            ${escapeHtml(brand.lead)}
          </p>
          <p class="card-source">${escapeHtml(brand.name)}</p>
        </a>
      </article>
    `;
  }

  // File: assets/app.js

function homeSection(category, title) {
  const information = content.categories[category];

  if (!information) {
    return "";
  }

  let cards = "";

  if (category === "companies") {
    cards = content.companies
      .map(companyCard)
      .join("");
  } else {
    cards = content.stories
      .filter(story => story.category === category)
      .map(storyCard)
      .join("");
  }

  if (!cards) {
    return "";
  }

  return `
    <section class="section">
      <div class="section-heading">
        <h2>${escapeHtml(title)}</h2>
        <a href="${localHref(information.href)}">
          すべて見る →
        </a>
      </div>

      <div class="grid">
        ${cards}
      </div>
    </section>
  `;
}

  function renderHome() {
    const featured = content.stories[0];

    return `
      <div class="page-intro">
        <p class="eyebrow">WORK STORIES & LIFESTYLE</p>
        <h1>${escapeHtml(content.site.tagline)}</h1>
        <p>仕事も暮らしも、自分らしく選ぶためのストーリー。</p>
      </div>

      <a class="feature" href="${localHref(featured.href)}">
        ${imageMarkup(featured.image, "feature-image", {
          eager: true,
          wide: true
        })}
        <div class="feature-copy">
          <span class="eyebrow">FEATURED STORY</span>
          <h2>${escapeHtml(featured.title)}</h2>
          <p>${escapeHtml(featured.description)}</p>
          <span class="arrow-link">インタビューを読む →</span>
        </div>
      </a>

      <nav class="topics" aria-label="テーマから探す">
        <a href="${searchHref("people", "キャリア")}">
          # キャリアを考える
        </a>
        <a href="${searchHref("people", "仕事の一日")}">
          # 仕事の一日
        </a>
        <a href="${searchHref("work", "チーム")}">
          # 職場の雰囲気
        </a>
        <a href="${searchHref("work", "部活")}">
          # 社内部活
        </a>
        <a href="${searchHref("lifestyle", "セルフケア")}">
          # 自分のための時間
        </a>
      </nav>

      ${homeSection("people", "働く女性のストーリー")}
      ${homeSection("work", "チームと会社の日常")}
      ${homeSection("companies", "想いから、会社を知る")}
      ${homeSection("lifestyle", "自分を楽しむ")}

      <section class="section">
        <div class="section-heading">
          <h2>暮らしに寄り添うサービス</h2>
          <a href="lifestyle.html">すべて見る →</a>
        </div>
        <div class="grid">
          ${content.brands.map(brandCard).join("")}
        </div>
      </section>
    `;
  }

  function renderListing(category) {
    const information = content.categories[category];
    const query = new URLSearchParams(location.search).get("q") || "";

    return `
      <div class="page-intro">
        <p class="eyebrow">${information.english}</p>
        <h1>${information.title}</h1>
        <p>${information.description}</p>
      </div>

      <div class="search">
        <label for="search-input">
          ${category === "companies"
            ? "会社名・業種で検索"
            : "キーワードで検索"
          }
        </label>
        <input
          id="search-input"
          type="search"
          value="${escapeHtml(query)}"
          placeholder="気になる言葉を入力"
          autocomplete="off"
        >
      </div>

      <p class="search-result" id="search-result" aria-live="polite"></p>
      <div class="grid" id="result-grid"></div>
    `;
  }

  function updateListing(category, value) {
    const keyword = value.trim().normalize("NFKC").toLowerCase();
    const matches = [];

    const includes = values => values
      .join(" ")
      .normalize("NFKC")
      .toLowerCase()
      .includes(keyword);

    if (category === "companies") {
      content.companies.forEach(company => {
        if (includes([
          company.name,
          company.title,
          company.description,
          company.industry
        ])) {
          matches.push(companyCard(company));
        }
      });
    } else {
      content.stories.forEach(story => {
        if (
          story.category === category &&
          includes([
            story.title,
            story.description,
            story.source,
            ...story.tags
          ])
        ) {
          matches.push(storyCard(story));
        }
      });

      if (category === "lifestyle") {
        content.brands.forEach(brand => {
          if (includes([
            brand.name,
            brand.category,
            brand.headline,
            brand.lead
          ])) {
            matches.push(brandCard(brand));
          }
        });
      }
    }

    document.getElementById("result-grid").innerHTML =
      matches.join("");

    document.getElementById("search-result").textContent =
      matches.length
        ? `${matches.length}件見つかりました。`
        : "該当する情報がありません。別のキーワードでお試しください。";

    installImageFallbacks();
  }

  function breadcrumb(category, label = "") {
    const information = content.categories[category];

    return `
      <nav class="breadcrumb" aria-label="パンくず">
        <a href="index.html">トップ</a>
        <span> / </span>
        <a href="${information.href}">
          ${information.title}
        </a>
        ${label ? `<span> / ${escapeHtml(label)}</span>` : ""}
      </nav>
    `;
  }

  function infoMarkup(items) {
    return `
      <dl class="info">
        ${items.map(item => `
          <div>
            <dt>${escapeHtml(item.title)}</dt>
            <dd>${escapeHtml(item.text)}</dd>
          </div>
        `).join("")}
      </dl>
    `;
  }

  function renderStory(story) {
    const company = content.companies.find(item =>
      item.id === story.companyId
    );

    const related = content.stories.filter(item =>
      item.category === story.category &&
      item.id !== story.id
    ).slice(0, 3);

    return `
      ${breadcrumb(story.category)}

      <article>
        <header class="article-header">
          <p class="eyebrow">${escapeHtml(story.label)}</p>
          <h1>${escapeHtml(story.title)}</h1>
          <p class="lead">${escapeHtml(story.description)}</p>
          <p class="caption">
            ${escapeHtml(story.source)}
            /
            公開日：${escapeHtml(story.publishedAt || "未設定")}
            /
            更新日：${escapeHtml(story.updatedAt || "未設定")}
          </p>
        </header>

        ${imageMarkup(story.image, "article-cover", {
          eager: true,
          wide: true
        })}

        <p class="caption">イメージ画像です。</p>

        <div class="article-body">
          <aside class="notice">
            構成確認用のサンプル記事です。
            登場する企業・人物・活動は架空の設定です。
          </aside>

          ${story.sections.map(section => `
            <section>
              <h2>${escapeHtml(section.title)}</h2>
              <p>${escapeHtml(section.text)}</p>
            </section>
          `).join("")}

          ${company ? `
            <section>
              <h2>このストーリーの会社</h2>
              <p>${escapeHtml(company.name)}</p>
              <a class="button" href="${localHref(company.href)}">
                企業紹介を見る（PR）
              </a>
            </section>
          ` : ""}

          <nav class="topics" aria-label="この記事のテーマ">
            ${story.tags.map(tag => `
              <a href="${searchHref(story.category, tag)}">
                # ${escapeHtml(tag)}
              </a>
            `).join("")}
          </nav>
        </div>
      </article>

      ${related.length ? `
        <section class="section">
          <div class="section-heading">
            <h2>あわせて読みたい</h2>
          </div>
          <div class="grid">
            ${related.map(storyCard).join("")}
          </div>
        </section>
      ` : ""}
    `;
  }

  function renderCompany(company) {
    const stories = content.stories.filter(story =>
      story.companyId === company.id
    );

    const recruitmentUrl = safeExternalUrl(company.recruitmentUrl);

    return `
      ${breadcrumb("companies")}

      <article>
        <div class="disclosure">
          <span class="pr">PR / 企業紹介</span>
          <span>
            更新日：${escapeHtml(company.updatedAt || "未設定")}
          </span>
        </div>

        ${imageMarkup(company.image, "article-cover", {
          eager: true,
          wide: true
        })}

        <p class="caption">職場のイメージ画像です。</p>

        <div class="company-logo" aria-hidden="true">
          ${escapeHtml(company.initials)}
        </div>

        <div class="page-intro">
          <p class="eyebrow">${escapeHtml(company.name)}</p>
          <h1>${escapeHtml(company.title)}</h1>
          <p>${escapeHtml(company.description)}</p>
        </div>

        <aside class="notice">
          架空の企業のサンプルページです。
          制度・労働条件・採用情報は実在企業の情報ではありません。
        </aside>

        <div class="article-body">
          <section>
            <h2>私たちの想い</h2>
            <p>${escapeHtml(company.mission)}</p>
          </section>

          <section>
            <h2>チームの文化</h2>
            <p>${escapeHtml(company.culture)}</p>
          </section>

          <section>
            <h2>働く環境</h2>
            <p>${escapeHtml(company.environment)}</p>
          </section>

          <section>
            <h2>会社概要</h2>
            ${infoMarkup([
              {
                title: "会社名",
                text: `${company.name}（架空）`
              },
              {
                title: "業種",
                text: company.industry
              },
              {
                title: "所在地",
                text: company.location
              }
            ])}
          </section>

          <section>
            <h2>採用情報</h2>

            ${recruitmentUrl ? `
              <a
                class="button"
                href="${escapeHtml(recruitmentUrl)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                公式採用ページを見る（新しいタブ）
              </a>
            ` : `
              <p>
                このデモには募集情報を掲載していません。
                本番では確認済みの公式採用ページへ案内します。
              </p>
            `}
          </section>
        </div>
      </article>

      <section class="section">
        <div class="section-heading">
          <h2>この会社のストーリー</h2>
        </div>
        <div class="grid">${stories.map(storyCard).join("")}</div>
      </section>
    `;
  }

  function renderBrand(brand) {
    const ctaUrl = safeExternalUrl(brand.ctaUrl);
    const others = content.brands.filter(item => item.id !== brand.id);

    document.documentElement.style.setProperty(
      "--brand",
      brand.accent
    );

    document.documentElement.style.setProperty(
      "--brand-soft",
      brand.background
    );

    return `
      ${breadcrumb("lifestyle", "サービス紹介")}

      <div class="disclosure">
        <span class="pr">PR / 広告</span>
        <span>${escapeHtml(brand.category)}</span>
        <span>公開前の掲載案</span>
      </div>

      <article>
        <header class="article-header">
          <p class="eyebrow">${escapeHtml(brand.name)}</p>
          <h1>${escapeHtml(brand.headline)}</h1>
          <p class="lead">${escapeHtml(brand.lead)}</p>

          ${imageMarkup(brand.hero, "article-cover", {
            eager: true,
            wide: true,
            brandId: brand.id,
            alt: `${brand.name}のサービスイメージ`
          })}

          <p class="caption">
            イメージ画像。実際の利用者・施設・商品を示すものではありません。
          </p>
        </header>

        <div class="article-body">
          <section>
            <h2>${escapeHtml(brand.introTitle)}</h2>
            ${brand.intro.map(text => `
              <p>${escapeHtml(text)}</p>
            `).join("")}
          </section>

          <section>
            <h2>${escapeHtml(brand.name)}の特徴</h2>
            <div class="feature-grid">
              ${brand.features.map((feature, index) => `
                <section class="feature-item">
                  <div class="feature-number">
                    ${String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>${escapeHtml(feature.title)}</h3>
                  <p>${escapeHtml(feature.text)}</p>
                </section>
              `).join("")}
            </div>
          </section>

          ${brand.products.length ? `
            <section>
              <h2>アイテム紹介</h2>
              <div class="products">
                ${brand.products.map(product => `
                  <section class="product">
                    <h3>${escapeHtml(product.title)}</h3>
                    <p>${escapeHtml(product.text)}</p>
                  </section>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <section>
            <h2>こんな方におすすめ</h2>
            <ul>
              ${brand.recommendations.map(text => `
                <li>${escapeHtml(text)}</li>
              `).join("")}
            </ul>
          </section>

          ${brand.voices.length ? `
            <section>
              <h2>利用者の声 — 掲載イメージ</h2>
              <p class="notice">
                以下は提供原稿の掲載例で、実際の利用者の体験としては
                未確認です。公開時は本人の掲載許諾を得た声に差し替えてください。
              </p>
              <div class="voices">
                ${brand.voices.map(text => `
                  <blockquote>
                    <p>「${escapeHtml(text)}」</p>
                    <footer>
                      サンプル文言 / 実在の利用者の証言ではありません
                    </footer>
                  </blockquote>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <section>
            <h2>ご利用前に確認したいこと</h2>
            ${infoMarkup(brand.details)}
            <p class="notice">${escapeHtml(brand.note)}</p>
          </section>

          <section class="cta" aria-labelledby="cta-title">
            <h2 id="cta-title">${escapeHtml(brand.ctaTitle)}</h2>
            <p>${escapeHtml(brand.ctaText)}</p>

            ${ctaUrl ? `
              <a
                class="button"
                href="${escapeHtml(ctaUrl)}"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                ${escapeHtml(brand.ctaLabel)}（新しいタブ）
              </a>
            ` : `
              <p><strong>受付・販売ページは準備中です</strong></p>
            `}

            <p class="cta-note">${escapeHtml(brand.ctaNotice)}</p>
          </section>
        </div>
      </article>

      <section class="section">
        <div class="section-heading">
          <h2>暮らしに寄り添う、ほかのサービス</h2>
        </div>
        <div class="grid">${others.map(brandCard).join("")}</div>
      </section>
    `;
  }

  function staticPage(id) {
    const pages = {
      about: {
        title: "運営会社",
        english: "ABOUT US",
        description: "働く人の選択肢を、ストーリーと情報で広げる。",
        body: `
          <p class="notice">
            会社情報は未設定です。
            公開前に、実際の法人情報へ差し替えてください。
          </p>

          ${infoMarkup([
            {
              title: "会社名",
              text: "運営法人名を掲載"
            },
            {
              title: "所在地",
              text: "所在地を掲載"
            },
            {
              title: "代表者",
              text: "代表者名を掲載"
            },
            {
              title: "事業内容",
              text: "ウェブメディア運営、取材・記事制作、採用広報支援、広告企画"
            },
            {
              title: "問い合わせ",
              text: "実際の問い合わせ先を掲載"
            }
          ])}

          <h2>私たちが目指すこと</h2>
          <p>
            働き方や暮らし方に、ひとつの正解を置かないこと。
            多様な経験を届け、読者が自分で選ぶための材料をつくります。
          </p>
          <a class="arrow-link" href="editorial.html">
            編集部について →
          </a>
        `
      },

      editorial: {
        title: "編集部について",
        english: "EDITORIAL",
        description: "結果だけでなく、その途中にある声を届けます。",
        body: `
          <h2>編集方針</h2>
          <ul>
            <li>成功だけでなく、迷い・失敗・工夫も紹介します。</li>
            <li>特定の働き方や暮らし方を押しつけません。</li>
            <li>企業の制度説明と、社員の体験談を区別します。</li>
            <li>写真や発言は、掲載範囲について同意を得て使用します。</li>
            <li>誤りの訂正や、退職・異動に伴う見直しに対応します。</li>
          </ul>

          <h2>編集部メンバー</h2>
          <p class="caption">
            役割のサンプルです。氏名・プロフィールは未設定です。
          </p>

          <div class="member-grid">
            <section class="member">
              <h3>編集長</h3>
              <p>企画と編集方針、記事の品質管理を担当します。</p>
            </section>
            <section class="member">
              <h3>編集・ライター</h3>
              <p>取材と執筆を通じて、一人ひとりの経験を言葉にします。</p>
            </section>
            <section class="member">
              <h3>撮影・デザイン</h3>
              <p>人物や職場の空気が伝わる、自然な表現を担当します。</p>
            </section>
          </div>

          <h2>広告掲載について</h2>
          <p>
            有料掲載、商品提供、タイアップ記事は、
            一覧と本文の両方で「広告」または「PR」と明示します。
            有料掲載を、独立した編集部推薦や人気順位に見せません。
          </p>

          <h2>情報の訂正・掲載に関するご相談</h2>
          <p>
            本番公開時に専用窓口を設けます。
            誤情報、写真・発言の利用、記事の更新について対応します。
          </p>

          <a class="arrow-link" href="contact.html">
            お問い合わせについて →
          </a>
        `
      },

      contact: {
        title: "掲載・広告のお問い合わせ",
        english: "PARTNERSHIP",
        description: "企業の想いと、働く人の声を届けるお手伝い。",
        body: `
          <h2>掲載メニュー</h2>
          <ul>
            <li>女性社員インタビュー・社員対談</li>
            <li>企業紹介・採用広報ページ</li>
            <li>ライフスタイル分野のタイアップ記事</li>
            <li>正方形画像広告</li>
          </ul>

          <h2>画像広告の仕様</h2>
          ${infoMarkup([
            {
              title: "推奨サイズ",
              text: "600 × 600ピクセル"
            },
            {
              title: "画像形式",
              text: "WebP、JPEG、PNG"
            },
            {
              title: "表示位置",
              text: "パソコン：右側 / スマートフォン：本文下"
            },
            {
              title: "切り替え",
              text: "6秒ごと。停止・再開、手動切り替えに対応。"
            }
          ])}

          <h2>お問い合わせ窓口</h2>
          <p>
            実際の連絡先は未設定です。
            このデモでは問い合わせや広告申し込みを受け付けていません。
          </p>

          <p class="notice">
            フォームを導入する場合は、送信処理、入力検証、
            迷惑投稿対策、個人情報の取り扱いへの同意を実装してください。
          </p>
        `
      },

      privacy: {
        title: "プライバシーについて",
        english: "PRIVACY",
        description: "公開前の確認事項。",
        body: `
          <p class="notice">
            正式なプライバシーポリシーではありません。
            実際の運用に合わせた規定へ差し替えてください。
          </p>

          <h2>このデモの動作</h2>
          <p>
            検索はブラウザ内で処理します。
            会員登録、問い合わせ送信、アクセス解析、
            広告クリック記録は実装していません。
            Cookieや端末内ストレージも使用していません。
          </p>

          <h2>通信情報について</h2>
          <p>
            ウェブサーバーへ配置した場合、ページや画像の取得に伴い、
            IPアドレスなどがサーバーのアクセスログに記録される場合があります。
            検索語をURLに含めた場合は、サーバーやブラウザ履歴などに
            残る可能性があります。
          </p>

          <h2>画像について</h2>
          <p>
            このコードでは画像をサイト内のファイルから読み込みます。
            本番では利用許諾と人物の掲載同意を確認してください。
          </p>

          <h2>外部リンクについて</h2>
          <p>
            予約・採用・購入リンクを設定した場合、
            移動先では各事業者のプライバシーポリシーが適用されます。
          </p>

          <h2>本番で定める事項</h2>
          <ul>
            <li>運営者と問い合わせ先</li>
            <li>取得する情報、利用目的、保存期間</li>
            <li>委託先・第三者提供の有無</li>
            <li>Cookie、解析、広告サービスの利用</li>
            <li>開示・訂正・削除などへの対応</li>
          </ul>
        `
      }
    };

    return pages[id];
  }

  function renderStatic(data) {
    return `
      <article>
        <div class="page-intro">
          <p class="eyebrow">${data.english}</p>
          <h1>${data.title}</h1>
          <p>${data.description}</p>
        </div>
        <div class="article-body">${data.body}</div>
      </article>
    `;
  }

  function setupMenu() {
    const navigation = document.getElementById("navigation");
    const toggle = document.getElementById("menu-toggle");

    const close = () => {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "メニュー";
    };

    toggle.addEventListener("click", () => {
      const open = navigation.classList.toggle("is-open");

      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "閉じる" : "メニュー";
    });

    document.addEventListener("keydown", event => {
      if (
        event.key === "Escape" &&
        navigation.classList.contains("is-open")
      ) {
        close();
        toggle.focus();
      }
    });
  }

  function setupAdvertisements() {
    const ads = content.brands;
    const rail = document.querySelector(".ad-rail");

    if (!ads.length) {
      rail.hidden = true;
      return;
    }

    const link = document.getElementById("ad-link");
    const image = document.getElementById("ad-image");
    const caption = document.getElementById("ad-caption");
    const count = document.getElementById("ad-count");
    const toggle = document.getElementById("ad-toggle");
    const next = document.getElementById("ad-next");
    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let index = 0;
    let timer = null;
    let paused = motion.matches;
    let pointerInside = false;

    function show() {
      const brand = ads[index];

      link.href = safeLocalUrl(brand.href) || "lifestyle.html";
      image.alt = `広告：${brand.name}。紹介ページを見る`;

      image.onerror = () => {
        image.onerror = null;
        image.src = placeholder({
          title: brand.name,
          subtitle: brand.english,
          background: brand.background,
          accent: brand.accent
        });
      };

      image.src = brand.ad;
      caption.textContent = brand.adCaption;
      count.textContent = `${index + 1} / ${ads.length}`;
    }

    function advance() {
      index = (index + 1) % ads.length;
      show();
    }

    function synchronize() {
      window.clearInterval(timer);
      timer = null;

      toggle.textContent = paused ? "再開" : "停止";
      toggle.setAttribute(
        "aria-label",
        paused
          ? "広告の自動切り替えを再開"
          : "広告の自動切り替えを停止"
      );

      if (
        paused ||
        pointerInside ||
        rail.contains(document.activeElement) ||
        document.hidden ||
        ads.length < 2
      ) {
        return;
      }

      timer = window.setInterval(advance, 6000);
    }

    toggle.addEventListener("click", () => {
      paused = !paused;
      synchronize();
    });

    next.addEventListener("click", () => {
      advance();
      synchronize();
    });

    rail.addEventListener("mouseenter", () => {
      pointerInside = true;
      synchronize();
    });

    rail.addEventListener("mouseleave", () => {
      pointerInside = false;
      synchronize();
    });

    rail.addEventListener("focusin", synchronize);

    rail.addEventListener("focusout", () => {
      window.setTimeout(synchronize, 0);
    });

    document.addEventListener("visibilitychange", synchronize);

    motion.addEventListener("change", event => {
      if (event.matches) {
        paused = true;
      }

      synchronize();
    });

    window.addEventListener("pagehide", () => {
      window.clearInterval(timer);
      timer = null;
    });

    window.addEventListener("pageshow", synchronize);

    show();
    synchronize();
  }

  let html = "";
  let activeCategory = "";
  let title = "ページが見つかりません";

  if (page?.type === "home") {
    html = renderHome();
    title = content.site.tagline;
  } else if (page?.type === "listing") {
    html = renderListing(page.category);
    activeCategory = page.category;
    title = content.categories[page.category].title;
  } else if (page?.type === "story") {
    const story = content.stories.find(item => item.id === page.id);

    if (story) {
      html = renderStory(story);
      activeCategory = story.category;
      title = story.title;
    }
  } else if (page?.type === "company") {
    const company = content.companies.find(item => item.id === page.id);

    if (company) {
      html = renderCompany(company);
      activeCategory = "companies";
      title = company.name;
    }
  } else if (page?.type === "brand") {
    const brand = content.brands.find(item => item.id === page.id);

    if (brand) {
      html = renderBrand(brand);
      activeCategory = "lifestyle";
      title = brand.name;
    }
  } else if (page?.type === "static") {
    const data = staticPage(page.id);

    if (data) {
      html = renderStatic(data);
      activeCategory = page.id === "editorial" ? "editorial" : "";
      title = data.title;
    }
  }

  if (!html) {
    html = `
      <div class="page-intro">
        <h1>ページが見つかりません</h1>
        <p>ページ設定をご確認ください。</p>
      </div>
      <a class="button" href="index.html">トップへ戻る</a>
    `;
  }

  root.innerHTML = `
    ${headerMarkup(activeCategory)}
    <div class="site-layout">
      <main id="main" tabindex="-1">${html}</main>
      ${adMarkup()}
    </div>
    ${footerMarkup()}
  `;

  document.title = `${title}｜${content.site.name}`;

  if (page?.type === "listing") {
    const input = document.getElementById("search-input");

    updateListing(page.category, input.value);

    input.addEventListener("input", event => {
      updateListing(page.category, event.target.value);
    });
  }

  installImageFallbacks();
  setupMenu();
  setupAdvertisements();
})();