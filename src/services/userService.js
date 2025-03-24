const db = require('../config/db');

exports.usernameExist = (username) => {
    return new Promise((resolve, reject) => {
        const sqlstr = 'SELECT * FROM users WHERE username = ?';
        db.query(sqlstr, username, (err, result) => {
            if (err) {
                reject(err.message);
            }
            if (result.length !== 0) {
                resolve(result[0]);
            } else {
                reject('user not exist');
            }
        })
    })
}

exports.getUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sqlstr = 'SELECT * FROM users WHERE id = ?';
        db.query(sqlstr, userId, (err, result) => {
            if (err) {
                reject(err.message);
            }
            if (result.length !== 0) {
                resolve(result[0]);
            } else {
                resolve(false);
            }
        })
    })
}

// 新增用户 必要字段只有名字和密码
exports.addUser = (userInfo) => {
    return new Promise((resolve, reject) => {
        const sqlstr = 'INSERT INTO users SET ?'
        const insertData = { ...userInfo, id: ''}
        db.query(sqlstr, insertData, (err, result) => {
            if (err){
                reject(err.message)
            }
            // 返回插入的结果，可以获取到插入的 ID 等信息
            if (result && result.affectedRows === 1){
                resolve(result)
            }else {
                reject('insert failed')// 就是另一边收到的err
            }
        })
    })
}

// 更新用户
exports.updateUser = (userInfo) => {
    return new Promise((resolve, reject) => {
        const updateData = { ...userInfo }
        delete updateData.id // 防止id被修改

        const sqlstr = 'UPDATE users SET ? WHERE id = ?'
        db.query(sqlstr, [updateData, userInfo.id], (err, result) => {
            if (err){
                reject(err.message)
            }
            if (result && result.affectedRows === 1){
                resolve(result)
            }else {
                reject('update failed')
            }
        })
    })
}