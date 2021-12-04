var achTitle = "Hover over the achievements to see details";
var achDesc = "<br>";
var achReward = "<br>";

var totalAchievements = 49
var currentHoveredAch = -1

function setHoveredAchValue(x) {
    currentHoveredAch = x
}

function normalizeAchThings() {
    setHoveredAchValue(-1)
}

function getTotalCompletedAchievements() {
    var achievementsCompleted = 0
    for (i = 0; i < totalAchievements; i++) {
        var completed = true
        if (!player.achievementsGotten[i]) completed = false
        if (completed) {
            achievementsCompleted++
        }
    }
    return achievementsCompleted
}

function getAchievementMultiplier() {
    return Decimal.pow(1.05, getTotalCompletedAchievements())
    .pow( (player.achievementsGotten[8]) ? getAchRewards("9") : new Decimal(1) )
    .pow( (player.achievementsGotten[15]) ? getAchRewards("16") : new Decimal(1) )
    .pow( (player.achievementsGotten[23]) ? getAchRewards("24") : new Decimal(1) )
}

function giveAchievement(poop) {
    player.achievementsGotten[poop] = true
}

function removeAchievement(poop) {
    player.achievementsGotten[poop] = false
}

function getAchRewards(x) {
    switch (x+"") {
        case "2":
            return new Decimal(2)
        case "8":
            return new Decimal(4)
        case "9":
            return Decimal.log(player.repelledForks.plus(2), 2).pow(0.5)
        case "12":
            let logBase = function() {
                return new Decimal(10000).pow(
                    Decimal.log(Decimal.log(player.repelledForks.plus(10), 10).plus(9), 10).pow(-2)
                ).max(1.01)
            }
            let effPower = [
                function() {
                    return Decimal.log(Decimal.log(player.repelledForks.max("e100000").div("e100000").plus(1e10), 1e10).plus(149), 150)
                    .pow(4)
                },

                function() {
                    return Decimal.log(Decimal.log(player.repelledForks.max("ee7").div("ee7").pow(1/200).plus(1e5), 1e5).plus(149), 150)
                    .pow(2)
                }
            ]
            return Decimal.log(player.repelledForks.plus(logBase()), logBase()).pow(4)
            .pow(effPower[0]())
            .pow(effPower[1]())
        case "16":
            return Decimal.log(Decimal.log(player.repelledForks.plus(10), 10).plus(9), 10).pow(2)
        case "24":
            return new Decimal(getTotalCompletedAchievements()).div(7).plus(1)
        case "26":
            return new Decimal(1.05)
        case "27":
            return new Decimal(1.10)
        case "28":
            return new Decimal(1.15)
        case "33":
            return Decimal.log(player.preciousForks.plus(10), 10)
            .pow( Decimal.log(Decimal.log(player.preciousForks.plus(10), 10).plus(9), 10).pow(3) )
        case "34":
            return Decimal.log(player.karma.plus(10), 10)
            .pow( Decimal.log(Decimal.log(player.karma.plus(10), 10).plus(9), 10).pow(4) )
        case "35.1": case "35-Karma"://To karma
            return Decimal.log(player.preciousForks.plus(10), 10).pow(1.5)
            .pow( (temp.preciousEffect.isUnlocked[11]) ? getPFEffects("12") : new Decimal(1) )
        case "35.2": case "35-PreciousForks": case "35-PF"://To precious forks
            return Decimal.log(player.karma.plus(2), 2)
            .pow( (temp.preciousEffect.isUnlocked[11]) ? getPFEffects("12") : new Decimal(1) )
        case "36.1": case "36-Karma"://To karma
            return Decimal.log(player.preciousForks.plus(10), 10).pow(1.5)
            .pow( (temp.preciousEffect.isUnlocked[11]) ? getPFEffects("12") : new Decimal(1) )
        case "36.2": case "36-PreciousForks": case "36-PF"://To precious forks
            return Decimal.log(player.karma.plus(2), 2)
            .pow( (temp.preciousEffect.isUnlocked[11]) ? getPFEffects("12") : new Decimal(1) )
        case "37":
            return new Decimal(0.05)
        case "38":
            return Decimal.log(player.preciousExtension.amount.plus(10), 10)
        //case "39" doesn't exist
        case "40":
            return Decimal.log(player.empoweredCakes.plus(6), 6).pow(10)
            .pow(
                Decimal.log(player.empoweredCakes.plus(10), 10).pow(0.5)
            )
        case "42":
            return player.karma.div(1e39).plus(1).root(2)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[15]) ? getNKaUpgradeEffect("16") : new Decimal(1) )
        case "47":
            return Decimal.log(player.karma.div(Number.MAX_VALUE).plus(10), 10).pow(3)
            .pow(
                Decimal.log(Decimal.log(player.karma.div(Number.MAX_VALUE).plus(1), 10).plus(1), 10)
                .times(0.15).plus(1).pow(3)
            )
        case "49-SW-RCU-2": case "49.1":
            return Decimal.log(Decimal.log(player.repelledForks.plus(1), 10).plus(1), 10)
            .times(0.15).plus(1).pow(6)
        case "49-SW-RCU-3": case "49.2":
            return Decimal.log(Decimal.log(player.repelledForks.plus(1), 10).plus(1), 10)
            .times(0.15).plus(1).root(4)
        default:
            return new Decimal(1);
    }
}

function checkAchievements() {
    if (player.forkRepellentAmounts[0].gte(2)) {
        giveAchievement(0)
    }

    if (player.prestigeStat[0].gte(1)) {
        giveAchievement(1)
    }

    if (player.forkRepellentAmounts[3].gte(1)) {
        giveAchievement(2)
    }

    if (player.NEUpgrades.nonRepeatable.isBought[0]) {
        giveAchievement(3)
    }

    if (player.NEUpgrades.nonRepeatable.isBought[2]) {
        giveAchievement(4)
    }

    if (player.NEUpgrades.repeatable.levels[0].gte(1)) {
        giveAchievement(5)//6-1
    }
    
    if (player.NEUpgrades.repeatable.levels[2].gte(1)) {
        giveAchievement(6)//7-1
    }

    if (player.prestigeStat[0].gte(200)) {
        giveAchievement(7)//8-1
    }

    if (player.prestigeStat[1].gte(1)) {
        giveAchievement(8)//9-1
    }

    if (player.keys.gte(1e15)) {
        giveAchievement(9)//10-1
    }

    if (player.cakes.gte(1e3)) {
        giveAchievement(10)//11-1
    }

    if (player.cakes.gte(1e6)) {
        giveAchievement(11)//12-1
    }

    if (player.empoweredCakes.gt(0)) {
        giveAchievement(12)//13-1
    }

    if (player.repelledForks.gte("1e1000")) {
        giveAchievement(13)//14-1
    }

    if (player.cakes.gte(7.75e9)) {
        giveAchievement(14)//15-1
    }
    
    if (player.empoweredCakes.gte(1e3)) {
        giveAchievement(15)//16-1
    }

    if (player.empoweredCakes.gte(1e4)) {
        giveAchievement(16)//17-1
    }

    if (player.empoweredCakes.gte(1e5)) {
        giveAchievement(17)//18-1
    }

    if (player.karma.gte(1)) {
        giveAchievement(18)//19-1
    }

    if (player.NEUpgrades.nonRepeatable.isBought[3]) {
        giveAchievement(19)//20-1
    }

    if (player.karma.gte(2)) {
        giveAchievement(20)//21-1
    }

    if (player.NEUpgrades.nonRepeatable.isBought[4]) {
        giveAchievement(21)//22-1
    }

    if (player.karma.gte(50)) {
        giveAchievement(22)//23-1
    }

    if (temp.unlockCondition.preciousFork()) {
        giveAchievement(23)//24-1
    }

    if (player.preciousExtension.amount.gte(1)) {
        giveAchievement(24)//25-1
    }

    if (player.preciousExtension.amount.gte(2)) {
        giveAchievement(25)//26-1
    }

    if (player.preciousExtension.amount.gte(8)) {
        giveAchievement(26)//27-1
    }

    if (player.preciousExtension.amount.gte(12)) {
        giveAchievement(27)//28-1
    }

    if (player.preciousForks.gte(1e6)) {
        giveAchievement(28)//29-1
    }

    if (player.karma.gte(1e6)) {
        giveAchievement(29)//30-1
    }

    if (player.preciousForks.gte(1e9)) {
        giveAchievement(30)//31-1
    }

    if (player.karma.gte(1e9)) {
        giveAchievement(31)//32-1
    }

    if (player.preciousForks.gte(1e12)) {
        giveAchievement(32)//33-1
    }

    if (player.karma.gte(1e12)) {
        giveAchievement(33)//34-1
    }

    if (player.preciousForks.gte(1e15)) {
        giveAchievement(34)//35-1
    }

    if (player.karma.gte(1e15)) {
        giveAchievement(35)//36-1
    }

    if (player.empoweredCakes.gte(1e45)) {
        giveAchievement(36)//37-1
    }

    if (player.repelledForks.gte(Decimal.pow(10, 5e6))) {
        giveAchievement(37)//38-1
    }

    if (player.empoweredCakes.gte(1e63)) {
        giveAchievement(38)//39-1
    }

    if (player.empoweredCakes.gte(1e69)) {
        giveAchievement(39)//40-1
    }

    if (player.justicePoints.gt(0)) {
        giveAchievement(40)//41-1
    }

    if (player.karma.gte(1e42)) {
        giveAchievement(41)//42-1
    }

    if (player.justicePoints.gte(1e6)) {
        giveAchievement(42)//43-1
    }

    if (player.justicePoints.gte(1e12)) {
        giveAchievement(43)//44-1
    }

    if (player.repelledForks.gte("ee9")) {
        giveAchievement(44)//45-1
    }

    if (player.karma.gte(1e200)) {
        giveAchievement(45)//46-1
    }

    if (player.karma.gte(Number.MAX_VALUE)) {
        giveAchievement(46)//47-1
    }

    if (player.karmaUpgrades.nonRepeatable.isBought[16]) {
        giveAchievement(47)//48-1
    }

    if (player.cakeUpgrades.repeatable.levels[3].gte(1e10)) {
        giveAchievement(48)//49-1
    }
}




function updateAchStyles() {
    for(i = 0; i < totalAchievements; i++) {
        if (player.achievementsGotten[i]) {
            document.getElementById("Achievement" + (i + 1)).className = "achievementUnlocked"
        } else {
            document.getElementById("Achievement" + (i + 1)).className = "achievementLocked"
        }
    }
}

function changeAchThings(x) {
    switch (x+1) {
        case 0:
            achTitle = "Hover over the achievements to see details"
            achDesc = "<br>"
            achReward = "<br>"
            break;
        case 1:
            achTitle = "Solo repeller"
            achDesc = "Have " + format(2, 3, 0) + " Fork Repellent 1's"
            achReward = "<br>"
            break;
        case 2:
            achTitle = "Lets play Ep. 1"
            achDesc = "Have " + format(1, 3, 0) + " New Episode"
            achReward = "Reward: Boost Fork gain by " + format(getAchRewards("2"), 3, 1) + "x"
            break;
        case 3:
            achTitle = "Squad repeller"
            achDesc = "Have " + format(1, 3, 0) + " Fork Repellent 4's"
            achReward = "<br>"
            break;
        case 4:
            achTitle = "Regular prestige mechanic"
            achDesc = "Buy 1st NNEU"
            achReward = "<br>"
            break;
        case 5:
            achTitle = "Reversed prestige"
            achDesc = "Buy 3rd NNEU"
            achReward = "<br>"
            break;
        case 6:
            achTitle = "Self-boost"
            achDesc = "Buy at least 1 level of 1st RNEU"
            achReward = "<br>"
            break;
        case 7:
            achTitle = "Reversed prestige II"
            achDesc = "Buy at least 1 level of 3rd RNEU"
            achReward = "<br>"
            break;
        case 8:
            achTitle = "Ep. 200"
            achDesc = "Have " + format(200, 3, 0) + " New Episodes"
            achReward = "Reward: 2nd NNEU Effect is raised ^" + format(getAchRewards("8"), 3, 1)
            break;
        case 9:
            achTitle = "HAPPY BIRTHDAY!"
            achDesc = "Have " + format(1, 3, 0) + " New Cake at Stakes"
            achReward = "Reward: Forks power up Achievement Effect"
            break;
        case 10:
            achTitle = "Key Quadrillionaire"
            achDesc = "Have " + format(1e15, 3, 0) + " Keys"
            achReward = "<br>"
            break;
        case 11:
            achTitle = "Are you full?"
            achDesc = "Have " + format(1e3, 3, 0) + " Cakes"
            achReward = "<br>"
            break;
        case 12:
            achTitle = "We can solve world hunger!!"
            achDesc = "Have " + format(1e6, 3, 0) + " Cakes"
            achReward = "Reward: Forks boost key gain"
            break;
        case 13:
            achTitle = "A collaboration of Self-boost and Logarithm exponents"
            achDesc = "Have " + format(1, 3, 0) + " Empowered Cakes"
            achReward = "<br>"
            break;
        case 14:
            achTitle = "What will you do with those forks?"
            achDesc = "Have " + format("1e1000", 3, 0) + " Forks"
            achReward = "<br>"
            break;
        case 15:
            achTitle = "Everyone is full"
            achDesc = "Have " + format(7.75e9, 3, 0) + " Cakes"
            achReward = "<br>"
            break;
        case 16:
            achTitle = "Cakes^1,000"
            achDesc = "Have " + format(1e3, 3, 0) + " Empowered Cakes"
            achReward = "Reward: Forks power up Achievement Effect"
            break;
        case 17:
            achTitle = "Cakes^10,000"
            achDesc = "Have " + format(1e4, 3, 0) + " Empowered Cakes"
            achReward = "<br>"
            break;
        case 18:
            achTitle = "Cakes^100,000"
            achDesc = "Have " + format(1e5, 3, 0) + " Empowered Cakes"
            achReward = "<br>"
            break;
        case 19:
            achTitle = "Instant Karma :)"
            achDesc = "Have " + format(1, 3, 0) + " Karma"
            achReward = "<br>"
            break;
        case 20:
            achTitle = "Superbuffed Upgrade"
            achDesc = "Buy 4th NNEU"
            achReward = "<br>"
            break;
        case 21:
            achTitle = "Double Karma"
            achDesc = "Have " + format(2, 3, 0) + " Karma"
            achReward = "<br>"
            break;
        case 22:
            achTitle = "Yeah inflation, sorry about that"
            achDesc = "Buy 5th NNEU"
            achReward = "<br>"
            break;
        case 23:
            achTitle = "You must be doing bad things"
            achDesc = "Have " + format(50, 3, 0) + " Karma"
            achReward = "<br>"
            break;
        case 24:
            achTitle = "Precious Thing OwO"
            achDesc = "Unlock Precious Forks"
            achReward = "Reward: Achievements power up achievement effect"
            break;
        case 25:
            achTitle = "Precious Forks aren't useless anymore"
            achDesc = "Have " + format(1, 3, 0) + " Precious Extensions"
            achReward = "<br>"
            break;
        case 26:
            achTitle = "IT'S GETTING USEFUL!!"
            achDesc = "Have " + format(2, 3, 0) + " Precious Extensions"
            achReward = "Reward: Boost PFE strength by " + format(getAchRewards("26"), 3, 2) + "x"
            break;
        case 27:
            achTitle = "AHHHHH!!! I CAN'T HOLD THIS ANYMORE!!!!"
            achDesc = "Have " + format(8, 3, 0) + " Precious Extensions"
            achReward = "Reward: Boost PFE strength by " + format(getAchRewards("27"), 3, 2) + "x"
            break;
        case 28:
            achTitle = "*Explodes*"
            achDesc = "Have " + format(12, 3, 0) + " Precious Extensions"
            achReward = "Reward: Boost PFE strength by " + format(getAchRewards("28"), 3, 2) + "x"
            break;
        case 29:
            achTitle = "Precious Fork Millionaire"
            achDesc = "Have " + format(1e6, 3, 0) + " Precious Forks"
            achReward = "<br>"
            break;
        case 30:
            achTitle = "Karma Millionaire"
            achDesc = "Have " + format(1e6, 3, 0) + " Karma"
            achReward = "<br>"
            break;
        case 31:
            achTitle = "Precious Fork Billionaire"
            achDesc = "Have " + format(1e9, 3, 0) + " Precious Forks"
            achReward = "<br>"
            break;
        case 32:
            achTitle = "Karma Billionaire"
            achDesc = "Have " + format(1e9, 3, 0) + " Karma"
            achReward = "<br>"
            break;
        case 33:
            achTitle = "Precious Fork Trillionaire"
            achDesc = "Have " + format(1e12, 3, 0) + " Precious Forks"
            achReward = "Reward: Precious Forks cheapen PF requirement of Precious Extension"
            break;
        case 34:
            achTitle = "Karma Trillionaire"
            achDesc = "Have " + format(1e12, 3, 0) + " Karma"
            achReward = "Reward: Karma cheapen Karma requirement of Precious Extension"
            break;
        case 35:
            achTitle = "Precious Fork Quadrillionaire"
            achDesc = "Have " + format(1e15, 3, 0) + " Precious Forks"
            achReward = "Reward: Karma and Precious Forks boost each other in gain"
            break;
        case 36:
            achTitle = "Karma Quadrillionaire"
            achDesc = "Have " + format(1e15, 3, 0) + " Karma"
            achReward = "Reward: Karma and Precious Forks boost each other in gain"
            break;
        case 37:
            achTitle = "Empowered Cake Quattuordecillionaire"
            achDesc = "Have " + format(1e45, 3, 0) + " Empowered Cakes"
            achReward = "Reward: Automatically gain Empowered Cakes without entering BaF at reduced rate"
            break;
        case 38:
            achTitle = "Welcome to the Forkverse"
            achDesc = "Have " + format(Decimal.pow(10, 5e6), 3, 0) + " Forks"
            achReward = "Reward: Precious Extensions boost PFE strength"
            break;
        case 39:
            achTitle = "Empowered Cake Vigintillionaire"
            achDesc = "Have " + format(1e63, 3, 0) + " Empowered Cakes"
            achReward = "Reward: Buying Precious Extensions no longer resets your Precious Forks"
            break;
        case 40:
            achTitle = "Empowered Cake Niceillionaire"
            achDesc = "Have " + format(1e69, 3, 0) + " Empowered Cakes"
            achReward = "Reward: Empowered Cakes boost Cake gain"
            break;
        case 41:
            achTitle = "Kinda like a prestige layer, but also kinda not!?"
            achDesc = "Have " + format(1, 3, 0) + " Justice Points"
            achReward = "<br>"
            break;
        case 42:
            achTitle = "A wild Achievement42 appeared"
            achDesc = "Have " + format(1e42, 3, 0) + " Karma"
            achReward = "Reward: Karma boosts Justice Point gain"
            break;
        case 43:
            achTitle = "Quite much JP"
            achDesc = "Have " + format(1e6, 3, 0) + " Justice Points"
            achReward = "<br>"
            break;
        case 44:
            achTitle = "Quite much JP^2"
            achDesc = "Have " + format(1e12, 3, 0) + " Justice Points"
            achReward = "<br>"
            break;
        case 45:
            achTitle = "LNGI Forks"
            achDesc = "Have " + format("ee9", 3, 0) + " Forks"
            achReward = "<br>"
            break;
        case 46:
            achTitle = "I've been waiting for new prestige layer..."
            achDesc = "Have " + format(1e200, 3, 0) + " Karma"
            achReward = "<br>"
            break;
        case 47:
            achTitle = "NOW WHERE IS IT!!!??"
            achDesc = "Have " + format(Number.MAX_VALUE, 3, 0) + " Karma"
            achReward = "Reward: Karma boosts Justice Point gain"
            break;
        case 48:
            achTitle = "+" + format(getNKaUpgradeEffect("17").minus(1).times(100), 3, 2) + "% more precious extensions =)"
            achDesc = "Buy 17th NKaU"
            achReward = "<br>"
            break;
        case 49:
            achTitle = "Not even big compared to 10{{{Forks}}}10"
            achDesc = "Have " + format(1e10, 3, 0) + " levels of 4th RCU"
            achReward = "Reward: Forks boost SW of 2nd and 3rd RCU"
            break;
        default:
            achTitle = "Coming Soon"
            achDesc = "To be added on next update"
            achReward = "<br>"
            break;
    }
}

function updateAchievements() {
    document.getElementById("achievementTitle").innerHTML = achTitle
    document.getElementById("achievementDescription").innerHTML = achDesc
    document.getElementById("achievementReward").innerHTML = achReward
    document.getElementById("AchievementMultiplier").innerHTML = format(getAchievementMultiplier(), 3, 2)
}

setInterval(() => {
    updateAchievements()
    updateAchStyles()
    checkAchievements()
    changeAchThings(currentHoveredAch)
}, 30)