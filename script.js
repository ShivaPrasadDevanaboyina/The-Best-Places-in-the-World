document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    setTimeout(function() {
        document.querySelector('.loader-wrapper').classList.add('fade-out');
        setTimeout(function() {
            document.querySelector('.loader-wrapper').style.display = 'none';
        }, 500);
    }, 2000);

    // Dark mode toggle
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchSuggestions = document.getElementById('search-suggestions');

    const trendingPlaces = [
        { name: "Eiffel Tower, France", type: "Landmark" },
        { name: "Great Barrier Reef, Australia", type: "Natural Wonder" },
        { name: "Machu Picchu, Peru", type: "Historical Site" },
        { name: "Santorini, Greece", type: "Island" },
        { name: "Grand Canyon, USA", type: "Natural Wonder" },
        { name: "Great Wall of China", type: "Historical Site" },
        { name: "Venice, Italy", type: "City" },
        { name: "Serengeti National Park, Tanzania", type: "Wildlife" }
    ];

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchSuggestions.innerHTML = '';

        if (searchTerm.length > 0) {
            const filteredPlaces = trendingPlaces
                .filter(place => place.name.toLowerCase().includes(searchTerm))
                .slice(0, 5);

            if (filteredPlaces.length > 0) {
                filteredPlaces.forEach(place => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('search-suggestion-item');
                    suggestionItem.innerHTML = `
                        <strong>${place.name}</strong>
                        <span>${place.type}</span>
                    `;
                    suggestionItem.addEventListener('click', function() {
                        searchInput.value = place.name;
                        searchSuggestions.style.display = 'none';
                        performSearch(place.name);
                    });
                    searchSuggestions.appendChild(suggestionItem);
                });
                searchSuggestions.style.display = 'block';
            } else {
                const noResults = document.createElement('div');
                noResults.classList.add('search-suggestion-item');
                noResults.textContent = 'No results found';
                searchSuggestions.appendChild(noResults);
                searchSuggestions.style.display = 'block';
            }
        } else {
            searchSuggestions.style.display = 'none';
        }
    });

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });

    function performSearch(term) {
        // Create pin animation
        const pin = document.createElement('div');
        pin.classList.add('search-pin');
        pin.innerHTML = '<i class="fas fa-map-pin"></i>';
        pin.style.left = (searchBtn.getBoundingClientRect().left + 10) + 'px';
        pin.style.top = (searchBtn.getBoundingClientRect().top - 30) + 'px';
        document.body.appendChild(pin);

        setTimeout(() => {
            pin.remove();
        }, 1000);

        // Open Google Maps for the term
        setTimeout(() => {
            const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(term)}`;
            window.open(mapsUrl, '_blank');
        }, 800);
    }

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });

    // Trending carousel
    const carouselContainer = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    const trendingDestinations = [
    {
        name: "Bali, Indonesia",
        image: "Images/bali.jpg",
        description: "Known for its volcanic mountains, beaches and coral reefs."
    },
    {
        name: "Paris, France",
        image: "Images/paris.jpg",
        description: "The City of Light, famous for art, gastronomy and culture."
    },
    {
        name: "Kyoto, Japan",
        image: "Images/kyoto.jpg",
        description: "Classical temples, gardens, palaces and wooden houses."
    },
    {
        name: "New York City, USA",
        image: "Images/newyork.jpg",
        description: "Times Square, Central Park, museums and skyscrapers."
    },
    {
        name: "Cape Town, South Africa",
        image: "Images/capetown.jpg",
        description: "Table Mountain, beaches, wildlife and vineyards."
    }
];

trendingDestinations.forEach((destination, index) => {
    const slide = document.createElement('div');
    slide.classList.add('trending-card');
    if (index === 0) slide.classList.add('active');
    slide.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}">
        <h3>${destination.name}</h3>
        <p>${destination.description}</p>
    `;
    document.getElementById('carousel-container').appendChild(slide);
});
        carouselContainer.appendChild(slide);

        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    const slides = document.querySelectorAll('.trending-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId;

    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
        resetInterval();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }

    function startInterval() {
        intervalId = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
    });

    startInterval();

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    carouselContainer.addEventListener('mouseleave', startInterval);

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
