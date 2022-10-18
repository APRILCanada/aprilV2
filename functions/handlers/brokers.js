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

exports.getBrokerById = async (req, res) => {
    let broker = {}

    try {
        // get the broker document
        const brokerDoc = await admin.firestore().doc(`/brokers/${req.params.id}`).get()
        if (!brokerDoc.exists) {
            return res.status(404).json({ error: 'Broker not found' })
        }

        broker = brokerDoc.data()
        broker.id = brokerDoc.id

        // get the market document associated with this broker
        const marketDoc = await admin.firestore().doc(`/markets/${broker.marketId}`).get()

        if (!marketDoc.exists) {
            return res.status(404).json({ error: 'Market not found' })
        }

        broker.market = marketDoc.data();

        return res.json(broker)
    } catch (err) {
        console.error('err', err)
    }
}