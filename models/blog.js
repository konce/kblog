var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kxj');

var Schema = mongoose.Schema,
    blogSchema = new Schema({
        bid; String,
        title: String,
        summary: String,
        content: String,
        tags: Array,
        date: {type: Date}
    }, {
        collection: 'blog'
    }),
    blogModel = mongoose.model('Blog', blogSchema);

function Blog (blog) {
    this.bid = blog.index;
    this.title = blog.title;
    this.summary = blog.summary;
    this.content = blog.content;
    this.tags = blog.tags.split(',');
    this.date = blog.date;
}

Blog.prototype.save = function (callback) {
    var blog = {
        title: this.title,
        summary: this.summary,
        content: this.content,
        tags: this.tags,
        bid: this.bid,
        date: this.date
    };
    var instance = new blogModel(blog);
    instance.save(function () {
        callback();
    })
};
