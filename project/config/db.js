const mongojs = require('mongojs')
// username: csc300-team13
// password: h9VB77K0rosKSEVF
// address: olympia.modulusmongo.net
// database: ute8puxU
// port: 27017

//const connectionURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?autoReconnect=true&connectTimeoutMS=60000`
const connectionURI = `mongodb://csc300-team13:h9VB77K0rosKSEVF@olympia.modulusmongo.net:27017/ute8puxU?autoReconnect=true&connectTimeoutMS=60000`
module.exports = {
    db: mongojs(connectionURI),
    connectionURI: connectionURI
}
