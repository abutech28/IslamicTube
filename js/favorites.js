const container = document.getElementById("favoriteContainer");

function loadFavorites(){

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    container.innerHTML = "";

    if(favorites.length === 0){

        container.innerHTML = `
            <h2>No favorite videos yet ❤️</h2>
        `;

        return;
    }

    favorites.forEach(video=>{

        container.innerHTML += `

        <div class="video-card">

            <img
            src="${video.snippet.thumbnails.high.url}"
            onclick="watchVideo('${video.id.videoId}')">

            <div class="video-info">

                <h3>${video.snippet.title}</h3>

                <p>${video.snippet.channelTitle}</p>

                <span>

                ${new Date(video.snippet.publishTime).toLocaleDateString()}

                </span>

                <button
                class="remove-btn"
                onclick="removeVideo('${video.id.videoId}')">

                🗑 Remove

                </button>

            </div>

        </div>

        `;

    });

}

function watchVideo(id){

    location.href=`watch.html?id=${id}`;

}

function removeVideo(id){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    favorites =
    favorites.filter(video=>video.id.videoId!==id);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();

}

loadFavorites();