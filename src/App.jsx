// This is a complete implementation of an AI-powered contract generator using React + Vite
// File: src/App.jsx

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState('');
  const [contractType, setContractType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sample contract types
  const contractTypes = [
    { id: 'roommate', name: 'Roommate Agreement' },
    { id: 'rental', name: 'Rental Agreement' },
    { id: 'employment', name: 'Employment Contract' },
    { id: 'service', name: 'Service Agreement' },
    { id: 'nda', name: 'Non-Disclosure Agreement' },
    { id: 'sales', name: 'Sales Contract' },
    { id: 'other', name: 'Other Contract Type' }
  ];

  // This function simulates AI generating a contract
  // In a real implementation, this would call an API endpoint
  const generateContractWithAI = async (summary, contractType) => {
    setIsGenerating(true);
    
    // In a real app, this would be an API call to a service like OpenAI
    // For demonstration, we'll use a timeout to simulate API latency
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract key information from the summary
        const today = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Look for names in the summary
        const nameRegex = /(?:between|with|and)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
        const matches = [...summary.matchAll(nameRegex)];
        const party1 = matches?.[0]?.[1] || 'Party A';
        const party2 = matches?.[1]?.[1] || 'Party B';
        
        // Extract money amounts, if any
        const moneyRegex = /\$(\d+(?:,\d+)*(?:\.\d+)?)/g;
        const moneyMatches = [...summary.matchAll(moneyRegex)];
        const amount = moneyMatches?.[0]?.[1] || '';
        
        // Extract dates, if any
        const dateRegex = /(?:on|by|starting|from)\s+(\w+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/g;
        const dateMatches = [...summary.matchAll(dateRegex)];
        const startDate = dateMatches?.[0]?.[1] || '';
        
        let contract = '';
        
        // Generate contract based on type
        if (contractType === 'roommate') {
          contract = `
# ROOMMATE AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Roommate Agreement ("Agreement") is made between ${party1} and ${party2}, collectively referred to as "Roommates."

## 2. PROPERTY

The Roommates agree to share the residential property located at [Property Address].

## 3. TERM

This Agreement begins on ${startDate || '[Start Date]'} and continues for [Term] months, unless terminated as provided herein.

## 4. RENT AND EXPENSES

- Total Monthly Rent: ${amount ? '$' + amount : '[Amount]'}
- ${party1}'s Share: [Amount]
- ${party2}'s Share: [Amount]
- Security Deposit: [Amount]

## 5. HOUSE RULES

### 5.1 Overnight Guests
Roommates agree to discuss and approve overnight guests in advance.

### 5.2 Quiet Hours
Roommates agree to maintain reasonable noise levels and respect each other's study/sleep schedules.

### 5.3 Cleaning and Maintenance
Roommates agree to share cleaning responsibilities equally and maintain common areas in a clean and organized condition.

## 6. CONFLICT RESOLUTION

Roommates agree to address conflicts directly and respectfully. If an issue cannot be resolved between Roommates, they agree to seek mediation before taking any legal action.

## 7. TERMINATION

Either Roommate may terminate this Agreement with at least 30 days' written notice to the other Roommate.

## 8. SIGNATURES

${party1} - Date: ______________

${party2} - Date: ______________
`;
        } else if (contractType === 'employment') {
          contract = `
# EMPLOYMENT CONTRACT

**Date:** ${today}

## 1. PARTIES

This Employment Contract ("Contract") is made between ${party1} ("Employer") and ${party2} ("Employee").

## 2. POSITION

Employee is hired for the position of [Job Title].

## 3. TERM

Employment begins on ${startDate || '[Start Date]'} and continues until terminated by either party as provided herein.

## 4. WORKING HOURS

Employee will work according to the schedule determined by the Employer.

## 5. COMPENSATION

- Annual Salary: ${amount ? '$' + amount : '[Amount]'}
- Pay Frequency: [Frequency]
- Benefits: As per company policy.

## 6. TERMINATION

Either party may terminate this Contract with appropriate notice as required by applicable law.

## 7. CONFIDENTIALITY

Employee agrees to maintain confidentiality of all proprietary information obtained during employment.

## 8. SIGNATURES

${party1} ("Employer") - Date: ______________

${party2} ("Employee") - Date: ______________
`;
        } else if (contractType === 'service') {
          contract = `
# SERVICE AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Service Agreement ("Agreement") is made between ${party1} ("Client") and ${party2} ("Provider").

## 2. SERVICES

Provider agrees to provide the following services to Client:
[Service Description]

## 3. DELIVERABLES

Provider shall deliver:
[List of Deliverables]

## 4. TIMELINE

Project timeline:
Starting on ${startDate || '[Start Date]'} and ending on [End Date].

## 5. COMPENSATION

- Service Fee: ${amount ? '$' + amount : '[Amount]'}
- Payment Schedule: [Payment Schedule]
- Late Payment Fees: Late payments may incur additional fees as allowed by law.

## 6. TERM AND TERMINATION

This Agreement remains in effect until services are completed or terminated by either party with written notice.

## 7. SIGNATURES

${party1} ("Client") - Date: ______________

${party2} ("Provider") - Date: ______________
`;
        } else if (contractType === 'rental') {
          contract = `
# RENTAL AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Rental Agreement ("Agreement") is made between ${party1} ("Landlord") and ${party2} ("Tenant").

## 2. PROPERTY

The Landlord agrees to rent to the Tenant the property located at [Property Address].

## 3. TERM

This Agreement begins on ${startDate || '[Start Date]'} and continues for [Term] months, unless terminated as provided herein.

## 4. RENT AND DEPOSITS

- Monthly Rent: ${amount ? '$' + amount : '[Amount]'}
- Security Deposit: [Amount]
- Pet Deposit (if applicable): [Amount]

## 5. UTILITIES AND SERVICES

The following utilities and services are included in the rent:
[List of included utilities]

The Tenant is responsible for paying for:
[List of tenant's responsibilities]

## 6. MAINTENANCE AND REPAIRS

The Landlord is responsible for maintaining the property in a habitable condition. The Tenant agrees to promptly notify the Landlord of any necessary repairs.

## 7. TERMINATION

Either party may terminate this Agreement with at least [Notice Period] days' written notice.

## 8. SIGNATURES

${party1} ("Landlord") - Date: ______________

${party2} ("Tenant") - Date: ______________
`;
        } else if (contractType === 'nda') {
          contract = `
# NON-DISCLOSURE AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Non-Disclosure Agreement ("Agreement") is made between ${party1} ("Disclosing Party") and ${party2} ("Receiving Party").

## 2. PURPOSE

The purpose of this Agreement is to protect the confidential information that may be disclosed between the parties for the purpose of [Business Purpose].

## 3. CONFIDENTIAL INFORMATION

"Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally, or by inspection of tangible objects.

## 4. OBLIGATIONS

The Receiving Party shall:
- Maintain the confidentiality of the Confidential Information
- Not disclose the Confidential Information to any third party
- Use the Confidential Information only for the stated purpose
- Take reasonable measures to protect the secrecy of the Confidential Information

## 5. TERM

This Agreement shall remain in effect for [Term] years from the date of execution.

## 6. SIGNATURES

${party1} ("Disclosing Party") - Date: ______________

${party2} ("Receiving Party") - Date: ______________
`;
        } else if (contractType === 'sales') {
          contract = `
# SALES CONTRACT

**Date:** ${today}

## 1. PARTIES

This Sales Contract ("Contract") is made between ${party1} ("Seller") and ${party2} ("Buyer").

## 2. GOODS

The Seller agrees to sell and the Buyer agrees to purchase the following goods:
[Description of Goods]

## 3. PURCHASE PRICE

The purchase price for the goods is ${amount ? '$' + amount : '[Amount]'}.

## 4. PAYMENT TERMS

Payment shall be made as follows:
[Payment Terms]

## 5. DELIVERY

The goods shall be delivered to [Delivery Address] on or before [Delivery Date].

## 6. WARRANTIES

The Seller warrants that the goods are free from defects in materials and workmanship for a period of [Warranty Period].

## 7. SIGNATURES

${party1} ("Seller") - Date: ______________

${party2} ("Buyer") - Date: ______________
`;
        } else {
          // Generic contract for "other" type
          contract = `
# CONTRACT AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Agreement is made between ${party1} and ${party2}.

## 2. PURPOSE

This Agreement is for the purpose of [Purpose].

## 3. TERM

This Agreement begins on ${startDate || '[Start Date]'} and continues until [End Date], unless terminated earlier as provided herein.

## 4. TERMS AND CONDITIONS

[Terms and conditions based on the agreement summary]

## 5. COMPENSATION

Total compensation: ${amount ? '$' + amount : '[Amount]'}

## 6. TERMINATION

This Agreement may be terminated by either party with [Notice Period] days' written notice.

## 7. SIGNATURES

${party1} - Date: ______________

${party2} - Date: ______________
`;
        }
        
        setIsGenerating(false);
        resolve(contract);
      }, 1500); // Simulate API delay
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!summary.trim() || !contractType) {
      alert('Please provide a summary and select a contract type');
      return;
    }
    
    const contract = await generateContractWithAI(summary, contractType);
    setGeneratedContract(contract);
    setStep(2);
  };

  const downloadPDF = async () => {
    const element = document.getElementById('contract-content');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('contract.pdf');
    
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI-Powered Contract Generator</h1>
        <p>Generate professional legal contracts with a simple summary</p>
      </header>

      <main className="app-main">
        {step === 1 ? (
          <div className="input-section">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="contract-type">Select Contract Type:</label>
                <select 
                  id="contract-type" 
                  value={contractType} 
                  onChange={(e) => setContractType(e.target.value)}
                  required
                >
                  <option value="">-- Select Contract Type --</option>
                  {contractTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="summary">Describe your agreement:</label>
                <textarea 
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows="6"
                  placeholder="Example: I need a roommate agreement between John Smith and Jane Doe for a rental property. The monthly rent is $1500 starting on January 1st, 2026."
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="primary-button" disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Contract'}
              </button>
            </form>
          </div>
        ) : (
          <div className="result-section">
            <div className="contract-container">
              <div id="contract-content" className="contract">
                <div dangerouslySetInnerHTML={{ __html: generatedContract.replace(/\n/g, '<br />') }}></div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button onClick={() => setStep(1)} className="secondary-button">
                Back to Editor
              </button>
              <button onClick={downloadPDF} className="primary-button">
                Download as PDF
              </button>
            </div>
            
            {downloadSuccess && (
              <div className="success-message">
                <span>✓</span> Contract downloaded successfully!
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;