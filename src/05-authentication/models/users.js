const cuid = require('cuid')
const bcrypt = require('bcrypt')
const { isEmail ,  isAlphanumeric} = require('validator')

const db = require('../db')

const SALT_ROUNDS = 10


const User = db.model('User', {
    _id : { type: String, default: cuid },
    username : usernameSchema(),
    email: emailSchema({ required: true }),
    password: { type: String, maxLength: 120, required: true },
})

module.exports = {
    get,
    list,
    create,
    edit,
    remove,
    model: User
}

function emailSchema (opts = {}) {
    const { required } = opts
    return {
      type: String,
      required: !!required,
      validate: {
        validator: isEmail,
        message: props => `${props.value} is not a valid email address`
      }
    }
  }

function usernameSchema () {
    return {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 3,
      maxLength: 16,
      validate: [
        {
          validator: isAlphanumeric,
          message: props => `${props.value} contains special characters`
        },
        {
          validator: str => !str.match(/^admin$/i),
          message: () => 'Invalid username'
        },
        {
          validator: function (username) { return isUnique(this, username) },
          message: () => 'Username is taken'
        }
      ]
    }
  }

async function get(username){
    const user = await User.findOne({ username})
    return user
}


async function list(opts = {}){
    const { offset = 0, limit = 25} = opts

    const users = await User.find().
        sort({ _id : 1}).skip(offset).limit(limit)

    return users
}

async function remove (username) {
    await User.deleteOne({ username })
}

async function create(userDetails){
    const user = new User(userDetails)
    await hashPassword(user)
    await user.save()
    return user
}

async function edit(username, change){
    const user = await get(username)
    Object.keys(change).forEach(key => { user[key] = change[key] })
    if (change.password) await hashPassword(user)
    await user.save()
    return user
}

async function isUnique(doc, username){
    const user = await User.findOne({ username })
    return !user || doc._id === user._id
}

async function hashPassword(user){
    if(!user.password) throw user.invalidate('password', 'password is required')
    if(user.password.length < 12) throw user.invalidate('password', 'password must be at least 12 characters')

    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
}