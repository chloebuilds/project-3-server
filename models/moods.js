// moods need to have an id so they need to be an object?
// we need a moods model so that they can have an endpoint so that they can be listed/displayed on the front end
import mongoose from 'mongoose'

const moodSchema = new mongoose.Schema({
  mood: { type: String, required: true, unique: true },
})


export default mongoose.model('Mood', moodSchema)