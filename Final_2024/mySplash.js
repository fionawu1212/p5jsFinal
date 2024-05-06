class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(255);
  stroke(255, 0, 0)
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  fill(0, 0, 222);
  strokeWeight(3)
   
  line(windowWidth-this.splashBorder-40, this.splashBorder+20,windowWidth-this.splashBorder-20, this.splashBorder+40)
   line(windowWidth-this.splashBorder-20, this.splashBorder+20,windowWidth-this.splashBorder-40, this.splashBorder+40)
   
  this.title = createDiv("Exploring Emotional States with Frequencies");
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Fiona Wu");
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  
  this.info = createDiv("This project aims to create an interactive art installation that explores the relationship between emotional states and auditory experiences. By allowing users to interact with the canvas and generate data points representing their emotional states to create a visually appealing and sonically immersive experience.<p> <a href=https://editor.p5js.org/FIONAWU1212/sketches/lxt1r3ATo>view code</ a>");
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
  
}
    update(){
       if(mouseX > windowWidth-this.splashBorder-40 && 
          mouseX < windowWidth-this.splashBorder-20 
          && mouseY < this.splashBorder+40 
          && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
  
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}

