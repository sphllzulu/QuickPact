# QuickPact

<div align="center">
  
  ## 🤖 AI-Powered Contract Generator
  ***"Because handshake deals belong in the Stone Age"***
  
</div>

## 📌 Overview

QuickPact is a web application that allows users to quickly generate professional legal contracts by simply describing their agreement in natural language. The app supports multiple contract types (e.g., roommate agreements, freelancer contracts, NDAs) and provides an easy-to-use interface for customization before downloading as a PDF.

Built with React.js and Material-UI, this tool simplifies contract creation while ensuring legal clarity and proper formatting.

## ✨ Supercharged Features

🔥 **NEW AI-Powered Drafting** - Our OpenAI integration:
* Analyzes your messy human description ("Me and Bob splitting rent $1200, he gets the bigger room")
* Transforms it into a **legally-structured contract** with proper clauses
* Supports **7+ contract types** with smart templating

⚡ **Hybrid Intelligence** - Combines:
1. **AI magic** (GPT-3.5 Turbo) for content generation
2. **Rule-based templates** for consistent formatting
3. **Human-editable fields** because robots aren't perfect (yet)

- **Multiple Contract Templates** – Generate agreements for:
  - Roommate Agreements
  - Rental Agreements
  - Employment Contracts
  - Freelancer Agreements
  - Non-Disclosure Agreements (NDAs)
  - Sales Contracts
  - Custom Contracts

- **PDF Export** – Download contracts as high-quality PDFs with proper pagination.

- **Mobile-Friendly** – Responsive design works on all devices.

- **Clean UI** – Professional Material-UI styling with a user-friendly interface.

## 🚀 How to Use

### 1. Generate a Contract
- Select a Contract Type (e.g., "Roommate Agreement").
- Describe Your Agreement in the text box (e.g., "I need a roommate agreement between Alex and Sam. Rent is $1200 starting June 1, 2024.").
- Click "Generate Contract" to create a draft.

### 2. Customize the Contract
- Edit fields like:
  - Amounts (rent, deposits, fees)
  - Dates (start date, termination notice)
  - Parties Involved (names, roles)
  - Additional Terms (house rules, payment schedules)

### 3. Download as PDF
- Click "Download as PDF" to save the contract.
- The PDF will maintain proper formatting and page breaks.

## 🤖 How the AI Works

1. **User Input** → "Roommate deal: I pay 800,Bobpays800,*Bobpays*700, no pets"
2. **AI Processing** → GPT-3.5 analyzes and structures:
```markdown
## 4. RENT AND EXPENSES
- Total Monthly Rent: $1500
- Alice's Share: $800
- Bob's Share: $700
- Pet Policy: No pets allowed
```
3. **Human Review** → Edit any generated content

## 📜 Example AI-Generated Output

```markdown
# FREELANCER AGREEMENT  
**Date:** June 10, 2024  

## 1. PARTIES  
This Agreement between **Alice Smith ("Client")** and **Bob Dev ("Freelancer")**...  

## 2. PAYMENT  
- Total Fee: $5,000  
- 50% upfront, 50% on delivery  
- Late fees: 2% per month  
```

## 🛠️ Tech Stack

- **Frontend**: React.js, Material-UI
- **PDF Generation**: jsPDF, html2canvas
- **Styling**: CSS-in-JS (MUI sx props)
- **State Management**: React Hooks (useState, useEffect)

## 🛠️ Tech Stack Upgrade

### **New AI Components**
```javascript
// Cutting-edge AI integration
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Securely stored
  dangerouslyAllowBrowser: true // Development only!
});

async function generateContractWithAI(summary, contractType) {
  // Legal prompt engineering
  const prompt = `Create a ${contractType} contract from: ${summary}. 
  Include markdown formatting with ## Sections and bullet points.`;
  // ...API call handling...
}
```

### **Security First**
* API keys stored in `.env` files (never in code)
* Browser access restricted in production
* Fallback to templates if AI fails

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm / Yarn
- **OpenAI API Key** - Get yours at platform.openai.com

### Steps

1. **Clone the repository**:
```sh
git clone https://github.com/sphllzulu/QuickPact.git
cd quickpact
```

2. **Install dependencies**:
```sh
npm install
# or
yarn install
```

3. **.env File** - Add to project root:
```env
VITE_OPENAI_API_KEY=your_key_here
```

4. **Run with AI**:
```bash
npm install openai @openai/api
npm run dev
```

5. **Open in browser**:
- Visit http://localhost:5173

## 📂 Project Structure

```
quickpact/
├── src/
│   ├── App.js               # Main application component
│   ├── templates.js         # Contract templates & logic
│   ├── Instructions.js      # User guide modal
│   ├── styles.js            # MUI theme & global styles
│   ├── index.js             # React root render
│   └── index.css            # Global CSS
├── public/                  # Static assets
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

## 🔍 How It Works

### 1. Contract Generation Flow
- User inputs a description (e.g., "Freelance contract for $5000, due by July 30").
- The app extracts key details (amounts, dates, names) using regex.
- A pre-defined template is populated with the extracted data.

### 2. PDF Generation
- The contract HTML is converted to an image using html2canvas.
- jsPDF splits the content into A4-sized pages for clean PDF export.

### 3. Responsive Design
- Mobile-friendly layout with dynamic form adjustments.
- Scrollable contract preview on small screens.

## ⚠️ Important Notes
* **Cost Monitoring**: AI API calls have usage costs
* **Privacy**: Never input sensitive personal data
* **Legal Review**: Always have real lawyers check important contracts

## 🔄 Future Improvements

- **More Templates** – Add loan agreements, partnership contracts, etc.
- **Digital Signatures** – Allow e-signing via DocuSign or similar.
- **Cloud Storage** – Save contracts to Firebase or AWS S3.

## 📜 License

MIT License – Free for personal and commercial use.

## 🙏 Credits

Developed by Siphelele Zulu using React & Material-UI.

## 📬 Contact

For questions or feedback:
- 📧 Email: sphllzulu@gmail.com

## 🌐 Try It Live
[Insert Deployed Link Here]

*"Finally, a contract generator that speaks both legalese and human!"* - Satisfied User Probably

## 🎉 Happy Contracting!

Generate, customize, and download legal agreements in minutes! 🚀

P.S. If this README was a contract, we'd have generated it with our own AI. 😉

---

<div align="center">
  
![Image](https://github.com/user-attachments/assets/a7a78b52-6b84-428c-bd3b-6dd8f4ba576c)
  
  *QuickPact in action*
  
</div>
