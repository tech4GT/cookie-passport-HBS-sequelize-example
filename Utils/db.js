/**
 * Created by tech4Gt on 6/23/17.
 */
const models = require('./models');
const bcrypt = require('bcrypt');


module.exports = {

    createUser: function (newUser, done) {
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            newUser.password = hash;
            models.User.create(newUser).then(function (data) {
                done(data);
            }).catch(function (err) {
                if (err) throw err;
            });
        });
    },
    validatePassword: function (user, password, PassportDone, done) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) throw err;
            done(user, isMatch, PassportDone);
        });

    },
    findUserById : function (id,done) {
        models.User.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            done(null,data.dataValues);
        }).catch(function (err) {
            if(err) throw err;
        });
    }
}