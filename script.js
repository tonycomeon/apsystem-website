// ============================================
// 1. 모바일 메뉴 열기/닫기
// ============================================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// 메뉴 클릭하면 자동으로 닫히게 (모바일에서 편하게)
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// 2. "렌탈상품 보기" 클릭 시 두 상품 박스 자동으로 펼치기
// ============================================
const productLinks = document.querySelectorAll('a[href="#products"]');
const productCards = document.querySelectorAll('.product-card');

productLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // 스크롤이 어느 정도 진행된 후 펼쳐지도록 살짝 지연
    setTimeout(() => {
      productCards.forEach((card) => card.classList.add('is-revealed'));
    }, 400);
  });
});

// 렌탈상품 섹션을 완전히 벗어나면 펼쳐진 상태를 초기화
// (다시 스크롤해 들어왔을 때 또 한 번 자연스럽게 펼쳐지도록)
const productsSection = document.getElementById('products');
if (productsSection) {
  const resetObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          productCards.forEach((card) => card.classList.remove('is-revealed'));
        }
      });
    },
    { threshold: 0 }
  );
  resetObserver.observe(productsSection);
}

// "렌탈상품 보기"로 펼쳐진 상태에서 카드를 한 번 더 클릭하면
// 네이버 스마트스토어로 이동
const SMARTSTORE_URL = 'https://smartstore.naver.com/apsystem_shop';

productCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (card.classList.contains('is-revealed')) {
      window.open(SMARTSTORE_URL, '_blank');
    }
  });
});

// ============================================
// 4. "전화로 견적 문의" 클릭 시 번호 팝업 표시
// ============================================
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const copyNumberBtn = document.getElementById('copyNumberBtn');
const PHONE_NUMBER = '02-854-9060';

function openCallModal() {
  callModal.classList.add('is-open');
  callModal.setAttribute('aria-hidden', 'false');
}
function closeCallModal() {
  callModal.classList.remove('is-open');
  callModal.setAttribute('aria-hidden', 'true');
}

if (callBtn && callModal) {
  callBtn.addEventListener('click', openCallModal);

  callModal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeCallModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCallModal();
  });
}

if (copyNumberBtn) {
  copyNumberBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      copyNumberBtn.textContent = '복사됨!';
      setTimeout(() => { copyNumberBtn.textContent = '번호 복사'; }, 1500);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  });
}

// ============================================
// 5. 스크롤하면 섹션이 서서히 나타나는 효과
// ============================================
// .reveal 클래스가 붙은 요소들을 관찰하다가
// 화면에 들어오면 .is-visible 클래스를 추가해줌
const revealTargets = document.querySelectorAll(
  '.about, .history, .products, .portfolio, .clients, .footer'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 한 번 나타나면 다시 관찰 안 함
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));
