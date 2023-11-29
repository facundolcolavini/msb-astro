document.addEventListener('astro:page-load', () => {
     // Toggle the side navigation
     const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-solid-bg"]');
     const navbarCollapse = document.querySelector('#navbar-solid-bg');
     navbarToggle.addEventListener('click', () => {
         navbarCollapse.classList.toggle('hidden');
         navbarCollapse.classList.toggle('block');
     });
});