const texts={
ko:{title:"맛찬들왕소금구이 수원인계점",info:"수원 인계동 · 숙성 돼지고기 전문",meat:"숙성 돼지고기",note:"첫 주문 시 부위별 2인분 이상 주문 가능합니다. 추가 주문은 1인분씩 가능합니다. (특수부위 제외)",beef:"한우",side:"식사 & 사이드",set:"추천 세트",drink:"주류 & 음료"},
en:{title:"MATCHANDEUL SUWON INGYE",info:"Ingye-dong, Suwon · Premium Korean BBQ",meat:"Aged Pork",note:"First order: minimum 2 servings per cut. Additional orders are available by 1 serving. (Special cuts excluded)",beef:"Korean Beef",side:"Meals & Sides",set:"Recommended Sets",drink:"Alcohol & Beverages"},
ja:{title:"味ちゃん 王塩焼き 水原・仁溪店",info:"水原・仁溪洞 · 熟成韓国BBQ",meat:"熟成豚肉",note:"最初の注文は各部位2人前以上。追加注文は1人前から可能です。（希少部位を除く）",beef:"韓牛",side:"食事・サイド",set:"おすすめセット",drink:"お酒・ドリンク"},
zh:{title:"味赞王盐烤 水原仁溪店",info:"水原仁溪洞 · 高级韩国烤肉",meat:"熟成猪肉",note:"首次点餐每个部位至少2人份。追加可按1人份点餐。（特色部位除外）",beef:"韩牛",side:"主食 & 小菜",set:"推荐套餐",drink:"酒水 & 饮料"}
};
function setLang(lang,btn){
 document.querySelectorAll('.lang button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
 const t=texts[lang];
 document.getElementById('title').textContent=t.title;
 document.getElementById('info').textContent=t.info;
 document.getElementById('meatTitle').textContent=t.meat;
 document.getElementById('meatNote').textContent=t.note;
 document.getElementById('beefTitle').textContent=t.beef;
 document.getElementById('sideTitle').textContent=t.side;
 document.getElementById('setTitle').textContent=t.set;
 document.getElementById('drinkTitle').textContent=t.drink;
 document.querySelectorAll('[data-ko]').forEach(el=>el.textContent=el.dataset[lang]||el.dataset.ko);
 document.documentElement.lang=lang;
}
