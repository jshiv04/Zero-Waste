document.addEventListener("DOMContentLoaded", function() {
    var platformsSection = document.getElementById("platforms");
    var heroSection = document.getElementById("hero");

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        if (isInViewport(heroSection)) {
            platformsSection.classList.add("hidden");
        } else {
            platformsSection.classList.remove("hidden");
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});
