function tri(numbers, order) {
    if (order === "asc") {
        return numbers.sort((a, b) => a - b);
    } else (order === "desc"); {
        return numbers.sort((a, b) => b - a);
    }

}

let tableau = [5, 25, 9, 84];
console.log(tri(tableau, "asc"));
console.log(tri(tableau, "desc"));
