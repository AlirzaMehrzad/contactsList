import { DataTypes } from "sequelize"

export default function(sequelize){
    return sequelize.define('UserCategory', {
        name: {
            type: DataTypes.STRING(20), 
        }
    })
}