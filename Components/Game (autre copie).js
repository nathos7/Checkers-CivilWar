import React from 'react';
import {View, TouchableOpacity, Text,  StyleSheet, Image} from 'react-native';
import {Button, Icon} from 'native-base';
import {Header} from 'react-native-elements';
import {Case} from './Case.js';


Array.range = n => Array.from({length: n}, (value, key) => key)

containsArray = (a, b) => a.some(x => arraysEqual(x, b))

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;
	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}


function deleteElementFromArray(L, el){
	nb = 0;
	for(i in L){
		i = L[i];
		if(arraysEqual(el, i)){
			L.splice(nb, 1);
			return true;
		}
		nb ++;
	}
	return false;
}


var imagePionNoir  = require('../img/pionNoir.png');
var imagePionBlanc = require('../img/pionBlanc.png');


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	pionsBlancs: [], 
						pionsNoirs: [],
						selected: null,
						currentPlayer: 'blanc',
						pions: ['pionsBlancs', 'pionsNoirs'],
					};
		for(i in Array.range(8*2)){
			i = parseInt(i);			
			this.state.pionsNoirs.push([0, i]);
			this.state.pionsNoirs.push([1, i+1]);
			this.state.pionsNoirs.push([2, i]);
			this.state.pionsBlancs.push([13, i+1]);
			this.state.pionsBlancs.push([14, i]);
			this.state.pionsBlancs.push([15, i+1]);		
		}
this.selected = null;
	}
	renderPion(coor){ 
		if ( containsArray(this.state.pionsBlancs, coor) ) {
			return(

				<Image source={imagePionBlanc} />
			);
		}
		if ( containsArray(this.state.pionsNoirs, coor) ) {
			return(
				<Image source={imagePionNoir} />
			);
		}
	}
	renderDamier(){	
		return( Array.range(8).map(
						(x)=>{return(
							<View style={{flexDirection: 'row'}} key={x}>
								{
								Array.range(8).map((y)=>{
									return(
										<View
											key={[x, y]} 
											style={{height: 100, width: 100, backgroundColor: '#778899'}}> 
											
											<View style={{flexDirection: 'row'}}>
												<Case 
													coor={[x*2, y*2]}
													/>
												<View style= {{height: 50, width: 50, backgroundColor: 'white'}} />
											</View>
				
											<View style={{flexDirection: 'row'}}>
												<View style= {{height: 50, width: 50, backgroundColor: 'white'}} />					
												<Case 
													coor={[x*2+1, y*2+1]}
													/>
											</View>

										</View> ); }
										)
								}
							</View>
									);
				
							}
						));
	}
	getCurrentPlayerPions(){
		if(this.state.pions[0] == 'pionsBlancs'){
			return this.state.pionsBlancs;
		}
		return this.state.pionsNoirs;
	}
	pressCase(coord){
		if(!this.selected){
			if (containsArray(this.getCurrentPlayerPions(), coord)){
				this.selected = coord;
			}
		}
		else{
			var test = this.state[this.state.pions[0]];
			test.splice(test.findIndex(i => arraysEqual(this.selected, i)), 1);		
			test = test.concat([coord]);
			this.setState( {[this.state.pions[0]]: test, pions: this.state.pions.reverse()});
			this.selected = null;
		}
	}
	render() {
		return(
			<View>
			    <Header
	                statusBarProps={{ barStyle: 'light-content' }}
	                centerComponent={{ text: 'Nouveau Jeu', style: { color: '#fff' } }}
	                outerContainerStyles={{ backgroundColor: '#324C66' }}
	                leftComponent={	<Button 
											transparent
											onPress={()=>this.props.setter('Landing')}
											styles = {{alignSelf: 'flex-start', backgroundColor: 'red'}}
											>
											<Icon name="ios-arrow-back" />
										</Button>}/>

				{ this.renderDamier() }
				
			</View>
			);
	}
}

const styles = StyleSheet.create({
	form: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#D2691E',
	},
	container: {
		justifyContent: 'center',

	}
});

export default Game;