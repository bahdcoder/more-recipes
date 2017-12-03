import path from 'path';
import Email from 'email-templates';
import nodeMailer from 'nodemailer';
import config from './../config/index';
/**
 *Emails with node mailer
 *
 * @export
 * @class Mail
 */
export default class Mail {
  /**
   * Creates an instance of Mail.
   * @param {obj} template the email template to use
   * @param {obj} message the message details: subject, from etc
   * @memberof Mail
   */
  constructor(template, message = {}) {
    this.message = message;
    this.transporter = nodeMailer.createTransport({
      service: config.MAILER.SERVICE,
      auth: {
        user: config.MAILER.USER, // generated ethereal user
        pass: config.MAILER.PASS // generated ethereal password
      }
    });
    this.template = template;
  }

  /**
   * Set the recipient of the email
   *
   * @param {any} user Instance of sequelize user
   * @returns {obj} this, for chainability
   * @memberof Mail
   */
  to(user) {
    this.recipient = user;
    return this;
  }

  /**
   * Send the email
   *
   * @returns {Promise} confirm email send, or throw error
   * @memberof Mail
   */
  async send() {
    if (!this.recipient) {
      return Promise.reject(new Error('No user provided'));
    }
    if (!this.message) {
      return Promise.reject(new Error('No message provided'));
    }

    const email = new Email({
      message: {
        from: '👻 Bahdcoder More-recipes',
        subject: `👻 ${this.message.subject || 'Bahdcoder More-recipes'}`,
        to: this.recipient.email
      },
      transport: this.transporter,
      send: true,
      preview: false,
      views: {
        root: path.resolve('server/emails')
      }
    });

    try {
      const results = await email.send({
        template: this.template.pug,
        locals: { ...this.template.locals }
      });

      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
