'use strict'

class CreateJob {
  get rules () {
    return {
      title: 'required',
      link: 'required'
    }
  }

  /**
   *
   * @returns {{required: string}}
   */

  get messages() {
    return {
      'required': 'Hold up, the {{ field }} is required.'
    }
  }

  /**
   *
   * @param error
   * @returns {Promise<never|Response>}
   */

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateJob
