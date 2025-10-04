# Kishan's Portfolio

A modern, interactive portfolio website built with React and Spring Boot, featuring Netflix-style intro animations, dynamic project display, and a contact form with backend data handling.

## ✨ Features

- **Netflix-style Intro Animation**: Engaging intro sequence with custom animations
- **Interactive UI**: Custom cursor, smooth transitions, and responsive design
- **Dynamic Projects**: Projects fetched from backend database with search functionality
- **Contact Form**: Functional contact form with backend integration and validation
- **Background Music**: Ambient audio experience (user-controlled)
- **Responsive Design**: Optimized for all device sizes
- **Modern Tech Stack**: React + Spring Boot with production-ready architecture

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Framer Motion** for animations
- **CSS3** with custom properties and gradients
- **Bun** package manager

### Backend
- **Spring Boot 3.2.0** with Java 17
- **Spring Data MongoDB** for database operations
- **MongoDB Atlas** (production) / **Local MongoDB** (development)
- **Maven** build system
- **Jakarta Validation** for data validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Java 17+
- Maven 3.6+ (or use included wrapper)
- MongoDB Atlas account (for production) or Docker (for local MongoDB)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env .env.local
   # Edit .env.local with your backend URL if different
   ```

4. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Setup MongoDB** (choose one option):
   - **Option A: MongoDB Atlas** (recommended for production)
     - Follow [MongoDB Atlas Setup Guide](./MONGODB_SETUP.md)
     - Get your connection string
   - **Option B: Local MongoDB with Docker**
     ```bash
     npm run docker:dev  # Starts MongoDB + Mongo Express
     ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Configure MongoDB connection**
   - Create `.env` file in backend directory:
     ```env
     MONGODB_URI=mongodb+srv://your-connection-string
     MONGODB_DATABASE=portfolio
     ```
   - Or for local MongoDB:
     ```env
     MONGODB_URI=mongodb://localhost:27017/portfolio
     MONGODB_DATABASE=portfolio
     ```

4. **Run the application** (using Maven wrapper)
   ```bash
   ./mvnw spring-boot:run
   # or if you have Maven installed
   mvn spring-boot:run
   ```

   Backend will be available at `http://localhost:8080`

5. **Alternative: Using IDE**
   - Import as Maven project in IntelliJ IDEA or Eclipse
   - Run `PortfolioApplication.java`

## 📁 Project Structure

```
Portfolio/
├── public/                 # Static assets
│   ├── bgmusic.mp3        # Background music
│   ├── intro.mp3          # Intro sound
│   └── kishan.jpeg        # Profile image
├── src/
│   ├── components/        # React components
│   │   ├── NetflixIntro.jsx
│   │   ├── MainContent.jsx
│   │   ├── Projects.jsx
│   │   ├── ContactForm.jsx
│   │   └── ...
│   ├── services/          # API services
│   │   └── ApiService.js
│   └── ...
├── backend/
│   └── src/main/java/com/kishan/portfolio/
│       ├── entity/        # JPA entities
│       ├── repository/    # Data repositories  
│       ├── service/       # Business logic
│       ├── controller/    # REST controllers
│       └── config/        # Configuration
└── ...
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/search?q={query}` - Search projects
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/{id}` - Update project (admin)
- `DELETE /api/projects/{id}` - Delete project (admin)

### Contact
- `POST /api/contact` - Submit contact form

## 🗄 Database Schema

### Projects Collection
- `id` (String, MongoDB ObjectId)
- `title` (String, Not Null)
- `description` (String)
- `technologies` (Array of Strings)
- `github_url` (String)
- `live_url` (String)
- `image_url` (String)
- `featured` (Boolean)
- `created_at` (DateTime)
- `updated_at` (DateTime)

### Contacts Collection
- `id` (String, MongoDB ObjectId)
- `name` (String, Not Null)
- `email` (String, Not Null)
- `message` (String, Not Null)
- `created_at` (DateTime)

## 🌐 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8080/api
```

### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
MONGODB_DATABASE=portfolio
```

### Production Environment Variables
```bash
# Frontend
VITE_API_URL=https://your-backend-url.com/api

# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
MONGODB_DATABASE=portfolio
FRONTEND_URL=https://your-frontend-domain.com
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `bun run build`
2. Deploy `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Railway/Heroku/Render)
1. Create MongoDB Atlas cluster (see [MongoDB Setup Guide](./MONGODB_SETUP.md))
2. Set environment variables:
   - `MONGODB_URI`
   - `MONGODB_DATABASE`
   - `FRONTEND_URL`
3. Deploy using Git or Docker

## 🧪 Testing

### Frontend
```bash
bun run test
# or
npm run test
```

### Backend
```bash
cd backend
./mvnw test
```

## 🎨 Customization

### Adding New Projects
1. Use the admin API endpoints or
2. Add to `DataInitializer.java` for default projects

### Styling
- Modify CSS custom properties in component files
- Update color schemes in `MainContent.css`
- Customize animations in Framer Motion components

### Contact Form
- Add additional fields in `Contact.java` entity
- Update `ContactForm.jsx` component
- Modify validation rules in backend

## 🤝 Contributing

Please read [CONTRIBUTING.md](./contribution.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Netflix for inspiration on the intro animation
- Framer Motion for smooth animations
- Spring Boot community for excellent documentation
- React community for best practices

## 📧 Contact

- **Email**: kishan@example.com
- **LinkedIn**: [linkedin.com/in/kishan](https://linkedin.com/in/kishan)
- **GitHub**: [github.com/kishan](https://github.com/kishan)

---

**Built with ❤️ by Kishan**
