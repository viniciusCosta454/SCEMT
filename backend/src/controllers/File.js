const connection = require("../database/connection")

module.exports = {
    create(namePhoto, path, empresa_id) {
        var query = `
            INSERT INTO files (
                namePhoto,
                path,
                empresa_id
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        var values = [
            namePhoto,
            path,
            empresa_id
        ]

        return connection.query(query, values)
    }
}