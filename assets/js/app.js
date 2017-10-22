const created = Array.from(document.querySelectorAll('[data-dates]'));
console.log(created)
    const cretedDate = created
        .map(function (node) {
            //node.innerText;
            const [dayName, month, day, year, time, GMT, area] = node.innerText.split(' ');
            node.innerText = `${month} ${year}`;
        });