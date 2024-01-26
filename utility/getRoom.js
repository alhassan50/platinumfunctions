const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const getRoom = async (roomID) => {
    /* console.log(roomID); */

    let roomRef = firebaseAdminConfig.db.collection("rooms").doc(roomID)

    try {
        const room = await roomRef.get()
        if (room.exists) {
            return room.data()
        } else {
            throw new Error('Room doesnt exists.')
        }
    } catch (error) {
        return {error: `${error}`}
    }
}

module.exports = getRoom