# agentSearch
This project focuses on implementing various search strategies (Breadth-First, Depth-First, Uniform Cost, Greedy, and A*) in a discrete and observable environment. The environment is randomly generated and consists of four types of terrain: obstacles, low-cost terrain (sand), medium-cost terrain (mud), and high-cost terrain (water). The primary objective is for an agent to collect food randomly placed within the environment. The agent utilizes the chosen search algorithm to find the food, generates a path, and adapts its movement speed based on the terrain's cost.

## 1. Major Challenges, Mistakes, and Lessons Learned

### Improvements in Code Modularization:
Throughout the project, our team encountered challenges while attempting to organize the code more efficiently and modularly. This was crucial for project maintenance and overall comprehension.

### Proficiency with the Javascript Library p5.js:
Working with the p5.js library posed a significant challenge. While powerful for creating interactive graphic animations, it required considerable time to become familiar with its functionalities and working methodologies.

### Task Coordination:
We initially assigned specific team members to be responsible for different aspects of the project. However, we faced difficulties in effective coordination and communication to ensure seamless integration.

### Other Challenges:
Integrating border drawings, path exploration, and character animation proved complex. Implementing animations in the project required careful planning and attention to detail. Additionally, applying algorithms to work as animations was a significant hurdle, but it provided us with a deeper understanding of how algorithms can be effectively implemented in a graphical programming environment.

## 2. Work Division within the Group

The work division within the group was organized as follows:

- **José Marcondes** and **Maria Veras**: Responsible for the menu, map, and animation. They focused on creating the user interface and implementing the necessary animations for the project.

- **Mário Mota**, **Pedro Fernandes**, and **Nathalia Barbosa**: In charge of the algorithms. They developed the algorithms necessary for the animations' proper functioning and gameplay flow.

## 3. Architecture and Technologies Used

For this project, we utilized **Javascript** with the **p5.js** library. **p5.js** is a JavaScript library for creative programming, making it easy and fun to create interactive content in the browser. It draws inspiration from Processing and aims to make coding accessible to artists, designers, educators, and beginners. The project adopted an **object-oriented architecture**, allowing us to create distinct entities represented as objects in our game, each with its own properties and behaviors. This approach helped us maintain an organized codebase and increase code reusability. Furthermore, it facilitated collaboration within the team, as each member could focus on specific objects or classes.
