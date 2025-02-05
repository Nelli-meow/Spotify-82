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

    const [oxxymiron, noize, LSP] = await Artist.create(
        {
            name: 'Oxxymiron',
            photo: './fixtures/artists/scale_1200.jpeg',
            information: 'Oxxymiron information',
            isPublished: 'true',
        },
        {
            name: 'Noize',
            photo: "./fixtures/artists/Noize_MC_MRPL_City_2018.jpg",
            information: 'Noize information',
            isPublished: 'true',
        },
        {
            name: 'ЛСП',
            photo: "./fixtures/artists/LSP_logo.jpg",
            information: 'ЛСП information',
            isPublished: 'false',
        },
    );

    const [oxyyAlbum1, oxyyAlbum2, noizeAlbum1, noizeAlbum2, LSPAlbum] = await Album.create([
        {
            name: "Город под подошвой",
            artist: oxxymiron._id,
            image: "./fixtures/albums/Cover_of_Gorgorod.jpg",
            year: 2015,
            isPublished: 'true',
        },
        {
            name: "Детектор Лжи",
            artist: oxxymiron._id,
            image: "./fixtures/albums/Cover_of_Gorgorod.jpg",
            year: 2012,
            isPublished: 'true',
        },
        {
            name: "Новый альбом",
            artist: noize._id,
            image: "./fixtures/albums/Noize_MC_-_Новый_альбом.jpg",
            year: 2012,
            isPublished: 'true',
        },
        {
            name: "Последний Альбом",
            artist: noize._id,
            image: "./fixtures/albums/Noize_MC_-_Новый_альбом.jpg",
            year: 2010,
            isPublished: 'true',
        },
        {
            name: "Последний Альбом",
            artist: LSP._id,
            image: "./fixtures/albums/274px-Виселицца.jpg",
            year: 2010,
            isPublished: 'false',
        },
    ]);


    await Track.create([
        {
            name: "Первый трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "3:15",
            number: 1,
            isPublished: 'true',
        },
        {
            name: "Второй трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "4:20",
            number: 2,
            isPublished: 'true',
        },
        {
            name: "Третий трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "2:50",
            number: 3,
            isPublished: 'true',
        },
        {
            name: "Четвертый трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "3:40",
            number: 4,
            isPublished: 'true',
        },
        {
            name: "Пятый трек oxxxy",
            album: oxyyAlbum1._id,
            duration: "3:40",
            number: 5,
            isPublished: 'true',
        },

        {
            name: "Первый трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "3:15",
            number: 1,
            isPublished: 'true',
        },
        {
            name: "Второй трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "4:20",
            number: 2,
            isPublished: 'true',
        },
        {
            name: "Третий трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "2:50",
            number: 3,
            isPublished: 'true',
        },
        {
            name: "Четвертый трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "3:40",
            number: 4,
            isPublished: 'true',
        },
        {
            name: "Пятый трек oxxxy2",
            album: oxyyAlbum2._id,
            duration: "3:40",
            number: 5,
            isPublished: 'true',
        },
        {
            name: "Первый трек noize",
            album: noizeAlbum1._id,
            duration: "3:15",
            number: 1,
            isPublished: 'true',
        },
        {
            name: "Второй трек noize",
            album: noizeAlbum1._id,
            duration: "4:20",
            number: 2,
            isPublished: 'true',
        },
        {
            name: "Третий трек noize",
            album: noizeAlbum1._id,
            duration: "2:50",
            number: 3,
            isPublished: 'true',
        },
        {
            name: "Четвертый трек noize",
            album: noizeAlbum1._id,
            duration: "3:40",
            number: 4,
            isPublished: 'true',
        },
        {
            name: "Пятый трек noize",
            album: noizeAlbum1._id,
            duration: "3:40",
            number: 5,
            isPublished: 'true',
        },
        {
            name: "Первый трек noize2",
            album: noizeAlbum2._id,
            duration: "3:15",
            number: 1,
            isPublished: 'true',
        },
        {
            name: "Второй трек noize2",
            album: noizeAlbum2._id,
            duration: "4:20",
            number: 2,
            isPublished: 'true',
        },
        {
            name: "Третий трек noize2",
            album: noizeAlbum2._id,
            duration: "2:50",
            number: 3,
            isPublished: 'true',
        },
        {
            name: "Четвертый трек noize2",
            album: noizeAlbum2._id,
            duration: "3:40",
            number: 4,
            isPublished: 'true',
        },
        {
            name: "Пятый трек noize2",
            album: noizeAlbum2._id,
            duration: "3:40",
            number: 5,
            isPublished: 'true',
        },
        {
            name: "первый трек лсп",
            album: LSPAlbum._id,
            duration: "2:50",
            number: 1,
            isPublished: 'false',
        },
        {
            name: "второй трек лсп",
            album: LSPAlbum._id,
            duration: "3:40",
            number: 2,
            isPublished: 'false',
        },
        {
            name: "третий трек лсп",
            album: LSPAlbum._id,
            duration: "3:40",
            number: 3,
            isPublished: 'false',
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