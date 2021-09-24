function getNombreAleatoire(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




class Cellule {
    valeur;
    x;
    y;
    constructor(valeur,coordX,coordY){
        this.valeur = valeur;
        this.x = coordX;
        this.y = coordY;
    }
    setCellule(){
        
    }
};

class Carte{
    hauteur;
    largeur;
    map;
    //utiliser des valeurs impaires 
    constructor(hauteur,largeur){
        this.hauteur = hauteur;
        this.largeur = largeur;
        let nombreMursMinimum = (this.largeur*2)+(this.hauteur*2)+this.largeur*2+this.hauteur/2;
        this.map = this.setMap();
        console.log(nombreMursMinimum,this.nombreMurs())
        //TODO REGENERATION DE MAP SI Murs < Min

        // while(this.nombreMurs(this.map)<=nombreMursMinimum){
        //     console.log("generation carte")
        //     this.map = this.setMap();
        // }
        
    }
    //methode pour générer la map
    setMap(){
        var tab = new Array(this.hauteur);
        let nbr = 0;

        //Initialise le tableau à vide
        for (var i = 0; i < this.hauteur; i++) {
            tab[i] = new Array(this.largeur);
        }

        for(var i = 0; i < this.hauteur; i++){
            if(i%2===0){
                for(var j = 0;j<this.largeur;++j){
                    tab[i][j] = new Cellule(1,i,j);
                }
            }
            else{

                if(i===0 || i===this.hauteur-1){
                    console.log(tab[i])
                    for(var j = 0;j<this.largeur;++j){
                        tab[i][j] = tab[i][j] = new Cellule(1,i,j);
                    }
                }
                else{
                    //parcours le tableau en largeur
                    for(var j =0;j< this.largeur;++j){
                        //init la premiere ligne et la derniere à 1;
                        if(j===0 || j===this.largeur-1){
                            tab[i][j] = tab[i][j] = new Cellule(1,i,j);
                        }
                        //regarde si c'est pair
                        else if(j%2===0){
                            tab[i][j] = new Cellule(1,i,j);
                        }
                        else{
                           if(nbr ===1){
                               ++nbr;
                           }
                           tab[i][j] = tab[i][j] = new Cellule(nbr,i,j);;;
                            ++nbr;
                        }
                    }
                }
            }
        }

        
        //tant qu'il y a des murs a detruire je casse
        while(this.creationsChemin(tab) == false){
            this.detruireMur(tab);
        }        
        //getNombreImpair()
        this.dessinerMap(tab)

        

        return tab;
    }
    nombreMurs(){
        let nombreMurs = 0;
        for(var i = 0; i < this.hauteur; ++i){
            for(var j = 0;j<this.largeur;++j){
                if(this.map[i][j].valeur ==1){
                        ++nombreMurs;
                }
            }
        }
    
        return nombreMurs;
    }
    //methode permettant de choisir aléatoirement une case du tableau
    creationCelluleReferente(tab){
        var nbrReferent;
        var tabTmp =[];

        for(var i = 1; i < this.hauteur-1; i++){
            if(i%2!=0){
                for(var j = 1;j<this.largeur-1;++j){
                    //on va de case en case
                    if(j%2!=0){
                        tabTmp.push(tab[i][j])
                        //nbrReferent = tab[Math.floor(Math.random() * i)][Math.floor(Math.random() * j)].valeur
                    }    
                }
            }
            else{
                
            }
        }


        return tabTmp[Math.floor(Math.random() * (tabTmp.length-1))];
    }
    //methode de savoir si je dois casser un mur
    creationsChemin(tab){
        //je verifie si c pareil en parcourant le tableau toutes les impaires si c diffrent je casse et je recommence jsuqu'a true

        for(var i = 1; i < this.hauteur-1; i+=2){
                for(var j = 1;j<this.largeur-1;j+=2){       
                    if(tab[i][j]==tab[1][1]){
                         //c'est bien on va au suivant
                    } 
                    else{
                        return false;
                    }
                }
            
        }
        return true;
    }

    //methode pour detruire un mur aléatoirement et remplacer toutes les aciennes valeurs par les nouvelles
    detruireMur(tab){
        var largeurTmp = getNombreAleatoire(1,this.largeur-2)
        if(largeurTmp%2==0){
            var hauteurTmp = getNombreAleatoire(1,this.hauteur-2);
            while(hauteurTmp%2==0){
                hauteurTmp = getNombreAleatoire(1,this.hauteur-2);
            }
        }
        else{
            var hauteurTmp = getNombreAleatoire(1,this.hauteur-2);
            while(hauteurTmp%2!=0){
                hauteurTmp = getNombreAleatoire(1,this.hauteur-2);
            }
        }

        //a gauche
        if(tab[hauteurTmp][largeurTmp-1].valeur!=1){

            var CelluleTmp = new Cellule(tab[hauteurTmp][largeurTmp-1].valeur,hauteurTmp,largeurTmp); //16
            tab[hauteurTmp][largeurTmp] = CelluleTmp

            
            //parcours le tableau pour remplacer toutes les anciennes valeurs par les nouvelles
            for(var i = 0; i < this.hauteur; ++i){
                for(var j = 0;j<this.largeur;++j){
                    if(tab[i][j].valeur==tab[hauteurTmp][largeurTmp+1].valeur){ 
                        tab[i][j]=tab[hauteurTmp][largeurTmp-1];
                    }
                }
            }

        }
        //au dessus
        else if(tab[hauteurTmp-1][largeurTmp].valeur!=1){

            var CelluleTmp = new Cellule(tab[hauteurTmp-1][largeurTmp].valeur,hauteurTmp,largeurTmp); //16
            tab[hauteurTmp][largeurTmp] = CelluleTmp

            
            //parcours le tableau pour remplacer toutes les anciennes valeurs par les nouvelles
            for(var i = 0; i < this.hauteur; ++i){
                for(var j = 0;j<this.largeur;++j){
                    if(tab[i][j].valeur==tab[hauteurTmp+1][largeurTmp].valeur){ 
                        tab[i][j]=tab[hauteurTmp-1][largeurTmp];
                    }
                }
            }
        }
        

    }
    //methode qui retourne la map
    getMap(){
        return this.map
    }
    //METHODE pour dessiner la map dans le canvas
    dessinerMap(tab){
        for(var i=0;i<tab.length;++i){
            for(var j=0;j<tab[i].length;++j){
                if(tab[i][j].valeur==1){
                    const canvas = document.getElementById('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.rect(i*20, j*20, 20, 20);
                    ctx.fill();
                }else{
                    var ctx = document.getElementById('canvas').getContext('2d');
                    ctx.font = '10px serif';
                    ctx.fillText(tab[i][j].valeur,i*20+9,j*20+9);
                }
            }
        }
        
    }
}

const carte = new Carte(13,11)










