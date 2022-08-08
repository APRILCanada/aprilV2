const admin = require("firebase-admin");

exports.getBrokers = (req, res) => {
    admin.firestore()
        .collection('brokers')
        .get()
        .then(data => {
            let brokers = []
            data.forEach(doc => {
                brokers.push(doc.data())
            });
            return res.json(brokers)
        }).catch(err => console.error(err))
}

exports.getBrokerById = (req, res) => {
    let broker = {}
    admin.firestore()
        .doc(`/brokers/${req.params.id}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Broker not found' })
            }
            broker = doc.data()
            broker.id = doc.id
            return res.json(broker)
        }).catch(err => console.error(err))
}