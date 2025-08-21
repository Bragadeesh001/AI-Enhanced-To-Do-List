AI-Enhanced To-Do List

This is a full-stack, AI-powered To-Do List application designed to help you organize your tasks and gain quick insights into your priorities. The application combines standard task management features with a unique AI-powered summarization tool.
Features

    Task Management: Create, read, update, and delete (CRUD) tasks.

    AI-Powered Summary: Get a summarized overview of your entire to-do list, identifying key priorities and assigning a priority level to each.

    Real-time Updates: The application updates in real-time as you add, complete, or delete tasks.

    Secure API Integration: The application securely communicates with the OpenAI API from the backend to prevent API key exposure.

    Containerized Environment: The entire application is containerized using Docker and Docker Compose for easy setup and deployment.

Tech Stack

This project is built using a modern full-stack technology stack.

    Frontend:

        React: A JavaScript library for building the user interface.

        Axios: A promise-based HTTP client for making API requests.

    Backend:

        Django REST Framework (DRF): A powerful toolkit for building the REST API.

        OpenAI Python SDK: The official library for interacting with the OpenAI API.

    Database:

        PostgreSQL: A robust, open-source relational database.

    DevOps:

        Docker & Docker Compose: Containerization tools to manage the development environment and application services.

Prerequisites

Before you begin, ensure you have the following software installed on your machine:

    Docker: Install Docker

    Docker Compose: (Usually comes bundled with Docker Desktop)

    A code editor (e.g., VS Code)

Installation & Setup

Follow these steps to get the project up and running on your local machine.
1. Clone the Repository

Clone this project's repository to your local machine.

git clone https://github.com/your-username/ai-todo-list.git
cd ai-todo-list

2. Configure Environment Variables

Create a .env file in the root directory of your project. This file will store your sensitive information.

touch .env

Open the newly created .env file and add the following variables. Replace the placeholder values with your actual information.

# Database Credentials
DB_NAME=ai_todo_db
DB_USER=ai_user
DB_PASSWORD=your_secure_password
DB_HOST=db
DB_PORT=5432

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key

3. Build and Run the Containers

Use Docker Compose to build the images and start all the services.

docker-compose up --build

This command will:

    Build the Django and React Docker images.

    Start the PostgreSQL database service.

    Run the Django backend server.

    Run the React frontend server.

4. Apply Database Migrations

Once the containers are running, you need to apply the database migrations to set up the necessary tables. Open a new terminal and run the following command to execute migrations inside the Django container.

docker-compose exec backend python manage.py migrate

Usage

Once the application is running, you can access the frontend and backend:

    Frontend: The React app will be accessible at http://localhost:3000.

    Backend API: The Django REST Framework API will be accessible at http://localhost:8000. You can test the API endpoints using a tool like Postman or your web browser.

Enjoy organizing your tasks and getting a smart summary from the AI!
Project Structure

ai-todo-list/
├── .env                  # Environment variables
├── docker-compose.yml    # Docker services configuration
├── frontend/             # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── Dockerfile
├── backend/              # Django application
│   ├── manage.py
│   ├── requirements.txt  # Python dependencies
│   ├── todo_list/        # Main Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── api/              # Django app for the API
│   │   ├── models.py     # Database models
│   │   ├── serializers.py# DRF serializers
│   │   ├── views.py      # DRF viewsets
│   │   ├── urls.py
│   │   └── ...
│   └── Dockerfile
└── README.md             # This file
