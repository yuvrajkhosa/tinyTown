class Ball{

  constructor(x, y, infected){
    this.radius = 6;
    this.pos = createVector(x, y);
    this.vel = createVector(random([-5, -4, -3, 3, 4, 5]), random([-5, -4, -3, 3, 4, 5]));
    this.isInfected = infected;
    this.cooldownActive = false;
    this.offspringCount = 0;
  }

  show(){
    if(this.isInfected){
      fill(255, 0, 0);
    }
    else{
      fill(0, 255, 255);
    }
    this.pos.add(this.vel);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2);

  }

  walls(){
    if(this.pos.x > width - this.radius){
      this.pos.x = width - this.radius
      this.vel.x *= -1;
      return(true);
    }
    if(this.pos.x < this.radius){
      this.pos.x = this.radius
      this.vel.x *= -1;
      return(true);
    }

    if(this.pos.y > height - this.radius){
      this.pos.y = height - this.radius;
      this.vel.y *= -1;
      return(true);
    }
    if(this.pos.y < this.radius){
      this.pos.y = this.radius;
      this.vel.y *= -1;
      return(true);
    }

    return(false);
  }

  infect(){
    this.isInfected = true;
  }

  bounce(other){
    if(dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) <= 20 && !this.cooldownActive){
      this.cooldownActive = true;
      setTimeout(() => {this.cooldownActive = false}, 100);
      if(Math.floor(Math.random() * 4) == 2){//If random chance happens, return true in order to make offspring
        this.offspringCount++;
        if(this.offspringCount < 2){
          return(true);
        }
      }
    }
    return(false);
  }


}
