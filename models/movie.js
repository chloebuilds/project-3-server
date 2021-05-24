
import mongoose from 'mongoose'


function validator(array) {
  return array.length > 0
}

// ? Embedded Schema
const movieMoodSchema = new mongoose.Schema({ 
  // mood: { type: mongoose.Schema.ObjectId, ref: 'Mood', required: true, validate: [validator, 'Please add at least one mood'] },
  mood: { type: mongoose.Schema.ObjectId, ref: 'Mood', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

const ratingsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  value: { type: String, required: true },
})


// ? Movie Schema
const movieSchema = mongoose.Schema({
  title: { type: String, required: true, validate: [validator, 'Please add the movie title']  },
  year: { type: String, required: true, validate: [validator, 'Please add the release year']  },
  rated: { type: String, required: true, validate: [validator, 'Please add the rating']  },
  released: { type: String, required: true, validate: [validator, 'Please add the release date']  },
  runtime: { type: String, required: true, validate: [validator, 'Please add the running time']  },
  genres: {  type: [String], required: true, validate: [validator, 'Please add at least one genre'] },
  director: { type: [String], required: true, validate: [validator, 'Please add the director']  },
  actors: { type: [String], required: true, validate: [validator, 'Please add the cast']  },
  plot: { type: String, required: true, validate: [validator, 'Please add the plot']  },
  language: { type: [String], required: true, validate: [validator, 'Please add the language of the movie']  },
  poster: { type: String, required: true, validate: [validator, 'Please add the URL for the poster']  },
  ratings: [ratingsSchema],
  moods: [movieMoodSchema],
  //moods: { type: [String], required: true },
})



export default mongoose.model('Movie', movieSchema)