function jourtravaille(date) {
    const joursFeries2020 = [
        new Date(2020, 0, 1),
        new Date(2020, 3, 13),
        new Date(2020, 4, 1),
        new Date(2020, 4, 8),
        new Date(2020, 4, 21),
        new Date(2020, 5, 1),
        new Date(2020, 6, 14),
        new Date(2020, 7, 15),
        new Date(2020, 10, 1),
        new Date(2020, 10, 11),
        new Date(2020, 11, 25)
    ];

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    for (let jf of joursFeries2020) {
        if (jf.getDate() === day && jf.getMonth() === date.getMonth() && jf.getFullYear() === year) {
            console.log(`Le ${day} ${month} ${year} est un jour férié.`);
            return;
        }
    }

    const dayWeek = date.getDate();
    if (dayWeek === 0 || dayWeek === 6) {
        console.log(`Non, ${day} ${month} ${year} est un week-end`);
        return;
    }

    console.log(`Oui, ${day} ${month} ${year} est un jour de travail`);
}

jourtravaille(new Date(2020, 0, 1));
jourtravaille(new Date(2020, 0, 6));
jourtravaille(new Date(2020, 0, 2));