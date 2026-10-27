# Django REST API Blog

A flexible and extensible Django REST API template designed to be customized and adapted for a variety of personal and professional projects.

This project provides a structured foundation for building web applications, with reusable components for authentication, user management, content management, asynchronous task processing, and deployment.

The template can be adapted to different requirements by extending existing functionality, integrating additional features, and modifying the architecture to suit specific use cases.

## Key Features

- **Authentication and Authorization:** JWT and token-based authentication.
- **User Management:** User registration, account activation, profile management, and password updates.
- **Content Management:** Create, edit, and manage blog posts through REST APIs.
- **Email Integration:** Account activation and email-related workflows.
- **Asynchronous Processing:** Background task execution using Celery and Redis.
- **API Development:** RESTful API endpoints with Django REST Framework.
- **Containerization:** Docker and Docker Compose for consistent development and deployment environments.
- **Deployment Infrastructure:** Gunicorn and Nginx configuration.
- **Static and Media Files:** Configuration for collecting and serving static and uploaded media files.
- **Testing and Code Quality:** Automated tests, linting, formatting, and load testing.
- **Frontend Integration:** A React-based frontend that can be extended or replaced according to project requirements.

## Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- **Simple JWT**
- **Django REST Framework Token Authentication**
- **django-cors-headers**

### Task Processing and Messaging
- **Celery** — Asynchronous task processing.
- **Redis** — Message broker for background tasks.

### Frontend
- **React**
- **JavaScript**
- **Vite**

### Infrastructure and Deployment
- **Docker**
- **Docker Compose**
- **Gunicorn** — WSGI application server.
- **Nginx** — Reverse proxy and static/media file serving.

### Testing and Code Quality
- **Pytest** — Automated testing.
- **Flake8** — Code linting.
- **Black** — Code formatting.
- **Locust** — Load and performance testing.

### Development and Integration
- **Git and GitHub** — Version control and repository hosting.
- **SMTP4dev** — Local email testing.

## Project Structure

The project is organized into separate components to keep the codebase modular and maintainable.

```text
.
├── core/
│   ├── accounts/
│   ├── posts/
│   ├── config/
│   └── manage.py
├── frontend/
├── nginx/
├── docker-compose.yml
├── docker-compose-stage.yml
└── README.md
```

The directory structure above is illustrative. Actual paths and filenames may vary depending on the current project configuration.

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Git
- Docker
- Docker Compose

### Clone the Repository

```bash
git clone https://github.com/rezameftahi/django-rest-api-blog.git
cd django-rest-api-blog
```

### Configure Environment Variables

Create and configure the environment file required by your Docker Compose configuration.

Set the appropriate values for your environment, including application settings, credentials, email configuration, and security-related variables.

Do not commit secrets or production credentials to the repository.

### Start the Application

Start the services defined in the development Compose configuration:

```bash
docker compose up --build
```

The application services and their exposed ports depend on the current Docker Compose configuration.

## Testing and Code Quality

Run the automated tests using the command appropriate for your configured test environment. For example, when the test dependencies are installed in the backend container:

```bash
docker compose exec backend pytest
```

Run Flake8:

```bash
docker compose exec backend flake8
```

Run Black to check formatting without modifying files:

```bash
docker compose exec backend black --check .
```

Run Locust using the project's configured load-testing environment to evaluate API performance under simulated traffic.

> Service names and commands may need to be adjusted to match the active Compose configuration.

## Customization

This template is intended to serve as a starting point for different applications. Its existing components can be modified, extended, or replaced to support new business logic, additional API endpoints, different data models, and project-specific requirements.

Possible customizations include:

- Adding new Django applications and REST API endpoints.
- Extending authentication and authorization rules.
- Introducing new data models and business logic.
- Integrating additional asynchronous tasks.
- Connecting alternative frontend applications.
- Adapting the deployment configuration to different environments.
- Expanding automated tests and performance monitoring.

The architecture can be adapted to support a wide range of use cases beyond blogging.

## Deployment

The project includes infrastructure components for containerized deployment, with Gunicorn serving the Django application and Nginx handling reverse proxying and static/media files.

Before deploying to production, configure environment-specific settings, secure all credentials, review allowed hosts and CORS policies, configure HTTPS, and verify that database, static-file, media-file, and background-task services are properly configured.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.