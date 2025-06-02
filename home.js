let item1_arr;
let wish_list_arr_bool = new Array(1000).fill(0);
let cnt_wish = 0;
let rings_data = []; 

fetch('rings.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then(data => {
    rings_data = data; 
    let items1 = document.getElementsByClassName("item1");
    item1_arr = Array.from(items1);

    item1_arr.forEach((element, index) => {
      element.innerHTML = 
      `
            <div class="item-picture">
              <div><img src="images/icon_heart.png" alt="" class="img-heart" data-favorited="false"></div>
            </div>
            <div class="culoare">
              <p class="item-name">${data[index].name}</p>
              <p class="price">$${data[index].price}</p>
            </div>
      `;
      document.getElementsByClassName("item-picture")[index].style.backgroundImage = `url("${data[index].url}")`;
      document.getElementsByClassName("item-picture")[index].style.backgroundSize = `cover`;
      document.getElementsByClassName("item-picture")[index].style.backgroundPosition = `center`;
    });

    loadWishlistFromStorage();
    
    const heartIcons = document.querySelectorAll(".img-heart");
    
    heartIcons.forEach((heartIcon, index) => {
      const originalSrc = heartIcon.src;
      const hoverSrc = originalSrc.replace('icon_heart.png', 'heart_hover.png');
      const favoritedSrc = originalSrc.replace('icon_heart.png', 'heart_click.png'); 
      
      heartIcon.addEventListener("mouseenter", () => {
        if (heartIcon.dataset.favorited === "false") {
          heartIcon.src = hoverSrc;
        }
      });

      heartIcon.addEventListener("mouseleave", () => {
        if (heartIcon.dataset.favorited === "false") {
          heartIcon.src = originalSrc;
        }
      });

      heartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (heartIcon.dataset.favorited === "false") {
          heartIcon.dataset.favorited = "true";
          heartIcon.src = favoritedSrc;
          heartIcon.style.transform = "scale(1.2)";
          
          wish_list_arr_bool[index] = 1;
          cnt_wish++;
          
          setTimeout(() => {
            heartIcon.style.transform = "scale(1)";
          }, 200);
          
          saveWishlistToStorage();
          
        } else {
          heartIcon.dataset.favorited = "false";
          heartIcon.src = originalSrc;
          wish_list_arr_bool[index] = 0;
          cnt_wish--;
          
          saveWishlistToStorage();
        }
        console.log(cnt_wish);
      });
    });
  })
  .catch(error => {
    console.error("Error fetching rings:", error);
});

function saveWishlistToStorage() {
  const wishlistData = {
    wish_list_arr_bool: wish_list_arr_bool,
    cnt_wish: cnt_wish,
    rings_data: rings_data
  };
  localStorage.setItem('flutura_wishlist', JSON.stringify(wishlistData));
}

function loadWishlistFromStorage() {
  const savedWishlist = localStorage.getItem('flutura_wishlist');
  if (savedWishlist) {
    const wishlistData = JSON.parse(savedWishlist);
    wish_list_arr_bool = wishlistData.wish_list_arr_bool || new Array(1000).fill(0);
    cnt_wish = wishlistData.cnt_wish || 0;
    
    const heartIcons = document.querySelectorAll(".img-heart");
    heartIcons.forEach((heartIcon, index) => {
      if (wish_list_arr_bool[index] === 1) {
        heartIcon.dataset.favorited = "true";
        heartIcon.src = heartIcon.src.replace('icon_heart.png', 'heart_click.png');
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const searchIcon = document.getElementById('searchIcon');
  const searchBar = document.getElementById('searchBar');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  if (searchIcon && searchBar) {
    searchIcon.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
          searchBar.focus();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !e.target.closest('.search-wrapper')) {
        searchBar.classList.remove('active');
      }
    });
  }
});