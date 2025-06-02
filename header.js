const header = () =>{
    return `
 <header class="main-header">
      <div class="top-header">
        <button class="mobile-menu-toggle">
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div class="search-wrapper">
          <input type="text" placeholder="Search for magic..." class="search-bar">
          <button class="lupa">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        <div class="logo-wrapper">
          <img src="images/logo2.png" alt="Flutura Logo" class="logo">
        </div>

        <div class="icons-wrapper">
          <svg class="icon desktop-only" id="wish-list-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>

          <svg class="icon" onclick="window.location.href='s.html'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" /> 
          </svg>

          <div style="position: relative; display: inline-block;">
            <svg class="icon desktop-only" id="cart-icon-desktop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span id="cart-count" class="cart-count-badge">0</span>
          </div>

          <div style="position: relative; display: inline-block;">
            <svg class="icon mobile-only" id="cart-icon" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>
      </div>

      <nav class="nav-menu">
        <ul>
          <li><a href="home.html" target="_blank">home</a></li>
          <li><a href="aboutus.html" target="_blank">about us</a></li>
          <li><a href="rings.html" target="_blank">rings</a></li>
          <li><a href="404.html" target="_blank">bracelets</a></li>
          <li><a href="404.html" target="_blank">necklaces</a></li>
          <li><a href="contactus.html" target="_blank">contact us</a></li>
          <li><a href="engagement.html" target="_blank">bridal</a></li>
        </ul>
      </nav>
    </header>
    `;
};

export default header;


