import BaseModel from '@models/base'
import Experience from '@models/experience'

export default interface User extends BaseModel {
  username?: string,
  email?: string,
  first_name?: string,
  last_name?: string,
  address?: string,
  experiences?: Experience[]
}

export function fullName (user: User): string {
  return user ? `${user.first_name} ${user.last_name}` : ''
}
