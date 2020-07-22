import Vue from "vue";

// --- Utility functions --- //

function addClassIfNeed(element, className) {
  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
}

function removeClassIfNeed(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

// --- Constants --- //

const FADE_BASE = "v-fade-base";
const FADE_FADDED = "v-fade-faded";
const FADE_HIDDEN = "v-fade-hidden";

const BELLOW_MODIFIER = "v-fade-bellow";
const FAST_MODIFIER = "v-fade-fast";

const DELAY = 500;
const FAST_DELAY = 250;

/**
 * The 'v-fade' directive is a conditional displaying utility.
 *
 * It's similar to 'v-show' but with two differences:
 *  1. You must pass "false" to show the element and "true" to hide it.
 *  2. A fade animation is used to hide/show the element.
 *  3. The element occupies space when hidden (i.e. his 'display' property isn't set to 'none').
 *
 * This directive has two modifiers:
 *  - 'fast' for increase the speed of the fade animation.
 *  - 'bellow' for slightly move the element down when fading it.
 */
Vue.directive("fade", {
  bind: function(el, binding) {
    // Add base CSS classes.
    addClassIfNeed(el, FADE_BASE);
    if (binding.modifiers && binding.modifiers.fast) {
      addClassIfNeed(el, FAST_MODIFIER);
    }
    if (binding.modifiers && binding.modifiers.bellow) {
      addClassIfNeed(el, BELLOW_MODIFIER);
    }

    // Hide it (if need).
    const shouldHide = !!binding.value;
    if (shouldHide) {
      addClassIfNeed(el, FADE_FADDED);
    }
  },

  update(el, binding) {
    const shouldHide = !!binding.value;
    if (!shouldHide) {
      removeClassIfNeed(el, FADE_FADDED);
    } else {
      addClassIfNeed(el, FADE_FADDED);
    }
  }
});

/**
 * The 'v-show-fade' directive is a conditional displaying utility.
 *
 * It's similar to 'v-show' but it uses a fade animation for hide/show the element.
 *
 * This directive has one modifier: 'fast', for increase the speed of the fade animation.
 */
Vue.directive("showFade", {
  bind: function(el, binding) {
    // Add base CSS classes.
    addClassIfNeed(el, FADE_BASE);
    if (binding.modifiers && binding.modifiers.fast) {
      addClassIfNeed(el, FAST_MODIFIER);
    }

    // Hide if need.
    const shouldHide = !binding.value;
    if (shouldHide) {
      addClassIfNeed(el, FADE_FADDED);
      addClassIfNeed(el, FADE_HIDDEN);
    }

    // Save current state.
    el.dataset.isHidden = shouldHide;
  },

  update(el, binding) {
    const shouldHide = !binding.value;
    const speed =
      binding.modifiers && binding.modifiers.fast ? FAST_DELAY : DELAY;

    // Do nothing if the state don't changed.
    if (shouldHide && el.dataset.isHidden === "true") {
      return;
    }

    // Clear previous timeout.
    clearTimeout(el.dataset.delayedIfTimeout);

    // Save current state.
    el.dataset.isHidden = shouldHide;

    // Check if element should be hidden or show.
    if (shouldHide) {
      // Start fade out animation.
      addClassIfNeed(el, FADE_FADDED);

      // Hide element after animation has ended.
      el.dataset.delayedIfTimeout = setTimeout(() => {
        addClassIfNeed(el, FADE_HIDDEN);
      }, speed);
    } else {
      // Show element (in faded state).
      removeClassIfNeed(el, FADE_HIDDEN);
      addClassIfNeed(el, FADE_FADDED);

      // Start fade in animation (must do it after some tiny delay to work).
      setTimeout(() => {
        // Check curent state for prevent race conditions.
        if (el.dataset.isHidden === "false") {
          removeClassIfNeed(el, FADE_FADDED);
        }
      }, 25);
    }
  }
});
