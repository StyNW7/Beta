import * as THREE from 'three';

export const monuments = [
  {
    id: 'tugu_main',
    interactive: true,
    name: 'Monas',
    position: new THREE.Vector3(1, 0, 2),
    recipe: {
      name: 'Keris',
      image: '/Images/Item/keris_recipe.png',
    },
    info: {
      image: '/Images/monas.jpg',
      description: "A historic monument representing the spirit of the nation. It is said that ancient recipes can be discovered by those who show respect.",
      yearBuilt: "1961",
      location: "Central Jakarta, Indonesia",
    }
  },
  {
    id: 'deco_1',
    interactive: false,
    position: new THREE.Vector3(20, 0, 5),
  },
  {
    id: 'deco_2',
    interactive: false,
    position: new THREE.Vector3(-10, 0, 20),
  },
  {
    id: 'deco_3',
    interactive: false,
    position: new THREE.Vector3(-20, 0, -20),
  },
  {
    id: 'deco_4',
    interactive: false,
    position: new THREE.Vector3(15, 0, -15),
  }
];
