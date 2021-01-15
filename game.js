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
const game = document.getElementById("city")
// let lineBreak = 0;
let bombs = 0;
let streetId = 0;
let gameLoopCounter = 0
let time = 500

// Create city
// For each na który sprawdza co na mapie jest budynkiem, co ulicą i robi na tej podstawie odpoiwedniego diva
levelOne.forEach((element) => {
  // streets 
  if(!element) {
    const streetBlock = document.createElement("div")
    streetBlock.className = "street"
    game.appendChild(streetBlock);
    streetBlock.infectable = true;
    streetBlock.infected = false;
    streetBlock.id= "street-block-" + streetId;
    streetId++;
    // bombs 
    streetBlock.addEventListener("click", () => {
      if (bombs<5) {
        streetBlock.infecteable = false
        streetBlock.className = "street-bombed"
        bombs++;
      }
    })
  }
  // buildings 
  else {
    const buldingBlock = document.createElement("div")
    buldingBlock.className = "building"
    buldingBlock.id= "street-block-" + streetId;
    game.appendChild(buldingBlock)
    buldingBlock.infectable = false
    streetId++;
  }
  // lineBreak++
  // if ((lineBreak - 9) % 10 == 10)  {
  //   game.appendChild(document.createElement("br"))
  // }
});

// zombie
const zombie = () => {
  //inicjuje pierwszego zombie
  document.getElementById("street-block-102").infected = true;
  document.getElementById("street-block-102").newInfected = 0;
  document.getElementById("street-block-102").className = "zombie";
  //Sprawdza wszytkie bloki na których mogą być zombie
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
    let positionTopNeighbor = Number(position) - 23;
    let topNeighbor = document.getElementById("street-block-"+positionTopNeighbor)
    if (topNeighbor.className == "street") {
      topNeighbor.className = "zombie"
      topNeighbor.newInfected = 0;
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
      rightNeighbor.newInfected = 0;
      rightNeighbor.infected = true;
    }
    else {
      endLoop++
    }

    // dolny blok
    let positionBottomNeighbor = Number(position) + 23;
    let bottomNeighbor = document.getElementById("street-block-"+positionBottomNeighbor)
    if (bottomNeighbor.className == "street") {
      bottomNeighbor.className = "zombie"
      bottomNeighbor.newInfected = 0;
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
      leftNeighbor.newInfected = 0;
      leftNeighbor.infected = true;
    }
    else {
      endLoop++
    }

    //jeśli żaden zombiak nie ma sąsiadów to zakarzenia to kończy loop 
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