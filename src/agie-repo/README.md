# Advancing Gender Inclusive Excellence (AGIE) Repository

## Overview
The **Advancing Gender Inclusive Excellence (AGIE) Repository** is a central hub dedicated to promoting gender equity in academia. This project aggregates resources, tools, and data to advance the participation and advancement of diverse women and underrepresented groups in STEMM. By serving as a comprehensive resource repository, AGIE aims to foster institutional change and support initiatives that drive gender inclusive excellence in higher education.

## Technology Stack
- **Next.js 13** (leveraging the new `app/` directory structure)
- **React**
- **Tailwind CSS** for rapid UI development combined with CSS Modules for component-specific styling
- **Firebase** integration for authentication and data management (where applicable)
- **Node.js** for server-side functionality
- **Vercel/Docker** for deployment

## Directory Structure
The project is organized as follows:

```
.
├── agie-repository/       # Legacy or reference code with original design assets
├── src/
│   ├── app/               # Application-specific code
│   │   ├── components/    # Reusable UI components (e.g., Navbar, Footer, PieChart)
│   │   ├── api/           # API route implementations (e.g., addPaper, login, etc.)
│   │   ├── styles/        # CSS Modules and global styles via Tailwind CSS
│   │   ├── about/         # About page and related content
│   │   ├── contact/       # Contact page
│   │   ├── ...            # Additional pages and application logic
│   └── lib/               # Shared utilities and libraries (e.g., Firebase client configuration)
```

## Installation and Setup
### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository.
2. Navigate to the project root.
3. Install dependencies:
   ```bash
   sudo npm install
   ```
   
### Running the Development Server
Start the development server with:
```bash
sudo npm run dev
```
Access the application at [http://localhost:3000](http://localhost:3000).

### Environment Variables
Configure any necessary environment variables (e.g., Firebase credentials) in a `.env.local` file located at the project root.

## Usage
- **Navigation:**  
  The home page features a user-friendly design with a prominent search area and clear navigation via a Navbar and Footer.
- **Search Functionality:**  
  Use the search bar to query the repository for research papers and resources aimed at advancing gender equity in STEMM.
- **API Endpoints:**  
  The project includes various API routes (located in `src/app/api/`) for handling tasks such as adding new entries and managing user authentication.

## Features
- **Responsive Design:**  
  Built using Tailwind CSS and CSS Modules to ensure a modern, responsive UI across devices.
- **Resource Aggregation:**  
  Serves as a central repository for tools, data, and research pertinent to gender inclusion in academia.
- **Interactive Visualizations:**  
  Incorporates dynamic components such as pie charts to visually represent key data.
- **User Authentication:**  
  Includes integration with Firebase for secure login and user management (if configured).

## Contribution and Development
Contributions are welcome! To contribute:
- Follow the coding standards based on Next.js and Tailwind CSS.
- Ensure your changes are well-documented and include descriptive commit messages.
- For significant changes, please open an issue or submit a pull request.

For additional contribution guidelines, refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file (if available).

## Deployment
The project can be deployed on platforms such as Vercel, AWS, or using Docker. Refer to the deployment guidelines in the project documentation or configuration files (e.g., `Dockerfile`, `next.config.mjs`).

## Docker Setup

**Building the Docker Image:**

To build the Docker image, run the following command at the project root:

```bash
docker build -t agie-repo .
```

This command uses the provided `Dockerfile` to create an image named `agie-repo`. You can pass additional build arguments using `--build-arg` if needed.

**Running the Docker Container:**

To run the container, use the command below:

```bash
docker run -it -p 3000:3000 --env-file ./agie-repository/.env.local agie-repo
```

This command maps port 3000 within the container to port 3000 on your local machine and sources environment variables from your `.env.local` file.

**Additional Tips and Troubleshooting:**

- **Viewing Logs:**  
  Use the command below to view container logs:
  ```bash
  docker logs <container_id>
  ```
- **Stopping the Container:**  
  To stop the container, run:
  ```bash
  docker stop <container_id>
  ```
- **Docker Compose:**  
  For multi-container setups, consider creating a `docker-compose.yml` file to manage your services.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Special thanks to the open source community and all contributors working towards advancing gender inclusive excellence in academia.
- Recognition is given to the many resources and libraries that powered this project, fostering innovation and collaboration.
