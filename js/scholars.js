const scholarCards = document.querySelectorAll(".scholar-card");

scholarCards.forEach(card => {

    card.addEventListener("click", () => {

        const scholar = card.dataset.name;

        location.href =
        `search.html?q=${encodeURIComponent(scholar)}`;

    });

});