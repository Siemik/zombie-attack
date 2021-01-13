// 0 = street block | 1 = building block
//Level 1
const levelOne = [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
                  
]
const game = document.getElementById("city")
let lineBreak = 0;
let bombs = 0;
let streetId = 0;

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
      if (bombs<3) {
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
    game.appendChild(buldingBlock)
    buldingBlock.infectable = false
  }
  // lineBreak++
  // if ((lineBreak - 9) % 10 == 10)  {
  //   game.appendChild(document.createElement("br"))
  // }
});

// zombie
const zombie = () => {
  //inicjuje pierwszego zombie
  document.getElementById("street-block-0").infected = true;
  //Sprawdza wszytkie bloki na których mogą być zombie
  let streetBlocks = Array.from(document.querySelectorAll('.street'))
  // Wypluwa tablice z wszystkimi kafelkami które są zombie
  const infectedZombies = streetBlocks.filter(isZombie => {
    return isZombie.infected == true;
  })
  console.log(infectedZombies)
  
  // Zarażanie sąsiadów 
  let position = infectedZombies[0].id.slice(13)
  console.log(position)
  // górny blok
  let positionTopNeighbor = position - 15
  // prawy blok
  let positionRightNeighbor = position + 1  
  // dolny blok
  let positionBottomNeighbor = position + 15 
  // lewy blok 
  let positionLeftNeighbor = position - 1
  //for each które przejdzie przez infectedZombies i zarazi sąsiadów
}
