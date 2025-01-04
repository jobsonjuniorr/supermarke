import connectionMysql from '../db/db.js';

export const findUserByEmail = async (email) => {
    const connection = await connectionMysql();
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();
    return rows[0];
};

export const createUser = async (email, hashedPassword) => {
    const connection = await connectionMysql();
    const [result] = await connection.query(
        'INSERT INTO users (email, senha) VALUES (?, ?)',
        [email, hashedPassword]
    );
    await connection.end(); 
    return result.insertId;
};