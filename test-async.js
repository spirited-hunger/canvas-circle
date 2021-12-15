const url = 'https://picsum.photos/200';

const loadMeSomeImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image ();
    img.onload = () => resolve(img); // onload function is called when the image is loaded
    img.onerror = () => reject();
    img.src = url; // as soon as an image has a source, the browser starts to be loading it.
  })
}

const start = () => {
  loadMeSomeImage(url).then(img => { // the argument of then() function is the argument of resolve() function in the Promise()
    console.log('the width of the image is ', img.width);
  })
  console.log('this line is read.')
}


start()