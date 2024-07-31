import { sequelize } from "../config/db.js";
import { DataTypes} from '@sequelize/core'
import uniqid from "uniqid";

import {
	Attribute,
	PrimaryKey,
	NotNull,
	Default,
	Unique,
	DeletedAt,
	Index,
	ColumnName,
} from "@sequelize/core/decorators-legacy";

const Song = sequelize.define('Song', {
    id:{
        type: DataTypes.STRING(18),
        primaryKey: true, 
        defaultValue: () => uniqid()
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    album: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        columnName: 'release_date'
    },
    coverImg: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'cover_img'
    },
    cloudinaryPublicId: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'cloudinary_public_id'
    },
    cloudinarySecureUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'cloudinary_secure_url'
    },
    
}, {timestamps: true, tableName: 'songs'})

const Artist = sequelize.define('Artist', {
    id:{
        type: DataTypes.STRING(18),
        primaryKey: true, 
        defaultValue: () => uniqid()
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'No bio available'
    },
    coverImg: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'cover_img'
    },
    cloudinaryPublicId: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'cloudinary_public_id'
    },
    cloudinarySecureUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'cloudinary_secure_url'
    },
}, {
    timestamps: true,
    tableName: 'artists'
})

const User = sequelize.define('User', {
    id:{
        type: DataTypes.STRING(18),
        primaryKey: true, 
        defaultValue: () => uniqid()
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        index: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'users'
})


Artist.hasMany(Song, {foreignKey:'artistId', as: 'songs'})
Song.belongsTo(Artist, {foreignKey: "artistId"})

User.hasMany(Artist, {foreignKey: 'userId' })
Artist.belongsTo(User, {foreignKey: 'userId'})

sequelize.sync()

export { Song, Artist, User }