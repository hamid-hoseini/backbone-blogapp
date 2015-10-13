/**
 * Created by hamidhoseini on 10/12/15.
 */
var express = require('express');
var mongoose =  require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;
var BlogSchema = new Schema({
    author: String,
    title: String,
    url: String
});
mongoose.model('Blog',BlogSchema);
var Blog = mongoose.model('Blog');
/*var blog = new Blog({
    author: 'Hamid',
    title: 'Hamid\'s blog',
    url: 'www.hamidBlog.com'
});

blog.save();
 */
var app = express();
app.use(express.static(__dirname +  '/public'));
app.use(bodyParser.json());

//ROUTES
app.get('/api/blogs', function (req, res) {
   Blog.find(function (err , docs) {
       docs.forEach(function (item) {
            console.log('receive a GET request for id:'+ item._id);
       });
       res.send(docs);
   }) 
});
app.post('/api/blogs', function (req, res) {
    console.log('Received data by POST request');
    for(var key in req.body){
        console.log(key+': '+ req.body[key]);
    }
    var blog =  new Blog(req.body);
    blog.save(function (err, docs) {
        res.send(docs);
    })

});
app.delete('/api/blogs/:id', function (req, res) {
    console.log('Received a delete request by _id: '+ req.params.id );
    Blog.remove({_id: req.params.id}, function (err) {
        res.send({_id: req.params.id});
    });
});
app.put('/api/blogs/:id', function (req, res) {
    console.log('Received a update request by _id: '+ req.params.id );
    Blog.update({_id: req.params.id},req.body, function (err) {
        res.send({_id: req.params.id});
    });
});

var port = 3001;
app.listen(port);
console.log('server on '+ port );