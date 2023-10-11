module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres', 
    password: 'postgres',
    database: 'devclub',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}