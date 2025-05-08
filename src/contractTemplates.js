// contractTemplates.js
// Contract templates for the AI-powered contract generator

// Helper function to calculate shares evenly
const calculateEvenShares = (total, count = 2) => {
  const amount = parseFloat(total.replace(/,/g, ''));
  if (isNaN(amount)) return '[Amount per person]';
  
  const share = (amount / count).toFixed(2);
  return share;
};

// Contract templates collection
export const contractTemplates = {
  roommate: (data) => {
    // Calculate individual shares if amount is provided
    const share = calculateEvenShares(data.amount);
    
    return `
 ROOMMATE AGREEMENT

**Date:** ${data.today}

 1. PARTIES

This Roommate Agreement ("Agreement") is made between ${data.party1} and ${data.party2}, collectively referred to as "Roommates."

 2. PROPERTY

The Roommates agree to share the residential property located at ${data.address}.

 3. TERM

This Agreement begins on ${data.startDate} and continues for ${data.term} months, unless terminated as provided herein.

 4. RENT AND EXPENSES

- Total Monthly Rent: R${data.amount}
- ${data.party1}'s Share: R${share}
- ${data.party2}'s Share: R${share}
- Security Deposit: R${data.securityDeposit || (data.amount ? calculateEvenShares(data.amount) : '[Amount]')}

 5. HOUSE RULES

 5.1 Overnight Guests
Roommates agree to discuss and approve overnight guests in advance.

 5.2 Quiet Hours
Roommates agree to maintain reasonable noise levels and respect each other's study/sleep schedules.

 5.3 Cleaning and Maintenance
Roommates agree to share cleaning responsibilities equally and maintain common areas in a clean and organized condition.

 6. CONFLICT RESOLUTION

Roommates agree to address conflicts directly and respectfully. If an issue cannot be resolved between Roommates, they agree to seek mediation before taking any legal action.

 7. TERMINATION

Either Roommate may terminate this Agreement with at least ${data.notice} days' written notice to the other Roommate.

 8. SIGNATURES

${data.party1} - Date: ______________

${data.party2} - Date: ______________
`;
  },
  
  rental: (data) => `
 RENTAL AGREEMENT

**Date:** ${data.today}

 1. PARTIES

This Rental Agreement ("Agreement") is made between ${data.party1} ("Landlord") and ${data.party2} ("Tenant").

 2. PROPERTY

The Landlord agrees to rent to the Tenant the property located at ${data.address}.

 3. TERM

This Agreement begins on ${data.startDate} and continues for ${data.term} months, unless terminated as provided herein.

 4. RENT AND DEPOSITS

- Monthly Rent: R${data.amount}
- Security Deposit: R${data.securityDeposit || (data.amount ? data.amount : '[Amount]')}
- Pet Deposit (if applicable): R${data.petDeposit || '[Amount]'}

 5. UTILITIES AND SERVICES

The following utilities and services are included in the rent:
${data.includedUtilities || '[List of included utilities]'}

The Tenant is responsible for paying for:
${data.tenantUtilities || '[List of tenant\'s responsibilities]'}

 6. MAINTENANCE AND REPAIRS

The Landlord is responsible for maintaining the property in a habitable condition. The Tenant agrees to promptly notify the Landlord of any necessary repairs.

 7. TERMINATION

Either party may terminate this Agreement with at least ${data.notice} days' written notice.

 8. SIGNATURES

${data.party1} ("Landlord") - Date: ______________

${data.party2} ("Tenant") - Date: ______________
`,

  employment: (data) => `
 EMPLOYMENT CONTRACT

**Date:** ${data.today}

 1. PARTIES

This Employment Contract ("Contract") is made between ${data.party1} ("Employer") and ${data.party2} ("Employee").

 2. POSITION

Employee is hired for the position of ${data.position || '[Job Title]'}.

 3. TERM

Employment begins on ${data.startDate} and continues until terminated by either party as provided herein.

 4. WORKING HOURS

Employee will work according to the schedule determined by the Employer: ${data.workingHours || '[Schedule details]'}

 5. COMPENSATION

- Annual Salary:R${data.amount}
- Pay Frequency: ${data.payFrequency || '[Frequency]'}
- Benefits: ${data.benefits || 'As per company policy.'}

 6. TERMINATION

Either party may terminate this Contract with ${data.notice} days notice as required by applicable law.

 7. CONFIDENTIALITY

Employee agrees to maintain confidentiality of all proprietary information obtained during employment.

 8. SIGNATURES

${data.party1} ("Employer") - Date: ______________

${data.party2} ("Employee") - Date: ______________
`,

  service: (data) => `
 SERVICE AGREEMENT

**Date:** ${data.today}

 1. PARTIES

This Service Agreement ("Agreement") is made between ${data.party1} ("Client") and ${data.party2} ("Provider").
 2. SERVICES

Provider agrees to provide the following services to Client:
${data.serviceDescription || '[Service Description]'}

 3. DELIVERABLES

Provider shall deliver:
${data.deliverables || '[List of Deliverables]'}

 4. TIMELINE

Project timeline:
Starting on ${data.startDate} and ending on ${data.endDate || '[End Date]'}.

 5. COMPENSATION

- Service Fee:R${data.amount}
- Payment Schedule: ${data.paymentSchedule || '[Payment Schedule]'}
- Late Payment Fees: Late payments may incur additional fees as allowed by law.

 6. TERM AND TERMINATION

This Agreement remains in effect until services are completed or terminated by either party with ${data.notice} days written notice.

 7. SIGNATURES

${data.party1} ("Client") - Date: ______________

${data.party2} ("Provider") - Date: ______________
`,

  nda: (data) => `
 NON-DISCLOSURE AGREEMENT

**Date:** ${data.today}

 1. PARTIES

This Non-Disclosure Agreement ("Agreement") is made between ${data.party1} ("Disclosing Party") and ${data.party2} ("Receiving Party").

 2. PURPOSE

The purpose of this Agreement is to protect the confidential information that may be disclosed between the parties for the purpose of ${data.purpose || '[Business Purpose]'}.

 3. CONFIDENTIAL INFORMATION

"Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally, or by inspection of tangible objects.

 4. OBLIGATIONS

The Receiving Party shall:
- Maintain the confidentiality of the Confidential Information
- Not disclose the Confidential Information to any third party
- Use the Confidential Information only for the stated purpose
- Take reasonable measures to protect the secrecy of the Confidential Information

 5. TERM

This Agreement shall remain in effect for ${data.term} years from the date of execution.

 6. SIGNATURES

${data.party1} ("Disclosing Party") - Date: ______________

${data.party2} ("Receiving Party") - Date: ______________
`,

  sales: (data) => `
# SALES CONTRACT

**Date:** ${data.today}

 1. PARTIES

This Sales Contract ("Contract") is made between ${data.party1} ("Seller") and ${data.party2} ("Buyer").

 2. GOODS

The Seller agrees to sell and the Buyer agrees to purchase the following goods:
${data.goodsDescription || '[Description of Goods]'}

 3. PURCHASE PRICE

The purchase price for the goods is R${data.amount}.

 4. PAYMENT TERMS

Payment shall be made as follows:
${data.paymentTerms || '[Payment Terms]'}

 5. DELIVERY

The goods shall be delivered to ${data.address} on or before ${data.deliveryDate || '[Delivery Date]'}.

 6. WARRANTIES

The Seller warrants that the goods are free from defects in materials and workmanship for a period of ${data.warrantyPeriod || '[Warranty Period]'}.

 7. SIGNATURES

${data.party1} ("Seller") - Date: ______________

${data.party2} ("Buyer") - Date: ______________
`,

  other: (data) => `
 CONTRACT AGREEMENT

**Date:** ${data.today}

 1. PARTIES

This Agreement is made between ${data.party1} and ${data.party2}.

 2. PURPOSE

This Agreement is for the purpose of ${data.purpose || '[Purpose]'}.

 3. TERM

This Agreement begins on ${data.startDate} and continues for ${data.term} months, unless terminated earlier as provided herein.

 4. TERMS AND CONDITIONS

${data.termsAndConditions || '[Terms and conditions based on the agreement summary]'}

 5. COMPENSATION

Total compensation: R${data.amount}

 6. TERMINATION

This Agreement may be terminated by either party with ${data.notice} days' written notice.

 7. SIGNATURES

${data.party1} - Date: ______________

${data.party2} - Date: ______________
`
};

// Contract type definitions
export const contractTypes = [
  { id: 'roommate', name: 'Roommate Agreement' },
  { id: 'rental', name: 'Rental Agreement' },
  { id: 'employment', name: 'Employment Contract' },
  { id: 'service', name: 'Service Agreement' },
  { id: 'nda', name: 'Non-Disclosure Agreement' },
  { id: 'sales', name: 'Sales Contract' },
  { id: 'other', name: 'Other Contract Type' }
];