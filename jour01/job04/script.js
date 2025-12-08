function bissextile(annee) {
    let result = (annee % 4 === 0 && annee % 100 != 0) || annee % 400 === 0
        ? `${annee} est une année bissextile`
        : `${annee} n'est pas une année bissextile`;

    console.log(result);
}

bissextile(2000);
