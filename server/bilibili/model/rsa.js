const crypto = require('crypto')

function rsaEncrypt(key, text) {
    return crypto.publicEncrypt(
        {
            key: key,
            padding: 1,
        },
        Buffer.from(text)
    ).toString('base64')
}

module.exports = { rsaEncrypt }
