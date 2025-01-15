import mongoose from "mongoose";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import config from "./config";


const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('artists');
    } catch (error) {
        console.log(error);
    }

    const [oxxymiron, noize] = await Artist.create(
        {
            name: 'Oxxymiron',
            photo: 'oxxy.pmg',
            information: 'Oxxymiron information',
        },
        {
            name: 'Noize',
            photo: 'Noize.pmg',
            information: 'Noize information',
        },
    );

    const [oxyyAlbum1, oxyyAlbum2, noizeAlbum1, noizeAlbum2] = await Album.create([
        {
            name: "Город под подошвой",
            artist: oxxymiron._id,
            photo: "album1.png",
            year: 2015,
        },
        {
            name: "Детектор Лжи",
            artist: oxxymiron._id,
            photo: "album2.png",
            year: 2012,
        },
        {
            name: "Новый альбом",
            artist: noize._id,
            photo: "album3.png",
            year: 2012,
        },
        {
            name: "Последний Альбом",
            artist: noize._id,
            photo: "album4.png",
            year: 2010,
        },
    ]);


    await Track.create([
        {
            name: "Первый трек",
            album: oxyyAlbum1._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек",
            album: oxyyAlbum1._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек",
            album: oxyyAlbum1._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек",
            album: oxyyAlbum1._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек",
            album: oxyyAlbum1._id,
            duration: "3:40",
            number: 5,
        },

        {
            name: "Первый трек",
            album: oxyyAlbum2._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек",
            album: oxyyAlbum2._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек",
            album: oxyyAlbum2._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек",
            album: oxyyAlbum2._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек",
            album: oxyyAlbum2._id,
            duration: "3:40",
            number: 5,
        },
        {
            name: "Первый трек",
            album: noizeAlbum1._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек",
            album: noizeAlbum1._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек",
            album: noizeAlbum1._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек",
            album: noizeAlbum1._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек",
            album: noizeAlbum1._id,
            duration: "3:40",
            number: 5,
        },
        {
            name: "Первый трек",
            album: noizeAlbum2._id,
            duration: "3:15",
            number: 1,
        },
        {
            name: "Второй трек",
            album: noizeAlbum2._id,
            duration: "4:20",
            number: 2,
        },
        {
            name: "Третий трек",
            album: noizeAlbum2._id,
            duration: "2:50",
            number: 3,
        },
        {
            name: "Четвертый трек",
            album: noizeAlbum2._id,
            duration: "3:40",
            number: 4,
        },
        {
            name: "Пятый трек",
            album: noizeAlbum2._id,
            duration: "3:40",
            number: 5,
        },
    ]);

    await db.close();
};

run().catch(console.error);