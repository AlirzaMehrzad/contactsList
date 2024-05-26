import { DataTypes } from "sequelize"

export default function(sequelize){
    return sequelize.define('contactsCategory', {
        name: {
            type: DataTypes.STRING(20), 
        }
    })
}