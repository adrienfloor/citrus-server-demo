const fetch = require('node-fetch')
const base64 = require('base-64')
const { v4: uuidv4 } = require('uuid')
const Coaching = require('../models/coaching')

const {
    muxAccessTokenId,
    muxSecretKey
} = require('../config')

async function transferAssetToMux(awsUrl, coachingId) {
    try {
        const passthrough = uuidv4()
        const coaching = await Coaching.findOne({ _id: coachingId })
        coaching.passthrough = passthrough
        coaching.save()
        const upload = await fetch(`https://api.mux.com/video/v1/assets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(`${muxAccessTokenId}:${muxSecretKey}`)
            },
            body: JSON.stringify({
                "input": awsUrl,
                "playback_policy": [
                  "public"
                ],
                "passthrough": passthrough
            })
        })
        console.log('')
        console.log('')
        console.log(await upload.json())
        console.log('')
        console.log('')

        return
    } catch (e) {
        console.log('Error : ', e)
        return e
    }
}

module.exports.transferAssetToMux = transferAssetToMux