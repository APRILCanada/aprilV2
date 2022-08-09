const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
require("dotenv").config();

const app = require('express')()
const cors = require('cors')
const { getBrokers, getBrokerById } = require('./handlers/brokers')

// services
require('./services/email')

// routes
app.use(cors({ origin: true }));
app.get('/brokers', getBrokers)
app.get('/brokers/:id', getBrokerById)

exports.api = functions.https.onRequest(app)