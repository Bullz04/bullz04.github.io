function getPreciousForkGain() {
    let boost = function() {
        return new Decimal(1)
        .times( (temp.unlockCondition.preciousFork()) ? new Decimal(1) : new Decimal(0) )
        .times(getPreExtensionEffects("1"))
        .times(getRKaUpgradeEffect("4"))
        .times( (temp.preciousEffect.isUnlocked[3]) ? getPFEffects("4") : new Decimal(1) )
        .times( (player.achievementsGotten[34]) ? getAchRewards("35-PreciousForks") : new Decimal(1))
        .times( (player.achievementsGotten[35]) ? getAchRewards("36-PreciousForks") : new Decimal(1))
        .times( (player.achievementsGotten[45]) ? getAchRewards("46") : new Decimal(1) )
        .times( (player.achievementsGotten[52]) ? getAchRewards("53") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[18]) ? getNKaUpgradeEffect("19-PreciousForks") : new Decimal(1) )

    }

    return Decimal.log(player.repelledForks.plus(1), 10).div(1000).times(boost())
}

function buyPreciousExtension(amount) {
    if (amount == "singles") {
        if (  player.preciousForks.gte(temp.preciousExtension.preForkRequirement()) && player.karma.gte(temp.preciousExtension.karmaRequirement())  ) {
            player.preciousExtension.amount = player.preciousExtension.amount.add(1)
            if (!player.achievementsGotten[38]) player.preciousForks = new Decimal(0)
        }
    } else if (amount == "max") {
        if (  player.preciousForks.gte(temp.preciousExtension.preForkRequirement()) && player.karma.gte(temp.preciousExtension.karmaRequirement())  ) {
            player.preciousExtension.amount = temp.preciousExtension.levelGainFromKarma().min(temp.preciousExtension.levelGainFromPreForks()).plus(1)
            if (!player.achievementsGotten[38]) player.preciousForks = new Decimal(0)
        }
    }
}

function getPreExtensionDiscounts(text) {
    switch (text) {
        case "KarmaReq":
            return new Decimal(1)
            .times( (player.karmaUpgrades.nonRepeatable.isBought[7]) ? getNKaUpgradeEffect("8") : new Decimal(1) )
            .times( (player.achievementsGotten[33]) ? getAchRewards("34") : new Decimal(1) )
            .times(getJusticePointEffects("KarmaPreExtReq"))
            .times( (temp.preciousEffect.isUnlocked[8]) ? getPFEffects("9") : new Decimal(1) )
        case "PFReq": case "PreciousForkReq":
            return new Decimal(1)
            .times( (player.achievementsGotten[32]) ? getAchRewards("33") : new Decimal(1) )
        default:
            return new Decimal(1)
    }
}

function getPreExtensionScalingWeakness() {
    return new Decimal(1)
    .times( (player.karmaUpgrades.nonRepeatable.isBought[17]) ? getNKaUpgradeEffect("18") : new Decimal(1) )
}

function unlockPFEffects() {
    var unlockedPFEffects = 0
    for (i = 0; i < temp.preciousEffect.unlockCondition.length; i++) {
        var unlocked = true
        if (!player.preciousExtension.amount.gte(temp.preciousEffect.unlockCondition[i])) unlocked = false
        if (unlocked) {
            unlockedPFEffects++
        }
    }

    for (i = 0; i < unlockedPFEffects; i++) {
        temp.preciousEffect.isUnlocked[i] = true
    }
    for (i = unlockedPFEffects; i < temp.preciousEffect.isUnlocked.length; i++) {
        temp.preciousEffect.isUnlocked[i] = false
    }
}

function getPFEffectStrength() {
    return new Decimal(1)
    .times(getPreExtensionEffects("2"))
    .times( (player.achievementsGotten[25]) ? getAchRewards("26") : new Decimal(1) )
    .times( (player.achievementsGotten[26]) ? getAchRewards("27") : new Decimal(1) )
    .times( (player.achievementsGotten[27]) ? getAchRewards("28") : new Decimal(1) )
    .times( (player.achievementsGotten[37]) ? getAchRewards("38") : new Decimal(1) )
    .times( (player.karmaUpgrades.nonRepeatable.isBought[16]) ? getNKaUpgradeEffect("17") : new Decimal(1) )
}

function getReducedPFEffectStrength() {
    return Decimal.log(getPFEffectStrength().plus(1), 2)
}

function getPFEffects(text) {
    switch (text+""){
        case "1"://To fork gain
            return ExpPower(player.preciousForks, 10, 1/1.5)
            .pow(5)
            .pow(getPFEffectStrength())
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[24]) ? getNKaUpgradeEffect("25") : new Decimal(1) )
        case "2"://To key gain
            return ExpPower(player.preciousForks, 10, 1/1.5)
            .pow(3)
            .pow(getPFEffectStrength())
        case "3"://To empowered cake gain
            return ExpPower(player.preciousForks.root(10), 10, 1/3)
            .pow(getPFEffectStrength())
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[5]) ? getNKaUpgradeEffect("6") : new Decimal(1) )
        case "4"://To PF gain
            return Decimal.log(player.preciousForks.plus(100), 100)
            .pow(getPFEffectStrength())
        case "5"://To karma gain
            return Decimal.log(player.preciousForks.plus(200), 200)
            .pow(getPFEffectStrength())
        case "6"://To SW of 4th RCU
            return Decimal.log(Decimal.log(player.preciousForks.plus(10), 10).plus(9), 10).pow(2.1)
            .pow(getReducedPFEffectStrength())
        case "7"://To 3rd RCU Effect
            return Decimal.log(Decimal.log(player.preciousForks.plus(10), 10).plus(9), 10)
            .pow(getReducedPFEffectStrength())
        case "8"://To cake gain
            return ExpPower(player.preciousForks.div(1e27), 10, 1/1.5)
            .pow(getPFEffectStrength())
        case "9"://To karma req (dividing)
            return Decimal.log(player.preciousForks.plus(10), 10).root(2)
            .pow(
                Decimal.log(Decimal.log(player.preciousForks.plus(1), 10).plus(1), 10)
                .plus(1)
            )
            .pow(getPFEffectStrength())
            .pow( (player.achievementsGotten[51]) ? getAchRewards("52") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[26]) ? getNKaUpgradeEffect("27-PFE-9") : new Decimal(1) )
        case "10"://To justice point gain
            return Decimal.log(player.preciousForks.div(1e50).plus(2), 2).root(4)
            .pow(getPFEffectStrength())
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[24]) ? getNKaUpgradeEffect("25") : new Decimal(1) )
        case "11"://To Cake-EmpCake synergy
            return Decimal.log(Decimal.log(player.preciousForks.div("e230").plus(1), 10).plus(1), 10).times(4).plus(1)
            .root(2)
            .pow(getReducedPFEffectStrength())
        case "12"://To Ach 35 and 36 reward
            return Decimal.log(Decimal.log(Decimal.log(player.preciousForks.div("e254").plus(1), 10).plus(1), 10).plus(1), 10)
            .plus(1)
            .pow(getReducedPFEffectStrength())
        case "13"://FR boost Fork gain
            return Decimal.pow(
                Decimal.log(getTotalFRs().plus(10), 10).pow(2),
                getTotalFRs().root(3)
            )
            .pow(getPFEffectStrength())
        case "14"://Keys cheapen RKaU 3 and 4 cost
            return Decimal.log(player.keys.plus(2), 2).pow(15)
            .pow(getPFEffectStrength())
    }
}

function getPreExtensionEffects(text) {
    switch (text+"") {
        case "1": case "PF":
            if (true) {
                let amount = player.preciousExtension.amount
                    .add(player.preciousExtension.amount.max(20).minus(20).times(3))
                return Decimal.pow(2, amount)
            }
        case "2": case "PFEffectStrength":
            if (true) {
                let amount = player.preciousExtension.amount
                    .add(player.preciousExtension.amount.max(20).minus(20).times(0.5))
                    .add(player.preciousExtension.amount.max(40).minus(40).times(0.5))
                return amount.times(0.03).plus(1)
            }
    }
}

function getNextPFEffect() {
    let unlockedPFEffects = 0
    for (i = 0; i < temp.preciousEffect.unlockCondition.length; i++) {
        var unlocked = true
        if (!player.preciousExtension.amount.gte(temp.preciousEffect.unlockCondition[i])) unlocked = false
        if (unlocked) {
            unlockedPFEffects++
        }
    }

    if (unlockedPFEffects === temp.preciousEffect.unlockCondition.length) {
        return "All PFEs Unlocked!"
    } else {
        return "Next PFE unlocks at " + format(temp.preciousEffect.unlockCondition[unlockedPFEffects], 3, 0) + " Precious Extensions"
    }
}

function generatePF(diff) {
    player.preciousForks = player.preciousForks.add(
        getPreciousForkGain()
        .times(diff)
    )
}