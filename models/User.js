var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var validateEmail = function(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var UserSchema = new Schema({
    userName: { type: String, required: true, unique: true},
    familyName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [validateEmail, 'Please fill an address mail'] },
    password: { type: String, required: true}
});

UserSchema.methods.comparePassword = function (enteredPassword, callback) {
    if(enteredPassword = this.password)
        callback(null, true);
    else
        callback(null, false);
}

module.exports = mongoose.model('User', UserSchema);