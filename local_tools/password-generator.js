const bcrypt = require('bcryptjs')

const password = 'Passw0rd'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        console.log('This is the encrypted new hash : ', hash)
        return hash
    })
})