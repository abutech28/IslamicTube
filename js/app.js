// ===============================
// IslamicTube Pro
// app.js
// ===============================

// Elements
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.querySelector(".sidebar");
const darkBtn = document.getElementById("darkBtn");
const searchInput = document.getElementById("searchInput");

// -------------------------------
// Sidebar Toggle
// -------------------------------
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hide");
});

// -------------------------------
// Dark Mode
// -------------------------------

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkBtn.textContent = "☀️";
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        darkBtn.textContent="☀️";
    }else{
        localStorage.setItem("theme","light");
        darkBtn.textContent="🌙";
    }

});

// -------------------------------
// Search Local Cards
// -------------------------------
searchInput.addEventListener("keyup", ()=>{

    let keyword = searchInput.value.toLowerCase();

    let cards = document.querySelectorAll(".video-card");

    cards.forEach(card=>{

        let title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(keyword)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

});

searchBtn.addEventListener("click",()=>{

    const query = searchInput.value.trim();

    if(query){

        window.location.href =
        `search.html?q=${encodeURIComponent(query)}`;

    }

});


function openCategory(name){

location.href=
`category.html?name=${encodeURIComponent(name)}`;

}


function saveVideo(video){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let exists = favorites.find(item=>item.id.videoId===video.id.videoId);

if(exists){

alert("Already saved!");

return;

}

favorites.push(video);

localStorage.setItem("favorites",JSON.stringify(favorites));

alert("Saved successfully!");

}