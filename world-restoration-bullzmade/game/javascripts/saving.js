//taken from SuperSpruce

function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && !isNaN(new Decimal(object[i]).mag) && !(new Decimal(object[i]).sign == 0 && object[i] != "0")) {
            object[i] = new Decimal(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
                merge(base[i], source[i]);
            } else {
                if (isDecimal(base[i]) && !isDecimal(source[i])) {
                    base[i] = new Decimal(source[i]);
                } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                    base[i] = source[i].toNumber();
                } else {
                    base[i] = source[i];
                }
            }
        }
    }
}


function isDecimal(x) {
    if (x.mag == undefined) {
        return false;
    } else {
        return true;
    }
}

var savegame;

function save() {
  localStorage.setItem("wr-bullzmade", JSON.stringify(player));
}

function load() {
  if (localStorage.getItem("wr-bullzmade")) {
    savegame = JSON.parse(localStorage.getItem("wr-bullzmade"));
    objectToDecimal(savegame);
    merge(player, savegame);
  }
}

function confirmHardReset() {
    if (confirm("Are you sure you want to hard reset? Hard reset returns back to where you start (Not prestige).")) {
        superConfirmHardReset();
    } else {
        alert("You saved your progress :D");
    }
}

function superConfirmHardReset() {
    if (confirm("ARE YOU REALLY SURE YOU WANT TO DO THAT??? YOU\'LL KILL YOUR PROGRESS!! THIS IS YOUR LAST CHANCE")) {
        hardReset();
    } else {
        alert("Pheww. I thought You want to kill your game :O");
    }
}

function exportSave() {
  return btoa(JSON.stringify(player));
}

//return btoa(JSON.stringify(player));

function importSave(text) {
    if (text == "secret") location.reload()
    if (text == "") console.warn("You did nothing on it!")
    savegame = JSON.parse(atob(text));
    objectToDecimal(savegame);
    merge(player, savegame);
    
    save();
}