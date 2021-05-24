import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

// ? import the models
import User from '../models/user.js'
import Movie from '../models/movie.js'
import Mood from '../models/moods.js'

// ? import the data
import userData from './data/users.js'

// ? import fs (file system) from node.js
import fs from 'fs'

import moodsData from './data/moods.js'




async function seedDatabase() {

  try {
    // waiting for the connection to mongoDB
    await connectToDb()
    console.log('Connected to mongo')

    // clear the database every time it's seeded
    await mongoose.connection.db.dropDatabase()
    console.log('Removed everything')
    
    // Seed with users
    const users = await User.create(userData)
    console.log(`${users.length} new users created!`)
    console.log(users)
    
    const moodsList = await Mood.create(moodsData)
    //console.log('I have the:', moodsList)
    

    // taking the data from movies.json, using fs.readFileSync and parsing it to JS
    const seedDataBuffer = fs.readFileSync('./db/data/movies.json')
    const seedData = JSON.parse(seedDataBuffer)
    
    const adminUser = users.find(user => (user.username === 'admin'))
    const mappedSeedMovies = seedData.map((movie) => {
      const movieMoods = movie.moods.map(mood => {
        const matchedMood = moodsList.find(m => m.mood === mood)
        if (matchedMood === undefined) {
          console.log('This is the problem!:', mood)
        }
        return { 
          mood: matchedMood,
          user: adminUser,
        }
      })
      return { ...movie, moods: movieMoods }
    })
    
    const movies = await Movie.create(mappedSeedMovies)
    console.log(`🤖 ${movies.length} movies added to the database! 🍿`)
    console.log(JSON.stringify(movies[0], null, 2))

    
    

    await mongoose.connection.close()
    console.log('🤖 Disconnected from mongo. All done!')
  } catch (e) {
    console.log('🔥there is an error with seeding🔥')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()