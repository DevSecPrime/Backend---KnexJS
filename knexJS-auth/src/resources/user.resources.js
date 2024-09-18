export default class UserResource {
  constructor(data) {
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.password = data.password
    this.account_type = data.account_type
  }
}


