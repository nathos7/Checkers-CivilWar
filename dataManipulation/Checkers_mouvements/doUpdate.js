
/* *** Attention, ce code nécessite des fonctions présentes dans listNextPlay.js *** */

// Modifie et renvoie les positions des joueurs après un coup donné
// Ça modifie les positions physiquements, donc tu peux direct
// utiliser posW et posB : ils sont modifiés, je les return juste au cas où
function doUpdate(posW, posB, player, coup)
{
	var myPos = (player == WHITE ? posW : posB) ;
	var opPos = (player == WHITE ? posB : posW) ;
	if(deleteElementFromArray(myPos[0], coup[0])) // Si c'est un pion
		myPos[0].push(coup[1]) ;
	else if(deleteElementFromArray(myPos[1], coup[0]))
		myPos[1].push(coup[1]) ;
	else str("Erreur lors de la suppression de la pièce dans myPos") ;

	if(isAttack(coup))
		if(!deletePiece(opPos, findOpPiece(coup, opPos)))
			str("Erreur lors de la suppression de la pièce adverse") ;
	return [posW, posB] ;
}

// Si le déplacement est de seulement +1 ou -1 x, on a affaire à un coup simple
function isAttack(coup){
	return Math.abs(coup[0][0]-coup[1][0]) > 1
}

// Cherche, en partant de la position présente et en se dirigeant vers la position finale,
// à trouver la pièce adverse qui a été mangé
function findOpPiece(coup, opPos){
	let x = (coup[1][0]-coup[0][0]) ;
	x /= Math.abs(x) ;
	let y = (coup[1][1]-coup[0][1]) ;
	y /= Math.abs(y) ;
	// x,y == 1 ou -1
	let tmpPos = coup[0] ;
	while(isInBoard(tmpPos = [tmpPos[0]+x, tmpPos[1]+y]))
		if(isTaken(tmpPos, opPos))
			return tmpPos ;
	return false ;
}
