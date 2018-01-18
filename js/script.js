let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;


const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

navigator.mediaDevices.getUserMedia({video:true, audio: false})
 .then(stream => {
   video.srcObject = stream
   video.play();
 })
 .catch(err => console.log(err))

 video.addEventListener('canplay', function(e) {
   if(!streaming) {
     height = video.videoHeight/(video.videoWidth/ width);
     video.setAttribute('width', width);
     video.setAttribute('height', height);
     canvas.setAttribute('width', width);
     canvas.setAttribute('width', height);

     streaming = true;
   }
 }, false);

 photoButton.addEventListener('click', (e) =>{
   takePicture()
   e.preventDefault();
 }, false);

 photoFilter.addEventListener('click', (e) => {
    filter = e.target.value;
    video.style.filter = filter;
 });

 clearButton.addEventListener('click', (e) => {
   photos.innerHTML = '';

   filter = 'none';
   video.style.filter = filter;
   photoFilter.selectedIndex = 0;
 })

 function takePicture(){
   const context = canvas.getContext('2d');
   canvas.width = width;
   canvas.height = height;

   context.drawImage(video, 0, 0, width, height);

   const imgUrl = canvas.toDataURL('image/png')
   console.log(imgUrl);

   const img = document.createElement('img');

   img.setAttribute('src', imgUrl);

   img.style.filter = filter;

   photos.appendChild(img);

 }
