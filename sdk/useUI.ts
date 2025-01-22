/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { effect, signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/compat";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const mobileDisplayGrid = signal<2 | 1>(2);
const desktopDisplayGrid = signal<3 | 4>(3);
const displayProductZoomModal = signal(false);
const productZoomIndex = signal<number>(0);
const storeLocal = signal({
  lat: -23.597981704745184,
  lng: -46.69755666525704,
});

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  mobileDisplayGrid,
  desktopDisplayGrid,
  displayProductZoomModal,
  productZoomIndex,
  storeLocal,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

effect(() => {
  if (IS_BROWSER) {
    const mobileDisplayGridLocal = localStorage.getItem("mobileDisplayGrid");
    const desktopDisplayGridLocal = localStorage.getItem("desktopDisplayGrid");
    if (mobileDisplayGridLocal) {
      mobileDisplayGrid.value = parseInt(mobileDisplayGridLocal) as 2 | 1;
    }
    if (desktopDisplayGridLocal) {
      desktopDisplayGrid.value = parseInt(desktopDisplayGridLocal) as 3 | 4;
    }
  }
});
effect(() => {
  localStorage.setItem(
    "mobileDisplayGrid",
    state.mobileDisplayGrid.value.toString(),
  );
  localStorage.setItem(
    "desktopDisplayGrid",
    state.desktopDisplayGrid.value.toString(),
  );
});

export const useUI = () => {
  return state;
};
