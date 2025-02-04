export function ToggleNav() {
    const toggleSidenav = () => {
        const html = document.querySelector('html');
        
        if (html && html.hasAttribute('data-toggled')) {
          // If attribute exists, remove it (expand nav)
          html.removeAttribute('data-toggled');
        } else if (html) {
          // If attribute doesn't exist, add it (hide nav)
          html.setAttribute('data-toggled', 'icon-overlay-close');
        }
      };
    return (
        <div className="header-element mx-lg-0">
                <a  onClick={toggleSidenav} aria-label="Hide Sidebar" className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" 
                data-bs-toggle="sidebar" href="#!">
                  <span></span>
                </a>
      </div>
    )
}