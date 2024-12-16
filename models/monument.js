const mongoose = require('mongoose');

const monumentSchema = new mongoose.Schema({
    zone: String,
    state: String,
    city: String,
    name: String,
    type: String,
    establishmentYear: Number,
    timeNeededToVisitInHrs: Number,
    googleReviewRating: Number,
    entranceFeeInINR: Number,
    airportWith50kmRadius: String,
    weeklyOff: String,
    significance: String,
    dslrAllowed: String,
    numberOfGoogleReviewInLakhs: Number,
    bestTimeToVisit: String,
});

module.exports = mongoose.model('Monument', monumentSchema);
