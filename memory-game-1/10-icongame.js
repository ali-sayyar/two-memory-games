let score = document.querySelector('.tries span')
let y = 0


document.querySelector('.loser button').onclick = () => {
    location.reload()
}
document.querySelector('.winer button').onclick = function () {
    location.reload()
}


document.querySelector(".control-buttons span").onclick = function () {
    this.parentElement.remove();

    let name = prompt("add your name:");
    if (name == null || name == '') {
        document.querySelector('.name span').innerHTML = 'Unwnow'
    } else {
        document.querySelector('.name span').innerHTML = name
    }

    let m = document.querySelector('.timer .m')
    let mm = setInterval(() => {
        m.innerHTML = parseInt(m.innerHTML) - 1
    }, 59000)

    let s = document.querySelector('.timer .s')
    let ss = setInterval(() => {
        s.innerHTML = parseInt(s.innerHTML) - 1
        if (s.innerHTML == 0 && m.innerHTML == 0) {
            clearInterval(ss)
            clearInterval(mm)
            document.querySelector('.loser').style.display = 'flex'
            document.getElementById('loser').play()
        }
        if (s.innerHTML == 0 && m.innerHTML != 0) {
            s.innerHTML = 59
        }
    }, 1000)

};

let blockscontainer = document.querySelector('.memory-game-blocks')
let blocks = Array.from(blockscontainer.children)

let order = [...Array(blocks.length).keys()]
rendom(order)


function rendom(array) {
    let length = array.length,
        random,
        y

    while (length > 0) {
        random = Math.floor(Math.random() * length)
        length--
        y = array[length]
        array[length] = array[random]
        array[random] = y
    }
    return array
}

blocks.forEach((block, i) => {
    block.style.order = order[i]
    block.addEventListener('click', function () {
        document.getElementById('click').play()
        addclass(block)

    })

})

function addclass(params) {
    params.classList.add('is-flipped')
    let towblocks = blocks.filter(block => {
        return block.classList.contains("is-flipped")
    })

    if (towblocks.length == 2) {
        blockscontainer.classList.add('no-clicking')
        setTimeout(function () {
            blockscontainer.classList.remove('no-clicking')
            check(towblocks[0], towblocks[1])

        }, 1000)
    }

}


function check(block1, block2) {
    if (block1.dataset.tk === block2.dataset.tk) {
        document.querySelector('#success').play()

        block1.classList.remove('is-flipped')
        block2.classList.remove('is-flipped')

        block1.classList.add('has-match')
        block2.classList.add('has-match')


        y += 2

        if (y == blocks.length) {
            document.getElementById('win').play()
            document.querySelector('#foul').innerHTML = score.innerHTML
            document.querySelector('.winer').style.display = 'flex'
        }
    } else {
        document.querySelector('#fail').play()
        score.innerHTML ++
        block1.classList.remove('is-flipped')
        block2.classList.remove('is-flipped')
    }
}
