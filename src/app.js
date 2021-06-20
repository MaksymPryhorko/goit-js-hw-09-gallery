const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

function modalIsOpen(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  lightBoxRef.classList.add('is-open');
  showBigPhoto(event);
  window.addEventListener('keydown', keyPressOnLightboxOverlay);
};

function modalIsClose() {
  lightBoxRef.classList.remove('is-open');
  lightBoxImageRef.setAttribute('src', '')
  window.removeEventListener('keydown', keyPressOnLightboxOverlay);
};

function clickOnLightboxOverlay(event) {
  // event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'DIV') return;
  modalIsClose();
};

function showBigPhoto(event) {
  const eventTargetSrc = event.target.dataset.source;
  lightBoxImageRef.setAttribute('src', eventTargetSrc)
};

function keyPressOnLightboxOverlay(event) {
  const eventKey = event.key;
  if (eventKey === 'Escape') modalIsClose();
  if (eventKey === 'ArrowLeft') previousPhotoGallery(event);
  if (eventKey === 'ArrowRight') nextPhotoGallery(event);
};

function nextPhotoGallery(event) {
  const currentPhoto = lightBoxImageRef.getAttribute('src');
  const galleryArray = galleryRef.childNodes;
  let nextIdx = 0;
  
  galleryArray.forEach((el, idx) => {
    const elementCurrentIteration = el.firstElementChild;
    const photoOfCurrentElementIteration = elementCurrentIteration.getAttribute('href');
    if (photoOfCurrentElementIteration === currentPhoto) {
      if (idx === galleryArray.length - 1) {
        nextIdx = 0;
        lightBoxImageRef.setAttribute('src', galleryArray[0].firstElementChild.getAttribute('href'))
      } else {
        nextIdx = idx + 1;
        const nextPhoto = galleryArray[nextIdx].firstElementChild.getAttribute('href');
        lightBoxImageRef.setAttribute('src', nextPhoto);
      };
    };
  });
};

function previousPhotoGallery(event) {
  const currentPhoto = lightBoxImageRef.getAttribute('src');
  const galleryArray = galleryRef.childNodes;
  let nextIdx = 0;
  
  galleryArray.forEach((el, idx) => {
    const elementCurrentIteration = el.firstElementChild;
    const photoOfCurrentElementIteration = elementCurrentIteration.getAttribute('href');
    if (photoOfCurrentElementIteration === currentPhoto) {
      if (idx === 0) {
        nextIdx = galleryArray.length - 1;
        lightBoxImageRef.setAttribute('src', galleryArray[galleryArray.length - 1].firstElementChild.getAttribute('href'))
      } else {
        nextIdx = idx - 1;
        const nextPhoto = galleryArray[nextIdx].firstElementChild.getAttribute('href');
        lightBoxImageRef.setAttribute('src', nextPhoto);
      };
    };
  });
};

const closeLightBoxBtnRef = document.querySelector('button[data-action="close-lightbox"]');
closeLightBoxBtnRef.addEventListener('click', modalIsClose);

const lightBoxRef = document.querySelector('.lightbox');
lightBoxRef.addEventListener('click', clickOnLightboxOverlay)

const lightBoxImageRef = document.querySelector('.lightbox__image');

const galleryRef = document.querySelector('.gallery');
galleryRef.addEventListener('click', modalIsOpen);

let galleryItemsString = '';
  
galleryItems.forEach(({preview, original, description}) => {
   galleryItemsString += `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
});

galleryRef.insertAdjacentHTML('afterbegin', galleryItemsString);
