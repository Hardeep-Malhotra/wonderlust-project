// // === Bootstrap Form Validation ===
// (() => {
//   'use strict';
//   const forms = document.querySelectorAll('.needs-validation');
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
//       form.classList.add('was-validated');
//     }, false);
//   });
// })();


// // === GST Toggle ===
// const taxSwitch = document.getElementById("flexSwitchCheckDefault");
// const cards = document.querySelectorAll(".listing-card-text");

// if (taxSwitch && cards.length > 0) {
//   cards.forEach(card => {
//     const match = card.innerHTML.match(/₹([\d,]+)/);
//     if (match) {
//       card.dataset.basePrice = match[1].replace(/,/g, "");
//       const titleTag = card.querySelector("b");
//       if (titleTag) {
//         card.dataset.title = titleTag.innerText;
//       }
//     }
//   });

//   taxSwitch.addEventListener("change", () => {
//     cards.forEach(card => {
//       const basePrice = parseFloat(card.dataset.basePrice);
//       const title = card.dataset.title || "";
//       const gst = basePrice * 0.18;
//       const total = basePrice + gst;

//       if (taxSwitch.checked) {
//         card.innerHTML = `<b>${title}</b><br>₹${total.toLocaleString("en-IN")} <span class="text-muted">(incl. 18% GST)</span>`;
//       } else {
//         card.innerHTML = `<b>${title}</b><br>₹${basePrice.toLocaleString("en-IN")} / night <i class="tax-info">&nbsp;&nbsp;+18% GST</i>`;
//       }
//     });
//   });
// }


// // === Filter Scroll Buttons ===
// document.addEventListener("DOMContentLoaded", function () {
//   const filtersContainer = document.getElementById("filters-container");
//   const leftBtn = document.querySelector(".left-btn");
//   const rightBtn = document.querySelector(".right-btn");

//   if (filtersContainer && leftBtn && rightBtn) {
//     leftBtn.addEventListener("click", () => {
//       filtersContainer.scrollBy({ left: -200, behavior: "smooth" });
//     });
//     rightBtn.addEventListener("click", () => {
//       filtersContainer.scrollBy({ left: 200, behavior: "smooth" });
//     });
//   }
// });


// // === Mobile Touch Scroll ===
// document.addEventListener("DOMContentLoaded", function () {
//   const container = document.getElementById("filters-container");
//   if (!container) return;
//   let startX, scrollLeft;

//   container.addEventListener("touchstart", (e) => {
//     startX = e.touches[0].pageX;
//     scrollLeft = container.scrollLeft;
//   });
//   container.addEventListener("touchmove", (e) => {
//     const x = e.touches[0].pageX;
//     const walk = startX - x;
//     container.scrollLeft = scrollLeft + walk;
//   });
// });


// // === Category Filtering ===
// document.addEventListener("DOMContentLoaded", function () {
//   const filters = document.querySelectorAll(".filter");
//   const listings = document.querySelectorAll(".col");

//   if (filters.length === 0 || listings.length === 0) return;

//   filters.forEach(filter => {
//     filter.addEventListener("click", () => {
//       filters.forEach(f => f.classList.remove("active"));
//       filter.classList.add("active");

//       const selectedCategory = filter.getAttribute("data-category");

//       if (selectedCategory === "Trending") {
//         listings.forEach(listing => (listing.style.display = "block"));
//       } else {
//         listings.forEach(listing => {
//           const listingCategory = listing.getAttribute("data-category");
//           if (listingCategory === selectedCategory) {
//             listing.style.display = "block";
//           } else {
//             listing.style.display = "none";
//           }
//         });
//       }
//     });
//   });
// });




// === Bootstrap Form Validation ===
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// === GST Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const taxSwitch = document.getElementById("flexSwitchCheckDefault");
  const cards = document.querySelectorAll(".listing-card-text");

  if (!taxSwitch || cards.length === 0) return;

  // base prices store kar lo
  cards.forEach((card) => {
    const match = card.innerHTML.match(/₹([\d,]+)/);
    if (match) {
      card.dataset.basePrice = match[1].replace(/,/g, "");
      const titleTag = card.querySelector("b");
      if (titleTag) card.dataset.title = titleTag.innerText;
    }
  });

  // toggle listener
  taxSwitch.addEventListener("change", () => {
    cards.forEach((card) => {
      const basePrice = parseFloat(card.dataset.basePrice);
      const title = card.dataset.title || "";
      const gst = basePrice * 0.18;
      const total = basePrice + gst;

      if (taxSwitch.checked) {
        card.innerHTML = `<b>${title}</b><br>₹${total.toLocaleString(
          "en-IN"
        )} <span class="text-muted">(incl. 18% GST)</span>`;
      } else {
        card.innerHTML = `<b>${title}</b><br>₹${basePrice.toLocaleString(
          "en-IN"
        )} / night <i class="tax-info">&nbsp;&nbsp;+18% GST</i>`;
      }
    });
  });
});

// === Filter Scroll Buttons ===
document.addEventListener("DOMContentLoaded", () => {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const filtersContainer = document.getElementById("filters-container");
  const filter = document.querySelector(".filter");

  if (!filtersContainer || !leftBtn || !rightBtn || !filter) return;

  const filterWidth = filter.offsetWidth + 32;

  leftBtn.addEventListener("click", () => {
    filtersContainer.scrollBy({ left: -filterWidth, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    filtersContainer.scrollBy({ left: filterWidth, behavior: "smooth" });
  });
});

// === Mobile Touch Scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("filters-container");
  if (!container) return;

  let startX, scrollLeft;
  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = startX - x;
    container.scrollLeft = scrollLeft + walk;
  });
});

// === Category Filtering (Final Fixed) ===
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const listings = document.querySelectorAll(".listing-card[data-category]");

  if (filters.length === 0 || listings.length === 0) return;

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // remove active from all filters
      filters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");

      const selectedCategory = filter.getAttribute("data-category");

      listings.forEach((listing) => {
        const listingCategory = listing.getAttribute("data-category");
        if (
          selectedCategory === "Trending" ||
          listingCategory === selectedCategory
        ) {
          listing.style.display = "block";
        } else {
          listing.style.display = "none";
        }
      });
    });
  });
});
