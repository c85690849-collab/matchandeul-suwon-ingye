const texts = {

  ko: {
    title: "맛찬들왕소금구이 수원인계점",
    info: "수원 인계동 · 숙성 돼지고기 전문",
    meat: "숙성 돼지고기",
    note: "첫 주문 시 부위별 2인분 이상 주문 가능합니다. 추가 주문은 1인분씩 가능합니다. (특수부위 제외)",
    beef: "한우",
    side: "식사 & 사이드",
    set: "추천 세트",
    drink: "주류 & 음료",
    footer: "메뉴 및 가격은 매장 운영에 따라 변경될 수 있습니다."
  },

  en: {
    title: "MATCHANDEUL SUWON INGYE",
    info: "Ingye-dong, Suwon · Premium Korean BBQ",
    meat: "Aged Pork",
    note: "First order: minimum 2 servings per cut. Additional orders are available by 1 serving. (Special cuts excluded)",
    beef: "Korean Beef",
    side: "Meals & Sides",
    set: "Recommended Sets",
    drink: "Alcohol & Beverages",
    footer: "Menu items and prices may change depending on store operations."
  },

  ja: {
    title: "味ちゃん 王塩焼き 水原・仁溪店",
    info: "水原・仁溪洞 · 熟成韓国BBQ",
    meat: "熟成豚肉",
    note: "最初の注文は各部位2人前以上。追加注文は1人前から可能です。（希少部位を除く）",
    beef: "韓牛",
    side: "食事・サイド",
    set: "おすすめセット",
    drink: "お酒・ドリンク",
    footer: "メニューと価格は店舗の運営状況により変更される場合があります。"
  },

  zh: {
    title: "味赞王盐烤 水原仁溪店",
    info: "水原仁溪洞 · 高级韩国烤肉",
    meat: "熟成猪肉",
    note: "首次点餐每个部位至少2人份。追加可按1人份点餐。（特色部位除外）",
    beef: "韩牛",
    side: "主食 & 小菜",
    set: "推荐套餐",
    drink: "酒水 & 饮料",
    footer: "菜单及价格可能根据门店运营情况有所调整。"
  }

};


let currentLang = "ko";
let changingLanguage = false;


/* =========================
   실제 번역 적용
========================= */

function applyLanguage(lang, btn) {

  const t = texts[lang];

  if (!t) {
    return;
  }


  /* 언어 버튼 */

  document
    .querySelectorAll(".lang button")
    .forEach(button => {
      button.classList.remove("active");
    });

  if (btn) {
    btn.classList.add("active");
  }


  /* 상단 */

  const title = document.getElementById("title");

  if (title) {
    title.textContent = t.title;
  }


  const info = document.getElementById("info");

  if (info) {
    info.textContent = t.info;
  }


  /* 메뉴 제목 */

  const meatTitle =
    document.getElementById("meatTitle");

  if (meatTitle) {
    meatTitle.textContent = t.meat;
  }


  const meatNote =
    document.getElementById("meatNote");

  if (meatNote) {
    meatNote.textContent = t.note;
  }


  const beefTitle =
    document.getElementById("beefTitle");

  if (beefTitle) {
    beefTitle.textContent = t.beef;
  }


  const sideTitle =
    document.getElementById("sideTitle");

  if (sideTitle) {
    sideTitle.textContent = t.side;
  }


  const setTitle =
    document.getElementById("setTitle");

  if (setTitle) {
    setTitle.textContent = t.set;
  }


  const drinkTitle =
    document.getElementById("drinkTitle");

  if (drinkTitle) {
    drinkTitle.textContent = t.drink;
  }


  const footerNote =
    document.getElementById("footerNote");

  if (footerNote) {
    footerNote.textContent = t.footer;
  }


  /* =========================
     개별 메뉴 번역
  ========================= */

  document
    .querySelectorAll("[data-ko]")
    .forEach(element => {

      const translatedText =
        element.dataset[lang];

      if (translatedText) {
        element.textContent = translatedText;
      }

      else {
        element.textContent =
          element.dataset.ko;
      }

    });


  document.documentElement.lang = lang;

  currentLang = lang;

}


/* =========================
   언어 전환
========================= */

function setLang(lang, btn) {

  if (changingLanguage) {
    return;
  }

  if (!texts[lang]) {
    return;
  }

  if (lang === currentLang) {
    return;
  }


  const wrap =
    document.querySelector(".wrap");


  /* wrap이 없는 경우 */

  if (!wrap) {

    applyLanguage(lang, btn);

    return;

  }


  changingLanguage = true;


  /*
    1단계

    language-changing 클래스를 추가한다.

    CSS:

    opacity: 0
    transform: translateY(8px)

    transition: 0.32초
  */

  wrap.classList.add(
    "language-changing"
  );


  /*
    2단계

    CSS의 0.32초 전환이 끝날 시간을
    충분히 기다린다.

    380ms 후 실제 번역 변경.
  */

  setTimeout(() => {

    applyLanguage(lang, btn);


    /*
      3단계

      번역된 상태를 브라우저가
      먼저 그리도록 두 프레임 기다린다.
    */

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {


        /*
          language-changing 제거

          opacity 0 → 1
          translateY(8px) → 0

          부드럽게 다시 등장
        */

        wrap.classList.remove(
          "language-changing"
        );


        /*
          4단계

          다시 나타나는 0.32초가
          끝난 후 잠금 해제
        */

        setTimeout(() => {

          changingLanguage = false;

        }, 380);


      });

    });


  }, 380);

}


/* =========================
   페이지 최초 실행
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    currentLang = "ko";

    changingLanguage = false;


    const buttons =
      document.querySelectorAll(
        ".lang button"
      );


    buttons.forEach(button => {

      button.classList.remove(
        "active"
      );

    });


    const koreanButton =
      document.querySelector(
        ".lang button"
      );


    if (koreanButton) {

      koreanButton.classList.add(
        "active"
      );

    }

  }
);
