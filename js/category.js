const params =
new URLSearchParams(window.location.search);

const category =
params.get("name") || "Quran";

document.getElementById("categoryTitle")
.textContent = category;

const container =
document.getElementById("video-container");

async function loadCategory(){

container.innerHTML="<h2>Loading...</h2>";

const response=await fetch(

`${CONFIG.BASE_URL}/search?part=snippet&type=video&maxResults=20&q=${category}&key=${CONFIG.API_KEY}`

);

const data=await response.json();

showVideos(data.items);

}

function showVideos(videos){

container.innerHTML="";

videos.forEach(video=>{

container.innerHTML+=`

<div class="video-card"

onclick="watch('${video.id.videoId}')">

<img src="${video.snippet.thumbnails.high.url}">

<div class="video-info">

<h3>${video.snippet.title}</h3>

<p>${video.snippet.channelTitle}</p>

<span>

${new Date(video.snippet.publishTime)
.toLocaleDateString()}

</span>

</div>

</div>

`;

});

}

function watch(id){

location.href=
`watch.html?id=${id}`;

}

loadCategory();