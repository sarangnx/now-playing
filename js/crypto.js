import crypto from 'crypto';

/**
 * Encrypt a string and return encrypted string and IV
 *
 * @param {String} text - String to be encrypted
 */
export function encrypt(text) {
    const iv = Buffer.from(crypto.randomBytes(8)).toString('hex');
    const cipher = crypto.createCipheriv('aes-256-ctr', process.env.ENC_KEY, iv);

    let code = cipher.update(text, 'utf8', 'hex');
    code += cipher.final('hex');

    return { code, iv };
}

/**
 * Decrypt an encoded string
 *
 * @param {String} code - Encrypted String
 * @param {String} iv - IV stored with code
 */
export function decrypt(code, iv) {
    const decipher = crypto.createDecipheriv('aes-256-ctr', process.env.ENC_KEY, iv);

    let text = decipher.update(code, 'hex', 'utf8');
    text += decipher.final('utf8');

    return text;
}
