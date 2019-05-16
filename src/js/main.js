(
function () {
    var openMenuBtn = document.getElementById("menuOpen");
    var closeMenuBtn = document.getElementById("menuClose");
    var menu = document.getElementById("respMenu");

    window.addEventListener('resize', setTransitionToMenu);

    if (openMenuBtn != null && closeMenuBtn != null && menu != null) {
        openMenuBtn.addEventListener('click', function (ev) {
            addClass(menu,'-open');
        });
        closeMenuBtn.addEventListener('click', function (ev) {
            closeMenu();
        });
        var linkList = menu.querySelectorAll('a');
        for (i = 0; i < linkList.length; ++i) {
            linkList[i].addEventListener('click', closeMenu);
        }
    }

    function closeMenu() {
        removeClass(menu,'-open');
    }

    function setTransitionToMenu() {
        var match = window.matchMedia( "(max-width: 600px)" );
        console.log(match.matches);
        if (match.matches) {
            addClass(menu,'-transition');
        } else {
            removeClass(menu,'-transition');
            closeMenu();
        }
    }
    setTransitionToMenu();


    function addClass(element, clazz) {
        if (!element.classList.contains(clazz)) {
            element.classList.add(clazz);
        }
    }

    function removeClass(element, clazz) {
        if (element.classList.contains(clazz)) {
            element.classList.remove(clazz);
        }
    }

}
)();