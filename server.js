const express = require('express')
const app = express()
const server = require('http').createServer(app)
// const socketIO = require('socket.io')
// const io = socketIO(server)
const {
	s3AccessKeyId,
	s3SecretAccessKey
} = require('./config')
const cors = require('cors')
const tus = require('tus-node-server');
const tusServer = new tus.Server();
const EVENTS = require('tus-node-server').EVENTS
const fs = require('fs')
const uniqid = require('uniqid')
const fileExtension = require('file-extension')

const db = require('./db')
// const notification = require('./models/notification')
const User = require('./models/user')
const Coaching = require('./models/coaching')
const { getNextTrainingTimer } = require('./utils')
const { transferAssetToMux } = require('./services/s3toMux')

const io = require('socket.io')(
	server,
	{
		transports: ['websocket', 'polling'],
		cors: { origin: '*' },
		allowEIO3: true,
		methods: ["GET", "POST"]
	}
)
app.use(cors())
// app.use(function (req, res, next) {
// 	req.io = io;
// 	next();
// })

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token")
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	next()
})

io.sockets.on('connection', socket => {
	console.log('Socket connected to mobile app :D')
	socket.emit('test socket', 'Hello')
	socket.on('connect_error', (err) => {
		console.log(`connect_error due to ${err.message}`);
	})
	socket.on('new notification', notification => {
		console.log('emiting new notification from server', notification)
		io.emit('new notification', notification)
	})
	socket.on('USER IS ACTIVE', userId => {
		console.log('')
		console.log('user is active', userId)
		console.log('')
	})

	socket.on('live_viewer_entered', coachingId => {
		console.log('user connected to live', coachingId)
		io.emit(`live_viewer_entered_${coachingId}`, null)
	})
	socket.on('live_viewer_left', coachingId => {
		console.log('user left live', coachingId)
		io.emit(`live_viewer_left_${coachingId}`, null)
	})
})

// tusServer.datastore = new tus.FileStore({
// 	path: '/files'
// })

const parseMetadataString = (metadata_string) => {
    const kv_pair_list = metadata_string.split(',');
     return kv_pair_list.reduce((metadata, kv_pair) => {
        const [key, base64_value] = kv_pair.split(' ');
         metadata[key] = {
            encoded: base64_value,
            decoded: Buffer.from(base64_value, 'base64').toString('ascii'),
        };
         return metadata;
    }, {});
}

// let userId = null
let coachingId = null

const fileNameFromUrl = (req) => {
    let metadata = parseMetadataString( req.headers['upload-metadata'] )

	console.log('')
	console.log('')
	console.log('metadata : ')
	console.log('')
	console.log('')
	console.log(metadata)
	console.log('')
	console.log('')

	coachingId = metadata?.coaching_id?.decoded
	// userId = metadata?.user_id?.decoded

	console.log('')
	console.log('')
	console.log('coachingId : ')
	console.log('')
	console.log('')
	console.log(coachingId)
	console.log('')
	console.log('')

    return `${uniqid()}.${fileExtension( metadata.filetype.decoded )}`;
}

tusServer.datastore = new tus.S3Store({
    path: '/files',
    bucket: 'citrusdirectupload',
    accessKeyId: s3AccessKeyId,
    secretAccessKey: s3SecretAccessKey,
    region: 'eu-west-3',
    partSize: 8 * 1024 * 1024, // each uploaded part will have ~8MB,
    tmpDirPrefix: 'tus-s3-store',
	namingFunction: fileNameFromUrl
})

const HEADERS = [
    'Authorization',
    'Content-Type',
    'Location',
    'Tus-Extension',
    'Tus-Max-Size',
    'Tus-Resumable',
    'Tus-Version',
    'Upload-Defer-Length',
    'Upload-Length',
    'Upload-Metadata',
    'Upload-Offset',
    'X-HTTP-Method-Override',
    'X-Requested-With',
    'Upload-Concat'
];

var corsOptions = {
    allowedHeaders: HEADERS
}

const uploadApp = express()
uploadApp.all('*', cors(corsOptions), tusServer.handle.bind(tusServer))

tusServer.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
	const awsUrl = event?.file?.location
	transferAssetToMux(awsUrl, coachingId)
})

app.use(express.json({ limit: '50mb' }))

app.use('/', require('./routes/ebl'))
app.use('/api/coachings', require('./routes/coachings'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notifications', require('./routes/notifications'))
app.use('/api/searches', require('./routes/searches'))
app.use('/api/confirmation', require('./routes/confirmation'))
app.use('/api/mp', require('./routes/mangopay'))
app.use('/api/payments', require('./routes/payments'))
app.use('/api/stream', require('./routes/stream')(io))
app.use('/api/transactions', require('./routes/transactions'))
app.use('/api/store_transfers', require('./routes/store-transfer'))
app.use('/api/logs', require('./routes/logs'))
app.use('/api/uploads', uploadApp)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// const PORT = process.env.PORT || 8000
const { port } = require('./config')
server.listen(port, () => console.log(`The server started on port ${port}`))


