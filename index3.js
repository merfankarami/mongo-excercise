const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.error('Connection failed...'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    const courses = await Course
        .find( { isPublished: true })
        .or([
            { price: { $gte: 15 }},
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select('name author price');
        console.log(courses);
}
getCourses();