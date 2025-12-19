# FitCheck
A web-based outfit planning app that helps you plan, organize, and save outfit combinations using your actual wardrobe.

 
**Currently in development - Phase 1 MVP in progress**


## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Figma
- **Backend:** Java Spring Boot
- **Database:** PostgreSQL
- **Tools:** ESLint, Turbopack, Git, Postman (API testing)
- **Platform:** Web-based application

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Java 17+ and Maven (for backend)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/NikkiCerniuk/FitCheck--web.git
   cd FitCheck--web
   ```

## Frontend Setup
2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the front end**
   ```bash
   cd frontend
   npm run dev
   ```

### Backend Setup
4. **Start the Backend**
```bash
  cd backend
  mvn spring-boot:run
 ```


### Running Services
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8080


## Development Roadmap

### Phase 1: Minimum Viable Product
- [x] framework scaffold exists
- [x] Project setup and configuration
- [x] Email/password authentication
- [ ] Wardrobe management:
- [ ] Add new clothing via a text description
  - [x] backend
- [ ] Specify clothing type (JACKET, TOP, BOTTOM, SOCKS, SHOES)
  - [x] backend
- [ ] View all clothing items by type
  - [x] backend
- [ ] Remove items from wardrobe
  - [x] backend
- [x] fix login and registration UI so it matches that of the homepage


### Phase 2: Stored Outfit Creation, Photo Upload And Improved Login
- [ ] Swipe across different types and compile an outfit
- [ ] "Remember me" for login
- [ ] Add clothing items with photo upload
- [ ] Full functioning password retrieval if forgotten password
  - [ ] Prompts "forgot password" if multiple failed login attempts
- [ ] Save/unsave favorite outfits

### Phase 3: Additional Outfit Type Features
- [ ] More outfit type options:
  - [ ] Custom types(ex: Bra,Underwear,Earrings,Sunglasses, Wrist accessories), Edit types, Delete types
- [ ] Tagging outfits for multiple types

### Phase 4: Multi-Outfit Organization Features
- [ ] Create outfit bundles with category custom catagory names
  - [ ] Trip name, Season, Occasion (going out dancing, everyday, formal, family safe, work, gym)
- [ ] Duplicate warning when saving the same outfit to the same bundle
- [ ] Swipe through to create outfit or view all type options on one screen
- [ ] Tutorial for new users

### Phase 5: Layer Clothing, Assign to Days, Added Themes
- [ ] Assign saved outfits to calendar days
- [ ] Layer outfits (selecting multiple of the same type)
- [ ] Additional App themes
  - [ ] Optional music for app themes

### Optional Phase 6: Virtual Try-On
- [ ] Virtual try-on with 360 views
- [ ] On-device try-on

### Optional Phase 7: Outfit Suggestions
- [ ] suggest new outfit combinations to user

### Optional Phase 8: Shopping Integration
- [ ] Preview how website clothing might match your closet
- [ ] Additional outfit items: makeup, nail polish, hairstyle

### Optional Phase 9: Social Features
- [ ] Share closets with other users
- [ ] Create shared closets with fit categories
- [ ] Borrow garments from friends with size warnings
- [ ] "Favorite" outfits and garments in other users' closets

## Current Status
**Phase 1 MVP** -  backend MVP complete, working on 
  - frontend MVP for Wardrobe 
  - connecting the Wardrobe front end to the backend

## Contributing
This is currently a personal project so I can gain full-stack familiarity. If you're interested in contributing, please reach out! :)

## Future Considerations
- Mobile app development
- Integration with fashion retailers
- AI-powered outfit suggestions
- Weather-based outfit recommendations

## Contact
- **Developer:** Nikki Cerniuk
- **Repository:** [GitHub](https://github.com/NikkiCerniuk/FitCheck--web)
