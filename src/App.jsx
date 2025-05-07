import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
  Divider,
  useMediaQuery
} from '@mui/material';
import { 
  Description as DescriptionIcon,
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Create a royal green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5E20',
      light: '#43A047',
      dark: '#003300',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2E7D32',
      light: '#60AD5E',
      dark: '#005005',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F9F6',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Contract templates
const contractTemplates = {
  roommate: (data) => `
# ROOMMATE AGREEMENT

**Date:** ${data.today}

## 1. PARTIES

This Roommate Agreement ("Agreement") is made between ${data.party1} and ${data.party2}, collectively referred to as "Roommates."

## 2. PROPERTY

The Roommates agree to share the residential property located at ${data.address}.

## 3. TERM

This Agreement begins on ${data.startDate} and continues for ${data.term} months, unless terminated as provided herein.

## 4. RENT AND EXPENSES

- Total Monthly Rent: $${data.amount}
- ${data.party1}'s Share: [Amount]
- ${data.party2}'s Share: [Amount]
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

Either Roommate may terminate this Agreement with at least ${data.notice} days' written notice to the other Roommate.

## 8. SIGNATURES

${data.party1} - Date: ______________

${data.party2} - Date: ______________
`,
  rental: (data) => `
# RENTAL AGREEMENT

**Date:** ${data.today}

## 1. PARTIES

This Rental Agreement ("Agreement") is made between ${data.party1} ("Landlord") and ${data.party2} ("Tenant").

## 2. PROPERTY

The Landlord agrees to rent to the Tenant the property located at ${data.address}.

## 3. TERM

This Agreement begins on ${data.startDate} and continues for ${data.term} months, unless terminated as provided herein.

## 4. RENT AND DEPOSITS

- Monthly Rent: $${data.amount}
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

Either party may terminate this Agreement with at least ${data.notice} days' written notice.

## 8. SIGNATURES

${data.party1} ("Landlord") - Date: ______________

${data.party2} ("Tenant") - Date: ______________
`,
  employment: (data) => `
# EMPLOYMENT CONTRACT

**Date:** ${data.today}

## 1. PARTIES

This Employment Contract ("Contract") is made between ${data.party1} ("Employer") and ${data.party2} ("Employee").

## 2. POSITION

Employee is hired for the position of [Job Title].

## 3. TERM

Employment begins on ${data.startDate} and continues until terminated by either party as provided herein.

## 4. WORKING HOURS

Employee will work according to the schedule determined by the Employer.

## 5. COMPENSATION

- Annual Salary: $${data.amount}
- Pay Frequency: [Frequency]
- Benefits: As per company policy.

## 6. TERMINATION

Either party may terminate this Contract with ${data.notice} days notice as required by applicable law.

## 7. CONFIDENTIALITY

Employee agrees to maintain confidentiality of all proprietary information obtained during employment.

## 8. SIGNATURES

${data.party1} ("Employer") - Date: ______________

${data.party2} ("Employee") - Date: ______________
`,
  service: (data) => `
# SERVICE AGREEMENT

**Date:** ${data.today}

## 1. PARTIES

This Service Agreement ("Agreement") is made between ${data.party1} ("Client") and ${data.party2} ("Provider").

## 2. SERVICES

Provider agrees to provide the following services to Client:
[Service Description]

## 3. DELIVERABLES

Provider shall deliver:
[List of Deliverables]

## 4. TIMELINE

Project timeline:
Starting on ${data.startDate} and ending on [End Date].

## 5. COMPENSATION

- Service Fee: $${data.amount}
- Payment Schedule: [Payment Schedule]
- Late Payment Fees: Late payments may incur additional fees as allowed by law.

## 6. TERM AND TERMINATION

This Agreement remains in effect until services are completed or terminated by either party with ${data.notice} days written notice.

## 7. SIGNATURES

${data.party1} ("Client") - Date: ______________

${data.party2} ("Provider") - Date: ______________
`,
  nda: (data) => `
# NON-DISCLOSURE AGREEMENT

**Date:** ${data.today}

## 1. PARTIES

This Non-Disclosure Agreement ("Agreement") is made between ${data.party1} ("Disclosing Party") and ${data.party2} ("Receiving Party").

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

This Agreement shall remain in effect for ${data.term} years from the date of execution.

## 6. SIGNATURES

${data.party1} ("Disclosing Party") - Date: ______________

${data.party2} ("Receiving Party") - Date: ______________
`,
  sales: (data) => `
# SALES CONTRACT

**Date:** ${data.today}

## 1. PARTIES

This Sales Contract ("Contract") is made between ${data.party1} ("Seller") and ${data.party2} ("Buyer").

## 2. GOODS

The Seller agrees to sell and the Buyer agrees to purchase the following goods:
[Description of Goods]

## 3. PURCHASE PRICE

The purchase price for the goods is $${data.amount}.

## 4. PAYMENT TERMS

Payment shall be made as follows:
[Payment Terms]

## 5. DELIVERY

The goods shall be delivered to ${data.address} on or before [Delivery Date].

## 6. WARRANTIES

The Seller warrants that the goods are free from defects in materials and workmanship for a period of [Warranty Period].

## 7. SIGNATURES

${data.party1} ("Seller") - Date: ______________

${data.party2} ("Buyer") - Date: ______________
`,
  other: (data) => `
# CONTRACT AGREEMENT

**Date:** ${data.today}

## 1. PARTIES

This Agreement is made between ${data.party1} and ${data.party2}.

## 2. PURPOSE

This Agreement is for the purpose of [Purpose].

## 3. TERM

This Agreement begins on ${data.startDate} and continues for ${data.term} months, unless terminated earlier as provided herein.

## 4. TERMS AND CONDITIONS

[Terms and conditions based on the agreement summary]

## 5. COMPENSATION

Total compensation: $${data.amount}

## 6. TERMINATION

This Agreement may be terminated by either party with ${data.notice} days' written notice.

## 7. SIGNATURES

${data.party1} - Date: ______________

${data.party2} - Date: ______________
`
};

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

function App() {
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState('');
  const [contractType, setContractType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [contractData, setContractData] = useState({
    amount: '',
    startDate: '',
    party1: '',
    party2: '',
    address: '',
    term: '12',
    notice: '30',
    today: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Generate contract based on summary and type
  const generateContractWithAI = async (summary, contractType) => {
    setIsGenerating(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract key information from the summary
        // Look for names in the summary
        const nameRegex = /(?:between|with|and)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
        const matches = [...(summary.matchAll(nameRegex) || [])];
        const party1 = matches?.[0]?.[1] || 'Party A';
        const party2 = matches?.[1]?.[1] || 'Party B';
        
        // Extract money amounts, if any
        const moneyRegex = /\$(\d+(?:,\d+)*(?:\.\d+)?)/g;
        const moneyMatches = [...(summary.matchAll(moneyRegex) || [])];
        const amount = moneyMatches?.[0]?.[1] || '[Amount]';
        
        // Extract dates, if any
        const dateRegex = /(?:on|by|starting|from)\s+(\w+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/g;
        const dateMatches = [...(summary.matchAll(dateRegex) || [])];
        const startDate = dateMatches?.[0]?.[1] || '[Start Date]';
        
        // Update contract data with extracted info
        const newContractData = {
          ...contractData,
          amount,
          startDate,
          party1,
          party2,
          address: '[Property Address]'
        };
        
        setContractData(newContractData);
        
        // Generate contract from template
        const contract = contractTemplates[contractType](newContractData);
        
        setIsGenerating(false);
        resolve(contract);
      }, 1000);
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!summary.trim() || !contractType) {
      return;
    }
    
    const contract = await generateContractWithAI(summary, contractType);
    setGeneratedContract(contract);
    setStep(2);
  };

  // Update contract data and regenerate contract
  const updateContractData = (field, value) => {
    setContractData(prev => {
      const updated = { ...prev, [field]: value };
      // Regenerate contract with updated data
      const newContract = contractTemplates[contractType](updated);
      setGeneratedContract(newContract);
      return updated;
    });
  };

  // Download PDF
  const downloadPDF = async () => {
    try {
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
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Contract preview styles
  const contractStyles = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '14px',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    padding: '20px',
    '& h1': {
      fontSize: '24px',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '1em'
    },
    '& h2': {
      fontSize: '16px',
      fontWeight: 'bold'
    },
    '& h3': {
      fontSize: '14px',
      fontWeight: 'bold'
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
        {/* Header */}
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 3, textAlign: 'center', boxShadow: 3 }}>
          <Container>
            <Typography variant="h4" component="h1" gutterBottom>
              AI-Powered Contract Generator
            </Typography>
            <Typography variant="subtitle1">
              Generate professional legal contracts with a simple summary
            </Typography>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {step === 1 ? (
            /* Contract Input Form */
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
              <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth required>
                  <InputLabel id="contract-type-label">Select Contract Type</InputLabel>
                  <Select
                    labelId="contract-type-label"
                    id="contract-type"
                    value={contractType}
                    label="Select Contract Type"
                    onChange={(e) => setContractType(e.target.value)}
                  >
                    {contractTypes.map(type => (
                      <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  id="summary"
                  label="Describe your agreement"
                  multiline
                  rows={6}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Example: I need a roommate agreement between John Smith and Jane Doe for a rental property. The monthly rent is $1500 starting on January 1st, 2026."
                  helperText="Include details like parties involved, amounts, dates, and any specific terms."
                  required
                  fullWidth
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isGenerating}
                    startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <DescriptionIcon />}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Contract'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          ) : (
            /* Contract Editor/Preview */
            <Grid container spacing={3}>
              {/* Editable Fields Panel */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Edit Contract Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Amount"
                      value={contractData.amount}
                      onChange={(e) => updateContractData('amount', e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                    
                    <TextField
                      label="Start Date"
                      value={contractData.startDate}
                      onChange={(e) => updateContractData('startDate', e.target.value)}
                      size="small"
                      placeholder="e.g. January 1, 2026"
                    />
                    
                    <TextField
                      label="Party 1"
                      value={contractData.party1}
                      onChange={(e) => updateContractData('party1', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Party 2"
                      value={contractData.party2}
                      onChange={(e) => updateContractData('party2', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Address"
                      value={contractData.address}
                      onChange={(e) => updateContractData('address', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Term (months)"
                      value={contractData.term}
                      onChange={(e) => updateContractData('term', e.target.value)}
                      size="small"
                      type="number"
                    />
                    
                    <TextField
                      label="Notice Period (days)"
                      value={contractData.notice}
                      onChange={(e) => updateContractData('notice', e.target.value)}
                      size="small"
                      type="number"
                    />
                  </Box>
                </Paper>
              </Grid>
              
              {/* Contract Preview */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper elevation={3} sx={{ mb: 3, overflow: 'auto', maxHeight: '70vh' }}>
                  <Box id="contract-content" sx={contractStyles}>
                    <div dangerouslySetInnerHTML={{ 
                      __html: generatedContract.replace(/\n/g, '<br />') 
                    }}></div>
                  </Box>
                </Paper>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                  <Button
                    onClick={() => setStep(1)}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    fullWidth={isMobile}
                  >
                    Back to Editor
                  </Button>
                  <Button
                    onClick={downloadPDF}
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    fullWidth={isMobile}
                  >
                    Download as PDF
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
        
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'primary.dark',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} AI-Powered Contract Generator
          </Typography>
        </Box>
      </Box>
      
      {/* Notifications */}
      <Snackbar
        open={downloadSuccess}
        autoHideDuration={3000}
        onClose={() => setDownloadSuccess(false)}
      >
        <Alert onClose={() => setDownloadSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Contract downloaded successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;