
const api_key = '9d6cf409b6ebfa99d4b7d2eacbd1b63a'; // replace with your actual API key
const searchBtn = document.querySelector('#searchBtn')
const searchText = document.querySelector("#myHeader"); // replace #formId with the ID of your form element
const textInput = document.querySelector('#textInput'); // replace #textInput with the ID of your text input element
const numberOfImages = document.querySelector('#numberInput');
const valuesort = document.querySelector('#sort');
const sizeInput = document.querySelector('#size');
const imgContainer = document.querySelector('#img-container');
const warningMessage = document.querySelector('.warning');


let textValue = "";
let numberOfImagesValue = "";
let sortValue = "date-posted-asc";
let sizeValue = "w";


sizeInput.addEventListener('change', (e) => {
  sizeValue = e.target.value;
})

numberOfImages.addEventListener('change', (e) => {
  numberOfImagesValue = e.target.value;
})

textInput.addEventListener('keyup', (e) => {
  textValue = e.target.value;
})

valuesort.addEventListener('change', (e) => {
  sortValue = e.target.value;
})

function displayLoading() {
  anime({
    targets: '.loader',
    opacity: 1
  });
  anime({
    targets: '.loader .ele1',
    loop: true,
    opacity: 1,
    scale: [
      { value: '.1', duration: 1200, easing: 'easeOutSine' },
      { value: '1', duration: 1200, easing: 'easeInQuad' },
    ],
    translateY: [
      { value: '-45', duration: 1200, easing: 'easeOutSine' },
      { value: '0', duration: 1200, easing: 'easeInQuad' }
    ],
    delay: anime.stagger(300)
  });
}

function clearLoading() {
  anime({
    targets: '.loader',
    opacity: 0
  });
}

function setToDefault() {
  textValue = "";
  numberOfImagesValue = "";
  sortValue = "date-posted-asc";
  sizeValue = "w";

  textInput.value = "" 
  numberOfImages.value = "0";
}

function displayMess(mess) {
  warningMessage.classList.add('showMess');
  warningMessage.innerText = mess;

  setTimeout(() => {
    warningMessage.classList.remove('showMess');
  }, 3000)
}

function getImages(event) {
  event.preventDefault();
  console.log(textValue, numberOfImagesValue, sortValue, sizeValue);
  if (!textValue || !numberOfImagesValue || !sortValue || !sizeValue) {
    displayMess('Please fill all the fields!');
    setToDefault();
    return;
  }
  displayLoading()
  fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9d6cf409b6ebfa99d4b7d2eacbd1b63a&text=${textValue}&extras=url_${sizeValue}&sort=${sortValue}&per_page=${numberOfImagesValue}&format=json&nojsoncallback=1`)
    .then((res) => res.json())
    .then((data) => {
      let imagelist = data.photos.photo;
      imgContainer.innerHTML = "";

      console.log(imagelist)
      imagelist.map((item) => {
        let el = `
          <div>
            <img src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_${sizeValue}.jpg"   
            alt=${item.title}
            class="box-img" />
          </div>
       `;
        imgContainer.innerHTML += el;
        clearLoading()
      });
      setToDefault();
    }).catch(() => {
      displayMess("Something went wrong");
    });
}


searchBtn.addEventListener('click', getImages);
