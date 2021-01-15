// 0 = street block | 1 = building block
//Level 1
const levelOne = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,
                  1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,
                  1,0,0,1,0,0,0,0,1,0,1,1,0,0,0,1,0,1,1,0,1,0,1,
                  1,0,1,1,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1,1,1,0,1,
                  1,0,0,1,0,1,0,0,1,1,1,1,0,0,1,1,0,1,1,0,1,0,1,
                  1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,
                  1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,
                  1,1,0,0,1,1,0,0,1,1,1,0,0,1,0,1,0,1,1,0,1,0,1,
                  1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,1,1,0,1,0,1,
                  1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,
                  1,0,0,1,1,1,0,0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,1,
                  1,0,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,0,1,0,1,
                  1,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,
                  1,1,1,1,1,1,1,1,1,1,1,1,1,1
                  
]
levelOne.lineBreake=23;
const game = document.getElementById("city")
let streetId = 0;
let gameLoopCounter = 0
let time = 500

game.addEventListener('contextmenu', e => {
  e.preventDefault();
});

// Sprawdza co na mapie jest budynkiem, co ulicą i robi na tej podstawie odpowiedniego diva
levelOne.forEach((element) => {
  // Tworzy ulice 
  if(!element) {
    const streetBlock = document.createElement("div")
    streetBlock.className = "street"
    game.appendChild(streetBlock);
    streetBlock.infectable = true;
    streetBlock.infected = false;
    streetBlock.id= "street-block-" + streetId;
    streetId++;
    // Dodaje możliwość stworzenia barykady
    streetBlock.addEventListener("click", () => {
      streetBlock.infecteable = false
      streetBlock.className = "street-bombed"
    })
   // Dodaje możliwość stworzenia dodania źródła zombie
    streetBlock.addEventListener("contextmenu", () => {
      streetBlock.infecteable = true;
      streetBlock.className = "zombie"
      streetBlock.infected= true;
    })
  }
  // Tworzy budynek 
  else {
    const buldingBlock = document.createElement("div")
    buldingBlock.className = "building"
    buldingBlock.id= "street-block-" + streetId;
    game.appendChild(buldingBlock)
    buldingBlock.infectable = false
    streetId++;
  }
  //Jest sens używać br'ów?
  //Tak- jeśli poziomy mają mieć różne kształty mapy

  // lineBreak++
  // if ((lineBreak - 9) % 10 == 10)  {
  //   game.appendChild(document.createElement("br"))
  // }
});

// Funkcja zarażania ulic
const zombie = () => {
  //Sprawdza wszytkie bloki na których są zombie
  let streetBlocks = Array.from(document.querySelectorAll('.zombie'))
  // Wypluwa tablice z wszystkimi kafelkami które są zombie
  const infectedZombies = streetBlocks.filter(isZombie => {
    return isZombie.infected == true;
  })

  infectedZombies.forEach((zombie) =>{
    let endLoop = 0
    let position = zombie.id.slice(13)
    
    // Zarażanie sąsiadów 
    // górny blok
    let positionTopNeighbor = Number(position) - levelOne.lineBreake;
    let topNeighbor = document.getElementById("street-block-"+positionTopNeighbor)
    if (topNeighbor.className == "street") {
      topNeighbor.className = "zombie"
      topNeighbor.infected = true;
    }
    else {
      endLoop++
    }

    // prawy blok
    let positionRightNeighbor = Number(position)+ 1
    let rightNeighbor = document.getElementById("street-block-"+positionRightNeighbor)
    if (rightNeighbor.className == "street") {
      rightNeighbor.className = "zombie"
      rightNeighbor.infected = true;
    }
    else {
      endLoop++
    }

    // dolny blok
    let positionBottomNeighbor = Number(position) + levelOne.lineBreake;
    let bottomNeighbor = document.getElementById("street-block-"+positionBottomNeighbor)
    if (bottomNeighbor.className == "street") {
      bottomNeighbor.className = "zombie"
      bottomNeighbor.infected = true;
    }
    else {
      endLoop++
    }

    // lewy blok 
    let positionLeftNeighbor = Number(position) - 1
    let leftNeighbor = document.getElementById("street-block-"+positionLeftNeighbor)
    if (leftNeighbor.className == "street") {
      leftNeighbor.className = "zombie"
      leftNeighbor.infected = true;
    }
    else {
      endLoop++
    }

    //jeśli żaden zombiak nie ma sąsiadów do zakarzenia to kończy loop 
    if (endLoop < 4) {
      console.log("funkcja gameLoop została odpalona")
      gameLoop()
      time = time + 200
    }
  })
}
const gameLoop = () => setTimeout( () => {
 zombie()
}, time)

//Start button
document.getElementById("start-attack").addEventListener('click', gameLoop)