const User = require('../../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Generate hash password then create new user(s) then populate DB

const passwordTom = 'Tom@thecitrusapp.com123'
let tomEncryptedPassword
const passwordSerena = 'Serena@thecitrusapp.com123'
let serenaEncryptedPassword

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(passwordTom, salt, (err, hash) => {
        if (err) throw err;
        console.log("This is Tom's encrypted new hash : ", hash)
        tomEncryptedPassword = hash

        bcrypt.hash(passwordSerena, salt, (err, hash) => {
            if (err) throw err;
            console.log("This is Serena's encrypted new hash : ", hash)
            serenaEncryptedPassword = hash

            // Heroku dev database
            const databaseUrl = require('../../config').mongoUri
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                // useCreateIndex: true,
                useUnifiedTopology: true
            })

            const users = [
                // tom@thecitrusapp.com
                new User(
                    {
                        "id": "610df87a5fdd593404571ece",
                        "firstName": "Tom",
                        "lastName": "Citrus",
                        "isVerified": true,
                        "hasSetUpZone": false,
                        "avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1649926585/VonageApp/casampnxhbyu7ssjq7d2.jpg",
                        "sports": [],
                        "bio": "Salut c'est Tom, personal trainer et passionné de sport. Suivez-moi pour découvrir tous mes entraînements !",
                        "coachingLanguagePreference": [],
                        "distanceMetricPreference": "kilometersAndKilos",
                        "weightMetricPreference": "kilometersAndKilos",
                        "basedOnLocationPreference": false,
                        "activityReminderFrequency": 30,
                        "followers": [],
                        "following": [],
                        "myReplays": [
                            { "_id" : "620137b12127ced0205284ca", "title" : "full body hiit", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "coachRating" : null, "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "sport" : "circuitTraining", "duration" : 30, "level" : "allLevel", "equipment" : [  ], "startingDate" : "2022-02-07T15:16:01.053+0000", "startingTime" : 4, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1644246916/VonageApp/lq39bifcs8byyqymbcjv.jpg", "focus" : [ "cardio", "lowerBody", "upperBody" ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/lKrWajDujWchUkj2zg7zDP00K6u9QKD00xVnH0035ffs74.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "951ac1a5-fb03-48c8-9713-0c9bd32ec16b", "ratio" : "portrait", "price" : 0.99, "coachUserName_fuzzy" : [ "en", "ie", "ri", "dr", "ad", "ien", "rie", "dri", "adr", "rien", "drie", "adri", "drien", "adrie", "adrien", "or", "oo", "lo", "fl", "oor", "loo", "flo", "loor", "floo", "floor", "adrien floor" ], "sport_fuzzy" : [ "ng", "in", "ni", "ai", "ra", "tr", "tt", "it", "ui", "cu", "rc", "ir", "ci", "ing", "nin", "ini", "ain", "rai", "tra", "ttr", "itt", "uit", "cui", "rcu", "irc", "cir", "ning", "inin", "aini", "rain", "trai", "ttra", "ittr", "uitt", "cuit", "rcui", "ircu", "circ", "ining", "ainin", "raini", "train", "ttrai", "ittra", "uittr", "cuitt", "rcuit", "ircui", "circu", "aining", "rainin", "traini", "ttrain", "ittrai", "uittra", "cuittr", "rcuitt", "ircuit", "circui", "raining", "trainin", "ttraini", "ittrain", "uittrai", "cuittra", "rcuittr", "ircuitt", "circuit", "training", "ttrainin", "ittraini", "uittrain", "cuittrai", "rcuittra", "ircuittr", "circuitt", "ttraining", "ittrainin", "uittraini", "cuittrain", "rcuittrai", "ircuittra", "circuittr", "ittraining", "uittrainin", "cuittraini", "rcuittrain", "ircuittrai", "circuittra", "uittraining", "cuittrainin", "rcuittraini", "ircuittrain", "circuittrai", "cuittraining", "rcuittrainin", "ircuittraini", "circuittrain", "rcuittraining", "ircuittrainin", "circuittraini", "ircuittraining", "circuittrainin", "circuittraining" ], "title_fuzzy" : [ "ll", "ul", "fu", "ull", "ful", "full", "dy", "od", "bo", "ody", "bod", "body", "it", "ii", "hi", "iit", "hii", "hiit", "full body hiit" ], "__v" : 0 },
                            { "_id" : "62054207151ad49522f602ad", "title" : "pilates 30'", "coachFirstName" : "estérelle", "coachLastName" : "martin", "coachUserName" : "estérelle", "coachId" : "61d9a9da941a270004d289a7", "coachRating" : 5, "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "sport" : "pilates", "duration" : 29, "level" : "allLevel", "equipment" : [ "yogaMat" ], "startingDate" : "2022-02-10T16:49:11.090+0000", "startingTime" : 5, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1644511606/VonageApp/wleit2f1rtsjqdekwypn.jpg", "focus" : [ "backFocus", "upperBody" ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/E3tefJo008Jajt85dc3dfZWXwjTA52kHu8U8jPtoGz3o.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "993d2f72-5ef4-4484-ad88-6856017b5e76", "ratio" : "portrait", "price" : 0.99, "coachUserName_fuzzy" : [ "le", "ll", "el", "re", "er", "te", "st", "es", "lle", "ell", "rel", "ere", "ter", "ste", "est", "elle", "rell", "erel", "tere", "ster", "este", "relle", "erell", "terel", "stere", "ester", "erelle", "terell", "sterel", "estere", "terelle", "sterell", "esterel", "sterelle", "esterell", "esterelle" ], "sport_fuzzy" : [ "es", "te", "at", "la", "il", "pi", "tes", "ate", "lat", "ila", "pil", "ates", "late", "ilat", "pila", "lates", "ilate", "pilat", "ilates", "pilate", "pilates" ], "title_fuzzy" : [ "es", "te", "at", "la", "il", "pi", "tes", "ate", "lat", "ila", "pil", "ates", "late", "ilat", "pila", "lates", "ilate", "pilat", "ilates", "pilate", "pilates", "0'", "30", "30'", "pilates 30'" ], "__v" : 0 },
                            { "_id" : "6255934bc2f532b058f4f0ca", "title" : "aya nakamura - pookie", "coachFirstName" : "kyf", "coachLastName" : "ekamé", "coachUserName" : "kyf ekamé", "coachId" : "62558da1c2f532b058f4f0b1", "coachRating" : 5, "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "sport" : "dance", "duration" : 23, "level" : "allLevel", "equipment" : [], "startingDate" : "2022-02-10T16:49:11.090+0000", "startingTime" : 5, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1649766478/VonageApp/lmq2gevp2ubgys0669pt.jpg", "focus" : [], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/zOaziVttt7UUnwo8TwNN1E8FOHksMfafOLgnCpG00QdM.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "1c774216-ef5c-4d86-82da-32901ba03a92", "ratio" : "portrait", "price" : 0.99, "coachUserName_fuzzy" : [], "sport_fuzzy" : [], "title_fuzzy" : [], "__v" : 0 }
                        ],
                        "numberOfActivities": 0,
                        "totalLengthOfActivities": 0,
                        "numberOfDailyActivitiesInARow": 0,
                        "averageFeeling": 5,
                        "coachRating": null,
                        "numberOfCoachings": 0,
                        "totalLengthOfCoachings": 0,
                        "averageLengthOfCoaching": 0,
                        "coachingsTotalViewers": 0,
                        "coachingsTotalViews": 0,
                        "agreedTermsAndConditions": true,
                        "automaticTopUp": false,
                        "subscription": null,
                        "billingDate": null,
                        "isCoach": true,
                        "currentGains": 0,
                        "lifeTimeGains": 0,
                        "companyName": "",
                        "companyType": "",
                        "companyNumber": "",
                        "companyIban": "",
                        "companyAddress": { "addressLine": "", "zipCode": "", "city": "", "country": "" },
                        "companyLegalStatus": "",
                        "isCompanySubjectToTax": null,
                        "cashOutState": 0,
                        "countryOfResidence": "",
                        "nationality": "",
                        "userName_fuzzy": ["to", "tom", "om", "tom c", "tom c", "tom ci", "tom cit", "tom citr", "tom citru", "tom citrus", "citrus", "tru", "ci", "cit", "citr", "citru", "tom tru", "tom ci", "tom cit", "tom citr", "tom citru"],
                        "firstName_fuzzy": ["tom", "to", "om"],
                        "lastName_fuzzy": ["citrus", "ci", "cit", "citr", "citru"],
                        "userName": "Tom Citrus",
                        "email": "tom@thecitrusapp.com",
                        "password": tomEncryptedPassword,
                        "__v": 0
                    }
                ),
                // serena@thecitrusapp.com
                new User(
                    {
                        "id": "610df87a5fee593404571ece",
                        "firstName": "Serena",
                        "lastName": "Citrus",
                        "isVerified": true,
                        "hasSetUpZone": false,
                        "avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1649943862/VonageApp/sqndq000xflc1jwvroye.jpg",
                        "sports": [],
                        "bio": "Salut c'est Serena, personal trainer et passionnée de sport. Suivez-moi pour découvrir tous mes entraînements !",
                        "coachingLanguagePreference": [],
                        "distanceMetricPreference": "kilometersAndKilos",
                        "weightMetricPreference": "kilometersAndKilos",
                        "basedOnLocationPreference": false,
                        "activityReminderFrequency": 30,
                        "followers": [],
                        "following": [],
                        "myReplays": [
                            { "_id" : "620137b12127ced0205284ca", "title" : "full body hiit", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "coachRating" : null, "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "sport" : "circuitTraining", "duration" : 30, "level" : "allLevel", "equipment" : [  ], "startingDate" : "2022-02-07T15:16:01.053+0000", "startingTime" : 4, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1644246916/VonageApp/lq39bifcs8byyqymbcjv.jpg", "focus" : [ "cardio", "lowerBody", "upperBody" ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/lKrWajDujWchUkj2zg7zDP00K6u9QKD00xVnH0035ffs74.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "951ac1a5-fb03-48c8-9713-0c9bd32ec16b", "ratio" : "portrait", "price" : 0.99, "coachUserName_fuzzy" : [ "en", "ie", "ri", "dr", "ad", "ien", "rie", "dri", "adr", "rien", "drie", "adri", "drien", "adrie", "adrien", "or", "oo", "lo", "fl", "oor", "loo", "flo", "loor", "floo", "floor", "adrien floor" ], "sport_fuzzy" : [ "ng", "in", "ni", "ai", "ra", "tr", "tt", "it", "ui", "cu", "rc", "ir", "ci", "ing", "nin", "ini", "ain", "rai", "tra", "ttr", "itt", "uit", "cui", "rcu", "irc", "cir", "ning", "inin", "aini", "rain", "trai", "ttra", "ittr", "uitt", "cuit", "rcui", "ircu", "circ", "ining", "ainin", "raini", "train", "ttrai", "ittra", "uittr", "cuitt", "rcuit", "ircui", "circu", "aining", "rainin", "traini", "ttrain", "ittrai", "uittra", "cuittr", "rcuitt", "ircuit", "circui", "raining", "trainin", "ttraini", "ittrain", "uittrai", "cuittra", "rcuittr", "ircuitt", "circuit", "training", "ttrainin", "ittraini", "uittrain", "cuittrai", "rcuittra", "ircuittr", "circuitt", "ttraining", "ittrainin", "uittraini", "cuittrain", "rcuittrai", "ircuittra", "circuittr", "ittraining", "uittrainin", "cuittraini", "rcuittrain", "ircuittrai", "circuittra", "uittraining", "cuittrainin", "rcuittraini", "ircuittrain", "circuittrai", "cuittraining", "rcuittrainin", "ircuittraini", "circuittrain", "rcuittraining", "ircuittrainin", "circuittraini", "ircuittraining", "circuittrainin", "circuittraining" ], "title_fuzzy" : [ "ll", "ul", "fu", "ull", "ful", "full", "dy", "od", "bo", "ody", "bod", "body", "it", "ii", "hi", "iit", "hii", "hiit", "full body hiit" ], "__v" : 0 },
                            { "_id" : "62054207151ad49522f602ad", "title" : "pilates 30'", "coachFirstName" : "estérelle", "coachLastName" : "martin", "coachUserName" : "estérelle", "coachId" : "61d9a9da941a270004d289a7", "coachRating" : 5, "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "sport" : "pilates", "duration" : 29, "level" : "allLevel", "equipment" : [ "yogaMat" ], "startingDate" : "2022-02-10T16:49:11.090+0000", "startingTime" : 5, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1644511606/VonageApp/wleit2f1rtsjqdekwypn.jpg", "focus" : [ "backFocus", "upperBody" ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/E3tefJo008Jajt85dc3dfZWXwjTA52kHu8U8jPtoGz3o.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "993d2f72-5ef4-4484-ad88-6856017b5e76", "ratio" : "portrait", "price" : 0.99, "coachUserName_fuzzy" : [ "le", "ll", "el", "re", "er", "te", "st", "es", "lle", "ell", "rel", "ere", "ter", "ste", "est", "elle", "rell", "erel", "tere", "ster", "este", "relle", "erell", "terel", "stere", "ester", "erelle", "terell", "sterel", "estere", "terelle", "sterell", "esterel", "sterelle", "esterell", "esterelle" ], "sport_fuzzy" : [ "es", "te", "at", "la", "il", "pi", "tes", "ate", "lat", "ila", "pil", "ates", "late", "ilat", "pila", "lates", "ilate", "pilat", "ilates", "pilate", "pilates" ], "title_fuzzy" : [ "es", "te", "at", "la", "il", "pi", "tes", "ate", "lat", "ila", "pil", "ates", "late", "ilat", "pila", "lates", "ilate", "pilat", "ilates", "pilate", "pilates", "0'", "30", "30'", "pilates 30'" ], "__v" : 0 },
                            { "_id" : "6255934bc2f532b058f4f0ca", "title" : "aya nakamura - pookie", "coachFirstName" : "kyf", "coachLastName" : "ekamé", "coachUserName" : "kyf ekamé", "coachId" : "62558da1c2f532b058f4f0b1", "coachRating" : 5, "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "sport" : "dance", "duration" : 23, "level" : "allLevel", "equipment" : [], "startingDate" : "2022-02-10T16:49:11.090+0000", "startingTime" : 5, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1649766478/VonageApp/lmq2gevp2ubgys0669pt.jpg", "focus" : [], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/zOaziVttt7UUnwo8TwNN1E8FOHksMfafOLgnCpG00QdM.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "1c774216-ef5c-4d86-82da-32901ba03a92", "ratio" : "portrait", "price" : 0.99, "coachUserName_fuzzy" : [], "sport_fuzzy" : [], "title_fuzzy" : [], "__v" : 0 }
                        ],
                        "numberOfActivities": 0,
                        "totalLengthOfActivities": 0,
                        "numberOfDailyActivitiesInARow": 0,
                        "averageFeeling": 5,
                        "coachRating": null,
                        "numberOfCoachings": 0,
                        "totalLengthOfCoachings": 0,
                        "averageLengthOfCoaching": 0,
                        "coachingsTotalViewers": 0,
                        "coachingsTotalViews": 0,
                        "agreedTermsAndConditions": true,
                        "automaticTopUp": false,
                        "subscription": null,
                        "billingDate": null,
                        "isCoach": true,
                        "currentGains": 0,
                        "lifeTimeGains": 0,
                        "companyName": "",
                        "companyType": "",
                        "companyNumber": "",
                        "companyIban": "",
                        "companyAddress": { "addressLine": "", "zipCode": "", "city": "", "country": "" },
                        "companyLegalStatus": "",
                        "isCompanySubjectToTax": null,
                        "cashOutState": 0,
                        "countryOfResidence": "",
                        "nationality": "",
                        "userName_fuzzy": ["se", "ser", "sere", "seren", "serena", "serena c", "serena c", "serena ci", "serena cit", "serena citr", "serena citru", "serena citrus", "citrus", "tru", "ci", "cit", "citr", "citru", "serena tru", "serena ci", "serena cit", "serena citr", "serena citru"],
                        "firstName_fuzzy": ["se", "ser", "sere", "seren", "serena"],
                        "lastName_fuzzy": ["citrus", "ci", "cit", "citr", "citru"],
                        "userName": "Serena Citrus",
                        "email": "serena@thecitrusapp.com",
                        "password": serenaEncryptedPassword,
                        "__v": 0
                    }
                ),
            ]

            let done = 0
            for (let i = 0; i < users.length; i++) {
                console.log('***************    ', i, '    *******************')
                users[i].save((err, result) => {
                    console.log('ERR:', err)
                    console.log('RESULT:', result)
                    done++
                    if (done === users.length) {
                        exit()
                    }
                })
            }

            const exit = () => {
                mongoose.disconnect()
            }
        })
    })
})