const User = require('../../models/user')
const mongoose = require('mongoose')

// Heroku dev database
const databaseUrl = require('../../config').mongoUri
mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})

const addDays = days => {
	const newDate = new Date(new Date().setDate(new Date().getDate() + days)).setHours(new Date().getHours() + 2)
	return new Date(newDate)
}

const removeDays = days => {
	const newDate = new Date(new Date().setDate(new Date().getDate() - days)).setHours(new Date().getHours() + 2)
	return new Date(newDate)
}

const addHours = hours => {
	const newDate = new Date().setHours(new Date().getHours() + hours + 2)
	return new Date(newDate)
}

const getStartingTime = date => {
	const result = new Date(date).getHours()
	if (result === 0) {
		return 22
	}
	if (result === 1) {
		return 23
	}
	if (result === 2) {
		return 0
	}
	return result - 2
}

const users = [
    new User({ "_id" : "61d9a9da941a270004d289a7", "firstName" : "Estérelle", "lastName" : "Martin", "isVerified" : true, "hasSetUpZone" : false, "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1641654865/VonageApp/eh9ldtmlnmaujjckymjf.jpg", "sports" : [ { "type" : "pilates", "level" : "" }, { "type" : "stretching", "level" : "" } ], "bio" : "De formation danseuse en école préprofessionnelle, sportive de haut niveau, je pratique la danse classique, jazz, contemporaine pendant 15 ans. Je me tourne ensuite vers la technique BASI Pilates, qui est pour moi le meilleur moyen de renforcer ses muscles en profondeur. J’obtiens mon diplôme de professeure de Pilates mat en 2016. Depuis, j’enseigne régulièrement cette discipline à des particuliers à domicile, en cours collectifs en salles, studios, entreprises. Aussi, je suis une adepte des cours en ligne. En effet, j’ai déjà participé à divers tournages vidéo, que ce soit en live ou enregistré.\nJe suis à l’écoute, consciencieuse et bienveillante. J’ai pour mission de rendre le Pilates accessible à tous.tes et qu’il résonne avec santé, bien-être et vitalité pour chaque élève.\n", "coachingLanguagePreference" : [  ], "distanceMetricPreference" : "kilometersAndKilos", "weightMetricPreference" : "kilometersAndKilos", "basedOnLocationPreference" : false, "activityReminderFrequency" : 30, "followers" : [ { "_id" : "5f412f4bdff0cd00046a07ce", "userName" : "Adrien Floor", "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598635790/VonageApp/coachesAvatar/adrien-avatar.jpg", "coachRating" : null, "bio" : "Je suis passionné de sport et de fitness en général. Je pratique le triathlon et je suis un grand fan de vélo de route. Je fais aussi depuis des années beaucoup d'entrainements poids de corps et un peu de musculation", "sports" : [ { "type" : "crossfit", "level" : "" }, { "type" : "yoga", "level" : "" }, { "type" : "calisthenics", "level" : "" }, { "type" : "weightlifting", "level" : "" }, { "type" : "stretching", "level" : "" }, { "type" : "hiit", "level" : "" }, { "type" : "circuitTraining", "level" : "" }, { "type" : "pilates", "level" : "" } ], "numberOfFollowers" : 1 } ], "following" : [  ], "myReplays" : [  ], "numberOfActivities" : 0, "totalLengthOfActivities" : 0, "numberOfDailyActivitiesInARow" : 0, "averageFeeling" : 5, "coachRating" : 5, "coachComments" : [ { "coachComment" : "Explications limpides et coaching facile à suivre, je recommande !", "userName" : "Adrien Floor", "rating" : 5 } ], "numberOfCoachings" : 0, "totalLengthOfCoachings" : 0, "averageLengthOfCoaching" : 0, "coachingsTotalViewers" : 0, "coachingsTotalViews" : 0, "filters" : { "liveCategory" : "all", "startingTime" : [ 0, 23 ], "level" : "all", "focus" : [ "all" ], "duration" : "any", "access" : "all" }, "agreedTermsAndConditions" : true, "MPUserId" : "", "MPLegalUserId" : "2107754833", "automaticTopUp" : false, "subscription" : null, "billingDate" : null, "lastBillingMonth" : null, "lastBillingYear" : null, "isCoach" : true, "currentGains" : 0, "lifeTimeGains" : 1.386, "companyName" : "", "companyType" : "", "companyNumber" : "", "companyIban" : "", "companyAddress" : { "addressLine" : "", "zipCode" : "", "city" : "", "country" : "" }, "companyLegalStatus" : "", "isCompanySubjectToTax" : null, "cashOutState" : 0, "countryOfResidence" : "", "nationality" : "", "birthday" : null, "creditCard" : { "alias" : "", "expirationDate" : "" }, "MPRecurringPayinRegistrationId" : "", "MPPayoutId" : "", "pastTransactionsIds" : [  ], "hasCreditCardFailed" : false, "userName_fuzzy" : [ "le", "ll", "el", "re", "er", "te", "st", "es", "lle", "ell", "rel", "ere", "ter", "ste", "est", "elle", "rell", "erel", "tere", "ster", "este", "relle", "erell", "terel", "stere", "ester", "erelle", "terell", "sterel", "estere", "terelle", "sterell", "esterel", "sterelle", "esterell", "esterelle" ], "firstName_fuzzy" : [ "le", "ll", "el", "re", "er", "te", "st", "es", "lle", "ell", "rel", "ere", "ter", "ste", "est", "elle", "rell", "erel", "tere", "ster", "este", "relle", "erell", "terel", "stere", "ester", "erelle", "terell", "sterel", "estere", "terelle", "sterell", "esterel", "sterelle", "esterell", "esterelle" ], "lastName_fuzzy" : [ "in", "ti", "rt", "ar", "ma", "tin", "rti", "art", "mar", "rtin", "arti", "mart", "artin", "marti", "martin" ], "userName" : "Estérelle", "email" : "martinesterelle@gmail.com", "password" : "$2a$10$qJy8ktkShYQbvSYMHzZkBei1v2gxwd0xJxSv0v02bcsWmkK9PB9SS", "__v" : 4 }),
    new User({ "_id" : "61c08f45f9212a0004affcba", "firstName" : "Florence ", "lastName" : "Piers", "isVerified" : true, "hasSetUpZone" : false, "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1640009961/VonageApp/iasahxbrm7bttmpfxsly.jpg", "sports" : [ { "type" : "yoga", "level" : "" } ], "bio" : "Florence découvre le yoga à 16 ans mais elle opte plutôt pour des études de marketing. Une fois son diplôme en poche, son intuition la guide vers autre chose. Elle décide de commencer une formation de kinésiologie d’une durée de trois ans et la termine par un stage de yoga intensif en Inde. La pratique de Florence est profondément liée au partage des approches énergétiques et thérapeutiques du yoga et de la kinésiologie.\nSon objectif est que vous retrouviez vos pleines capacités physiques et mentales. Ressentez les bienfaits en quelques minutes seulement. Les tensions se détendent, le stress est réduit, vous remarquerez une amélioration de la concentration, une augmentation du bien-être et de la santé en général.", "coachingLanguagePreference" : [ "french" ], "distanceMetricPreference" : "kilometersAndKilos", "weightMetricPreference" : "kilometersAndKilos", "basedOnLocationPreference" : false, "activityReminderFrequency" : 30, "followers" : [ { "_id" : "60d702666aaa7600049520f9", "userName" : "Quentin Citrus", "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623317757/VonageApp/avatar/noun_avatar_2309777_jhlofy.png", "coachRating" : null, "bio" : "Yallah\n", "sports" : [  ], "numberOfFollowers" : 0 }, { "_id" : "5f412f4bdff0cd00046a07ce", "userName" : "Adrien Floor", "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598635790/VonageApp/coachesAvatar/adrien-avatar.jpg", "coachRating" : null, "bio" : "Je suis passionné de sport et de fitness en général. Je pratique le triathlon et je suis un grand fan de vélo de route. Je fais aussi depuis des années beaucoup d'entrainements poids de corps et un peu de musculation", "sports" : [ { "type" : "crossfit", "level" : "intermediate" }, { "type" : "yoga", "level" : "expert" }, { "type" : "calisthenics", "level" : "intermediate" }, { "type" : "weightlifting", "level" : "beginner" }, { "type" : "stretching", "level" : "intermediate" }, { "type" : "hiit", "level" : "expert" }, { "type" : "circuitTraining", "level" : "expert" } ], "numberOfFollowers" : 1 } ], "following" : [  ], "myReplays" : [  ], "numberOfActivities" : 0, "totalLengthOfActivities" : 0, "numberOfDailyActivitiesInARow" : 0, "averageFeeling" : 5, "coachRating" : 5, "numberOfCoachings" : 0, "totalLengthOfCoachings" : 0, "averageLengthOfCoaching" : 0, "coachingsTotalViewers" : 0, "coachingsTotalViews" : 0, "filters" : { "liveCategory" : "all", "startingTime" : [ 0, 23 ], "level" : "all", "focus" : [ "all" ], "duration" : "any", "access" : "all" }, "agreedTermsAndConditions" : true, "MPUserId" : "", "MPLegalUserId" : "2070047262", "automaticTopUp" : false, "subscription" : null, "billingDate" : null, "lastBillingMonth" : null, "isCoach" : true, "currentGains" : 0, "lifeTimeGains" : 4.199999999999999, "companyName" : "", "companyType" : "", "companyNumber" : "", "companyIban" : "", "companyAddress" : { "addressLine" : "", "zipCode" : "", "city" : "", "country" : "" }, "companyLegalStatus" : "", "isCompanySubjectToTax" : null, "cashOutState" : 0, "countryOfResidence" : "", "nationality" : "", "birthday" : null, "creditCard" : { "alias" : "", "expirationDate" : "" }, "MPRecurringPayinRegistrationId" : "", "MPPayoutId" : "", "pastTransactionsIds" : [  ], "hasCreditCardFailed" : false, "userName_fuzzy" : [ "ce", "nc", "en", "re", "or", "lo", "fl", "nce", "enc", "ren", "ore", "lor", "flo", "ence", "renc", "oren", "lore", "flor", "rence", "orenc", "loren", "flore", "orence", "lorenc", "floren", "lorence", "florenc", "florence", "rs", "er", "ie", "pi", "ers", "ier", "pie", "iers", "pier", "piers", "florence piers" ], "firstName_fuzzy" : [ "ce", "nc", "en", "re", "or", "lo", "fl", "nce", "enc", "ren", "ore", "lor", "flo", "ence", "renc", "oren", "lore", "flor", "rence", "orenc", "loren", "flore", "orence", "lorenc", "floren", "lorence", "florenc", "florence", "florence " ], "lastName_fuzzy" : [ "rs", "er", "ie", "pi", "ers", "ier", "pie", "iers", "pier", "piers" ], "userName" : "Florence Piers", "email" : "florencepiers@gmail.com", "password" : "$2a$10$zjlwcOCWIXOUNPsKSiCIMePcQObDRRyx36FnHblyzD.zcXe.Kojta", "__v" : 8, "coachComments" : [ { "coachComment" : "Très claire et compétente !", "userName" : "Adrien Floor", "rating" : 5 } ] }),
    new User({ "_id" : "5f412f4bdff0cd00046a07ce", "firstName" : "Adrien", "lastName" : "Floor", "isVerified" : true, "hasSetUpZone" : true, "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1648207643/VonageApp/szy7dyxro6i8brievdrr.jpg", "sports" : [ { "type" : "crossfit", "level" : "" }, { "type" : "yoga", "level" : "" }, { "type" : "calisthenics", "level" : "" }, { "type" : "weightlifting", "level" : "" }, { "type" : "stretching", "level" : "" }, { "type" : "hiit", "level" : "" }, { "type" : "circuitTraining", "level" : "" }, { "type" : "pilates", "level" : "" } ], "bio" : "Je suis passionné de sport et de fitness en général. Je pratique le triathlon et je suis un grand fan de vélo de route. Je fais aussi depuis des années beaucoup d'entrainements poids de corps et un peu de musculation", "coachingLanguagePreference" : [ "french" ], "distanceMetricPreference" : "kilometersAndKilos", "weightMetricPreference" : "kilometersAndKilos", "basedOnLocationPreference" : false, "activityReminderFrequency" : null, "followers" : [ { "_id" : "60d702666aaa7600049520f9", "userName" : "Quentin Citrus", "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623317757/VonageApp/avatar/noun_avatar_2309777_jhlofy.png", "coachRating" : null, "bio" : "", "sports" : [  ], "numberOfFollowers" : 0 } ], "following" : [ { "_id" : "61c08f45f9212a0004affcba", "userName" : "Florence Piers", "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1640009961/VonageApp/iasahxbrm7bttmpfxsly.jpg", "coachRating" : 5, "bio" : "Florence découvre le yoga à 16 ans mais elle opte plutôt pour des études de marketing. Une fois son diplôme en poche, son intuition la guide vers autre chose. Elle décide de commencer une formation de kinésiologie d’une durée de trois ans et la termine par un stage de yoga intensif en Inde. La pratique de Florence est profondément liée au partage des approches énergétiques et thérapeutiques du yoga et de la kinésiologie.\nSon objectif est que vous retrouviez vos pleines capacités physiques et mentales. Ressentez les bienfaits en quelques minutes seulement. Les tensions se détendent, le stress est réduit, vous remarquerez une amélioration de la concentration, une augmentation du bien-être et de la santé en général.", "sports" : [ { "type" : "yoga", "level" : "" } ], "numberOfFollowers" : 2 }, { "_id" : "61d9a9da941a270004d289a7", "userName" : "Estérelle", "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1641654865/VonageApp/eh9ldtmlnmaujjckymjf.jpg", "coachRating" : 5, "bio" : "De formation danseuse en école préprofessionnelle, sportive de haut niveau, je pratique la danse classique, jazz, contemporaine pendant 15 ans. Je me tourne ensuite vers la technique BASI Pilates, qui est pour moi le meilleur moyen de renforcer ses muscles en profondeur. J’obtiens mon diplôme de professeure de Pilates mat en 2016. Depuis, j’enseigne régulièrement cette discipline à des particuliers à domicile, en cours collectifs en salles, studios, entreprises. Aussi, je suis une adepte des cours en ligne. En effet, j’ai déjà participé à divers tournages vidéo, que ce soit en live ou enregistré.\nJe suis à l’écoute, consciencieuse et bienveillante. J’ai pour mission de rendre le Pilates accessible à tous.tes et qu’il résonne avec santé, bien-être et vitalité pour chaque élève.\n", "sports" : [ { "type" : "pilates", "level" : "" }, { "type" : "stretching", "level" : "" } ], "numberOfFollowers" : 1 } ], "activitiesIAttend" : [  ], "activitiesIHaveAttended" : [  ], "numberOfActivities" : 0, "totalLengthOfActivities" : 0, "numberOfDailyActivitiesInARow" : 0, "averageFeeling" : 4.5, "coachRating" : null, "numberOfCoachings" : 0, "totalLengthOfCoachings" : 0, "averageLengthOfCoaching" : 0, "coachingsTotalViewers" : 0, "coachingsTotalViews" : 0, "filters" : { "liveCategory" : "all", "startingTime" : [ 0, 23 ], "level" : "all", "focus" : [ "all" ], "duration" : "any", "access" : "all" }, "agreedTermsAndConditions" : true, "MPUserId" : "2072617200", "MPLegalUserId" : "123346331", "myVideos" : 0, "automaticTopUp" : false, "subscription" : null, "billingDate" : null, "isCoach" : true, "currentGains" : 0.0, "lifeTimeGains" : 0.693, "companyName" : "", "companyType" : "", "companyNumber" : "", "companyIban" : "", "companyAddress" : { "addressLine" : "", "zipCode" : "", "city" : "", "country" : "" }, "companyLegalStatus" : "", "isCompanySubjectToTax" : null, "cashOutState" : 0, "userName_fuzzy" : [ "en", "ie", "ri", "dr", "ad", "ien", "rie", "dri", "adr", "rien", "drie", "adri", "drien", "adrie", "adrien", "or", "oo", "lo", "fl", "oor", "loo", "flo", "loor", "floo", "floor", "adrien floor" ], "firstName_fuzzy" : [ "en", "ie", "ri", "dr", "ad", "ien", "rie", "dri", "adr", "rien", "drie", "adri", "drien", "adrie", "adrien" ], "lastName_fuzzy" : [ "or", "oo", "lo", "fl", "oor", "loo", "flo", "loor", "floo", "floor" ], "userName" : "Adrien Floor", "email" : "adrien@thecitrusapp.com", "password" : "$2a$10$rogKmik5D0uoy/oCAzo/Oek4Cw4pKvz1ej6hrV1hEOVWs.5k9mRdq", "__v" : 60, "MPPayoutId" : "", "MPRecurringPayinRegistrationId" : "", "countryOfResidence" : "", "creditCard" : { "alias" : "497202XXXXXX9166", "expirationDate" : "0922" }, "hasCreditCardFailed" : false, "myReplays" : [ { "_id" : "61d9ad6b941a270004d289b2", "coachingRating" : { "numberOfRatings" : 1, "rating" : 5 }, "level" : "allLevel", "equipment" : [ "yogaMat" ], "focus" : [ "upperBody" ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/OWGvXoSyKDznwEBKeXAkJZpqTQWiY9eODMf11mfmGWc.m3u8", "isReplayReady" : true, "numberOfViewers" : 1, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "e1cbbd29-840a-4b67-943d-7f32627cb5f0", "ratio" : "portrait", "title" : "pilates abdos 30'", "coachFirstName" : "estérelle", "coachLastName" : "martin", "coachUserName" : "estérelle", "coachId" : "61d9a9da941a270004d289a7", "sport" : "pilates", "duration" : 30, "startingDate" : "2022-01-08T15:27:39.660Z", "startingTime" : 4, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1641655523/VonageApp/dedb8dyoz4qzmyl5im9e.jpg", "coachRating" : 5, "price" : 0.99, "__v" : 0, "myRating" : 5 }, { "level" : "allLevel", "equipment" : [ "yogaMat" ], "focus" : [ "flexibility", "mind", "upperBody", "backFocus", "arms", "lowerBody" ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "https://stream.mux.com/ZWYoqVNcrz5PIHqjzJTGNhD2hUcm00mGcWPf00vC6seeE.m3u8", "isReplayReady" : true, "numberOfViewers" : 1, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 0, "passthrough" : "246def3e-cab4-463c-b962-8a39f53f9da1", "ratio" : "portrait", "_id" : "61c0f185f9212a0004affd57", "title" : "séance de yoga stretching", "coachFirstName" : "florence ", "coachLastName" : "piers", "coachUserName" : "florence piers", "coachId" : "61c08f45f9212a0004affcba", "sport" : "yoga", "duration" : 15, "startingDate" : "2021-12-20T21:11:32.801Z", "startingTime" : 10, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1640034685/VonageApp/zu5k6aduzmdwhhoynrda.jpg", "coachRating" : 5, "price" : 3, "__v" : 0, "myRating" : 5, "coachingRating" : { "numberOfRatings" : 1, "rating" : 5 } } ], "nationality" : "", "pastTransactionsIds" : [ "2072617465" ], "lastBillingMonth" : null, "coachComments" : [  ], "lastBillingYear" : null }),
    new User({ "_id" : "5f412f4bdff0cd00046a07cf", "firstName" : "John", "lastName" : "Doe", "isVerified" : true, "hasSetUpZone" : true, "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623317757/VonageApp/avatar/noun_avatar_2309777_jhlofy.png", "sports" : [ { "type" : "crossfit", "level" : "" }, { "type" : "yoga", "level" : "" }, { "type" : "calisthenics", "level" : "" }, { "type" : "weightlifting", "level" : "" }, { "type" : "stretching", "level" : "" }, { "type" : "hiit", "level" : "" }, { "type" : "circuitTraining", "level" : "" }, { "type" : "pilates", "level" : "" }, { "type" : "weightTraining", "level" : "" } ], "bio" : "Salut je suis John Doe ! Passionné de triathlon, j'adore m'entraîner et coacher sur Citrus !", "coachingLanguagePreference" : [ "french" ], "distanceMetricPreference" : "kilometersAndKilos", "weightMetricPreference" : "kilometersAndKilos", "basedOnLocationPreference" : false, "activityReminderFrequency" : null, "followers" : [  ], "following" : [ { "_id" : "5f412f4bdff0cd00046a07ce", "coachRating" : 4, "avatarUrl" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598635790/VonageApp/coachesAvatar/adrien-avatar.jpg", "sports" : [ { "type" : "crossfit", "level" : "intermediate" }, { "type" : "yoga", "level" : "expert" }, { "type" : "calisthenics", "level" : "intermediate" }, { "type" : "weightlifting", "level" : "beginner" }, { "type" : "stretching", "level" : "intermediate" }, { "type" : "hiit", "level" : "expert" }, { "type" : "circuitTraining", "level" : "expert" } ], "numberOfFollowers" : 1, "bio" : "Je suis passionné de sport et de fitness en général. Je pratique le triathlon et je suis un grand fan de vélo de route. Je fais aussi depuis des années beaucoup d'entrainements poids de corps et un peu de musculation", "userName" : "Adrien Floor" } ], "activitiesIAttend" : [ { "_id" : "60aa8be963c68e00044124c8", "coaching" : { "level" : "allLevel", "equipment" : [  ], "focus" : [  ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "", "isLive" : false, "isLiveOver" : false, "livePayers" : 0, "replayPayers" : 0, "_id" : "60aa8be963c68e00044124c8", "title" : "Intense full body", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "sport" : "circuitTraining", "duration" : "", "startingDate" : "2021-09-30T19:30:21.616Z", "startingTime" : 19, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/q_auto:low/v1623772830/VonageApp/training1_jpz1ci.jpg", "coachRating" : 4, "__v" : 0 } }, { "_id" : "60aa8be963c68e00044124c9", "coaching" : { "level" : "allLevel", "equipment" : [  ], "focus" : [ "core", "strength" ], "coachingLanguage" : "french", "freeAccess" : true, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "", "isLive" : false, "isLiveOver" : false, "livePayers" : 0, "replayPayers" : 0, "_id" : "60aa8be963c68e00044124c9", "title" : "Bodyweight for triathlon", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "sport" : "triathlon", "duration" : "", "startingDate" : "2021-09-15T19:30:21.617Z", "startingTime" : 19, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623771467/VonageApp/30deca9c-a162-4f58-b95f-cc20207a3ffd_qnuyx3.jpg", "coachRating" : 4, "__v" : 0 } }, { "_id" : "60d5aee59876e200048fb3bb", "coaching" : { "level" : "allLevel", "equipment" : [  ], "focus" : [  ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "", "isLive" : false, "isLiveOver" : false, "livePayers" : 0, "replayPayers" : 0, "_id" : "60d5aee59876e200048fb3bb", "title" : "yoga flow", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "sport" : "yoga", "duration" : "", "startingDate" : "2021-09-25T10:24:30.000Z", "startingTime" : 12, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1624616664/VonageApp/obwrqca3xjutvs7j6ajh.jpg", "coachRating" : 4, "__v" : 0 } }, { "_id" : "60d5af469876e200048fb3bc", "coaching" : { "level" : "allLevel", "equipment" : [  ], "focus" : [  ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "", "muxLivePlaybackId" : "", "muxReplayPlaybackId" : "", "isLive" : false, "isLiveOver" : false, "livePayers" : 0, "replayPayers" : 0, "_id" : "60d5af469876e200048fb3bc", "title" : "yoga vinyasa 30 glow", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "sport" : "yoga", "duration" : "", "startingDate" : "2021-10-28T10:26:04.000Z", "startingTime" : 12, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1624616759/VonageApp/y9jojd608f3cgj5ecfop.jpg", "coachRating" : 4, "__v" : 0 } } ], "activitiesIHaveAttended" : [  ], "numberOfActivities" : 1, "totalLengthOfActivities" : 0, "numberOfDailyActivitiesInARow" : 0, "averageFeeling" : 5, "coachRating" : 5, "numberOfCoachings" : 0, "totalLengthOfCoachings" : 0, "averageLengthOfCoaching" : 0, "coachingsTotalViewers" : 0, "coachingsTotalViews" : 0, "filters" : { "liveCategory" : "all", "startingTime" : [ 0, 23 ], "level" : "all", "focus" : [ "all" ], "duration" : "any", "access" : "all" }, "agreedTermsAndConditions" : true, "MPUserId" : "", "MPLegalUserId" : "", "myVideos" : 0, "automaticTopUp" : false, "subscription" : null, "billingDate" : null, "isCoach" : false, "currentGains" : 0, "lifeTimeGains" : 0, "companyName" : "", "companyType" : "", "companyNumber" : "", "companyIban" : "", "companyAddress" : { "addressLine" : "", "zipCode" : "", "city" : "", "country" : "" }, "companyLegalStatus" : "", "isCompanySubjectToTax" : null, "cashOutState" : 0, "userName_fuzzy" : [ "hn", "oh", "jo", "ohn", "joh", "john", "oe", "do", "doe", "john doe" ], "firstName_fuzzy" : [ "hn", "oh", "jo", "ohn", "joh", "john" ], "lastName_fuzzy" : [ "oe", "do", "doe" ], "userName" : "John Doe", "email" : "johndoe@thecitrusapp.com", "password" : "$2a$10$rogKmik5D0uoy/oCAzo/Oek4Cw4pKvz1ej6hrV1hEOVWs.5k9mRdq", "__v" : 13, "MPPayoutId" : "", "MPRecurringPayinRegistrationId" : "", "coachComments" : [  ], "countryOfResidence" : "", "creditCard" : { "alias" : "", "expirationDate" : "" }, "hasCreditCardFailed" : false, "myReplays" : [ { "coachingRating" : { "rating" : null, "numberOfRatings" : 0 }, "level" : "intermediate", "equipment" : [  ], "focus" : [  ], "coachingLanguage" : "french", "freeAccess" : false, "muxStreamKey" : "26e169c2-abac-370b-0deb-bc12ed3770d9", "muxLivePlaybackId" : "https://stream.mux.com/yaOtcayqNuWQthmDSCLmQoXE2T6KLPDWJtwkFLfdR00g", "muxReplayPlaybackId" : "https://stream.mux.com/NXB00O7G6qO4DHFTf974H6b74cCC8phwY86TT5qJzgKQ.m3u8", "isReplayReady" : true, "numberOfViewers" : 0, "isLive" : false, "isLiveOver" : true, "livePayers" : 0, "replayPayers" : 2, "passthrough" : null, "ratio" : "portrait", "_id" : "60aa8be963c68e00044124c3", "title" : "Super Cardio 30", "coachFirstName" : "adrien", "coachLastName" : "floor", "coachUserName" : "adrien floor", "coachId" : "5f412f4bdff0cd00046a07ce", "sport" : "circuitTraining", "duration" : null, "startingDate" : "2021-06-21T19:30:21.615Z", "startingTime" : 19, "pictureUri" : "https://res.cloudinary.com/dho1rqbwk/image/upload/v1622802703/VonageApp/zikrkovnqyzhb0emjodg.jpg", "coachRating" : 4, "__v" : 0, "price" : 0 } ], "nationality" : "", "pastTransactionsIds" : [  ], "isVerifiedCoach" : false }),
    	// QUENTIN BELARBI
	new User(
		{
			"id": "610df87a5fdd590004571ece",
			"firstName": "",
			"lastName": "",
			"isVerified": true,
			"hasSetUpZone": false,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1636623750/VonageApp/bxr8cvzw1psepamuatzq.jpg",
			"sports": [],
			"bio": "",
			"coachingLanguagePreference": [],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 30,
			"followers": [],
			"following": [],
			"myReplays": [],
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
			"userName_fuzzy": ["in", "ti", "et", "ue", "qu", "tin", "que", "uen", "eti", "quen", "uent", "enti", "ntin", "quent", "uentin", "quenti", "uentin", "quentin"],
			"firstName_fuzzy": [""],
			"lastName_fuzzy": [""],
			"userName": "quentin",
			"email": "quentin@thecitrusapp.com",
			"password": "$2a$10$rogKmik5D0uoy/oCAzo/Oek4Cw4pKvz1ej6hrV1hEOVWs.5k9mRdq",
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