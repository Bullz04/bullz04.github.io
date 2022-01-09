function showNNEURows() {
    if (player.karma.gt(0) || player.gainedKarma.gt(0) || player.prestigeStat[2].gt(0)) {
        document.getElementById("NNEURow2").style.display = ""
    } else {
        document.getElementById("NNEURow2").style.display = "none"
    }
}

function showNCURows() {
    if (temp.unlockCondition.empCakes()) {
        document.getElementById("NCURow2").style.display = ""
    } else {
        document.getElementById("NCURow2").style.display = "none"
    }
}

function showNKaURows() {
    if (temp.unlockCondition.theJudgement()) {
        document.getElementById("NKaURow4").style.display = ""
        document.getElementById("NKaURow5").style.display = ""
        document.getElementById("NKaURow6").style.display = ""
        document.getElementById("NKaURow7").style.display = ""
    } else {
        document.getElementById("NKaURow4").style.display = "none"
        document.getElementById("NKaURow5").style.display = "none"
        document.getElementById("NKaURow6").style.display = "none"
        document.getElementById("NKaURow7").style.display = "none"
    }
}










/////////////////////////////
/////////////////////////////
/////////////////////////////



function showNCaSSubTab() {
    if (player.keys.gte(1e6) || temp.unlockCondition.NCaS()) {
        document.getElementById("newCakeAtStakeSubtabButton").style.display = ""
    } else {
        document.getElementById("newCakeAtStakeSubtabButton").style.display = "none"
    }
}

function unlockNCaSSubTab() {
    if (temp.unlockCondition.NCaS()) {
        document.getElementById("NCaSLockedText").style.display = "none"
        document.getElementById("NCaSScreen").style.display = ""
    } else {
        document.getElementById("NCaSLockedText").style.display = ""
        document.getElementById("NCaSScreen").style.display = "none"
    }
}

function showRNEUScalingWeaknesses() {
    if (temp.unlockCondition.NCaS()) {
        document.getElementById("RNEUScalingWeaknesses").style.display = ""
    } else {
        document.getElementById("RNEUScalingWeaknesses").style.display = "none"
    }
}

function showEmpCakesSubtabButton() {
    if (temp.unlockCondition.NCaS() || temp.unlockCondition.empCakes()) {
        document.getElementById("empCakesSubtabButton").style.display = ""
    } else {
        document.getElementById("empCakesSubtabButton").style.display = "none"
    }
}

function unlockEmpCakesSubtabButton() {
    if (temp.unlockCondition.empCakes()) {
        document.getElementById("EmpCakesLockedText").style.display = "none"
        document.getElementById("EmpCakesScreen").style.display = ""
    } else {
        document.getElementById("EmpCakesLockedText").style.display = ""
        document.getElementById("EmpCakesScreen").style.display = "none"
    }
}

function showNCSubtab() {
    if (player.cakes.gte(1e10) || temp.unlockCondition.NC()) {
        document.getElementById("newContestSubtabButton").style.display = ""
    } else {
        document.getElementById("newContestSubtabButton").style.display = "none"
    }
}

function unlockNCSubTab() {
    if (temp.unlockCondition.NC()) {
        document.getElementById("NCLockedText").style.display = "none"
        document.getElementById("NCScreen").style.display = ""
    } else {
        document.getElementById("NCLockedText").style.display = ""
        document.getElementById("NCScreen").style.display = "none"
    }
}

function showPreciousForkSubtab() {
    if (temp.unlockCondition.NC() || temp.unlockCondition.preciousFork()) {
        document.getElementById("preciousForksSubtabButton").style.display = ""
    } else {
        document.getElementById("preciousForksSubtabButton").style.display = "none"
    }
}

function unlockPreciousForkSubTab() {
    if (temp.unlockCondition.preciousFork()) {
        document.getElementById("PreciousForksLockedText").style.display = "none"
        document.getElementById("PreciousForksScreen").style.display = ""
    } else {
        document.getElementById("PreciousForksLockedText").style.display = ""
        document.getElementById("PreciousForksScreen").style.display = "none"
    }
}

function showTheJudgementSubtabButton() {
    if (player.karma.gte(1e25) || temp.unlockCondition.theJudgement()) {
        document.getElementById("theJudgementSubtabButton").style.display = ""
    } else {
        document.getElementById("theJudgementSubtabButton").style.display = "none"
    }
}

function unlockTheJudgementSubtabButton() {
    if (temp.unlockCondition.theJudgement()) {
        document.getElementById("TheJudgementLockedText").style.display = "none"
        document.getElementById("TheJudgementScreen").style.display = ""
    } else {
        document.getElementById("TheJudgementLockedText").style.display = ""
        document.getElementById("TheJudgementScreen").style.display = "none"
    }
}

function unlockAutomationTab() {
    if (temp.unlockCondition.NC()) {
        document.getElementById("AutomationTabButton").style.display = ""
    } else {
        document.getElementById("AutomationTabButton").style.display = "none"
    }
}


function executeAllShowUnlockFunctions() {
    showNCaSSubTab()
    unlockNCaSSubTab()
    showEmpCakesSubtabButton()
    showNCSubtab()
    unlockNCSubTab()
    showRNEUScalingWeaknesses()

    showNNEURows()
    showNCURows()
    showNKaURows()

    //unlockAutomationTab()
    showPreciousForkSubtab()
    unlockPreciousForkSubTab()
    showTheJudgementSubtabButton()
    unlockTheJudgementSubtabButton()
    unlockEmpCakesSubtabButton()
    
}