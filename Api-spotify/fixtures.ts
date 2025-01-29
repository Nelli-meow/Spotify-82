import mongoose from "mongoose";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";


const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('artists');
        await db.dropCollection('users');
        await db.dropCollection('trackhistories');
    } catch (error) {
        console.log(error);
    }

    const [oxxymiron, noize] = await Artist.create(
        {
            name: 'Oxxymiron',
            photo: './fixtures/artists/scale_1200.jpeg',
            information: 'Oxxymiron information',
        },
        {
            name: 'Noize',
            photo: "./fixtures/artists/Noize_MC_MRPL_City_2018.jpg",
            information: 'Noize information',
        },
    );

    const [oxyyAlbum1, oxyyAlbum2, noizeAlbum1, noizeAlbum2] = await Album.create([
        {
            name: "Город под подошвой",
            artist: oxxymiron._id,
            photo: "./fixtures/albums/Cover_of_Gorgorod.jpg",
            year: 2015,
        },
        {
            name: "Детектор Лжи",
            artist: oxxymiron._id,
            photo: "./fixtures/albums/Cover_of_Gorgorod.jpg",
            year: 2012,
        },
        {
            name: "Новый альбом",
            artist: noize._id,
            photo: "./fixtures/albums/Noize_MC_-_Новый_альбом.jpg",
            year: 2012,
        },
        {
            name: "Последний Альбом",
            artist: noize._id,
            photo: "./fixtures/albums/Noize_MC_-_Новый_альбом.jpg",
            year: 2010,
        },
    ]);


    await Track.create([
        {
            name: "Первый трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "3:40",
            number: 5,
        },

        {
            name: "Первый трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "3:40",
            number: 5,
        },
        {
            name: "Первый трек noize",
            album: noizeAlbum1._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек noize",
            album: noizeAlbum1._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек noize",
            album: noizeAlbum1._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек noize",
            album: noizeAlbum1._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек noize",
            album: noizeAlbum1._id,
            duration: "3:40",
            number: 5,
        },
        {
            name: "Первый трек noize2",
            album: noizeAlbum2._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек noize2",
            album: noizeAlbum2._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек noize2",
            album: noizeAlbum2._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек noize2",
            album: noizeAlbum2._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек noize2",
            album: noizeAlbum2._id,
            duration: "3:40",
            number: 5,
        },
    ]);

    await User.create(
        {
            username: 'Jane',
            password: "123",
            token: randomUUID(),
            role: "user",
        },
        {
            username: 'John',
            password: "666",
            token: randomUUID(),
            role: "admin",
        }
    );

    await db.close();
};

run().catch(console.error);