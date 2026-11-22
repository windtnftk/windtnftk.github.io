"use strict";

// JavaScript가 없어도 내비게이션이 표시됩니다. 모바일에만 접기 기능을 추가합니다.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobileViewport = window.matchMedia("(max-width: 760px)");

if (menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "메뉴 닫기" : "메뉴 열기";
    navigation.hidden = mobileViewport.matches && !open;
  };

  const updateViewport = () => {
    // 화면 크기 변경으로 포커스된 요소가 숨겨지지 않도록 이동합니다.
    const focusInNavigation = navigation.contains(document.activeElement);
    const focusOnButton = document.activeElement === menuButton;
    menuButton.hidden = !mobileViewport.matches;
    setMenuOpen(false);
    if (mobileViewport.matches && focusInNavigation) menuButton.focus();
    if (!mobileViewport.matches && focusOnButton) navigation.querySelector("a").focus();
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !mobileViewport.matches) return;
    setMenuOpen(false);
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileViewport.matches && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  mobileViewport.addEventListener("change", updateViewport);
  updateViewport();
}
