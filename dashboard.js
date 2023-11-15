document.addEventListener('DOMContentLoaded', function () {
    const menus = document.querySelectorAll('.navbar-burger');
    const dropdowns = document.querySelectorAll('.navbar-menu');

    if (menus.length && dropdowns.length) {
        for (let i = 0; i < menus.length; i++) {
            menus[i].addEventListener('click', function () {
                toggleMaxHeight(dropdowns);
                menus[i].classList.toggle('is-active');
            });
        }
    }
});
function toggleMaxHeight(dropdowns) {
    for (let j = 0; j < dropdowns.length; j++) {
        const dropdown = dropdowns[j];
        const isOpen = dropdown.classList.contains('is-active');
        // Toggle the 'is-active' class to trigger CSS transition
        dropdown.classList.toggle('is-active');

        // Use a delay to set max-height after the 'is-active' class is applied
        setTimeout(() => {
            if (isOpen) {
                dropdown.style.maxHeight = '0';
            } else {
                dropdown.style.maxHeight = '500px';
            }
        }, 10);
    }
}
