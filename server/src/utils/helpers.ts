import { genSalt, hash } from 'bcryptjs'
import { UserDocument } from 'src/auth/user.schema'

export const removeExtraFromReturnedFields = (user: UserDocument) => {
	const updatedUser = user.toObject()
	delete updatedUser.password
	return updatedUser
}

export const hashValue = async (value: string) => {
	const salt = await genSalt(10)
	const hashedValue = await hash(value, salt)
	return hashedValue
}
