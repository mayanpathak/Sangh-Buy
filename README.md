# 🛒 SanghBuy — Group Buying Platform for Offline Retailers

SanghBuy is a **B2B2C community/group-buying marketplace** built using **React**, designed to empower small offline retailers in India by allowing them to pool orders, access better rates directly from manufacturers, and simplify procurement.

> 💡 Inspired by Indian retail pain points, SanghBuy connects offline retailers for cost-effective group purchases, unlocking financial services and inventory analytics with AI-driven insights.

---

## 🚀 Vision

Offline retailers face common challenges like:
- High procurement costs due to lack of bargaining power.
- Inefficient supply chains and logistics.
- Lack of access to credit or inventory intelligence.

**SanghBuy** solves these by:
- Creating purchasing pools.
- Facilitating discovery of nearby active buying groups.
- Enabling smarter buying via AI suggestions, analytics, and business alerts.

---

## 🧱 Tech Stack

### Frontend (MVP is Frontend-Only)
| Tool | Description |
|------|-------------|
| **React.js** | Component-based UI |
| **React Router** | Routing and navigation |
| **Tailwind CSS** | Utility-first responsive styling |
| **Framer Motion** | Smooth UI animations |
| **React Icons / Lucide** | Iconography |
| **EmailJS or Firebase Auth** | Email-based authentication |
| **rss2json + Gemini API** | Real-time deal parsing and AI tagging |
| **LocalStorage** | Temporary user and session persistence |

---

## 📦 Folder Structure

sanghbuy/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, logos
│ ├── components/ # Reusable components (NavBar, Cards, etc.)
│ ├── pages/ # App routes (Home, Pools, Profile)
│ ├── hooks/ # Custom hooks (e.g., useAuth)
│ ├── utils/ # Helper functions
│ ├── data/ # Static data (mocked pools, manufacturers)
│ ├── services/ # API utils (email OTPs, rss feeds)
│ └── App.jsx # Main app wrapper
├── .env # Environment variables
├── tailwind.config.js
├── package.json
└── README.md

markdown
Copy
Edit

---

## 🔑 Key Features

### 1. 🧩 Pool Creation
- Retailers create a buying group ("pool").
- Set product, deadline, MOQ, max buyers.
- Select delivery radius for optimized logistics.

### 2. 📣 Pool Sharing
- Shareable social links (WhatsApp, Telegram).
- Invite others to join to fulfill MOQ.

### 3. 🔍 Explore Nearby Pools
- AI-sorted list of pools near user.
- Filter by category, deadline, or savings.

### 4. 📬 Email Authentication
- OTP-based or password-based sign-in.
- Simple UI with profile setup for new users.

### 5. 💸 AI-Powered Deal Alerts (Experimental)
- Telegram/RSS deals fetched using `rss2json`.
- Tagged using **Gemini API**:
  - Tags like `Opportunity`, `Seasonal Trend`, `FMCG`, `Urgent`, `Threat`.

### 6. 📊 AI Inventory Assistant (Planned)
- Gemini chatbot offering:
  - Inventory trends.
  - Market analytics.
  - Season-wise product insights.
  - Warnings for low ROI purchases.

---

## 🧠 AI Integrations

| Feature | Stack |
|--------|-------|
| **Real-time Deal Parsing** | `rss2json` + keyword filters (`FMCG`, `Retail`, etc.) |
| **AI Tagging** | Gemini Pro API → adds metadata to each deal |
| **Chatbot Assistant** | Gemini Chat → trained with inventory, FMCG, seasonal data |

Example AI Tags:
```json
{
  "title": "Buy 100kg basmati at ₹68/kg - limited time!",
  "tags": ["Opportunity", "FMCG", "Urgent", "High ROI"]
}
🧪 Tech Challenges Solved
Problem	Solution
Building trust between retailers	Transparent pool data + sharing links
Transaction complexity	Aggregated intent for group purchase (payment logic in Phase 2)
Digital literacy	Clean, mobile-first UI with animations
Scalability	Frontend-first MVP decoupled from backend
Real-time deal filtering	RSS feeds filtered and summarized using Gemini
Language barriers	AI Chatbot with simple, localized language (planned)

📷 Screenshots
Coming soon — mock UI screens

⚙️ Setup Instructions
Clone the repo

bash
Copy
Edit
git clone https://github.com/yourusername/sanghbuy.git
cd sanghbuy
Install dependencies

bash
Copy
Edit
npm install
Set up .env

ini
Copy
Edit
VITE_RSS2JSON_API_KEY=your_rss2json_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_EMAIL_SERVICE_ID=your_email_service
VITE_TEMPLATE_ID=your_email_template
Run locally

bash
Copy
Edit
npm run dev
🧭 Roadmap
✅ MVP Goals
 Pool creation & sharing

 Explore section

 Email auth

 Real-time deal feeds

 AI tagging (basic)

🔜 Next Milestones
 Manufacturer-side dashboard

 Order aggregation backend (Node.js)

 Inventory intelligence chatbot

 Financial services onboarding

 Delivery routing logic (Google Maps API)

 Hindi/local language UI support

💡 Business Impact
Reduces procurement costs for kirana and general stores.

Encourages digital collaboration between retailers.

Enables fintech integration (BNPL, credit scoring).

Unlocks AI-based market trend prediction.

📚 Learning Resources & APIs
Tool/API	Docs
React	https://reactjs.org
Tailwind CSS	https://tailwindcss.com
rss2json	https://rss2json.com
Gemini API	https://ai.google.dev
EmailJS	https://www.emailjs.com/docs
Firebase	https://firebase.google.com

🤝 Contributing
We welcome community contributions!

Fork this repo

Create your feature branch (git checkout -b feature/my-feature)

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature/my-feature)

Open a Pull Request

📄 License
MIT License — Feel free to use, remix, and contribute.

👨‍💻 Maintainer
Project Lead: @mayanpathak
Built with ❤️ for offline Indian retailers.

yaml
Copy
Edit

---








