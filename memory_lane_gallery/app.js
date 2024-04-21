const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const mongoose = require('mongoose');
const GalleryItem = require('./models/galleryItem');
const app = express();
const port = 3000;
mongoose.connect('mongodb://localhost/simple_gallery', { useNewUrlParser: true, useUnifiedTopology: true });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.route('/')
  .get(async (req, res) => {
    const galleryItems = await GalleryItem.find();
    res.render('index', { galleryItems });
  })
  .post(upload.single('image'), async (req, res) => {
    try {
      const resizedImage = await sharp(req.file.buffer).resize({ width: 300, height: 200 }).toBuffer();
      const galleryItem = new GalleryItem({
        image: { data: resizedImage, contentType: req.file.mimetype },
      });
      await galleryItem.save();
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    await GalleryItem.findByIdAndDelete(itemId);
    const galleryItems = await GalleryItem.find();
    res.render('index', { galleryItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
