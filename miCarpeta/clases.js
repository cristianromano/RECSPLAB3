class Vehiculo {
    constructor(id, make, model , price) {
      this.id = id;
      this.make = make;
      this.model = model;
      this.price = price;
    }
  }
  
  class Camioneta extends Vehiculo {
    constructor(id, make, model, price, cuatroXcuatro) {
      super(id, make, model,price);
      this.cuatroXcuatro = cuatroXcuatro;
    }
  }

  class Auto extends Vehiculo {
    constructor(id, make, model, price, cantidadPuertas) {
      super(id, make, model,price);
      this.cantidadPuertas = cantidadPuertas;
    }
  }
  

//   Crear las clases Vehiculo(id, marca, modelo, precio), Auto(cantidadPuertas) y
// Camioneta(cuatroXcuatro) en JS.