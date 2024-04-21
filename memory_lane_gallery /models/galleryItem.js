const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
    image: { data: Buffer, contentType: String },
});

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

module.exports = GalleryItem;
