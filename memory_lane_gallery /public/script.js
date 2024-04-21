let slideIndex = 1;
let currentImageIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length > 0) {
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    currentImageIndex = slideIndex - 1;
  }

  checkForSlides();
}

function submitForm() {
  document.getElementById('uploadForm').submit();
}

function chooseImage() {
  document.getElementById('input-control').click();
}

function deleteImage() {
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length > 0) {

    fetch(`/delete/${slides[currentImageIndex].attributes[1].value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `index=${currentImageIndex}`,
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error('Error:', error);
      })


    slides[currentImageIndex].remove();
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    if (slides.length >= 1) {
      slides[0].style.display = "block";
      currentImageIndex = 0;
    }
  }

  checkForSlides()
  console.log("Slide Length: " + slides.length);
}

function checkForSlides() {
  let slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  if (slides.length == 0) {
    document.getElementById('edit').style.display = "none";
    document.getElementById('prev').style.display = "none";
    document.getElementById('next').style.display = "none";
  }
}


function shareOnInstagram() {
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) {
    return;
  }
  const currentSlide = document.querySelector('.mySlides.fade');
  const imageUrl = currentSlide.querySelector('img').src;
  const instagramURL = `https://www.instagram.com`;
  window.open(instagramURL, '_blank');
}
