const crypto = require('crypto')

const rsaEncrypt = (key, text) => crypto.publicEncrypt(
    {
        key: key,
        padding: 1,
    },
    Buffer.from(text)
).toString('base64')


module.exports = { rsaEncrypt }
