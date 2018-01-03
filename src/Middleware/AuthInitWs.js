'use strict'

const Base = use('Adonis/Middleware/AuthInit')

class AuthInitWs  {
  async wsHandle (context, next) {
    // call next to advance the request
    await Base.handle(context, next)
  }
}

module.exports = AuthInitWs
