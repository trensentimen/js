document.addEventListener('DOMContentLoaded', function() {
    const menus = document.querySelectorAll('.navbar-burger');
    const dropdowns = document.querySelectorAll('.navbar-menu');

    if (menus.length && dropdowns.length) {
        for (var i = 0; i < menus.length; i++) {
            menus[i].addEventListener('click', function() {
                for (var j = 0; j < dropdowns.length; j++) {
                    const dropdown = dropdowns[j];
                    dropdown.classList.toggle('is-active');

                    // Add a delay before removing the class to allow the transition to take effect
                    if (dropdown.classList.contains('is-active')) {
                        setTimeout(() => {
                            dropdown.style.maxHeight = '500px'; // You can adjust the max-height value
                        }, 10); // Adjust the delay value if needed
                    } else {
                        setTimeout(() => {
                            dropdown.style.maxHeight = '0';
                        }, 10); 
                    }
                }
            });
        }
    }
});

