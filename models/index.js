
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
    console.log('Mongoose Default Connection Error : ' + err);
});

mongoose.set('useFindAndModify', false);

module.exports = mongoose