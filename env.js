import bcrypt from 'bcrypt'

export const JWT_ACCESS_SECRET_KEY = 'qwerty123'

export const salt = await bcrypt.genSalt(10);