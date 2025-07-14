
---

## 🛠️ How to Run

1. Install dependencies:
   ```sh
   cd frontend-test-submission
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📝 How It Works

- **ShortenerPage:** Enter a long URL, optional validity, and optional custom shortcode. Click "Shorten" to generate a unique short URL.
- **RedirectHandler:** When a short URL is visited, the app looks up the original URL, tracks the click, and redirects (if not expired).
- **StatsPage:** View all created short URLs, their expiry, and click analytics.
- **Logger:** All major actions and errors are logged using the custom logger utility.

---

## 📸 Screenshots

> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/86dc1920-b5e2-4539-8caa-7e1675262f66" />
> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/48bdc6cd-2d20-4d30-89b5-7c65fbdc986b" />
> - Statistics page
> - <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/91c3369b-9885-42a1-8e47-38534ee3a457" />

 
> - dekstop
> -<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/db391e3c-3b2b-4769-a6a4-75f19074e8ef" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8de658dc-b15e-411f-908f-ed653a7a9f53" />



---

## 📄 Design & Architecture

See [Design.md](./frontend-test-submission/Design.md) for a detailed explanation of the app’s structure and design decisions.

---

##How This Project Was Built
Built with React (Vite) and Tailwind CSS for a fast, responsive UI.
Uses React Router for navigation and client-side redirection.
All data (short URLs, analytics) is stored in localStorage.
Shortcodes are validated for uniqueness and format.
Expiry is handled for each short URL.
Custom logger logs all major actions and errors to the required API.
All user input is validated with clear error messages.

## ⚠️ Notes

- No personal or company info is present in the repo, README, or commits.
- All code is for evaluation purposes only.
