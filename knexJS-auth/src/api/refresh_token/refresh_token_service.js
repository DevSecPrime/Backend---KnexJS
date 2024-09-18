import moment from 'moment'
import knex from '../../comman/config/database'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

class RefreshTokenService {
  /**
   * @param {*} expiresAt
   * @param {string} jti
   */

  async createRefreshToken(jti, expiresAt) {
    const newJti = crypto.randomBytes(32).toString('hex')

    await knex('refresh_token').insert({
      id: newJti,
      accessTokenId: jti,
      expiresAt: moment
        .unix(expiresAt)
        .add(process.env.REFRESH_TOKEN_EXPIRES)
        .format('YYYY-MM-DD'),
    })

    return newJti
  };
  
}

export default new RefreshTokenService();
