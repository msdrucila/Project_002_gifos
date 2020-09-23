// Al hacer click en "comenzar", se reemplazará la vista actual por la que figur en el link captura_3_precaptura
const windowImg = document.getElementById('window-img');
const textToReplace = document.querySelector('#top-of-box');
const closeImg = document.createElement('img');
const divToReplace = document.querySelector('.text_inside_box');
const videoWrapper = document.createElement('div');
const video = document.createElement("video");
const capturarBtnWrapper = document.createElement('div');
const capturarBtnSvg = document.createElement('img');
const imgWrapper = document.createElement('span');
const capturarBtn = document.createElement('button');
const gifBlock = document.createElement('img');
//const video = document.getElementById("video");
const stopBtn = document.getElementById("btnStop");
const btnImg = document.getElementById("btnImg");
//const btnGifCaptured = document.getElementById("btnGifCaptured");
const uploadURL = "https://upload.giphy.com/v1/gifs?api_key=iBYck0zigjzcwVSaEutjDQ2BQAm7po2I";
const cancel = document.getElementById("cancel");
const topUpload = document.getElementById("top_upload");
let arrayMyGIfs = [];
const gifsResults = document.getElementById("mygifos_result");
let urlGif = "";
let blob = null;
const ListoBtn = document.createElement('button');
const recordingSvgWrapper = document.createElement('span');
const recordingSvg = document.createElement('img');
const counter = document.createElement('span');
const hoursSpan = document.createElement('span');
const minutesSpan = document.createElement('span');
const secSpan = document.createElement('span');

const SubirGuifoBtn = document.createElement('button');
const repetirCapturaBtn = document.createElement('button');

const cancelarBtn = document.createElement('button');
const uploadWindowWrapper = document.createElement('div');
const greyBox = document.getElementById('grey-box');
const uploadingText = document.createElement('div');
const globeImg = document.createElement('img');
const uploadingImg = document.createElement('img');
const uploadingSecondText = document.createElement('div');
const img = document.createElement('img');



document.getElementById('go-to-video').addEventListener('click', () => {
  windowImg.setAttribute('class', 'hidden');
  textToReplace.innerHTML = 'Un Chequeo Antes de Empezar';
  closeImg.setAttribute('class', 'close_Img');
  closeImg.setAttribute('id', 'close-Img');
  closeImg.setAttribute('src', './images/close.svg');
  closeImg.setAttribute('alt', 'close window img');
  textToReplace.appendChild(closeImg);
  videoWrapper.setAttribute('class', 'video_wrapper');
  videoWrapper.setAttribute('id', 'video-wrapper');
  video.setAttribute('class', 'video_style');
  video.setAttribute('id', 'video');
  gifBlock.setAttribute('id', 'gifBlock');
  gifBlock.setAttribute('alt', 'your gif');
  gifBlock.setAttribute('src', '');
  capturarBtnWrapper.setAttribute('class', 'capturar_btn_wrapper');
  capturarBtnWrapper.setAttribute('id', 'capturar-btn-wrapper');
  imgWrapper.setAttribute('class', 'img_wrapper');
  capturarBtnSvg.setAttribute('class', 'capturar_btn_svg');
  capturarBtnSvg.setAttribute('id', 'capturar-btn-svg');
  capturarBtnSvg.setAttribute('src', './images/camera.svg');
  capturarBtn.setAttribute('class', 'capturar_btn');
  capturarBtn.setAttribute('id', 'capturarBtn');
  capturarBtn.innerText = 'Capturar';
  videoWrapper.appendChild(video);
  videoWrapper.appendChild(capturarBtnWrapper);
  capturarBtnWrapper.appendChild(imgWrapper);
  capturarBtnWrapper.appendChild(capturarBtn);
  imgWrapper.appendChild(capturarBtnSvg);
  divToReplace.replaceWith(videoWrapper);
  document.getElementById('video').controls = true;
})
//Obtener video
document.getElementById('go-to-video').addEventListener("click", starting);


capturarBtn.addEventListener('click', async () => {
  capturarBtn.replaceWith(ListoBtn);
  ListoBtn.setAttribute('class', 'listo_btn');
  ListoBtn.setAttribute('id', 'listo-btn');
  ListoBtn.innerText = 'Listo';
  textToReplace.innerHTML = 'Capturando Tu Guifo';
  closeImg.setAttribute('class', 'close_Img_2');
  closeImg.setAttribute('id', 'close-Img');
  closeImg.setAttribute('src', './images/close.svg');
  closeImg.setAttribute('alt', 'close window img');
  imgWrapper.className = 'hidden';
  recordingSvgWrapper.setAttribute('class', 'recording_svg_wrapper');
  recordingSvg.setAttribute('class', 'recording_svg');
  recordingSvg.setAttribute('src', '')
  textToReplace.appendChild(closeImg);
  counter.setAttribute('class', 'counter');
  counter.setAttribute('id', 'counter');
  hoursSpan.setAttribute('class', 'hours_span');
  hoursSpan.setAttribute('id', 'hours-span');
  minutesSpan.setAttribute('class', 'min_span');
  minutesSpan.setAttribute('id', 'min-span');
  secSpan.setAttribute('class', 'sec_span');
  secSpan.setAttribute('id', 'sec-span');
  counter.appendChild(hoursSpan);
  counter.appendChild(minutesSpan);
  counter.appendChild(secSpan);
  capturarBtnWrapper.appendChild(counter);

  function timer() {
    let contador_s = 0;
    let contador_m = 0;
    let contador_h = 0;
    let s = document.getElementById('sec-span');
    let m = document.getElementById('min-span');
    let h = document.getElementById('hours-span');
    window.setInterval(function () {
      if (contador_s == 60) {
        contador_s = 0;
        contador_m++;
        if (contador_m == 60) {
          contador_m = 0;
          contador_h++;
        }
      }
      if (contador_s < 10) {
        s.innerHTML = '0' + contador_s;
        contador_s++;
      } else {
        s.innerHTML = contador_s;
        contador_s++;
      }
      if (contador_m < 10) {
        m.innerText = `0${contador_m}` + ':';
      } else {
        m.innerText = contador_m + ':';
      }
      if (contador_h < 10) {
        h.innerText = '0' + contador_h + ':';
      } else {
        h.innerText = contador_h + ':';
      }
    }, 1000)
  };
  timer();

  console.log('capturando');
  let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  recordGif(stream);
});

async function getMyGifs() {
  const gifs = localStorage.getItem('arrayMyGifs');
  const url = `https://api.giphy.com/v1/gifs?apiKey=${apiKey}&ids=${gifs}`;
  const resp = await fetch(url);
  const datos = await resp.json();
  console.log(datos);
  datos.data.forEach(gif => {
    const eachGif = document.createElement("div");
    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    gifsResults.appendChild(eachGif);
    eachGif.appendChild(img);
  })
}

getMyGifs(gifsResults);

function starting() {
  getStream()
}

function getStream() {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: 434,
      width: 844,
    }
  })
    .then(function (camera) {
      video.srcObject = camera;
      video.play()
    })
};


function recordGif(stream) {
  recorder = new RecordRTCPromisesHandler(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log('Recording started')
    },
  });
  recorder.startRecording();
}

ListoBtn.addEventListener('click', () => {
  img.src="";
  img.setAttribute('id', 'gifBlock');
  videoWrapper.appendChild(img);
  ListoBtn.replaceWith(SubirGuifoBtn);
  SubirGuifoBtn.setAttribute('class', 'subirguifo_btn');
  SubirGuifoBtn.setAttribute('id', 'subirguifo-btn');
  SubirGuifoBtn.innerText = 'Subir Guifo';
  textToReplace.innerHTML = 'Vista Previa';
  closeImg.setAttribute('class', 'close_Img_3');
  closeImg.setAttribute('id', 'close-Img');
  closeImg.setAttribute('src', './images/close.svg');
  closeImg.setAttribute('alt', 'close window img');
  textToReplace.appendChild(closeImg);
  imgWrapper.className = 'hidden';
  capturarBtnWrapper.appendChild(repetirCapturaBtn);
  capturarBtnWrapper.className="subir_gif_btn_wrapper";
  repetirCapturaBtn.setAttribute('class', 'repetir_captura_btn');
  repetirCapturaBtn.setAttribute('id', 'repetir-captura-btn');
  repetirCapturaBtn.innerHTML = 'Repetir Captura';
})

ListoBtn.addEventListener("click", stopRecord);

async function stopRecord() {
  await recorder.stopRecording();

  blob = await recorder.getBlob();
  urlGif = URL.createObjectURL(blob);

  video.style.display = "none";
  img.src = urlGif
  img.setAttribute('class', 'gif_block');

  const form = new FormData();
  form.append("file", blob, "myGif.gif");
  console.log(form.get("file"));
};

function repeatAll() {
  getStream();
}

repetirCapturaBtn.addEventListener("click", repeatAll);
const saveMyGifs = (gifID) => {
  if (localStorage.getItem('arrayMyGifs') == null) {
    arrayMyGIfs.push(gifID);
  } else {
    arrayMyGIfs = localStorage.getItem('arrayMyGifs').split(',');
    arrayMyGIfs.push(gifID);
  }
  localStorage.setItem('arrayMyGifs', arrayMyGIfs.join());
};

SubirGuifoBtn.addEventListener('click', () => {
  greyBox.appendChild(cancelarBtn);
  cancelarBtn.setAttribute('class', 'cancelar_subida_btn');
  cancelarBtn.setAttribute('id', 'cancelar-btn');
  cancelarBtn.innerHTML = 'Cancelar';
  textToReplace.innerHTML = 'Subiendo tu guifo';
  closeImg.setAttribute('class', 'close_Img_4');
  closeImg.setAttribute('id', 'close-Img');
  closeImg.setAttribute('src', './images/close.svg');
  closeImg.setAttribute('alt', 'close window img');
  textToReplace.appendChild(closeImg);
  repetirCapturaBtn.className = 'hidden';
  counter.className = 'hidden';
  video.className = 'hidden';
  SubirGuifoBtn.className = 'hidden';
  uploadingText.setAttribute('class', 'uploading_text');
  uploadingText.setAttribute('id', 'uploading-text');
  uploadingText.innerHTML = 'Estamos subiendo tu guifo...'
  globeImg.setAttribute('class', 'globe_img');
  globeImg.setAttribute('id', 'globe-img');
  globeImg.setAttribute('src', './images/globe_img.png');
  uploadingImg.setAttribute('class', 'uploading_img');
  uploadingImg.setAttribute('id', 'uploading-img');
  uploadingImg.setAttribute('src', './images/recording.jpg');
  uploadingSecondText.setAttribute('class', 'uploading_second_text');
  uploadingSecondText.setAttribute('id', 'uploading-second-text');
  uploadingSecondText.innerHTML = 'Tiempo restante: 38 años algunos minutos';
  videoWrapper.appendChild(globeImg);
  videoWrapper.appendChild(uploadingText);
  videoWrapper.appendChild(uploadingImg);
  videoWrapper.appendChild(uploadingSecondText);
  img.className = 'hidden';
})

const previewWrapper = document.createElement('div');
const preview = document.createElement('img');
const textoExito = document.createElement('div');
const btnCopiarEnlace = document.createElement('button');
const btnDescargarGif = document.createElement('button');


SubirGuifoBtn.addEventListener("click", () => {
  const formData = new FormData();
  formData.append('file', blob, 'myGif.gif');
  console.log(formData.get('file'))
  const xhr = new XMLHttpRequest();
  xhr.open('POST', uploadURL, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const gifObject = JSON.parse(xhr.response);
      saveMyGifs(gifObject.data.id);
      getMyGifs(gifsResults);
      document.getElementById("yourGifo").src = urlGif;
      globeImg.className = 'hidden';
      uploadingImg.className = 'hidden';
      uploadingText.className = 'hidden';
      uploadingSecondText.className = 'hidden';

      textToReplace.innerHTML = 'Guifo Subido Con Éxito';

      previewWrapper.setAttribute('class', 'preview_wrapper');
      previewWrapper.setAttribute('id', 'preview-wrapper');

      preview.setAttribute('class', 'preview');
      preview.setAttribute('id', 'preview');
      preview.src=urlGif;

      textoExito.setAttribute('class', 'texto_exito');
      textoExito.setAttribute('id', 'texto-exito');
      textoExito.innerHTML = 'Guifo creado con éxito';

      btnCopiarEnlace.setAttribute('class', 'btn_copiar_enlace');
      btnCopiarEnlace.setAttribute('id', 'btn-copiar-enlace');
      btnCopiarEnlace.innerText = 'Copiar Enlace Guifo';

      btnDescargarGif.setAttribute('class', 'btn_descargar');
      btnDescargarGif.setAttribute('id', 'btn-descargar');
      btnDescargarGif.innerText = 'Descargar Guifo';
      videoWrapper.className="video_wrapper_2";

      videoWrapper.appendChild(previewWrapper);
      previewWrapper.appendChild(preview);
      previewWrapper.appendChild(textoExito);
      previewWrapper.appendChild(btnCopiarEnlace);
      previewWrapper.appendChild(btnDescargarGif);
      cancelarBtn.className="btn_cancelar_final";
    }
  }
  try {
    xhr.send(formData);
  } catch (e) {
    alert('Error al enviar el gif:' + e);
  }
});

cancelarBtn.addEventListener("click", repeatAll);
function copyToClipboard(text) {
  const hiddentextarea = document.createElement('textarea');
  document.body.appendChild(hiddentextarea);
  hiddentextarea.value = text;
  hiddentextarea.select();
  document.execCommand('copy');
  document.body.removeChild(hiddentextarea);
};
document.getElementById("copy").addEventListener("click", () => {
  try {
    copyToClipboard(urlGif);
    alert('Enlace copiado con éxito!');
  } catch (e) {
    alert('Error al copiar el enlace');
  }
});

const boxWrapper = document.getElementById('box-wrapper');
closeImg.addEventListener('click', () => {
  boxWrapper.className = 'hidden';
})
cancelarBtn.addEventListener('click', () => {
  boxWrapper.className = 'hidden';
})
const cancelarBtn1 = document.getElementById('cancelar-btn-1');
cancelarBtn1.addEventListener('click', () => {
  boxWrapper.className = 'hidden';
})

btnCopiarEnlace.addEventListener("click",()=>{
  try {
    copyToClipboard(urlGif);
    alert('Enlace copiado con éxito!');
  } catch (e) {
    alert('Error al copiar el enlace');
  }
});
btnDescargarGif.addEventListener("click",()=>{
  invokeSaveAsDialog(blob);
})
function scrollToElement(name) {
  const elementPosition = document.querySelector(name).getBoundingClientRect();
}