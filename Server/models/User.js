const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const CartItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  image: String,
  category: String,
  rating: Number,
  description: String,
  ingredients: String,
  quantity: Number
});



const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9+\-\s()]*$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: String,
    default: ""
  },
  isUserChef: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['customer', 'chef', 'rider', 'admin'],
    default: 'customer'
  },
  accountstatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  CartItem: { type: [CartItemSchema], default: [] },
  createdAt: {
    type: Date,
    default: Date.now
  },
  subscription: {
    isPremium: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    plan: { type: String, enum: ['free', 'Basic', 'Advance', 'Pro'], default: 'free'},
    startDate: { type: Date },
    endDate: { type: Date },
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);