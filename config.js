const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	nodeEnv: process.env.NODE_ENV,
	mongoUri: process.env.MONGO_URI,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	emailSecret: process.env.EMAIL_SECRET,
	resetPasswordSecret: process.env.RESET_PASSWORD_SECRET,
	gmailClientId: process.env.GMAIL_CLIENT_ID,
	gmailClientSecret: process.env.GMAIL_CLIENT_SECRET,
	gmailRefreshToken: process.env.GMAIL_REFRESH_TOKEN,
	gmailAccessToken: process.env.GMAIL_ACCESS_TOKEN,
	bucketS3BaseUrl: process.env.BUCKET_S3_BASE_URL,
	openTokApiKey: process.env.OPEN_TOK_API_KEY,
	openTokApiSecret: process.env.OPEN_TOK_API_SECRET,
	muxAccessTokenId: process.env.MUX_ACCESS_TOKEN_ID,
	muxSecretKey: process.env.MUX_SECRET_KEY,
	mangoPayClientId: process.env.MANGO_PAY_CLIENT_ID,
	mangoPayApiKey: process.env.MANGO_PAY_API_KEY,
	mailchimpApiKey: process.env.MAILCHIMP_API_KEY,
	mailchimpListId: process.env.MAILCHIMP_LIST_ID,
	apiUrl: process.env.API_URL,
	mangoPayApiUrl: process.env.MANGOPAY_API_URL,
	citrusWalletId: process.env.CITRUS_WALLET_ID,
	iOSVerificationPassword: process.env.IOS_VERIFYCATION_PASSWORD,
	origin: process.env.ORIGIN,
	s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
	s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	testUsers: process.env.TEST_USERS
}