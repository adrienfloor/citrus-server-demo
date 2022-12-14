const Transaction = require('../../models/transaction')
const mongoose = require('mongoose')

// Heroku dev database
const databaseUrl = require('../../config').mongoUri
mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})

const transactions = [
	// ADRIEN FLOOR
	new Transaction(
		{
			"_id": "6f4558a6deb03a000469f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f572",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f573",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f574",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f575",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f576",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f577",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f578",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f579",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f511",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f521",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f531",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f541",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f551",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f561",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "7f4558a6deb03a000469f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f581",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f591",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f171",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f271",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f371",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f471",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f671",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f771",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f871",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000469f971",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000461f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000462f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000463f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000464f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000465f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000466f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000467f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000468f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "8f4558a6deb03a000469f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000419f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000429f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000439f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000449f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000459f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "9f4558a6deb03a000469f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000479f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000489f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000499f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000169f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000269f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000369f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4458a6deb03a000469f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000569f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000669f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000769f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000869f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a000969f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a001469f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a002469f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a003469f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a004469f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a005469f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a006469f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a007469f571",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-21"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"coachingId": "5f4558a6deb03a000469f572",
			"platform": 'ios'
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a008469f571",
			"coachingId": "5f4558a6deb03a000469f572",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-22"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a009469f571",
			"coachingId": "5f4558a6deb03a000469f573",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-23"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "ios"
		}
	),
	new Transaction(
		{
			"_id": "5f4558a6deb03a010469f571",
			"coachingId": "5f4558a6deb03a000469f574",
			"buyerId": "5f4427e06cc26300049d666b", // Karina Klop
			"coachId": "5f412f4bdff0cd00046a07ce", // Adrien Floor
			"initialDate": new Date("2021-05-24"),
			"type": "replay",
			"amount": 2.29,
			"storeTransferStatus": "done",
			"storeTransferAmount": 1.95,
			"storeTransferDate": new Date("2021-07-15"),
			"cashOutAmount": 1.60,
			"cashOutStatus": "none",
			"cashOutDate": null,
			"citrusCommissionAmount": 0.34,
			"citrusCommissionStatus": "done",
			"citrusCommissionDate": new Date("2021-07-15"),
			"__v": 0,
			"platform": "android"
		}
	)
]

let done = 0
for (let i = 0; i < transactions.length; i++) {
	console.log('***************    ', i, '    *******************')
	transactions[i].save((err, result) => {
		console.log('ERR:', err)
		console.log('RESULT:', result)
		done++
		if (done === transactions.length) {
			exit()
		}
	})
}

const exit = () => {
	mongoose.disconnect()
}