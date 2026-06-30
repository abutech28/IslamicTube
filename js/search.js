const videoContainer = document.getElementById("video-container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

async function searchVideos(query){

    videoContainer.innerHTML="<h2>Loading...</h2>";

    const response = await fetch(

`${CONFIG.BASE_URL}/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(query)}&key=${CONFIG.API_KEY}`

    );

    const data = await response.json();

    displayVideos(data.items);

}

function displayVideos(videos){

    videoContainer.innerHTML="";

    videos.forEach(video=>{

        videoContainer.innerHTML += `

        <div class="video-card"
        onclick="watch('${video.id.videoId}')">

            <img src="${video.snippet.thumbnails.high.url}">

            <div class="video-info">

                <h3>${video.snippet.title}</h3>

                <p>${video.snippet.channelTitle}</p>

                <span>

                ${new Date(video.snippet.publishTime).toLocaleDateString()}

                </span>

            </div>

        </div>

        `;

    });

}

function watch(id){

    location.href=`watch.html?id=${id}`;

}

searchBtn.addEventListener("click",()=>{

    const query = searchInput.value.trim();

    if(query){

        searchVideos(query);

    }

});

searchInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

// Default search
const params = new URLSearchParams(window.location.search);

const query = params.get("q") || "Quran";

searchInput.value = query;

searchVideos(query);