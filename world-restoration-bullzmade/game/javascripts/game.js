class Player {
    constructor() {
        this.version = "v1.0.1"
        this.lastUpdate = Date.now()
        this.repelledForks = new Decimal(0)
        this.preciousForks = new Decimal(0)
        this.preciousExtension = {
            amount : new Decimal(0)
        }
        this.keys = new Decimal(0)
        this.gainedKeys = new Decimal(0)
        this.automator = {
            autoFRs : {
                isUnlocked : false,
                isActive : false
            },
            autoRNEUs : {
                isUnlocked : false,
                isActive : false
            },
            autoNNEUs : {
                isUnlocked : false,
                isActive : false
            },
            autoNewEpisodes : {
                isUnlocked : false,
                isActive : false
            }
        }
        this.prestigeStat = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0)
        ]
        this.forkRepellentAmounts = [
            new Decimal(1), new Decimal(0), new Decimal(0), new Decimal(0),
            new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),
            new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)
        ]
        this.NEUpgrades = {
            nonRepeatable : {
                isBought : [
                    false, false, false, false,
                    false, false, false, false
                ]
            },
            repeatable : {
                levels : [
                    new Decimal(0), new Decimal(0), new Decimal(0)
                ]
            }
        }
        this.cakeUpgrades = {
            nonRepeatable : {
                isBought : [
                    false, false, false, false,
                    false, false, false, false
                ]
            },
            repeatable : {
                levels : [
                    new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)
                ]
            }
        }
        this.cakes = new Decimal(0)
        this.gainedCakes = new Decimal(0)
        this.empoweredCakes = new Decimal(0)
        this.brakeAtFlake = {
            isActive : false
        }
        this.karma = new Decimal(0)
        this.gainedKarma = new Decimal(0)
        this.karmaUpgrades = {
            nonRepeatable : {
                isBought : [
                    false, false, false, false,
                    false, false, false, false,
                    false, false, false, false,
                    false, false, false, false,
                    false, false, false, false
                ]
            },
            repeatable : {
                levels : [
                    new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)
                ]
            }
        }
        this.justicePoints = new Decimal(0)
        this.theJudgement = {
            isActive : false
        }
        this.options = {
            notation : "scientific"
        }
        this.achievementsGotten = [
            false,false,false,false,false,false,false,//7
            false,false,false,false,false,false,false,//14
            false,false,false,false,false,false,false,//21
            false,false,false,false,false,false,false,//28
            false,false,false,false,false,false,false,//35
            false,false,false,false,false,false,false,//42
            false,false,false,false,false,false,false
        ]
    }
}

let player = new Player()

let temp = {
    unlockCondition : {
        NCaS : function() { return player.keys.gte(1e10) || player.cakes.gt(0) || player.gainedCakes.gt(0) || player.prestigeStat[1].gt(0) || temp.unlockCondition.NC() },
        empCakes : function() { return player.cakes.gte(1e6) || temp.unlockCondition.NC() },
        NC : function() { return player.cakes.gte(1e20) || player.karma.gt(0) || player.gainedKarma.gt(0) || player.prestigeStat[2].gt(0) },
        preciousFork : function() { return player.karma.gte(1e3) || player.preciousForks.gt(0) },
        theJudgement : function() { return player.karma.gte(1e30) || player.justicePoints.gt(0) }
    },

    automator : {
        autoFRs : {
            requirement : function() { return player.karma.gte(1) }
        },
        autoRNEUs : {
            requirement : function() { return player.karma.gte(30) }
        },
        autoNNEUs : {
            requirement : function() { return player.karma.gte(100) }
        },
        autoNewEpisodes : {
            requirement : function() { return player.karma.gte(50) }
        }
    },

    forkRepellent : {
        costFormula : [
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[0].minus(1)).times(10).times(Decimal.pow(1.7, 0))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[1].minus(0)).times(10).times(Decimal.pow(1.7, 1))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[2].minus(0)).times(10).times(Decimal.pow(1.7, 2))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[3].minus(0)).times(10).times(Decimal.pow(1.7, 3))   },

            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[4].minus(0)).times(10).times(Decimal.pow(1.7, 4))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[5].minus(0)).times(10).times(Decimal.pow(1.7, 5))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[6].minus(0)).times(10).times(Decimal.pow(1.7, 6))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[7].minus(0)).times(10).times(Decimal.pow(1.7, 7))   },

            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[8].minus(0)).times(10).times(Decimal.pow(1.7, 8))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[9].minus(0)).times(10).times(Decimal.pow(1.7, 9))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[10].minus(0)).times(10).times(Decimal.pow(1.7, 10))   },
            function() {   return Decimal.pow(1.5, player.forkRepellentAmounts[11].minus(0)).times(10).times(Decimal.pow(1.7, 11))   }
        ],
        
        amountGain : [
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 0)).div(10), 1.5).plus(1).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 1)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 2)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 3)).div(10), 1.5).plus(0).floor()   },

            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 4)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 5)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 6)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 7)).div(10), 1.5).plus(0).floor()   },

            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 8)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 9)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 10)).div(10), 1.5).plus(0).floor()   },
            function() {   return Decimal.log(player.repelledForks.div(Decimal.pow(1.7, 11)).div(10), 1.5).plus(0).floor()   }
        ],
        isUnlocked : [
             true, false, false, false,
            false, false, false, false,
            false, false, false, false
        ]
    },

    NEUpgrades : {
        nonRepeatable : {
            isUnlocked : [
                true, true, true, false,
                false, false, false, false
            ],
            cost : [
                new Decimal(10), new Decimal(25), new Decimal(150), new Decimal(1e9),
                new Decimal(1e30), new Decimal(1e90), new Decimal("1e1400"), new Decimal("1e3000")
            ]
        },
        repeatable : {
            costFormula : [
                function() {//keys boost its gain
                    return Decimal.pow(
                        10,
                        Decimal.pow(
                            1.5,
                            player.NEUpgrades.repeatable.levels[0].div(1).div(getRNEUScalingWeakness(0))
                            .plus(2.85)
                        )
                    )
                    .div(getRNEUDiscounts(0))
                },

                function() {//Stronger 1st NNEU Effect
                    return Decimal.pow(
                        10,
                        (player.NEUpgrades.repeatable.levels[1].div(2).div(getRNEUScalingWeakness(1)).plus(1))
                        .pow(3)
                    )
                    .times(500).div(getRNEUDiscounts(1))
                },

                function() {//forks boost keys
                    return Decimal.pow(
                        10,
                        player.NEUpgrades.repeatable.levels[2].div(3).div(getRNEUScalingWeakness(2)).plus(1)
                        .pow(5)
                    )
                    .times(1e3).div(getRNEUDiscounts(2))
                }
            ],
            levelGain : [
                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.keys.times(getRNEUDiscounts(0)),
                            10
                        ),
                        1.5
                    ).minus(2.85).times(1).times(getRNEUScalingWeakness(0))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        player.keys.div(500).times(getRNEUDiscounts(1)),
                        10
                    ).pow(1/3).minus(1).times(2).times(getRNEUScalingWeakness(1))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        player.keys.div(1e3).times(getRNEUDiscounts(2)),
                        10
                    ).pow(1/5).minus(1).times(3).times(getRNEUScalingWeakness(2))
                    .floor()
                }
            ]
        }
    },

    cakeUpgrades : {
        nonRepeatable : {
            isUnlocked : [
                true, true, true, true,
                false, false, false, false
            ],
            cost : [
                new Decimal(1), new Decimal(10), new Decimal(50), new Decimal(1000),
                new Decimal(3e6), new Decimal(1e10), new Decimal(1e14), new Decimal(1e19)
            ]
        },
        repeatable : {
            costFormula : [
                function() {
                    return Decimal.pow(
                        10,
                        player.cakeUpgrades.repeatable.levels[0].div(100).div(getRCUScalingWeaknesses(0)).plus(1.05)
                        .pow(3)
                    )
                    .div(getRCUDiscounts(0))
                },

                function() {
                    return Decimal.pow(
                        10,
                        Decimal.pow(
                            1.5,
                            player.cakeUpgrades.repeatable.levels[1].div(5).div(getRCUScalingWeaknesses(1)).plus(1.5)
                        )
                    )
                    .div(getRCUDiscounts(1))
                },

                function() {
                    return Decimal.pow(
                        10,
                        Decimal.pow(
                            2,
                            player.cakeUpgrades.repeatable.levels[2].div(1).div(getRCUScalingWeaknesses(2)).plus(1.6)
                        )
                    )
                    .div(getRCUDiscounts(2))
                },
                
                function() {
                    return Decimal.pow(
                        10,
                        Decimal.pow(
                            1.5,
                            player.cakeUpgrades.repeatable.levels[3].div(1).div(getRCUScalingWeaknesses(3)).plus(4.5)
                        )
                    )
                    .div(getRCUDiscounts(3))
                }
            ],
            levelGain : [
                function() {
                    return Decimal.log(
                        player.cakes.times(getRCUDiscounts(0)),
                        10
                    ).pow(1/3).minus(1.05).times(100).times(getRCUScalingWeaknesses(0))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.cakes.times(getRCUDiscounts(1)),
                            10
                        ),
                        1.5
                    ).minus(1.5).times(5).times(getRCUScalingWeaknesses(1))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.cakes.times(getRCUDiscounts(2)),
                            10
                        ),
                        2
                    ).minus(1.6).times(1).times(getRCUScalingWeaknesses(2))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.cakes.times(getRCUDiscounts(3)),
                            10
                        ),
                        1.5
                    ).minus(4.5).times(1).times(getRCUScalingWeaknesses(3))
                    .floor()
                }
            ]
        }
    },

    karmaUpgrades : {
        nonRepeatable : {
            isUnlocked : [
                true, true, true, true,
                true, true, true, true,
                true, true, false, false,
                false, false, false, false,
                false, false, false, false
            ],
            cost : [
                new Decimal(2), new Decimal(10), new Decimal(200), new Decimal(500),
                new Decimal(2.5e3), new Decimal(1e10), new Decimal(1e12), new Decimal(1e14),
                new Decimal(1e20), new Decimal(1e25), new Decimal(1e35), new Decimal(1e40),
                new Decimal(1e65), new Decimal(1e115), new Decimal(1e170), new Decimal(1e211),
                new Decimal("1e485"), new Decimal("1e740"), new Decimal("1e1260"), new Decimal("1e1275")

            ]
        },
        repeatable : {
            costFormula : [
                function() {
                    return Decimal.pow(
                        10,
                        player.karmaUpgrades.repeatable.levels[0].div(200).div(getRKaUScalingWeaknesses(0)).plus(1.05)
                        .pow(3)
                    )
                },

                function() {
                    return Decimal.pow(
                        10,
                        Decimal.pow(
                            1.075,
                            player.karmaUpgrades.repeatable.levels[1].div(getRKaUScalingWeaknesses(1)).plus(26)
                        )
                    )
                    .div(2e6)
                },

                function() {
                    return Decimal.pow(
                        4,
                        Decimal.pow(
                            1.075,
                            player.karmaUpgrades.repeatable.levels[2].div(getRKaUScalingWeaknesses(2)).plus(16)
                            .pow(1.3)
                        )
                    )
                    .div(2e6)
                },

                function() {
                    return Decimal.pow(
                        10,
                        Decimal.pow(
                            1.2,
                            player.karmaUpgrades.repeatable.levels[3].div(getRKaUScalingWeaknesses(3)).plus(5)
                        )
                    )
                    .times(4)
                }
            ],
            levelGain : [
                function() {
                    return Decimal.log(
                        player.karma,
                        10
                    ).pow(1/3).minus(1.05).times(200).times(getRKaUScalingWeaknesses(0))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.karma.times(2e6),
                            10
                        ),
                        1.075
                    ).minus(26).times(getRKaUScalingWeaknesses(1))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.karma.times(2e6),
                            4
                        ),
                        1.075
                    ).pow(1/1.3).minus(16).times(getRKaUScalingWeaknesses(2))
                    .floor()
                },

                function() {
                    return Decimal.log(
                        Decimal.log(
                            player.karma.div(4),
                            10
                        ),
                        1.2
                    ).minus(5).times(getRKaUScalingWeaknesses(3))
                    .floor()
                },
            ],
        }
    },

    preciousExtension : {
        karmaRequirement : function() {
            return Decimal.pow(
                1.2,
                player.preciousExtension.amount.div(getPreExtensionScalingWeakness()).plus(1).pow(2)
            )
            .times(1000/1.2)
            .div(getPreExtensionDiscounts("KarmaReq"))
        },
        preForkRequirement : function () {
            return Decimal.pow(
                4,
                player.preciousExtension.amount.div(getPreExtensionScalingWeakness()).plus(2).pow(1.25)
            )
            .div(getPreExtensionDiscounts("PFReq"))
        },
        levelGainFromKarma : function () {
            return Decimal.log(
                player.karma.div(1000/1.2).times(getPreExtensionDiscounts("KarmaReq")),
                1.2
            ).pow(1/2).minus(1).times(getPreExtensionScalingWeakness())
            .floor()
        },
        levelGainFromPreForks : function () {
            return Decimal.log(
                player.preciousForks.times(getPreExtensionDiscounts("PFReq")),
                4
            ).pow(1/1.25).minus(2).times(getPreExtensionScalingWeakness())
            .floor()
        }
    },

    preciousEffect : {
        unlockCondition : [
            new Decimal(1), new Decimal(2), new Decimal(4), new Decimal(8),
            new Decimal(9), new Decimal(12), new Decimal(16), new Decimal(23),
            new Decimal(30), new Decimal(40), new Decimal(125), new Decimal(210)
        ],
        isUnlocked : [
            false, false, false, false,
            false, false, false, false,
            false, false, false, false
        ]
    }
}



/*
(1.2^(((x/sw)+a)^2))*1000 = cost
1.2^(((x/sw)+a)^2) = cost/1000
((x/sw)+a)^2 = log1.2(cost/1000)
(x/sw)+a = (log1.2(cost/1000))^1/2
x/sw = ((log1.2(cost/1000))^1/2)-a
x = (((log1.2(cost/1000))^1/2)-a)*sw


4^(x+4) = a
x+4 = log4(a)
x = log4(a)-4
*/




async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    /*
    if (response) {
        hideloader();
    }
    show(data);
    */
}




function prestige(i, reward = true) {
    let mainReset = function() {
        for (i = 0; i < player.forkRepellentAmounts.length; i++) {
            if (i == 0) {
                player.forkRepellentAmounts[i] = new Decimal(1)
            } else {
                player.forkRepellentAmounts[i] = new Decimal(0)
            }
            
        }
        player.repelledForks = new Decimal(0)
    }
    if (i == 0 && getKeyGain().gt(0)) {
        if (reward) {
            player.keys = player.keys.add(getKeyGain())
            player.gainedKeys = player.gainedKeys.add(getKeyGain())
            player.prestigeStat[0] = player.prestigeStat[0].add(getNewEpisodeGain())
        }
        mainReset()
    }
    
    if (i == 1 && getCakeGain().gt(0)) {
        if (reward) {
            player.cakes = player.cakes.add(getCakeGain())
            player.gainedCakes = player.gainedCakes.add(getCakeGain())
            player.prestigeStat[1] = player.prestigeStat[1].add(getNCaSGain())
        }
        
        for (e = 0; e < player.NEUpgrades.nonRepeatable.isBought.length; e++) {
            player.NEUpgrades.nonRepeatable.isBought[e] = false
        }
        for (e = 0; e < player.NEUpgrades.repeatable.levels.length; e++) {
            player.NEUpgrades.repeatable.levels[e] = new Decimal(0)
        }

        player.keys = new Decimal(0)
        player.gainedKeys = new Decimal(0)
        mainReset()
    }

    if (i == 2 && getKarmaGain().gt(0)) {
        if (reward) {
            player.karma = player.karma.add(getKarmaGain())
            player.gainedKarma = player.gainedKarma.add(getKarmaGain())
            player.prestigeStat[2] = player.prestigeStat[2].add(getNCgain())
        }

        for (e = 0; e < player.cakeUpgrades.nonRepeatable.isBought.length; e++) {
            player.cakeUpgrades.nonRepeatable.isBought[e] = false
        }

        for (e = 0; e < player.cakeUpgrades.repeatable.levels.length; e++) {
            if (e == 0) {
                player.cakeUpgrades.repeatable.levels[e] = new Decimal(10)
            } else {
                player.cakeUpgrades.repeatable.levels[e] = new Decimal(0)
            }
        }

        player.cakes = new Decimal(0)
        player.empoweredCakes = new Decimal(0)
        player.gainedCakes = new Decimal(0)
        prestige(1, false)
    }

}

function getForkBoosts() {
    return new Decimal(1)
    .times( (player.achievementsGotten[1]) ? getAchRewards("2") : new Decimal(1) )
    .times(getAchievementMultiplier())
    .times( (player.NEUpgrades.nonRepeatable.isBought[0]) ? getNNEUpgradeEffect("1") : new Decimal(1) )
    .times( (player.NEUpgrades.nonRepeatable.isBought[1]) ? getNNEUpgradeEffect("2") : new Decimal(1) )
    .times( (player.cakeUpgrades.nonRepeatable.isBought[1]) ? getNCUpgradeEffect("2") : new Decimal(1) )
    .times( (player.cakeUpgrades.nonRepeatable.isBought[5]) ? getNCUpgradeEffect("6") : new Decimal(1) )
    .times( (temp.preciousEffect.isUnlocked[0]) ? getPFEffects("1") : new Decimal(1) )
    .root( (player.theJudgement.isActive) ? new Decimal(1000) : new Decimal(1) )
}

function getForkGain() {
    return getForkBaseProduction()
    .times(getForkBoosts())
}

function forkTick(diff) {
    player.repelledForks = player.repelledForks.add(
        getForkGain()
        .times(diff)
    )
}

function updateText() {
    document.getElementById("PreciousForks").innerHTML = format(player.preciousForks, 3, 0)
    document.getElementById("PreciousForksPerSecond").innerHTML = format(getPreciousForkGain(), 3, 2)
    document.getElementById("PFEffectStrength").innerHTML = format(getPFEffectStrength().times(100), 3, 2) + "%"
    document.getElementById("ReducedPFEffectStrength").innerHTML = format(getReducedPFEffectStrength().times(100), 3, 2) + "%"
    document.getElementById("NextPFE").innerHTML = getNextPFEffect()

    document.getElementById("PFEffectBoost1").innerHTML = format(getPFEffects("1"), 3, 2)
    document.getElementById("PFEffectBoost2").innerHTML = format(getPFEffects("2"), 3, 2)
    document.getElementById("PFEffectBoost3").innerHTML = format(getPFEffects("3"), 3, 2)
    document.getElementById("PFEffectBoost4").innerHTML = format(getPFEffects("4"), 3, 3)
    document.getElementById("PFEffectBoost5").innerHTML = format(getPFEffects("5"), 3, 3)
    document.getElementById("PFEffectBoost6").innerHTML = format(getPFEffects("6"), 3, 3)
    document.getElementById("PFEffectBoost7").innerHTML = format(getPFEffects("7"), 3, 3)
    document.getElementById("PFEffectBoost8").innerHTML = format(getPFEffects("8"), 3, 3)
    document.getElementById("PFEffectBoost9").innerHTML = format(getPFEffects("9"), 3, 2)
    document.getElementById("PFEffectBoost10").innerHTML = format(getPFEffects("10"), 3, 3)
    document.getElementById("PFEffectBoost11").innerHTML = format(getPFEffects("11"), 3, 3)
    document.getElementById("PFEffectBoost12").innerHTML = format(getPFEffects("12"), 3, 3)

    document.getElementById("PreciousExtensions").innerHTML = format(player.preciousExtension.amount, 3, 0)
    document.getElementById("PreciousExtensionReq1").innerHTML = format(player.karma, 3, 0) + "/" + format(temp.preciousExtension.karmaRequirement().ceil(), 3, 0)
    document.getElementById("PreciousExtensionReq2").innerHTML = format(player.preciousForks, 3, 0) + "/" + format(temp.preciousExtension.preForkRequirement().ceil(), 3, 0)
    document.getElementById("PreciousExtensionSW").innerHTML = format(getPreExtensionScalingWeakness().times(100), 3, 2)

    document.getElementById("PreExtensionEffect1").innerHTML = format(getPreExtensionEffects("1"), 3, 2)
    document.getElementById("PreExtensionEffect2").innerHTML = format(getPreExtensionEffects("2"), 3, 3)


    document.getElementById("RepelledForks").innerHTML = format(player.repelledForks, 3, 0)
    for (i = 0; i < 12; i++) {
        let prod = function(i) {
            return Decimal.pow(1.1, player.forkRepellentAmounts[i])
            .div( (i == 0) ? 1.1 : 1 )
            .times(player.forkRepellentAmounts[i])
        };

        document.getElementById("ForksRequired" + (i + 1)).innerHTML = format(
            Decimal.pow(1.5, player.forkRepellentAmounts[i].minus( (i == 0) ? 1 : 0 ))
            .times(10)
            .times(Decimal.pow(1.7, i))
        , 3, 0);
        document.getElementById("FRDetails" + (i + 1)).innerHTML = `
            Amount: ${format(player.forkRepellentAmounts[i], 3, 0)}<br>
            Base prod: <span style="font-size: 13px;">+${format(prod(i), 3, 2)}<img src="images/fork.png" alt="Fork Image" width="15" height="15">/s</span>
        `;
    }
    document.getElementById("ForksPerSecond").innerHTML = format(getForkGain(), 3, 2)

    document.getElementById("KeyAmount").innerHTML = format(player.keys, 3, 0)
    document.getElementById("PendingKeys").innerHTML = format(getKeyGain(), 3, 0)
    document.getElementById("GainedKeyAmount").innerHTML = format(player.gainedKeys, 3, 0)
    document.getElementById("NewEpisodeAmount").innerHTML = format(player.prestigeStat[0], 3, 0)

    document.getElementById("CakeAmount").innerHTML = format(player.cakes, 3, 0)
    document.getElementById("EmpCakeAmount").innerHTML = format(player.empoweredCakes, 3, 0)
    document.getElementById("PendingCakes").innerHTML = format(getCakeGain(), 3, 0)
    document.getElementById("GainedCakeAmount").innerHTML = format(player.gainedCakes, 3, 0)
    document.getElementById("NewCakeatStakeAmount").innerHTML = format(player.prestigeStat[1], 3, 0)
    document.getElementById("BaFButtonText").innerHTML = ( (player.brakeAtFlake.isActive) ? "End Brake at Flake run<br>for " + format(getEmpoweredCakeGain(), 3, 0) + " Empowered Cakes" : "Start<br>Brake at Flake run" )
    document.getElementById("NextEmpCake").innerHTML = format(getNextEmpoweredCake(), 3, 0)
    document.getElementById("EmpCakeEffect").innerHTML = format(
        Decimal.log(player.keys.plus(10), 10)
        .pow(Decimal.log(player.empoweredCakes.plus(1), 2))
    , 3, 3)

    document.getElementById("KarmaAmount").innerHTML = format(player.karma, 3, 0)
    document.getElementById("PendingKarma").innerHTML = format(getKarmaGain(), 3, 0)
    document.getElementById("GainedKarmaAmount").innerHTML = format(player.gainedKarma, 3, 0)
    document.getElementById("NewContestAmount").innerHTML = format(player.prestigeStat[2], 3, 0)
    document.getElementById("JusticePointAmount").innerHTML = format(player.justicePoints, 3, 0)
    document.getElementById("TheJudgementButtonText").innerHTML = ( (player.theJudgement.isActive) ? "End The Judgement run<br>for " + format(getJusticePointGain(), 3, 0) + " Justice Points" : "Start<br>The Judgement run" )
    document.getElementById("JusticePointEffect1").innerHTML = format(getJusticePointEffects("Karma"), 3, 3)
    document.getElementById("JusticePointEffect2").innerHTML = format(getJusticePointEffects("KarmaReq"), 3, 2)






    document.getElementById("PrestigeLayerUnlockRequirement1").innerHTML = format(1e10, 3, 0) + " Keys"
    document.getElementById("PrestigeLayerUnlockRequirement2").innerHTML = format(1e20, 3, 0) + " Cakes"

    document.getElementById("PreciousForkUnlockRequirement").innerHTML = format(1e3, 3, 0) + " Karma"
    document.getElementById("EmpCakesUnlockRequirement").innerHTML = format(1e6, 3, 0) + " Cakes"
    document.getElementById("TheJudgementUnlockRequirement").innerHTML = format(1e30, 3, 0) + " Karma"



    document.getElementById("AutomatorReq1").innerHTML = format(1, 3, 0)
    document.getElementById("AutomatorReq2").innerHTML = format(30, 3, 0)
    document.getElementById("AutomatorReq3").innerHTML = format(100, 3, 0)

    document.getElementById("AchRewardEffect2").innerHTML = format(getAchRewards("2"), 3, 1)
    document.getElementById("AchRewardEffect8").innerHTML = format(getAchRewards("8"), 3, 1)
    document.getElementById("AchRewardEffect9").innerHTML = format(getAchRewards("9"), 3, 3)
    document.getElementById("AchRewardEffect12").innerHTML = format(getAchRewards("12"), 3, 2)
    document.getElementById("AchRewardEffect16").innerHTML = format(getAchRewards("16"), 3, 3)
    document.getElementById("AchRewardEffect24").innerHTML = format(getAchRewards("24"), 3, 3)
    document.getElementById("AchRewardEffect26").innerHTML = format(getAchRewards("26"), 3, 2)
    document.getElementById("AchRewardEffect27").innerHTML = format(getAchRewards("27"), 3, 2)
    document.getElementById("AchRewardEffect28").innerHTML = format(getAchRewards("28"), 3, 2)
    document.getElementById("AchRewardEffect33").innerHTML = format(getAchRewards("33"), 3, 2)
    document.getElementById("AchRewardEffect34").innerHTML = format(getAchRewards("34"), 3, 2)
    document.getElementById("AchRewardEffect35.1").innerHTML = format(getAchRewards("35-Karma"), 3, 3)
    document.getElementById("AchRewardEffect35.2").innerHTML = format(getAchRewards("35-PF"), 3, 3)
    document.getElementById("AchRewardEffect36.1").innerHTML = format(getAchRewards("36-Karma"), 3, 3)
    document.getElementById("AchRewardEffect36.2").innerHTML = format(getAchRewards("36-PF"), 3, 3)
    document.getElementById("AchRewardEffect37").innerHTML = format(getAchRewards("37"), 3, 2)
    document.getElementById("AchRewardEffect38").innerHTML = format(getAchRewards("38"), 3, 3)
    //document.getElementById("AchRewardEffect39").innerHTML doesn't exist
    document.getElementById("AchRewardEffect40").innerHTML = format(getAchRewards("40"), 3, 3)
    document.getElementById("AchRewardEffect42").innerHTML = format(getAchRewards("42"), 3, 3)
    document.getElementById("AchRewardEffect47").innerHTML = format(getAchRewards("47"), 3, 3)
    document.getElementById("AchRewardEffect49.1").innerHTML = format(getAchRewards("49-SW-RCU-2"), 3, 3)
    document.getElementById("AchRewardEffect49.2").innerHTML = format(getAchRewards("49-SW-RCU-3"), 3, 3)







    document.getElementById("RNEUpgradeCost1").innerHTML = format(temp.NEUpgrades.repeatable.costFormula[0]().ceil(), 3, 0)
    document.getElementById("RNEUpgradeCost2").innerHTML = format(temp.NEUpgrades.repeatable.costFormula[1]().ceil(), 3, 0)
    document.getElementById("RNEUpgradeCost3").innerHTML = format(temp.NEUpgrades.repeatable.costFormula[2]().ceil(), 3, 0)

    document.getElementById("RNEUpgradeLevel1").innerHTML = format(player.NEUpgrades.repeatable.levels[0], 3, 0)
    document.getElementById("RNEUpgradeLevel2").innerHTML = format(player.NEUpgrades.repeatable.levels[1], 3, 0)
    document.getElementById("RNEUpgradeLevel3").innerHTML = format(player.NEUpgrades.repeatable.levels[2], 3, 0)

    document.getElementById("RNEUpgradeEffect1").innerHTML = format(getRNEUpgradeEffect("1"), 3, 3)
    document.getElementById("RNEUpgradeEffect2").innerHTML = format(getRNEUpgradeEffect("2"), 3, 3)
    document.getElementById("RNEUpgradeEffect3").innerHTML = format(getRNEUpgradeEffect("3"), 3, 3)

    document.getElementById("RNEUScalingWeakness1").innerHTML = format(getRNEUScalingWeakness(0).times(100), 3, 2)
    document.getElementById("RNEUScalingWeakness2").innerHTML = format(getRNEUScalingWeakness(1).times(100), 3, 2)
    document.getElementById("RNEUScalingWeakness3").innerHTML = format(getRNEUScalingWeakness(2).times(100), 3, 2)

    document.getElementById("NNEUpgradeCost1").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[0], 3, 0)
    document.getElementById("NNEUpgradeCost2").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[1], 3, 0)
    document.getElementById("NNEUpgradeCost3").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[2], 3, 0)
    document.getElementById("NNEUpgradeCost4").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[3], 3, 0)
    document.getElementById("NNEUpgradeCost5").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[4], 3, 0)
    document.getElementById("NNEUpgradeCost6").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[5], 3, 0)
    document.getElementById("NNEUpgradeCost7").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[6], 3, 0)
    document.getElementById("NNEUpgradeCost8").innerHTML = format(temp.NEUpgrades.nonRepeatable.cost[7], 3, 0)
    

    document.getElementById("NNEUpgradeEffect1").innerHTML = format(getNNEUpgradeEffect("1"), 3, 2)
    document.getElementById("NNEUpgradeEffect2").innerHTML = format(getNNEUpgradeEffect("2"), 3, 2)
    document.getElementById("NNEUpgradeEffect3").innerHTML = format(getNNEUpgradeEffect("3"), 3, 2)
    document.getElementById("NNEUpgradeEffect4").innerHTML = format(getNNEUpgradeEffect("4"), 3, 3)
    document.getElementById("NNEUpgradeEffect5").innerHTML = format(getNNEUpgradeEffect("5"), 3, 3)
    document.getElementById("NNEUpgradeEffect6").innerHTML = format(getNNEUpgradeEffect("6"), 3, 3)
    document.getElementById("NNEUpgradeEffect7").innerHTML = format(getNNEUpgradeEffect("7"), 3, 3)
    document.getElementById("NNEUpgradeEffect8").innerHTML = format(getNNEUpgradeEffect("8"), 3, 3)
    
    










    document.getElementById("RCUpgradeCost1").innerHTML = format(temp.cakeUpgrades.repeatable.costFormula[0]().ceil(), 3, 0)
    document.getElementById("RCUpgradeCost2").innerHTML = format(temp.cakeUpgrades.repeatable.costFormula[1]().ceil(), 3, 0)
    document.getElementById("RCUpgradeCost3").innerHTML = format(temp.cakeUpgrades.repeatable.costFormula[2]().ceil(), 3, 0)
    document.getElementById("RCUpgradeCost4").innerHTML = format(temp.cakeUpgrades.repeatable.costFormula[3]().ceil(), 3, 0)

    document.getElementById("RCUScalingWeakness1").innerHTML = format(getRCUScalingWeaknesses(0).times(100), 3, 2)
    document.getElementById("RCUScalingWeakness2").innerHTML = format(getRCUScalingWeaknesses(1).times(100), 3, 2)
    document.getElementById("RCUScalingWeakness3").innerHTML = format(getRCUScalingWeaknesses(2).times(100), 3, 2)
    document.getElementById("RCUScalingWeakness4").innerHTML = format(getRCUScalingWeaknesses(3).times(100), 3, 2)
    
    document.getElementById("RCUpgradeEffect1").innerHTML = format(getRCUpgradeEffect("1"), 3, 3)
    document.getElementById("RCUpgradeEffect2").innerHTML = format(getRCUpgradeEffect("2"), 3, 3)
    document.getElementById("RCUpgradeEffect3").innerHTML = format(getRCUpgradeEffect("3"), 3, 3)
    document.getElementById("RCUpgradeEffect4").innerHTML = format(getRCUpgradeEffect("4"), 3, 3)

    document.getElementById("RCUpgradeLevel1").innerHTML = format(player.cakeUpgrades.repeatable.levels[0], 3, 0)
    document.getElementById("RCUpgradeLevel2").innerHTML = format(player.cakeUpgrades.repeatable.levels[1], 3, 0)
    document.getElementById("RCUpgradeLevel3").innerHTML = format(player.cakeUpgrades.repeatable.levels[2], 3, 0)
    document.getElementById("RCUpgradeLevel4").innerHTML = format(player.cakeUpgrades.repeatable.levels[3], 3, 0)


    document.getElementById("NCUpgradeEffect1").innerHTML = format(getNCUpgradeEffect("1"), 3, 2)
    document.getElementById("NCUpgradeEffect2").innerHTML = format(getNCUpgradeEffect("2"), 3, 2)
    document.getElementById("NCUpgradeEffect3").innerHTML = format(getNCUpgradeEffect("3"), 3, 4)
    document.getElementById("NCUpgradeEffect4").innerHTML = format(getNCUpgradeEffect("4"), 3, 3)
    document.getElementById("NCUpgradeEffect5").innerHTML = format(getNCUpgradeEffect("5"), 3, 3)
    document.getElementById("NCUpgradeEffect6").innerHTML = format(getNCUpgradeEffect("6"), 3, 3)
    document.getElementById("NCUpgradeEffect7.1").innerHTML = format(getNCUpgradeEffect("7.1"), 3, 3)
    document.getElementById("NCUpgradeEffect7.2").innerHTML = format(getNCUpgradeEffect("7.2"), 3, 3)
    document.getElementById("NCUpgradeEffect8").innerHTML = format(getNCUpgradeEffect("8"), 3, 2)

    document.getElementById("NCUpgradeCost1").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[0], 3, 0)
    document.getElementById("NCUpgradeCost2").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[1], 3, 0)
    document.getElementById("NCUpgradeCost3").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[2], 3, 0)
    document.getElementById("NCUpgradeCost4").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[3], 3, 0)
    document.getElementById("NCUpgradeCost5").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[4], 3, 0)
    document.getElementById("NCUpgradeCost6").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[5], 3, 0)
    document.getElementById("NCUpgradeCost7").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[6], 3, 0)
    document.getElementById("NCUpgradeCost8").innerHTML = format(temp.cakeUpgrades.nonRepeatable.cost[7], 3, 0)










    document.getElementById("RKaUpgradeCost1").innerHTML = format(temp.karmaUpgrades.repeatable.costFormula[0]().ceil(), 3, 0)
    document.getElementById("RKaUpgradeCost2").innerHTML = format(temp.karmaUpgrades.repeatable.costFormula[1]().ceil(), 3, 0)
    document.getElementById("RKaUpgradeCost3").innerHTML = format(temp.karmaUpgrades.repeatable.costFormula[2]().ceil(), 3, 0)
    document.getElementById("RKaUpgradeCost4").innerHTML = format(temp.karmaUpgrades.repeatable.costFormula[3]().ceil(), 3, 0)

    document.getElementById("RKaUScalingWeakness1").innerHTML = format(getRKaUScalingWeaknesses(0).times(100), 3, 2)
    document.getElementById("RKaUScalingWeakness2").innerHTML = format(getRKaUScalingWeaknesses(1).times(100), 3, 2) 
    document.getElementById("RKaUScalingWeakness3").innerHTML = format(getRKaUScalingWeaknesses(2).times(100), 3, 2) 
    document.getElementById("RKaUScalingWeakness4").innerHTML = format(getRKaUScalingWeaknesses(3).times(100), 3, 2) 

    document.getElementById("RKaUpgradeLevel1").innerHTML = format(player.karmaUpgrades.repeatable.levels[0], 3, 0)
    document.getElementById("RKaUpgradeLevel2").innerHTML = format(player.karmaUpgrades.repeatable.levels[1], 3, 0)
    document.getElementById("RKaUpgradeLevel3").innerHTML = format(player.karmaUpgrades.repeatable.levels[2], 3, 0)
    document.getElementById("RKaUpgradeLevel4").innerHTML = format(player.karmaUpgrades.repeatable.levels[3], 3, 0)

    document.getElementById("RKaUpgradeEffect1").innerHTML = format(getRKaUpgradeEffect("1"), 3, 3)
    document.getElementById("RKaUpgradeEffect2").innerHTML = format(getRKaUpgradeEffect("2"), 3, 3)
    document.getElementById("RKaUpgradeEffect3").innerHTML = format(getRKaUpgradeEffect("3"), 3, 3)
    document.getElementById("RKaUpgradeEffect4.1").innerHTML = format(getRKaUpgradeEffect("4-Base"), 3, 2)
    document.getElementById("RKaUpgradeEffect4.2").innerHTML = format(getRKaUpgradeEffect("4"), 3, 2)

    document.getElementById("NKaUpgradeCost1").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[0], 3, 0)
    document.getElementById("NKaUpgradeCost2").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[1], 3, 0)
    document.getElementById("NKaUpgradeCost3").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[2], 3, 0)
    document.getElementById("NKaUpgradeCost4").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[3], 3, 0)
    document.getElementById("NKaUpgradeCost5").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[4], 3, 0)
    document.getElementById("NKaUpgradeCost6").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[5], 3, 0)
    document.getElementById("NKaUpgradeCost7").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[6], 3, 0)
    document.getElementById("NKaUpgradeCost8").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[7], 3, 0)
    document.getElementById("NKaUpgradeCost9").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[8], 3, 0)
    document.getElementById("NKaUpgradeCost10").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[9], 3, 0)
    document.getElementById("NKaUpgradeCost11").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[10], 3, 0)
    document.getElementById("NKaUpgradeCost12").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[11], 3, 0)
    document.getElementById("NKaUpgradeCost13").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[12], 3, 0)
    document.getElementById("NKaUpgradeCost14").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[13], 3, 0)
    document.getElementById("NKaUpgradeCost15").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[14], 3, 0)
    document.getElementById("NKaUpgradeCost16").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[15], 3, 0)
    document.getElementById("NKaUpgradeCost17").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[16], 3, 0)
    document.getElementById("NKaUpgradeCost18").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[17], 3, 0)
    document.getElementById("NKaUpgradeCost19").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[18], 3, 0)
    document.getElementById("NKaUpgradeCost20").innerHTML = format(temp.karmaUpgrades.nonRepeatable.cost[19], 3, 0)

    document.getElementById("NKaUpgradeEffect1").innerHTML = format(getNKaUpgradeEffect("1"), 3, 2)
    document.getElementById("NKaUpgradeEffect2").innerHTML = format(getNKaUpgradeEffect("2"), 3, 2)
    document.getElementById("NKaUpgradeEffect3").innerHTML = format(getNKaUpgradeEffect("3"), 3, 2)
    document.getElementById("NKaUpgradeEffect4").innerHTML = format(getNKaUpgradeEffect("4"), 3, 2)
    document.getElementById("NKaUpgradeEffect5").innerHTML = format(getNKaUpgradeEffect("5"), 3, 4)
    document.getElementById("NKaUpgradeEffect6").innerHTML = format(getNKaUpgradeEffect("6"), 3, 2)
    document.getElementById("NKaUpgradeEffect7").innerHTML = format(getNKaUpgradeEffect("7"), 3, 2)
    document.getElementById("NKaUpgradeEffect8").innerHTML = format(getNKaUpgradeEffect("8"), 3, 2)
    document.getElementById("NKaUpgradeEffect9").innerHTML = format(getNKaUpgradeEffect("9"), 3, 3)
    document.getElementById("NKaUpgradeEffect10").innerHTML = format(getNKaUpgradeEffect("10"), 3, 3)
    document.getElementById("NKaUpgradeEffect11").innerHTML = format(getNKaUpgradeEffect("11"), 3, 3)
    document.getElementById("NKaUpgradeEffect12").innerHTML = format(getNKaUpgradeEffect("12").times(100), 3, 3)
    document.getElementById("NKaUpgradeEffect13.1").innerHTML = format(getNKaUpgradeEffect("13.1"), 3, 3)
    document.getElementById("NKaUpgradeEffect13.2").innerHTML = format(getNKaUpgradeEffect("13.2"), 3, 3)
    document.getElementById("NKaUpgradeEffect14").innerHTML = format(getNKaUpgradeEffect("14"), 3, 2)
    document.getElementById("NKaUpgradeEffect15").innerHTML = format(getNKaUpgradeEffect("15"), 3, 4)
    document.getElementById("NKaUpgradeEffect16").innerHTML = format(getNKaUpgradeEffect("16"), 3, 2)
    document.getElementById("NKaUpgradeEffect17").innerHTML = format(getNKaUpgradeEffect("17"), 3, 4)
    document.getElementById("NKaUpgradeEffect18").innerHTML = format(getNKaUpgradeEffect("18"), 3, 3)
    document.getElementById("NKaUpgradeEffect19").innerHTML = format(getNKaUpgradeEffect("19"), 3, 3)
    document.getElementById("NKaUpgradeEffect20").innerHTML = format(getNKaUpgradeEffect("20"), 3, 3)

}

function updateStyle() {
    for (i = 0; i < 12; i++) {//Fork Repellent Requirement
        if (player.repelledForks.gte(temp.forkRepellent.costFormula[i]())) {
            document.getElementById("BuyFRButton" + (i + 1)).className = "FRIsAffordable"
        } else {
            document.getElementById("BuyFRButton" + (i + 1)).className = "FRIsNotAffordable"
        }
    }

    for (i = 0; i < temp.forkRepellent.isUnlocked.length; i++) {//FR Show & Unlock
        if (temp.forkRepellent.isUnlocked[i]) {
            document.getElementById("FR" + (i + 1)).style.display = ""
        } else {
            document.getElementById("FR" + (i + 1)).style.display = "none"
        }
    }


    {//NE Upgrade stuff
        for (i = 0; i < 8; i++) {//Normal NE Upgrades
            if (player.NEUpgrades.nonRepeatable.isBought[i]) {
                document.getElementById("NNEUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsBought"
            } else {
                document.getElementById("NNEUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsNotBought"
            }
    
            if (!player.NEUpgrades.nonRepeatable.isBought[i] && player.keys.gte(temp.NEUpgrades.nonRepeatable.cost[i])) {
                document.getElementById("NNEUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsAffordable"
            }
        }

        for (i = 0; i < temp.NEUpgrades.nonRepeatable.isUnlocked.length; i++) {
            if (temp.NEUpgrades.nonRepeatable.isUnlocked[i]) {
                document.getElementById("NNEUpgrade" + (i + 1)).style.display = ""
            } else {
                document.getElementById("NNEUpgrade" + (i + 1)).style.display = "none"
            }
        }

        for (i = 0; i < 3; i++) {//Repeatable NE Upgrades
            if (  player.keys.gte(temp.NEUpgrades.repeatable.costFormula[i]())  ) {
                document.getElementById("RNEUpgrade" + (i + 1)).className = "repeatablePrestigeUpgrade repeatablePrestigeUpgradeIsAffordable"
            } else {
                document.getElementById("RNEUpgrade" + (i + 1)).className = "repeatablePrestigeUpgrade repeatablePrestigeUpgradeIsNotAffordable"
            }
        }

        
    }

    {//Cake Upgrade stuff
        for (i = 0; i < 8; i++) {//Normal Cake Upgrades
            if (player.cakeUpgrades.nonRepeatable.isBought[i]) {
                document.getElementById("NCUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsBought"
            } else {
                document.getElementById("NCUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsNotBought"
            }
    
            if (!player.cakeUpgrades.nonRepeatable.isBought[i] && player.cakes.gte(temp.cakeUpgrades.nonRepeatable.cost[i])) {
                document.getElementById("NCUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsAffordable"
            }
        }
    
        for (i = 0; i < 4; i++) {//Repeatable Cake Upgrades
            if (  player.cakes.gte(temp.cakeUpgrades.repeatable.costFormula[i]())  ) {
                document.getElementById("RCUpgrade" + (i + 1)).className = "repeatablePrestigeUpgrade repeatablePrestigeUpgradeIsAffordable"
            } else {
                document.getElementById("RCUpgrade" + (i + 1)).className = "repeatablePrestigeUpgrade repeatablePrestigeUpgradeIsNotAffordable"
            }
        }

        for (i = 0; i < temp.cakeUpgrades.nonRepeatable.isUnlocked.length; i++) {
            if (temp.cakeUpgrades.nonRepeatable.isUnlocked[i]) {
                document.getElementById("NCUpgrade" + (i + 1)).style.display = ""
            } else {
                document.getElementById("NCUpgrade" + (i + 1)).style.display = "none"
            }
        }
    }

    {//Karma Upgrade stuff
        for (i = 0; i < 20; i++) {//Normal Karma Upgrades
            if (player.karmaUpgrades.nonRepeatable.isBought[i]) {
                document.getElementById("NKaUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsBought"
            } else {
                document.getElementById("NKaUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsNotBought"
            }
    
            if (!player.karmaUpgrades.nonRepeatable.isBought[i] && player.karma.gte( temp.karmaUpgrades.nonRepeatable.cost[i] )) {
                document.getElementById("NKaUpgrade" + (i + 1)).className = "prestigeUpgrade prestigeUpgradeIsAffordable"
            }
        }

        for (i = 0; i < 4; i++) {//Repeatable Karma Upgrades
            if (  player.karma.gte(temp.karmaUpgrades.repeatable.costFormula[i]())  ) {
                document.getElementById("RKaUpgrade" + (i + 1)).className = "repeatablePrestigeUpgrade repeatablePrestigeUpgradeIsAffordable"
            } else {
                document.getElementById("RKaUpgrade" + (i + 1)).className = "repeatablePrestigeUpgrade repeatablePrestigeUpgradeIsNotAffordable"
            }
        }

        for (i = 0; i < temp.karmaUpgrades.nonRepeatable.isUnlocked.length; i++) {
            if (temp.karmaUpgrades.nonRepeatable.isUnlocked[i]) {
                document.getElementById("NKaUpgrade" + (i + 1)).style.display = ""
            } else {
                document.getElementById("NKaUpgrade" + (i + 1)).style.display = "none"
            }
        }
    }

    {//Precious Effect stuff
        for (i = 0; i < temp.preciousEffect.isUnlocked.length; i++) {//FR Show & Unlock
            if (temp.preciousEffect.isUnlocked[i]) {
                document.getElementById("PFEffect" + (i + 1)).style.display = ""
            } else {
                document.getElementById("PFEffect" + (i + 1)).style.display = "none"
            }
        }

        for (i = 0; i < temp.preciousEffect.isUnlocked.length; i++) {
            var unlockedPFEffects = 0
            for (i = 0; i < temp.preciousEffect.unlockCondition.length; i++) {
                var unlocked = true
                if (!player.preciousExtension.amount.gte(temp.preciousEffect.unlockCondition[i])) unlocked = false
                if (unlocked) {
                    unlockedPFEffects++
                }
            }
        }
    }





    {//Automator Display
        if (player.automator.autoFRs.isUnlocked) {
            document.getElementById("AutomatorText1").style.display = ""
            document.getElementById("AutomatorUnlock1").style.display = "none"
        } else {
            document.getElementById("AutomatorText1").style.display = "none"
            document.getElementById("AutomatorUnlock1").style.display = ""
        }

        if (player.automator.autoRNEUs.isUnlocked) {
            document.getElementById("AutomatorText2").style.display = ""
            document.getElementById("AutomatorUnlock2").style.display = "none"
        } else {
            document.getElementById("AutomatorText2").style.display = "none"
            document.getElementById("AutomatorUnlock2").style.display = ""
        }

        if (player.automator.autoNNEUs.isUnlocked) {
            document.getElementById("AutomatorText3").style.display = ""
            document.getElementById("AutomatorUnlock3").style.display = "none"
        } else {
            document.getElementById("AutomatorText3").style.display = "none"
            document.getElementById("AutomatorUnlock3").style.display = ""
        }
    }



    {//Achievement Reward Display
        if (player.achievementsGotten[1]) {
            document.getElementById("AchRewardDisplay2").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay2").style.display = "none"
        }

        if (player.achievementsGotten[7]) {
            document.getElementById("AchRewardDisplay8").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay8").style.display = "none"
        }

        if (player.achievementsGotten[8]) {
            document.getElementById("AchRewardDisplay9").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay9").style.display = "none"
        }

        if (player.achievementsGotten[11]) {
            document.getElementById("AchRewardDisplay12").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay12").style.display = "none"
        }

        if (player.achievementsGotten[15]) {
            document.getElementById("AchRewardDisplay16").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay16").style.display = "none"
        }

        if (player.achievementsGotten[23]) {
            document.getElementById("AchRewardDisplay24").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay24").style.display = "none"
        }

        if (player.achievementsGotten[25]) {
            document.getElementById("AchRewardDisplay26").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay26").style.display = "none"
        }

        if (player.achievementsGotten[26]) {
            document.getElementById("AchRewardDisplay27").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay27").style.display = "none"
        }

        if (player.achievementsGotten[27]) {
            document.getElementById("AchRewardDisplay28").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay28").style.display = "none"
        }

        if (player.achievementsGotten[32]) {
            document.getElementById("AchRewardDisplay33").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay33").style.display = "none"
        }

        if (player.achievementsGotten[33]) {
            document.getElementById("AchRewardDisplay34").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay34").style.display = "none"
        }

        if (player.achievementsGotten[34]) {
            document.getElementById("AchRewardDisplay35").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay35").style.display = "none"
        }

        if (player.achievementsGotten[35]) {
            document.getElementById("AchRewardDisplay36").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay36").style.display = "none"
        }

        if (player.achievementsGotten[36]) {
            document.getElementById("AchRewardDisplay37").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay37").style.display = "none"
        }

        if (player.achievementsGotten[37]) {
            document.getElementById("AchRewardDisplay38").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay38").style.display = "none"
        }

        if (player.achievementsGotten[38]) {
            document.getElementById("AchRewardDisplay39").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay39").style.display = "none"
        }

        if (player.achievementsGotten[39]) {
            document.getElementById("AchRewardDisplay40").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay40").style.display = "none"
        }

        if (player.achievementsGotten[41]) {
            document.getElementById("AchRewardDisplay42").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay42").style.display = "none"
        }

        if (player.achievementsGotten[46]) {
            document.getElementById("AchRewardDisplay47").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay47").style.display = "none"
        }

        if (player.achievementsGotten[48]) {
            document.getElementById("AchRewardDisplay49").style.display = ""
        } else {
            document.getElementById("AchRewardDisplay49").style.display = "none"
        }
    }
    
}

function hardReset() {
    player = new Player()
    save()
    load()
    location.reload()
}

setInterval(save, 10000);
setInterval(() => {
    gameLoop()
    updateText()
    updateStyle()
    unlockForkRepellents()
    unlockPFEffects()

    unlockNNEUs()
    unlockNCUs()
    unlockNKaUs()

    executeAllShowUnlockFunctions()
    triggerAutomators()
    canvasLoop()
}, 30);
load()

document.getElementById('AutomatorActivation1').checked = player.automator.autoFRs.isActive
document.getElementById('AutomatorActivation2').checked = player.automator.autoRNEUs.isActive
document.getElementById('AutomatorActivation3').checked = player.automator.autoNNEUs.isActive

document.getElementById("notationSelect").value = player.options.notation
