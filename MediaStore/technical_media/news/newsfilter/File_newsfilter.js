const categoryList = document.querySelectorAll(".categoryBtn");
const tagList = document.querySelectorAll(".tagBtn");
const newsTiles = document.querySelectorAll(".news-tile");

const resetFilter = function (type) {
  if (type === "category") {
    categoryList.forEach(function (btn, idx) {
      if (idx === 0) {
        btn.classList.add("news-btn-active");
      } else {
        btn.classList.remove("news-btn-active");
      }
    });
  } else if (type === "tags") {
    tagList.forEach(function (btn, idx) {
      if (idx === 0) {
        btn.classList.add("news-btn-active");
      } else {
        btn.classList.remove("news-btn-active");
      }
    });
  }
  newsTiles.forEach(function (tile) {
    tile.style.display = "block";
  });
};

resetFilter("category");
resetFilter("tags");

categoryList.forEach(function (btn) {
  btn.addEventListener("click", function () {
    resetFilter("category");
    let categoryLabel = btn.innerText;
    if (categoryLabel === "SHOW ALL") {
      newsTiles.forEach(function (tile) {
        if (tile.dataset.category !== categoryLabel) {
          if (tile.style.display === "none") {
            tile.style.display = "block";
          }
        }
      });
    } else {
      categoryList[0].classList.toggle("news-btn-active");
	  resetFilter("tags");
      btn.classList.toggle("news-btn-active");
      newsTiles.forEach(function (tile) {
        if (tile.dataset.category !== categoryLabel) {
          if (tile.style.display === "none") {
            tile.style.display = "block";
          } else {
            tile.style.display = "none";
          }
        }
      });
    }
  });
});

tagList.forEach(function (btn) {
  btn.addEventListener("click", function () {
    resetFilter("tags");
    let tagLabel = btn.innerText;

    if (tagLabel === "SHOW ALL") {
      newsTiles.forEach(function (tile) {
        if (tile.style.display === "none") {
          tile.style.display = "block";
        }
      });
    } else {
      tagList[0].classList.toggle("news-btn-active");
      resetFilter("category");
      btn.classList.toggle("news-btn-active");
      newsTiles.forEach(function (tile) {
        if (!tile.dataset.tags.includes(tagLabel)) {
          if (tile.style.display === "none") {
            tile.style.display = "block";
          } else {
            tile.style.display = "none";
          }
        }
      });
    }
    
  });
});
