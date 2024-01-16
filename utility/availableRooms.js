const db = require("../config/firebaseAdminConfig");
const validation = require("../utility/validation");

const availableRooms = async (hostelLocation, roomType, gender) => {
    let query = db.collection("rooms")
        .where("hostelLocation", "==", hostelLocation)
        .where("roomType", "==", roomType)
        .where("gender", "==", gender)
        .orderBy('roomBlock');

    const snapshot = await query.get();

    const data = [];
    snapshot.forEach((doc) => {
        data.push({ ...doc.data(), roomID: doc.id });
    });

    return data;
};

module.exports = availableRooms;
