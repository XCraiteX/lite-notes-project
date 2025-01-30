# [ Lite Notes ]

**Lite Notes - A simple platform for creating and sharing your notes**

<img src='https://imgur.com/iFtLpKu'>

## Stack
### Backend

- **FastAPI** - API with CORS 
- **SQLAlchemy** - ORM for DB management
- **bcrypt** - Password and session hashing

### Data Storage

- **PostgreSQL + asyncpg** - Main database 
- **JSON** - Storage for notes

### Frontend

- **NEXT** - Routing and design
- **React** - useState & useEffect
- **Tailwind & Css** - Style
- **Axios** - Http requests into backend

### Other

- **Git** - For comfortable developing
- **Docker** - For containers
- **Compose** - Fast project deploy 


## Installation

### 1. Clone the repository
```bash
git clone https://github.com/XCraiteX/lite-notes-project.git
```

### 2. Install all dependencies
```bash
# Backend
cd Backend
pip install -r requirements.txt

# Frontend
cd Frontend
npm install 
npm i axios
```

### 3. Deploy project
```bash
docker compose up --build
```

## Smalls

### 1. Registration - Login - Logout
**Registration and login are implemented by saving the session ID and storing the session itself on the server.
Logout - Just delete cookies.**

### 2. Notes Management
- **Creating** - You can create an unlimited number of notes with a title and content.
- **Edit** - You can edit and share notes very easily.
- **Share** - You can share your notes, and only you can change them.

### 3. Smart render
**The authorization and profile buttons are rendered only after receiving the login status.**
