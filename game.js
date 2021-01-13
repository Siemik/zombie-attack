// 0 = street block | 1 = building block
//Level 1
const levelOne = [0,0,0,0,0,0,0,1,1,1,
                  0,1,1,0,1,1,0,1,1,1,
                  0,1,1,0,1,1,0,1,1,1,
                  0,0,0,0,0,0,0,0,0,0,
                  0,1,1,0,1,1,0,1,1,0,
                  0,1,1,0,1,1,0,1,1,0,
                  0,1,1,0,1,1,1,1,1,0,
                  0,0,0,0,1,1,0,1,1,0,
                  0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,1,1,0,1,1,0,
                  0,0,0,0,1,1,0,1,1,0,
                  0,0,0,0,0,0,0,0,0,0,
                  0,1,0,1,1,1,0,1,1,0,
                  0,0,0,0,0,0,0,0,0,0,
]
const game = document.getElementById("game")
let lineBreak = 0;
// Create city
// For each na który sprawdza co na mapie jest budynkiem, co ulicą i robi na tej podstawie odpoiwedniego diva
levelOne.forEach((element) => {
  if(!element) {
    const streetBlock = document.createElement("div")
    streetBlock.className = "street"
    game.appendChild(streetBlock);
  }
  else {
    const buldingBlock = document.createElement("div")
    buldingBlock.className = "building"
    const buildingImg = document.createElement("img")
    buildingImg.className = "building-img"
    buildingImg.src = "building.png"
    game.appendChild(buldingBlock)
    buldingBlock.appendChild(buildingImg)
  }
  lineBreak++
  if ((lineBreak - 9) % 10 == 1)  {
    game.appendChild(document.createElement("br"))
  }
});
