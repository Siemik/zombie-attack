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
    const buildingImg = document.createElement("img")
    buildingImg.className = "building-img"
    buildingImg.src = "building.png"
    game.appendChild(buldingBlock)
    buldingBlock.appendChild(buildingImg)
    buldingBlock.infectable = false
  }
  lineBreak++
  if ((lineBreak - 9) % 10 == 10)  {
    game.appendChild(document.createElement("br"))
  }
});
