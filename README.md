# FitCheck
A web-based outfit planning app that helps you plan, organize, and save outfit combinations using your actual wardrobe.

 
** Currently in development - Phase 1 MVP in progress**


## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Java Spring Boot
- **Tools:** ESLint, Turbopack, Git
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

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup
*Backend setup instructions will be added when Spring Boot backend is implemented.*

## Development Roadmap

### Phase 1: Minimum Viable Product
- [x] (framework scaffold exists, frontend work started with login page
- [x] Project setup and configuration
- [ ] Email/password authentication
- [ ] Wardrobe management:
  - [ ] Add clothing items with photo upload
  - [ ] Specify clothing type (Top, Bottoms, Shoes, Jacket)
  - [ ] View all clothing items by type
  - [ ] Remove items from wardrobe

### Phase 2: Stored Outfit Creation And Improved Login
- [ ] Swipe across different types and compile an outfit
- [ ] "Remember me" for login
- [ ] Full functioning password retrieval if forgotten password
  - [ ] Prompts "forgot password" if multiple failed login attempts
- [ ] Save/unsave favorite outfits

### Phase 3: Additional Outfit Creation Features
- [ ] More outfit type options:
  - [ ] Socks, Bra/underwear, Earrings, Sunglasses, Wrist accessories, Custom types, Edit types
- [ ] Tagging outfits for multiple types

### Phase 4: Multi-Outfit Organization Features
- [ ] Create outfit bundles with category custom catagory names
  - [ ] Trip name, Season, Occasion (going out dancing, everyday, formal, family safe, work, gym)
- [ ] Duplicate warning when saving the same outfit to the same bundle
- [ ] Swipe through to create outfit or view all type options on one screen
- [ ] Tutorial for new users

### Phase 5: Advanced Features
- [ ] Assign saved outfits to calendar days
- [ ] Layer outfits (selecting multiple of the same type)
- [ ] Additional App themes
  - [ ] Optional music for app themes

### Optional Phase 6: Virtual Try-On
- [ ] Virtual try-on with 360 views
- [ ] On-device try-on

### Optional Phase 7: Shopping Integration
- [ ] Preview how website clothing might match your closet
- [ ] Additional outfit items: makeup, nail polish, hairstyle

### Optional Phase 8: Social Features
- [ ] Share closets with other users
- [ ] Create shared closets with fit categories
- [ ] Borrow garments from friends with size warnings
- [ ] "Favorite" outfits and garments in other users' closets

## Current Status
**Phase 1 MVP** -  Initial frontend setup complete. Currently troubleshooting bugs and hooking the front end to the backend.

## Contributing
This is currently a personal project. If you're interested in contributing, please reach out! :)

## Future Considerations
- Mobile app development
- Integration with fashion retailers
- AI-powered outfit suggestions
- Weather-based outfit recommendations

## Contact
- **Developer:** Nikki Cerniuk
- **Repository:** [GitHub](https://github.com/NikkiCerniuk/FitCheck--web)
