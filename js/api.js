const videoContainer = document.getElementById("video-container");

async function loadVideos(search = "Islamic lectures") {

    videoContainer.innerHTML = "<h2>Loading videos...</h2>";

    try {

        const response = await fetch(
            `${CONFIG.BASE_URL}/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(search)}&key=${CONFIG.API_KEY}`
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        displayVideos(data.items);

    } catch (error) {

        videoContainer.innerHTML = `
            <div class="error">
                <h3>❌ Unable to load videos</h3>
                <p>${error.message}</p>
            </div>
        `;

        console.error(error);
    }
}

function displayVideos(videos) {

    videoContainer.innerHTML = "";

    videos.forEach(video => {

        videoContainer.innerHTML += `
           <div class="video-card">

    <img
        src="${video.snippet.thumbnails.high.url}"
        onclick="watchVideo('${video.id.videoId}')">

    <div class="video-info">

        <h3>${video.snippet.title}</h3>

        <p>${video.snippet.channelTitle}</p>

        <span>${new Date(video.snippet.publishTime).toLocaleDateString()}</span>

        <button class="save-btn"
        onclick='saveVideo(${JSON.stringify(video)})'>

            ❤️ Save

        </button>

    </div>

</div>

                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">

                <div class="video-info">

                    <h3>${video.snippet.title}</h3>

                    <p>${video.snippet.channelTitle}</p>

                    <span>${new Date(video.snippet.publishTime).toLocaleDateString()}</span>

                </div>

            </div>
        `;

    });

}

function watchVideo(id) {

    window.location.href = `watch.html?id=${id}`;

}

loadVideos();
