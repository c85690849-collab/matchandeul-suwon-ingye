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

  if (!t) return;


  /* 언어 버튼 */

  document
    .querySelectorAll(".lang button")
    .forEach(button => {
      button.classList.remove("active");
    });

  if (btn) {
    btn.classList.add("active");
  }


  /* 상단 / 섹션 제목 */

  const values = {

    title: t.title,

    info: t.info,

    meatTitle: t.meat,

    meatNote: t.note,

    beefTitle: t.beef,

    sideTitle: t.side,

    setTitle: t.set,

    drinkTitle: t.drink,

    footerNote: t.footer

  };


  Object.entries(values).forEach(
    ([id, value]) => {

      const element =
        document.getElementById(id);

      if (element) {
        element.textContent = value;
      }

    }
  );


  /* =========================
     개별 메뉴 번역
  ========================= */

  document
    .querySelectorAll("[data-ko]")
    .forEach(element => {

      const translatedText =
        element.dataset[lang];

      if (translatedText) {

        element.textContent =
          translatedText;

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
   언어 변경
========================= */

function setLang(lang, btn) {

  if (changingLanguage) return;

  if (!texts[lang]) return;

  if (lang === currentLang) return;


  const wrap =
    document.querySelector(".wrap");


  if (!wrap) {

    applyLanguage(lang, btn);

    return;

  }


  changingLanguage = true;


  /*
    기존 애니메이션 클래스 초기화
  */

  wrap.classList.remove("lang-in");

  wrap.classList.remove("lang-out");


  /*
    브라우저가 초기 상태를
    확실하게 계산하도록 강제
  */

  void wrap.offsetWidth;


  /*
    1단계
    현재 화면 OUT
  */

  wrap.classList.add("lang-out");


  /*
    languageOut 애니메이션이
    실제로 끝나는 순간을 기다림
  */

  const handleOutEnd = (event) => {

    if (event.target !== wrap) return;

    if (
      event.animationName !==
      "languageOut"
    ) {
      return;
    }


    wrap.removeEventListener(
      "animationend",
      handleOutEnd
    );


    /*
      2단계
      완전히 사라진 뒤 번역
    */

    applyLanguage(lang, btn);


    /*
      OUT 제거
    */

    wrap.classList.remove("lang-out");


    /*
      새 애니메이션을
      처음부터 재생하기 위해
      reflow 강제
    */

    void wrap.offsetWidth;


    /*
      3단계
      번역된 화면 IN
    */

    wrap.classList.add("lang-in");


    const handleInEnd = (event) => {

      if (event.target !== wrap) return;

      if (
        event.animationName !==
        "languageIn"
      ) {
        return;
      }


      wrap.removeEventListener(
        "animationend",
        handleInEnd
      );


      /*
        애니메이션 완료 후
        클래스 정리
      */

      wrap.classList.remove("lang-in");

      changingLanguage = false;

    };


    wrap.addEventListener(
      "animationend",
      handleInEnd
    );

  };


  wrap.addEventListener(
    "animationend",
    handleOutEnd
  );

}


/* =========================
   최초 페이지 실행
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    currentLang = "ko";

    changingLanguage = false;


    /* 한국어 버튼 활성화 */

    const buttons =
      document.querySelectorAll(
        ".lang button"
      );

    buttons.forEach(button => {
      button.classList.remove("active");
    });


    const koreanButton =
      document.querySelector(
        ".lang button"
      );

    if (koreanButton) {
      koreanButton.classList.add("active");
    }


    /*
      첫 페이지 등장 애니메이션

      DOM이 그려진 다음 실행
    */

    requestAnimationFrame(() => {

      document.body.classList.add(
        "page-loaded"
      );

    });

  }
);
