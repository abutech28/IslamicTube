const params = new URLSearchParams(window.location.search);

const videoId = params.get("id");

const player = document.getElementById("player");

player.src = `https://www.youtube.com/embed/${videoId}`;

loadRelated();

async function loadRelated(){

const response = await fetch(

`${CONFIG.BASE_URL}/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=10&key=${CONFIG.API_KEY}`

);

const data = await response.json();

const container = document.getElementById("relatedContainer");

data.items.forEach(video=>{

container.innerHTML += `

<div class="related-card"

onclick="location.href='watch.html?id=${video.id.videoId}'">

<img src="${video.snippet.thumbnails.medium.url}">

<div>

<h4>${video.snippet.title}</h4>

<p>${video.snippet.channelTitle}</p>

</div>

</div>

`;

});

}