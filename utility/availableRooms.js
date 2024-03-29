const firebaseAdminConfig = require("../config/firebaseAdminConfig");

const availableRooms = async (hostelLocation, roomType, gender) => {
    let query = firebaseAdminConfig.db.collection("rooms")
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
