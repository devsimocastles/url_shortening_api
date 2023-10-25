// TOGGLE MENU

const header = document.querySelector(".hero__container");

const desktopMenu = `
    <nav id="menu_container">
        <img src="images/logo.svg" class="logo" />
        <div class="links__wrapper">
            <div class="links link">
                <a href="#">Features
                </a>
                <a href="#">Pricing
                </a>
                <a href="#">Resources
                </a>
            </div>
            <div class="ctas link">
                <a href="#">Login</a>
                <a href="#" class="signUp">Sign Up</a>
            </div>
        </div>
      </nav>

      <section class="hero__content">
        <div class='content'>        
        <h1>More than just shorter links</h1>
        <p>
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <a href="#" class="cta">Get Started</a>
        </div>
        <div class='hero_img'>
        <img src="images/illustration-working.svg" alt="hero image" class="hero__image"/>
        </div>
</section>
`;

const mobileMenu = `
<nav id="menu_container">
        <img src="images/logo.svg" class="logo" />
        <label class="checkbox_container">
                  <input type="checkbox" class="switch_menu" id="switch_menu"></input>
                  <span>
                  </span>
        </label>
      </nav>
      <div class="menu__wrapper" id="menu">
        <div class="menu">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
          <hr class="menu__line">
          <a href="#">Login</a>
          <a href="#">Sign Up</a>
        </div>
      </div>
      <img src="images/illustration-working.svg" alt="hero image" class="hero__image"/>
      <section class="hero__content">
        <h1>More than just shorter links</h1>
        <p>
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <a href="#" class="cta">Get Started</a>
</section>`;

function switchMenu(e) {
  if (e.currentTarget.innerWidth <= 874) {
    header.innerHTML = mobileMenu;
    const menu_button = document.getElementById("switch_menu");
    const menu = document.getElementById("menu");
    function toggleMenu(e) {
      if (e.target.checked == true) {
        menu.classList.add("active");
        setTimeout(() => {
          menu.classList.add("fullOpacity");
        }, 150);
      } else {
        menu.classList.remove("fullOpacity");
        setTimeout(() => {
          menu.classList.remove("active");
        }, 300);
      }
    }
    menu_button.addEventListener("click", toggleMenu);
  } 
  else header.innerHTML = desktopMenu;
}

window.addEventListener("resize", switchMenu);
window.addEventListener("load", switchMenu);
